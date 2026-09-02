#!/usr/bin/env python3
"""Detect GPS coordinates in image EXIF.

This is a public repository, so a photo carrying latitude/longitude would publish
wherever it was taken. `.gitignore` keeps the raw originals in content/photo/ out
of the repo, but images placed directly under public/ still need checking — that
is what this script is for.

Deliberately dependency-free (standard library only): it parses the EXIF block by
hand rather than relying on exiftool or Pillow, so it keeps working on a fresh
clone with nothing installed.

Usage:
    check-image-gps.py --staged        # check what is staged for commit
    check-image-gps.py PATH [PATH ...] # check files on disk

Exit code 1 if any image carries coordinates.
"""

import struct
import subprocess
import sys

IMAGE_EXT = ('.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff')
# Formats whose metadata this parser cannot read; reported so they are not
# silently assumed clean.
OPAQUE_EXT = ('.heic', '.heif', '.avif')

GPS_IFD_POINTER = 0x8825
TAG_GPS_LATITUDE = 0x0002
TAG_GPS_LONGITUDE = 0x0004
TYPE_RATIONAL = 5


def extract_exif(data: bytes):
    """Return the TIFF block (starting at the byte-order mark), or None."""

    # JPEG — the APP1 segment starting with "Exif\0\0"
    if data[:2] == b'\xff\xd8':
        i = 2
        while i + 4 <= len(data):
            if data[i] != 0xFF:
                break
            marker = data[i + 1]
            if marker == 0x01 or 0xD0 <= marker <= 0xD9:
                i += 2
                continue
            if marker == 0xDA:  # start of scan — image data follows, no more metadata
                break
            seg_len = struct.unpack('>H', data[i + 2:i + 4])[0]
            segment = data[i + 4:i + 2 + seg_len]
            if marker == 0xE1 and segment[:6] == b'Exif\x00\x00':
                return segment[6:]
            i += 2 + seg_len
        return None

    # PNG — the optional eXIf chunk
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        i = 8
        while i + 8 <= len(data):
            length = struct.unpack('>I', data[i:i + 4])[0]
            chunk = data[i + 4:i + 8]
            if chunk == b'eXIf':
                return data[i + 8:i + 8 + length]
            if chunk == b'IEND':
                break
            i += 12 + length
        return None

    # WebP — the EXIF chunk inside the RIFF container
    if data[:4] == b'RIFF' and data[8:12] == b'WEBP':
        i = 12
        while i + 8 <= len(data):
            chunk = data[i:i + 4]
            length = struct.unpack('<I', data[i + 4:i + 8])[0]
            if chunk == b'EXIF':
                return data[i + 8:i + 8 + length]
            i += 8 + length + (length & 1)  # chunks are padded to even length
        return None

    # Bare TIFF
    if data[:2] in (b'II', b'MM'):
        return data

    return None


def _read_ifd(tiff: bytes, order: str, offset: int):
    """Yield (tag, type, count, value_bytes) for one IFD."""
    if offset <= 0 or offset + 2 > len(tiff):
        return
    count = struct.unpack(order + 'H', tiff[offset:offset + 2])[0]
    for n in range(count):
        entry = offset + 2 + n * 12
        if entry + 12 > len(tiff):
            return
        tag, typ, cnt = struct.unpack(order + 'HHI', tiff[entry:entry + 8])
        yield tag, typ, cnt, tiff[entry + 8:entry + 12]


def _rational_triple(tiff: bytes, order: str, offset: int):
    """Read three RATIONALs (degrees, minutes, seconds) into decimal degrees."""
    parts = []
    for n in range(3):
        pos = offset + n * 8
        if pos + 8 > len(tiff):
            return None
        num, den = struct.unpack(order + 'II', tiff[pos:pos + 8])
        parts.append(num / den if den else 0.0)
    return parts[0] + parts[1] / 60 + parts[2] / 3600


