---
title: "I Paid $110/Month for Claude Max, Built an Autonomous AI Organization, and Despaired When I Became \"Just an Approval Machine\""
date: "2026-08-26"
tags: ["AI", "Claude", "Developer Experience", "Lightning Talk", "Event Report"]
summary: "I gave a lightning talk at MeetStageTokyo#1. Over summer break I paid for Claude Max 5x, built an autonomous AI agent organization called \"claude-factory\", and watched my development experience turn into a void. Here's what came out of it: \"Loop Engineering\", and the balance between divergence and convergence."
slides: "/slides/summer-ai-lt.pdf"
slidesTitle: "Summer Break AI Lightning Talk"
---

# I Paid $110/Month for Claude Max, Built an Autonomous AI Organization, and Despaired When I Became "Just an Approval Machine"

— Loop Engineering and the Human "Internal Pressure" —

Hello!

On Wednesday, August 26, 2026, I went to **[MeetStageTokyo#1](https://localstage.connpass.com/event/399338/)**, held at the Port Inc. office, and gave a lightning talk!

This was the very first LT meetup for "LOCAL STAGE" — congratulations on the launch! 🎉

The venue, Port Inc.'s office (5F, Shinjuku Front Tower), was beautiful and spacious, and an extremely comfortable place to spend an evening.

![The venue with the MeetStageTokyo#1 opening slide projected on screen](/photos/2026-08-31-loop-engineering/meetStageTokyo_1.jpg)

*▲ The venue and the opening of the event*

![The name tag for the day, handwritten with "Tada Yuri, class of 2028"](/photos/2026-08-31-loop-engineering/meetStageTokyo_2.jpg)

*▲ My name tag for the day*

The technical skill and sheer energy of the students there were unbelievable. As a fellow member of the class of 2028 (the Japanese job-hunting cohort graduating in 2028), all I could think was "the level here is terrifyingly high……!" — and it lit a fire under me.

In that high-level room, I got up and talked at full speed about **"paying for AI over summer break, and my trial-and-error with developer experience."** This post is a write-up of that talk.

## How it started: the day "just do it!!" shoved me out the door

Truth be told, I hadn't prepared for this talk at all — I **decided to sign up on the spot, the day of the event**.

What shoved me out the door was a YouTube video by game creator Masahiro Sakurai (the designer behind Kirby and Super Smash Bros.).

- Reference video: [How to Make a Game (Planning & Game Design)](https://youtu.be/JV3KOJ_Z4Vs)

Through the screen, I felt like I was being told "just do it!!" and "get ready and get out there right now!!" at full blast — and before I knew it I had slipped into an LT slot for that same day and written my slides in 30 minutes.

![Presenting a lightning talk with the slide "About my summer break with AI" on screen](/photos/2026-08-31-loop-engineering/meetStageTokyo_3.jpg)

*▲ Presenting on the day, riding that same momentum*

Carried by that momentum, what I talked about was a record of the grand failures and discoveries of my summer with AI.

## I paid for Claude Max 5x at $110 a month (about ¥17,000)

Over summer break this year, I splurged and signed up for the **Claude Max 5x plan**.

| Item | Cost |
|------|------|
| Monthly | $110 (about ¥17,000) |
| Per day | About ¥600 / day |

**"I'm going to squeeze ¥600 of value out of Claude every single day!!"**

There was a time when I truly believed that.

### "The reality of summer break" gets in the way

Reality was not so kind.

Trips home, internships, and everything else piled up, and the time I had to sit down at my PC and actually build things got carved away, chunk by chunk.

"At this rate I'm throwing ¥600 a day straight down the drain……!"

Panicking, I came up with a **spectacularly dumb solution**.

## The failure: `claude-factory`, an organization built to feed on tokens

"If I don't have time to prompt it myself, **why not have Claude run autonomously and burn the tokens for me?**"

At this point the goal had been completely replaced by "using it up for its own sake," and I built **[`claude-factory`](https://github.com/yuritada/claude-factory)**, a system that runs autonomously through sequential execution.

You throw in a rough concept, and multiple AI agents debate it among themselves and autonomously carry it from design through implementation and production.

"Now tokens will be burning away even while I sleep, and products will appear!" I thought excitedly, and fired it up. And then……

### The crushing emptiness that hit within two hours

Almost as soon as it was running, something felt deeply wrong.

**"……Honestly? This isn't fun at all."**

Looking at the code and the artifacts it produced, I felt zero sense of accomplishment.

Worse than that, all I was actually doing was clicking approve on debates the AI had run on its own.

> "What am I even doing here? Am I not just an approval machine……?"

The AI thinks on its own, builds on its own, and I exist only to say "OK." Forget the joy of building — as an experience, it was about as bad as it gets.

In the end, I **shelved `claude-factory` after a mere two hours**.

## Why did it feel so empty? The dynamics of "divergence" and "convergence"

Why was a fully automated agent organization so profoundly boring?

I tried to put the cause into words using two processes: **divergence** and **convergence**.

```
[Diverge]
Adding elements to an idea and widening where a concept can stand.
The phase of exploring and deciding "what to build, and with what value."

[Converge]
The process of giving shape to the idea you widened.
The phase of actual implementation: coding, debugging, deploying.
```

The failure of **`claude-factory`** was that I **handed both the divergence and the convergence over to the AI**.

When a human is stripped of the decision "what to build" (divergence) and also locked out of the hands-on work of "implementation" (convergence), there is nothing left that feels like "I am building this."

## The solution: the "ultimate balance" of Loop Engineering

What I arrived at instead is a development style I call **Loop Engineering**.

- **Diverge (planning and choosing)**: Don't let the AI widen things on its own. **The human holds the initiative and makes the decisions.**
- **Converge (implementation and grunt work)**: The tedious coding and boilerplate — **let the AI run it in a loop and knock it out all at once.**

| Approach | Diverge (planning) | Converge (implementation) | Developer experience |
|------------|--------------|--------------|----------|
| **`claude-factory`** | Dumped on the AI | Dumped on the AI | ❌ Terrible (approval machine) |
| Loop Engineering | **Human chooses and leads** | **AI implements at speed** | ⭕ **Excellent (one build a day)** |

Once I found this balance, the pure joy of building — **"turning what I actually want to make into a real thing, overwhelmingly fast"** — came back.

These days I'm happily running personal projects at a pace of "one build a day."

## What's still unsolved: leftover tokens and human "internal pressure"

Loop Engineering dramatically improved my development experience, but I've run into a new wall.

### I can't even use up my tokens in the first place

Even doing one build a day:

- **5-hour limit**: under 70%
- **Weekly limit**: under 30%

So much for the "burn ¥600 every day" plan — I have quota to spare. In personal development, AI's processing capacity has already blown far past the speed at which a human can come up with ideas and plans.

### I can't produce "high-internal-pressure" concepts

And the thing I feel most acutely is **the strength of the human side's planning ability and motivation**.

The concept of **"internal pressure"** that Masahiro Sakurai discusses in another of his videos hits me right where I am now.

- Reference video: [Put a Lot In, Put a Lot Out! (Attitude Toward Work)](https://youtu.be/X6FcraeKrSM)

No matter how powerful an engine (output device) AI is, if the human isn't filled with **a strong input and drive — "I want to build this!" "I absolutely have to solve this problem!" — that internal pressure**, all you get is thin, flimsy concepts.

## Wrapping up

Here are the four things I learned from all this trial and error.

1. **Hand off both divergence and convergence, and the human becomes just an "approval machine" — the development experience dies**
2. **"Divergence is the human's job, convergence is the AI's job" — Loop Engineering is, right now, the ultimate balance**
3. **The bottleneck on using up your AI quota isn't AI performance; it's human speed**
4. **However far the tools evolve, what you ultimately need is the human internal pressure of "what do I want to build, and why?"**

In the age of AI, the most precious things turned out to be the real, tangible feeling of "hey, I'm actually building something right now!" and the heat of an idea welling up from inside you.

Once again — huge thanks to the LOCAL STAGE organizers for such a wonderful opportunity, to Port Inc. for providing the venue, and to everyone who attended and inspired me!

If you're in the same boat — "I have Claude tokens I can't use up," or "I've felt that emptiness doing personal development with AI" — let's swap interesting ideas and development techniques!

## Related links

- **The event**: [MeetStageTokyo#1 (connpass)](https://localstage.connpass.com/event/399338/)
- **The repository I built**: [GitHub - yuritada/claude-factory](https://github.com/yuritada/claude-factory)
