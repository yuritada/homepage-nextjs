---
title: "I Built My Portfolio Site with Next.js 15"
date: "2026-05-20"
tags: ["Next.js", "React", "Tech"]
summary: "I rebuilt my portfolio site with Next.js 15 + Tailwind CSS 4 + Framer Motion. Here's my thinking behind the design and the places where I got stuck."
---

# I Built My Portfolio Site with Next.js 15

I gave my existing portfolio site a full overhaul.

## Choosing the Stack

| Area | What I Picked | Why |
|------|----------|------|
| Framework | Next.js 15 | Stable App Router, SSG support |
| Styling | Tailwind CSS 4 | Fast to work with, easy to maintain |
| Animation | Framer Motion | Declarative and intuitive |
| Deployment | AWS Amplify | Automatic deploys hooked up to GitHub |

## What I Kept in Mind While Designing It

### Single-Page Layout

Since there are several sections — research, skills, background, and so on — I went with an SPA layout. Anchor links like `#about` give you smooth scrolling between them.

### Multilingual Support

I built the Japanese/English toggle on top of React Context.

```tsx
const { lang } = useLanguage() // 'jp' | 'en'
```

Each component handles the language switch with an object of its own.

### Framer Motion's whileInView

The fade-in animation that fires when a section scrolls into view is built with `whileInView`.

```tsx
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
>
```

## Where I Got Stuck

**Configuring Tailwind CSS 4**

As of Tailwind 4, `tailwind.config.js` is gone — you configure things with the `@theme` directive inside your CSS file instead. It threw me off at first, but once you get used to it, it feels intuitive.

```css
@theme {
  --color-primary: #00d8ff;
}
```

## What's Next

- Adding a blog (which is exactly what I'm doing right now)
- Improving the Lighthouse score
- Auto-generating OGP images

There's still plenty left to improve. I'll keep chipping away at it.