def gps_coordinates(data: bytes):
    """Return {'lat': float, 'lon': float} if coordinates are present, else None."""
    tiff = extract_exif(data)
    if not tiff or len(tiff) < 8:
        return None

    if tiff[:2] == b'II':
        order = '<'
    elif tiff[:2] == b'MM':
        order = '>'
    else:
        return None

    try:
        ifd0 = struct.unpack(order + 'I', tiff[4:8])[0]

        gps_offset = None
        for tag, _typ, _cnt, value in _read_ifd(tiff, order, ifd0):
            if tag == GPS_IFD_POINTER:
                gps_offset = struct.unpack(order + 'I', value)[0]
                break
        if gps_offset is None:
            return None

        found = {}
        for tag, typ, cnt, value in _read_ifd(tiff, order, gps_offset):
            if tag in (TAG_GPS_LATITUDE, TAG_GPS_LONGITUDE) and typ == TYPE_RATIONAL and cnt == 3:
                # 3 RATIONALs are 24 bytes, so the value field holds an offset
                decimal = _rational_triple(tiff, order, struct.unpack(order + 'I', value)[0])
                if decimal is not None:
                    found['lat' if tag == TAG_GPS_LATITUDE else 'lon'] = decimal
        return found or None
    except (struct.error, IndexError, ZeroDivisionError):
        # A malformed EXIF block is not proof of coordinates; report nothing and
        # let the commit through rather than blocking on a parser edge case.
        return None


def staged_images():
    """Paths of images added or modified in the index."""
    out = subprocess.run(
        ['git', 'diff', '--cached', '--name-only', '--diff-filter=ACM', '-z'],
        capture_output=True, check=True,
    ).stdout
    paths = [p for p in out.decode('utf-8', 'surrogateescape').split('\0') if p]
    return [p for p in paths if p.lower().endswith(IMAGE_EXT + OPAQUE_EXT)]


def read_staged(path: str) -> bytes:
    """The staged content, which may differ from what is on disk."""
    return subprocess.run(
        ['git', 'show', f':{path}'], capture_output=True, check=True
    ).stdout


def main() -> int:
    use_staged = '--staged' in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith('--')]

    if use_staged:
        targets = staged_images()
        read = read_staged
    else:
        targets = args
        read = lambda p: open(p, 'rb').read()  # noqa: E731

    if not targets:
        return 0

    offenders, opaque = [], []
    for path in targets:
        if path.lower().endswith(OPAQUE_EXT):
            opaque.append(path)
            continue
        try:
            coords = gps_coordinates(read(path))
        except (OSError, subprocess.CalledProcessError) as err:
            print(f'  ! {path} を読めませんでした: {err}', file=sys.stderr)
            continue
        if coords:
            offenders.append((path, coords))

    for path in opaque:
        print(f'  ? {path} — この形式のEXIFは検査できません。手動で確認してください。',
              file=sys.stderr)

    if not offenders:
        return 0

    print('\n✖ 位置情報（GPS座標）を含む画像がコミットされようとしています。\n',
          file=sys.stderr)
    for path, c in offenders:
        lat = c.get('lat')
        lon = c.get('lon')
        where = ', '.join(
            f'{k}={v:.6f}' for k, v in (('緯度', lat), ('経度', lon)) if v is not None
        )
        print(f'    {path}\n      {where}', file=sys.stderr)

    print('''
このリポジトリはパブリックです。撮影場所がそのまま公開されます。

対処: EXIF を除去したコピーを作ってから、そちらをコミットしてください。

    magick 元画像.jpg -auto-orient -resize '1600x1600>' -strip -quality 82 出力.jpg
      -strip … EXIF を全削除（GPS含む）

    既にステージ済みなら:  git restore --staged <path>

意図的に位置情報を公開する場合のみ:  git commit --no-verify
''', file=sys.stderr)
    return 1


if __name__ == '__main__':
    sys.exit(main())
