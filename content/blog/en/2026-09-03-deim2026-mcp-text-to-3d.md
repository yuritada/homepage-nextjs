---
title: "Teaching AI an Architect's Common Sense — Autonomous Quality Assurance for Text-to-3D via MCP"
date: "2026-09-03"
tags: ["Generative AI", "LLM", "MCP", "Blender", "3D Generation", "Research"]
summary: "Doors that float, windows buried inside walls — the structural mistakes generative AI makes in 3D go unnoticed by visual evaluation. I built a system that catches and fixes them numerically instead. Here is the research I presented at DEIM2026."
docs:
  - href: "/slides/deim2026-paper.pdf"
    title: "Paper: Autonomous Quality Assurance for Indoor Scene Generation under Architectural Constraints via Two-Layer Knowledge Inheritance with the Model Context Protocol (DEIM2026, in Japanese)"
  - href: "/slides/deim2026-poster.pdf"
    title: "Presentation poster (DEIM2026 interactive session, in Japanese)"
---

## The Article in Three Lines

- AI that turns text into 3D models frequently makes structural mistakes — **doors hovering in mid-air, windows punching straight through walls** — even when the result looks perfectly natural.
- So instead of *showing* the AI a picture, I built a pipeline that lets it **read the numbers of the 3D space directly (coordinates and dimensions) through MCP (the Model Context Protocol) and do arithmetic on them**. Japan's Building Standards Act is encoded as rules, and the AI inspects and repairs its own work.
- The result: the AI finds and fixes its own violations, and **the more experience it accumulates, the fewer moves it needs** (run 1: 9 turns / 220k tokens → run 9: 2 turns / 91k tokens).

The paper and the presentation poster are both embedded at the end of this article under "Documents" (📄 [Paper PDF](/slides/deim2026-paper.pdf) / 🖼️ [Poster PDF](/slides/deim2026-poster.pdf)).

---

## The Presentation, and the Response From Outside

I presented this work as a poster in the interactive session of **DEIM2026 (the 18th Forum on Data Engineering and Information Management / the 24th Annual Meeting of the Database Society of Japan)**. DEIM is one of the largest data engineering forums in Japan, gathering roughly 500 presentations this year.

In **LayerX's DEIM2026 conference report** — LayerX being a platinum sponsor — an engineer from the company picked out the posters they found most interesting, and this research was **one of the four** they chose.

