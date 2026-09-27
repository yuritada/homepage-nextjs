---
title: "Findy Tech Festival: Eleven Student Lightning Talks and a Framework for Deciding What to Give Up"
date: "2026-09-26"
tags: ["Findy", "Lightning Talks", "Event Report", "Community", "Decision Making"]
summary: "I attended the Tech Festival hosted by Findy Student. Here are the eleven student lightning talks — real stories about development process and technology choices — and the framework for trade-off decisions I worked through in Yuto Tanaka's workshop from dip."
---

# Findy Tech Festival: Eleven Student Lightning Talks and a Framework for Deciding What to Give Up

On September 26, 2026, I went to the Findy festival.

![freee's blue logo on the glass wall of their office, with Halloween spiders and a ghost decoration stuck to the glass](/photos/2026-09-26-findy-tech-bunkasai/findy_freee_logo.jpg)

*▲ The venue was freee's office, decorated for Halloween*

I'd been at a Google event ([Gemini Day](/blog/2026-09-25-gemini-day)) only the day before, but this one had the air of the developer scene I usually move in. The student lightning talks gave real accounts of development process and technology choices, and Yuto Tanaka's workshop from dip organised my thinking on trade-offs and decision criteria. It was a good chance to think harder, so here's the record.

![Holding a name tag reading "Student LT 2026 Tech Festival", with the office floor being set up behind it](/photos/2026-09-26-findy-tech-bunkasai/findy_nametag.jpg)

*▲ The name tag from reception. Under "favourite tech": AI, LLMs, and everything else*

## Student Lightning Talks: "The Technology or Product I've Poured the Most Time and Passion Into"

Eleven students spoke. Each was candid about the technical walls they hit and the realities of running what they'd built, and there was a lot of interesting, practice-grounded knowledge in the room.

![A stage with "Student LT Championship" projected on the screen, attendees sitting on cushions waiting for the start](/photos/2026-09-26-findy-tech-bunkasai/findy_venue_view1.jpg)

*▲ The talk venue. You sit on cushions in front of the stage*

### A programmer's survival strategy, learned from machine learning / Tebasaki

With the anxiety that AI's progress will shrink engineering work and weed people out as the backdrop, the talk drew an analogy to machine learning: "programs can do gradient descent too," "keep passion and keep adapting to change even in the AI era." What stayed with me was the framing — not pessimism about technological change, but the question of how you optimise yourself.

### Building a library in Swift to take another run at AtCoder green / keeki

Taking on AtCoder not with the standard Python but deliberately in Swift, building their own library. They hold onto a simple motive — "building what you yourself want is what matters most" — and it was a reminder of how much fun development is when you're not over-constrained by efficiency or the standard path.

### I WILL make it go viral!!! / Riochin

For solo development, shipping is the starting line, not the finish — this was about the approach that keeps a project from ending at "built it." Create initial momentum with a pre-release and by asking people to share it, set up continuous version updates and automate operations with GitHub Actions, and grow it into a product used by 500 people a month. Unglamorous but solid growth knowledge.

### On hardware development / Nonotchi

Hardware development built up from basic logic circuits. The example: a homemade SOS beacon that pushes a notification to nearby people's phones when a personal alarm goes off. Going beyond web and apps to land a real-world problem using physical devices and radio was a compelling setup.

### For solo development, bet everything on Cloudflare / asahi

A practical talk grounded in Cloudflare's generous free tier and its resilience to cold starts and sleeping. Including the AI-agent-related feature set, it laid out the case for choosing it as your foundation in modern solo development. One genuinely useful detail from experience: when you're stuck, telling the AI up front that "I want to use Cloudflare" makes it much easier to move the design forward.

### Build it and break it! Exploring AI agent construction! / Fuku-kaichō

An architecture-minded talk about something bigger than finishing a single AI agent: building the execution platform the agent runs on. Because an agent's behaviour and logic stay fluid, you need a foundation designed around a build-and-break cycle — a convincing line of reasoning.

### Building a service from zero / tsuyuni

On the depth of infrastructure work and the difficulty of technology choices. They spoke frankly about the heavy load they took on when they introduced Amplify, which they had no experience with, as tech lead.

> Rather than casually betting on a still-maturing platform, it matters to compare and weigh mature technology properly.

Exactly so — a talk that makes you think about how much weight the responsibility for those choices carries in team development.

### I built an app in React! …So now what? / markun4649

The journey from "draw screens in React and call an API" toward understanding Next.js as a full-stack framework. The differences in behaviour between rendering strategies were laid out clearly.

| **Approach** | **Summary** |
| --- | --- |
| **CSR** | The browser updates the UI dynamically |
| **SSR** | The server assembles the HTML on every request |
| **SSG** | The HTML is generated ahead of time at build |

From the realisation that "it looks the same, but how the information reaches you is completely different" came a very clear conclusion: choose not *how* you build but *why* you build it this way, fitted to the use case. What's "next" is choosing how to build.

### DBMSs are kind of gross, right? / Hayato

A wonderfully niche examination of how to write SQL, how the internal engines behave, the difference between DML and DDL, and SQLite's particular quirks. Despite the word "gross," what came across was someone enjoying the differences in characteristics and behaviour between databases and digging in deep.

### The biggest development of my life, still in progress / Ahiru

Work within "appLii," an IT making project inside Wakayama University's Faculty of Systems Engineering. They go through review to secure a budget, with bonuses available depending on the results of development, and take product development seriously within that structure. An impressive environment — university resources put to work while the development loop runs in earnest.

### Building a parking management system within real constraints / UCN / yushin

From a group doing campus DX: a system for managing parking congestion. They stepped back from the technical question of "how do we detect this?" and re-examined what is and isn't possible within the constraints on the ground. In the end they made the operation work partly with manual counting, and got feedback from actual users. A talk that conveys how much it matters to look constraints in the face.

![The whole floor before opening, long and round tables laid out, organisers in blue staff T-shirts setting up](/photos/2026-09-26-findy-tech-bunkasai/findy_venue_view2.jpg)

*▲ The networking space. Attendees talked here between the talks*

## The dip Workshop: The Criteria Behind Trade-off Decisions

The second half was a workshop by Yuto Tanaka of dip, who has worked across fifteen different job functions. The theme: organising the criteria you need to make decisions.

### Unglamorous hypothesis testing and the power to give things up

What work asks of you isn't covering every possible angle — it's **being able to decide a trade-off**. Rather than hunting for a single reversal-of-fortune solution, the essence is repeating unglamorous hypothesis tests in an agile loop.

> The single biggest reason people can't make trade-offs is that they have no criteria for setting priorities.
>
> A trade-off is the power to decide what you give up.

Two classic failure modes were offered:

- **Drifting**: with no criteria, grabbing at qualifications and study material at random
- **Planning-ism**: spending all your time building a perfect plan and never starting

To keep forming small hypotheses and correcting course, the workshop had us organise three elements: "Why so?", "the state I want to be in," and "So what."

### The criteria I worked out in the workshop

Following that framework, I took stock of my own decision criteria.

- **Why so (the source of the drive)**:
  The pursuit of "why? how come?" I find the most interest in the moment I understand new information, and the moment I put it into practice. I like the act of *understanding* the structure of someone or something for its own sake.
- **The state I want to be in (ideal, standard)**:
  Structural beauty. A state where everything can be explained logically, as "because of this." Building ideas that hold together.
- **So what (action, output)**:
  Drawing various tricks and ideas out of my own experience, and giving them form with the reasoning intact.

Being able to put this into words again, as a standard for deciding what to keep and what to discard in development and in daily decisions, was worthwhile.

## Closing Thoughts: "Yeah, this. This is my scene."

What I felt at the end of the event was simple: yeah, this is my scene.

The [Gemini Day](/blog/2026-09-25-gemini-day) I'd attended the day before had plenty of non-engineers and beginners, a community that hacks problems with "one feature, one breakthrough" ideas and volume rather than technical depth. That was interesting in its own right, and gave me a perspective I don't usually get.

But precisely because I'd come straight from an event in a different domain, the familiarity of coming back to the usual developer scene at the Findy festival the next day stood out sharply.

Everyone knows roughly what technical areas everyone else works in, and the unglamorous trial-and-error of implementation and infrastructure just lands without explanation. People share what they're building and where they've spoken as a matter of course, and from that, information and connections spread — "help me with the next project," "there's an event coming up." This time I came because of exactly that kind of connection through someone I know.

Of course, sticking to one community narrows your view, so I want to keep showing up at places with a different flavour, as I did the day before. But having a place where you can talk deep technology with people who share the same intensity and way of thinking is comfortable, and a good stimulus for keeping the work going.

Now to feed what I took away — and the criteria I wrote down — back into my everyday development and projects.

![Group photo from the day, attendees and organisers posing with their arms spread wide](/photos/2026-09-26-findy-tech-bunkasai/findy_group_photo.jpg)

*▲ The group photo from the day*
