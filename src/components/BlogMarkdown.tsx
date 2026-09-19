import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import YouTubeEmbed, { getYouTubeId } from './YouTubeEmbed'
import XEmbed from './XEmbed'
import { getXPostId } from '@/lib/x-post'

type HastNode = {
  type?: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
  value?: string
}

/** A link in the article that is rendered as a player or a card of its own. */
type Embed =
  | { kind: 'youtube'; id: string; label: string }
  | { kind: 'x'; id: string; url: string; label: string }

/**
 * Collect the embeddable links in a hast subtree, in the order they appear.
 *
 * The link itself stays in the prose; the embed is rendered after the paragraph
 * or list item that contains it, so the text still reads on its own if the
 * embed never loads.
 */
function collectEmbeds(node: HastNode | undefined): Embed[] {
  if (!node) return []
  const found: Embed[] = []

  const textOf = (n: HastNode): string =>
    n.type === 'text' ? (n.value ?? '') : (n.children ?? []).map(textOf).join('')

  const walk = (n: HastNode) => {
    const href = n.tagName === 'a' ? n.properties?.href : undefined
    if (typeof href === 'string') {
      const label = textOf(n)
      const youTubeId = getYouTubeId(href)
      const xPostId = youTubeId ? null : getXPostId(href)

      if (youTubeId) {
        if (!found.some((f) => f.kind === 'youtube' && f.id === youTubeId)) {
          found.push({ kind: 'youtube', id: youTubeId, label })
        }
      } else if (xPostId) {
        if (!found.some((f) => f.kind === 'x' && f.id === xPostId)) {
          found.push({ kind: 'x', id: xPostId, url: href, label })
        }
      }
    }
    ;(n.children ?? []).forEach(walk)
  }

  walk(node)
  return found
}

function Embeds({ embeds }: { embeds: Embed[] }) {
  return (
    <>
      {embeds.map((embed) =>
        embed.kind === 'youtube' ? (
          <YouTubeEmbed key={`yt-${embed.id}`} videoId={embed.id} title={embed.label} />
        ) : (
          <XEmbed key={`x-${embed.id}`} postId={embed.id} url={embed.url} label={embed.label} />
        ),
      )}
    </>
  )
}

const components: Components = {
  p({ node, children }) {
    const embeds = collectEmbeds(node as HastNode)
    if (embeds.length === 0) return <p>{children}</p>
    return (
      <>
        <p>{children}</p>
        <Embeds embeds={embeds} />
      </>
    )
  },
  li({ node, children }) {
    const embeds = collectEmbeds(node as HastNode)
    if (embeds.length === 0) return <li>{children}</li>
    return (
      <li>
        {children}
        <Embeds embeds={embeds} />
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