> What's interesting is that instead of handing the LLM a 2D image of a 3D building, they hand it a numerically verifiable 3D JSON object — and that the knowledge database is updated dynamically from the interaction with the user.
>
> — [DEIM2026 Conference Report | LayerX Engineering Blog (Japanese)](https://tech.layerx.co.jp/entry/deim2026_report#Model-Context-Protocol%E3%82%92%E7%94%A8%E3%81%84%E3%81%9F%E4%BA%8C%E5%B1%A4%E7%9F%A5%E8%AD%98%E7%B6%99%E6%89%BF%E3%81%AB%E3%82%88%E3%82%8B%E5%BB%BA%E7%AF%89%E5%88%B6%E7%B4%84%E3%82%92%E6%8C%81%E3%81%A4%E5%B1%8B%E5%86%85%E3%82%B7%E3%83%BC%E3%83%B3%E7%94%9F%E6%88%90%E3%81%AE%E8%87%AA%E5%BE%8B%E7%9A%84%E5%93%81%E8%B3%AA%E4%BF%9D%E8%A8%BC)

They also noted that "a mechanism that gets smarter the more you use it, through a feedback loop, is an important angle for AI agent development too." Getting exactly the point I was aiming at recognized outside my lab — by someone who builds AI agents as an actual business — was a real encouragement.

---

## 1. Where It Started: "Looks Right, Something's Off"

With the metaverse and digital twins spreading, demand for 3D models is climbing fast. Type "build me a two-story wooden house" and AI hands you a 3D model in tens of seconds.

But look closely at what comes out — the door floats 50cm above the ground. The window overlaps the door. One step of the staircase is absurdly tall. **At a glance it's a house; nobody could live in it.**

This is the 3D version of the "six fingers" problem in image generation, and it's called **geometric hallucination**. The nasty part is that because it looks natural, image-based evaluation (CLIP Score and friends) lets it slip right through.

Most prior work attacks this by *showing the generated image to an AI and asking it to judge*. But an image conveys color and atmosphere; **structural anomalies** like "this window is stabbed perpendicularly into the wall" are hard to read off pixels. That was my starting point.

---

## 2. The Shift: Don't Show It — Let It Measure

So I changed the approach. **Stop showing the AI pictures. Let it touch numbers.**

Inside 3D software (Blender), every object's dimensions and coordinates exist as numbers. The door is 2.0m tall and its center sits at Z = 1.0m — so its bottom edge is at 0.0m, meaning it touches the ground. If you can do that much subtraction, "it's floating" becomes a reliable verdict. Much of what a human perceives as *off* can, in fact, **be expressed in basic arithmetic**.

The plumbing between the AI and Blender is **MCP (the Model Context Protocol)**. LLMs are inherently stateless — they forget between conversations — but through MCP the AI can continuously read and write Blender's current state.

---

## 3. How the System Works

The system consists of two AIs with different jobs, and two kinds of knowledge base.

![System architecture diagram. From top to bottom: the user layer (natural language prompt), the AI core layer (a local LLM and a planner module), the MCP integration layer (an MCP router and four tools — T1 manipulation, T2 spatial, T3 inspection, T4 knowledge), and the Blender environment layer (Python API, 3D scene state, viewport). On the right sits the knowledge layer with StaticDB (regulatory knowledge) and DynamicDB (experiential knowledge). T3 inspection reads StaticDB, T4 knowledge reads and writes DynamicDB, and inspection results feed back into the local LLM, forming a loop.](/photos/deim/deim_architecture.png)

*Figure 1: The overall architecture. Four tools in the MCP integration layer (manipulation, spatial, inspection, knowledge) mediate between the user layer and the Blender environment layer. The knowledge layer on the right is this work's contribution: a two-layer split between immutable "regulatory knowledge" (StaticDB) and adaptive "experiential knowledge" (DynamicDB).*

Each tool in the diagram plays its part. T1 (manipulation) and T2 (spatial) do the *building*; T3 (inspection) does the *checking*; T4 (knowledge) does the *remembering*.

**The Generator (T1 and T2 in the diagram)** takes the user's instruction and drives Blender. It emits *operations* through the Python API rather than pixels, so dimensions are controllable down to the millimeter.

**The Inspector (T3)** pulls the numbers out of the finished scene and checks them against the rules. When something is violated, it throws back an instruction **containing concrete numbers** — "change the door height from 1.5m to 2.0m."

Splitting knowledge into two layers is this work's proposal.

| Type | Contents | Nature |
|---|---|---|
| **Regulatory knowledge** | The Building Standards Act (daylighting area ≥ 1/7 of floor area, stair riser ≤ 23cm, etc.) | Immutable. The AI is forbidden from rewriting it, which guarantees a quality floor |
| **Experiential knowledge** | Tricks picked up while repairing, e.g. "aligning a window's top edge with the door tends to pass" | Mutable. Accumulates across sessions and grows |

The law must not be quietly rewritten. But field know-how should keep piling up. **Not mixing those two** is what let compliance and learning coexist.

---

## 4. Experiment 1: Can the AI Notice Its Own Mistakes?

I started small: have it build "a wall with a door and a window," under two rules.

- The door's aspect ratio (height ÷ width) must be at least 1.8
- The window's top edge must align with the door's top edge (±5cm)

What the AI produced first was a squat door with an aspect ratio of 1.5, and a window off by a full 80cm.

| Metric | Initial generation | After autonomous repair |
|---|---|---|
| Door aspect ratio | 1.5 ❌ | **2.0** ✅ |
| Door / window top-edge gap | 0.8m ❌ | **0.0m** ✅ |

The Inspector detected the violations numerically, and three rounds of back-and-forth converged on a model satisfying every constraint — **without using vision at all**. Given the right API, an AI can do CAD-grade precision work without ever looking at an image. That was the first sign this would work.

---

## 5. Experiment 2: Does the AI Get Smarter the More You Use It?

This was the real question. I prepared **a house with five deliberate defects** (a floating door, a window overlapping the door, insufficient daylighting area, and so on), started from the identical state every time, and had it perform repairs ten times. The chat history is wiped each run, but **the experiential knowledge file carries over to the next one**.

| Run | Turns to completion | Tokens consumed | What happened |
|---|---|---|---|
| 1st | 9 turns | ~220k | Looping endlessly between fixing and re-verifying. Discovered the rules only through trial and error |
| 5th | 5 turns | ~144k | Consulted past lessons at the start. Initial placement noticeably more accurate |
| 9th | **2 turns** | **~91k** | Computed the daylighting area on its own right after the instruction. Essentially correct on the first move |

**Both moves and cost dropped to under a third.** The model itself was never retrained. The only thing that changed was knowledge accumulated outside of it.

"Making AI smarter" usually conjures up retraining a huge model. Showing with real data that **simply structuring experience and writing it out to an external store makes it specialize in a domain** is, I think, this research's most important result.

---

## 6. A Byproduct: The Staircase Built for Hamsters

One failure during the experiments made me laugh out loud.

I thought I had implemented the rule "**each step** must be at most 23cm tall," but a bug in the inspection program made it check **the total height of the staircase** instead. So when the AI built a normal staircase (2m overall), the inspector rejected it: "exceeds the 0.23m standard — violation!"

The AI didn't complain once. It rebuilt the thing as a **miniature staircase with 2.3cm steps and a total height of 23cm**, and proudly reported that it now complied with the law.

This is a textbook case of **reward hacking**. AI maximizes the *evaluation function it was given*, extremely faithfully — not "common sense." Flip that around and it says: **the quality of an autonomous generation system is decided not by how clever the generator is, but by how precisely the evaluator is designed.** As failure data, it taught me a great deal.

---

## 7. The Unglamorous Details That Actually Mattered

The paper didn't have room for these, but two things had an outsized practical effect. Neither is a prompting trick — the point is that both are **handled deterministically in the tool-side code**.

- **Unifying the origin** — In 3D software, an object's origin might be at its base or at its center, and LLMs constantly confuse the two, offsetting things by half their height (floating them, or burying them). Forcing the origin to the geometric center right after creation means the AI only has to manage center coordinates, and placement errors dropped off a cliff.
- **Idempotent operations** — An LLM trying to "fix" something tends to create new objects instead, stacking `Cube.001`, `Cube.002` in the same spot. Designing operations to update in place when an object of that name already exists meant the scene stays clean no matter how many times the repair loop runs.

Putting an AI agent into practical use turned out to be about **anticipating where the AI goes wrong and handing it tools that make going wrong impossible**.

---

## 8. What's Next

Right now I'm working on how to reconcile situations where rules conflict (say, wanting daylighting while also needing a load-bearing wall), and on how to prune the knowledge base once it bloats under long-term operation.

Beyond architecture, the same framework should apply to **any domain where correctness can be defined numerically** — industrial products, circuit design, layout design. Treat generative AI not as magic that produces the right answer in one shot, but as **a colleague you can run an inspect-and-repair loop with**. I'm still building the groundwork for that.

---

### Documents

- 📄 [Paper PDF](/slides/deim2026-paper.pdf): Autonomous Quality Assurance for Indoor Scene Generation under Architectural Constraints via Two-Layer Knowledge Inheritance with the Model Context Protocol (DEIM2026, in Japanese)
- 🖼️ [Presentation poster PDF](/slides/deim2026-poster.pdf) (in Japanese)
- 🔗 [DEIM2026 Conference Report | LayerX Engineering Blog](https://tech.layerx.co.jp/entry/deim2026_report) (where this research was featured)

Both PDFs are viewable inline under "Documents" just below.

**Stack**: Python / Blender 4.2 LTS (bpy) / Model Context Protocol (FastMCP) / Ollama (gpt-oss:20b) / JSON knowledge base / everything runs locally (no external API, zero communication cost)
