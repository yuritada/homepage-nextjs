type Props = {
  videoId: string
  title?: string
}

export default function YouTubeEmbed({ videoId, title }: Props) {
  return (
    <div className="my-5 rounded-xl overflow-hidden border border-black/10 bg-black/5">
      <div className="relative w-full aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title ?? 'YouTube video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    </div>
  )
}

/** Extract a YouTube video ID from a URL, or null if it is not a YouTube link. */
export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, '')
    if (host === 'youtu.be') {
      const id = u.pathname.slice(1).split('/')[0]
      return /^[\w-]{11}$/.test(id) ? id : null
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
      if (u.pathname === '/watch') {
        const id = u.searchParams.get('v') ?? ''
        return /^[\w-]{11}$/.test(id) ? id : null
      }
      const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{11})/)
      return m ? m[1] : null
    }
    return null
  } catch {
    return null
  }
}
