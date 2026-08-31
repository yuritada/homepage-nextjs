---
title: "A Student Engineer Found a New-Business Pitch Competition Underwhelming — Then an AI Beat 3 Blind Spots Into Me"
date: "2026-07-08"
tags: ["New Business", "Hackathon", "AI", "Thought Log"]
summary: "After watching a behind-the-scenes documentary about DeNA's new-business internship, I caught myself thinking the pitches weren't all that impressive. So I asked an AI to tear my take apart with everything it had — and got confronted with the reality of building a business that my hackathon brain had never been able to see."
---

# Why a Student Engineer Found a New-Business Pitch Competition Underwhelming — and the 3 Blind Spots That Flattened Me Afterward

Hi! I'm a data science student who spends a lot of time at hackathons and genuinely loves building products through code and technology.

The other day I watched a behind-the-scenes documentary following DeNA's new-business planning internship.

- Reference video: [Behind the scenes at DeNA's new-business planning track](https://youtu.be/vV1B9dbsVck)

The participants were an intimidating lineup — University of Tokyo students, student founders, the works. And yet, when I finished watching the pitches they'd spent days polishing, my honest first reaction was this:

> "...Hold on. Is it just me, or is this not that interesting? The ideas don't feel especially strong."
>
> "I don't think a single one of them made me go 'whoa, that's amazing.'"

I've won a hackathon before, and I've spent my time building things that actually run and combining technologies in sharp, unusual ways. From that vantage point, every product on screen looked like "a fairly ordinary app with AI bolted on."

"Is my perspective just too narrow? Or is this simply what business planning looks like?"

I couldn't let it go, so I threw my analysis at an AI and asked it to spar with me: **"Tell me exactly where my thinking is naive. Bare your teeth and argue against me with everything you've got."**

The result: I got confronted with **the deep reality of building a business — the part my hackathon brain (the technology-and-direct-pain brain) had been completely blind to.** Here's the log of that thinking, and what I found.

## The Discomfort I Felt, and My Read on the "Essence" of Each Pitch

First, here's how I myself had been framing "the essence of the problem" for the pitches in the video.

### Team B: Beautin (a makeup-removal and skincare tracking app)

*My take*: The real pain in taking off makeup is "I want the makeup gone without having to do anything (because it's a hassle)." In other words, you want a robot-arm-style automation. Having an AI praise you into building a habit looks like swapping out the actual problem for an easier one.

### Team E: Oshi Lens (a TikTok-style UI for fandom activity and image collecting)

*My take*: Analyzing your own taste in fan content isn't an urgent problem to begin with. It reads like the same species as the "thin social app someone built on a whim" you see constantly at hackathons.

### Team A (the winner): Cookpal (a conversational AI cooking assistant)

*My take*: There's no single intense pain point here, but it targets a real situation — "while you're cooking your hands are busy, but your ears, mouth and brain are free" (a latent pain) — and the voice UI fits that perfectly. That's probably why it won.

From there, I formed a hypothesis.

> "Both hackathons and business competitions are aiming at the same thing: solving a fundamental pain point. So a strong idea that nails the essence and wins a hackathon should be just as strong at a business competition. Isn't the only difference how you pitch it and what tools you use?"

The AI's rebuttal to that hypothesis shattered my engineer's bias.

## The "3 Blind Spots" the AI's Rebuttal Exposed

### Blind Spot 1: "Just remove the makeup with a robot arm" solves the pain and kills the business

When I said "the essence of makeup removal is having it done for you automatically," the AI's response was that this was "a correct extraction of the pain point, but the worst possible move as a business."

- **The walls of physics, cost and regulation**: Building a fully automatic makeup-removal machine means enormous hardware development costs, safety guarantees, clearing Japan's Pharmaceuticals and Medical Devices Act (the law governing cosmetics and medical products), and a price point in the hundreds of thousands of yen. Forget a three-day internship — the ROI simply doesn't work as a new business for a web/AI company.
- **Grubby, hands-on psychological hacking**: Team B's "have the AI praise you" looks, technically speaking, like dodging the real pain. But it's also **an extremely realistic compromise, betting on behavioral economics: you can ship it as an app tomorrow, and humans move when their need for validation is fed.**

Instead of beating the fundamental pain point into submission with technology, the question is: "given the resources we already have (smartphones, AI), how do we route around the problem by hacking human psychology?" I had been completely, blithely ignoring that business constraint.

### Blind Spot 2: The unhinged data strategy (the moat) behind the "thin social app"

I'd dismissed Team E's fandom app as "just a shallow entertainment social app," and I got a brutal counterpunch for that too.

- **People pay serious money not only for "problems" (minus to zero) but for "desire" (zero to plus)**: For a fan, not being able to find the single best shot of the person they love is a genuine source of discomfort — a real pain point — and there's enough passion there to dig for hours.
- **The data flywheel (barrier to entry)**: The essence of this pitch isn't the UI. It's the structure: **swiping makes ludicrously deep, impossible-to-articulate preference data pile up at absurd speed.** Once that data accumulates, it becomes a hard moat — "the highest-hit-rate fandom commerce platform in the world," something not even Instagram or Pinterest could copy.

I'd been judging by "the features visible on screen" and had entirely missed the **data accumulation and platform structure spinning away underneath.**

### Blind Spot 3: The decisive lie that "an idea that wins a hackathon will win a business competition"

The thing that hit me hardest was the fundamental contradiction between how hackathons and business planning are judged.

> "A hackathon is a sparkler. A business is infrastructure."

- **Hackathon**: You win on peak-gust surprise — the "aha moment" of "you combined *those* APIs like *that*?!" or "this demo is unbelievably fun!"
- **Business planning**: The questions are "will users still be using this in three months?" and "**if a well-capitalized incumbent plugs in the same API tomorrow and ships the exact same UI, how do you survive? (defensibility)**"

Even Team A's cooking assistant — the winner, which I'd praised for "nailing the experience" — carries a fatal risk when you look at it as a business: "the moment Cookpad or Kurashiru calls the ChatGPT API tomorrow and builds the same screen, it's dead."

I was forced to face the reality that the "sharp, single-point-breakthrough idea plus implementation" that wins hackathons is, in business terms, **nothing more than one feature — it hasn't even become a business (a business model) yet.**

## Wrapping Up: Multiplying Technical "Breakthrough Power" by Business "Resolution"

Through this sparring session, I finally put the difference between hackathons and new-business planning into words that make sense to me.

| Axis of comparison | Hackathon (technology approach) | New-business planning (business approach) |
|--------|------------------------------|--------------------------------|
| **Main focus** | **Elegant solutions and surprise** through cutting-edge technology | A sustainable **system (business model) and retention** |
| **What gets rewarded** | Short-term aha moments, polish of the prototype | Defensibility, accumulated data, understanding of human psychology |
| **The usual trap** | "Technically impressive, but nobody keeps using it" | "So safe and tidy that nobody gets excited" |

The reason those brilliant people's pitches looked "ordinary" at first glance wasn't that their level was low. It was **the result of squeezing through layer after layer of heavy constraints: sustainability, the irrational psychology of human beings, and defensibility.**

## My Next Actions From Here

Up to now, I've been training the hackathon muscle: "how do I smartly beat this problem into submission with technology?" I'm still convinced that breakthrough power and implementation speed are a huge weapon.

But going forward, I want to add two things:

1. **The cold-bloodedness to understand the fundamental problem and then deliberately scale it down into a realistic solution I can ship today (smartphones, psychological hacks)**
2. **Structural design beyond "it runs and it's fun" — namely, "how do I accumulate data and stop the incumbents from following me?"**

I want to multiply my work by those two dimensions of "business resolution."

Not just amazing people with technology, and not just reciting a tidy business model. I'm aiming to become an engineer who can build "products that genuinely stick around in the world and keep getting used" — and with that, I'm heading into the next build and the next pitch!
