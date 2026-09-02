#!/bin/bash
# Render the first page of every document PDF into a card thumbnail.
#
# The home page shows documents as pages rather than as prose, so each entry in
# content/documents/*.md needs an image at public/photos/docs/<slug>.jpg — the
# path `getAllDocs()` looks for. Run this after adding a document:
#
#   ./scripts/gen-doc-thumbs.sh
#
# macOS only: it renders through Quick Look (qlmanage), so no extra tooling is
# required. Existing thumbnails are overwritten.
set -euo pipefail

cd "$(dirname "$0")/.."
OUT_DIR="public/photos/docs"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

mkdir -p "$OUT_DIR"

for md in content/documents/*.md; do
  slug="$(basename "$md" .md)"
  # `file: "/slides/foo.pdf"` in the front matter, resolved under public/
  pdf="public$(sed -n 's/^file: *"\(.*\)"/\1/p' "$md" | head -1)"

  if [ ! -f "$pdf" ]; then
    echo "skip $slug — no PDF at ${pdf#public}" >&2
    continue
  fi

  qlmanage -t -s 1400 -o "$TMP_DIR" "$pdf" >/dev/null 2>&1
  rendered="$TMP_DIR/$(basename "$pdf").png"

  if [ ! -f "$rendered" ]; then
    echo "skip $slug — Quick Look produced no thumbnail" >&2
    continue
  fi

  # JPEG at card width: the page is only ever shown small, and a PNG of the same
  # render is several times the size.
  sips -Z 900 -s format jpeg -s formatOptions 82 "$rendered" --out "$OUT_DIR/$slug.jpg" >/dev/null
  rm -f "$rendered"
  echo "$OUT_DIR/$slug.jpg"
done
