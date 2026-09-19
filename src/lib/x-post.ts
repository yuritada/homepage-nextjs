/**
 * Extract a post ID from an X (formerly Twitter) status URL, or null if the link
 * points somewhere else — a profile, a search, another site.
 *
 * This lives outside `XEmbed` because the embed itself is a client component,
 * and the markdown renderer needs to scan links while rendering on the server.
 */
export function getXPostId(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^(www|mobile)\./, '')
    if (host !== 'x.com' && host !== 'twitter.com') return null

    const m = u.pathname.match(/^\/[A-Za-z0-9_]{1,15}\/status(?:es)?\/(\d{1,25})/)
    return m ? m[1] : null
  } catch {
    return null
  }
}
