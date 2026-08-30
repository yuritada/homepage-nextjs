import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import YouTubeEmbed, { getYouTubeId } from './YouTubeEmbed'

type HastNode = {
  type?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
  value?: string
}

/** Collect YouTube video IDs (with their link text) from a hast subtree. */
function collectYouTubeLinks(node: HastNode | undefined): { id: string; label: string }[] {
  if (!node) return []
  const found: { id: string; label: string }[] = []

  const textOf = (n: HastNode): string =>
    n.type === 'text' ? (n.value ?? '') : (n.children ?? []).map(textOf).join('')

  const walk = (n: HastNode) => {
    if (n.tagName === 'a') {
      const href = n.properties?.href
      const id = typeof href === 'string' ? getYouTubeId(href) : null
      if (id && !found.some((f) => f.id === id)) {
        found.push({ id, label: textOf(n) })
      }
    }
    ;(n.children ?? []).forEach(walk)
  }

  walk(node)
  return found
}

const components: Components = {
  p({ node, children }) {
    const videos = collectYouTubeLinks(node as HastNode)
    if (videos.length === 0) return <p>{children}</p>
    return (
      <>
        <p>{children}</p>
        {videos.map((v) => (
          <YouTubeEmbed key={v.id} videoId={v.id} title={v.label} />
        ))}
      </>
    )
  },
  li({ node, children }) {
    const videos = collectYouTubeLinks(node as HastNode)
    if (videos.length === 0) return <li>{children}</li>
    return (
      <li>
        {children}
        {videos.map((v) => (
          <YouTubeEmbed key={v.id} videoId={v.id} title={v.label} />
        ))}
      </li>
    )
  },
  table({ children }) {
    // Wide tables scroll inside their own box instead of stretching the page
    return (
      <div className="prose-table-scroll">
        <table>{children}</table>
      </div>
    )
  },
  a({ href, children }) {
    const external = typeof href === 'string' && /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  },
}

export default function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
