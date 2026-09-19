'use client'

import { useEffect, useRef, useState } from 'react'

const WIDGETS_SRC = 'https://platform.twitter.com/widgets.js'

type Widgets = {
  createTweet: (
    id: string,
    target: HTMLElement,
    options?: Record<string, unknown>,
  ) => Promise<HTMLElement | undefined>
}

declare global {
  interface Window {
    twttr?: { widgets?: Widgets }
  }
}

/**
 * widgets.js is fetched once per page, however many posts are embedded, and the
 * same promise is handed to every card. It resolves to null when the script is
 * blocked, which is the cue to keep showing the plain link instead.
 */
let widgetsPromise: Promise<Widgets | null> | null = null

function loadWidgets(): Promise<Widgets | null> {
  if (widgetsPromise) return widgetsPromise

  widgetsPromise = new Promise((resolve) => {
    if (window.twttr?.widgets) {
      resolve(window.twttr.widgets)
      return
    }
    const script = document.createElement('script')
    script.src = WIDGETS_SRC
    script.async = true
    script.onload = () => resolve(window.twttr?.widgets ?? null)
    script.onerror = () => resolve(null)
    document.head.appendChild(script)
  })

  return widgetsPromise
}

type Props = {
  postId: string
  url: string
  /** The link text from the article, used while the card is still loading. */
  label?: string
}

export default function XEmbed({ postId, url, label }: Props) {
  const host = useRef<HTMLDivElement>(null)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    let cancelled = false
    let observer: ResizeObserver | null = null

    loadWidgets().then(async (widgets) => {
      const target = host.current
      if (cancelled || !widgets || !target) return

      // Strict Mode runs this effect twice in development; start from an empty
      // container so the second pass replaces the first card rather than
      // stacking a second one underneath it.
      target.replaceChildren()

      const card = await widgets.createTweet(postId, target, {
        theme: 'light',
        dnt: true,
        conversation: 'none',
        align: 'center',
      })

      if (cancelled) {
        card?.remove()
        return
      }
      if (!card) return

      // widgets.js hands back the card frame before its contents arrive, and a
      // deleted or protected post leaves that frame stuck at zero height. Only
      // drop the plain link once the card has actually taken up space, so a post
      // that never loads still leaves something to click.
      observer = new ResizeObserver(() => {
        if (card.getBoundingClientRect().height > 0) {
          setRendered(true)
          observer?.disconnect()
        }
      })
      observer.observe(card)
    })

    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [postId])

  return (
    <div className="my-6">
      <div ref={host} />
      {!rendered && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm"
        >
          {label?.trim() || url}
          <i className="fas fa-external-link-alt text-[0.75em] opacity-60" aria-hidden="true"></i>
        </a>
      )}
    </div>
  )
}
