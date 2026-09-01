---
title: "MIRAIS Design Record #4｜The 3D Virtual Venue — From Floor Plan to a Space You Can Walk"
date: "2026-07-25"
tags: ["MIRAIS", "3D", "React Three Fiber", "WebGL"]
summary: "Part 4 covers the 3D venue: the deliberate lie of doubling the real floor plan, automatic PDF assignment onto 36 poster surfaces, absorbing the messiness of real data, and the multiple-tab problem that ate more time than anything else in the multiplayer implementation."
series: "mirais"
seriesOrder: 4
seriesTitle: "MIRAIS Design & Implementation Record"
seriesLabel: "Part 4 — 3D Venue"
---

# Part 4 — The 3D virtual venue

The founding of a correspondence-course faculty raised the question of how to secure a place to exhibit for students who are far away, and the 3D virtual venue is the answer to it. This instalment covers a space built from the venue's real floor plan, and the mechanism that automatically hangs each session's presenters' posters inside it.

# Part IX — 3D virtual venue

---

## 27. The overall picture

The 3D venue is an **independent application** built with Vite + React Three Fiber; the build output is placed on the portal side and embedded in an iframe.

**Why a separate application?**

1. The React versions differ (portal and 3D side). The 3D ecosystem's support for the latest React was immature at the time.
2. 3D scenes are heavy. Isolating them in an iframe stops a scene remount from propagating into the portal itself.
3. Development cycles can be separated, so the 3D owner can work independently.

The third mattered most in practice. Being able to run just the 3D app without waiting for the portal's build let its owner iterate at their own pace.

**File structure (~3,100 lines)**

| File | Lines | Role |
| --- | --- | --- |
| Building geometry | 1,175 | Floors, walls, glass, stairs, stage, poster boards, fixtures, outdoor scenery |
| App orchestration | 510 | Scene orchestration, state, UI overlay, automatic PDF assignment |
| Humanoid model | 331 | Rendering other players |
| Floor plan data | 313 | Coordinates extracted from the measured plan |
| Texture generation | 213 | Procedural textures via Canvas |
| Multiplayer | 148 | Synchronising player positions |
| Avatar | 114 | Your own avatar and movement control |
| Poster assignment | 104 | Mapping submissions onto board surfaces |
| Other | ~200 | API client, PDF conversion, session restoration |

---

## 28. From floor plan to 3D space

### 28-1. Converting the coordinate system

We extracted coordinates from the venue's actual floor plan and mapped them into 3D space.

```
Plan space: normalise the building's long axis to 1,080 units
Plan space: map the vertical direction onto the depth axis of the 3D space
1F and 2F sit vertically stacked in the plan, so 2F is loaded with a shifted origin
```

**A decision worth noting**: the building's footprint is **scaled to twice its real size, while heights stay at 1:1**. At true scale it was too cramped to walk around as an avatar. The 3D space prioritises **the quality of moving around it** over physical accuracy.

This is a deliberate lie. But the relative positions of the booths are kept accurate, so the real purpose — "which research is in which area" — is unharmed. Deciding what to keep accurate and what to sacrifice is, I think, what design is.

### 28-2. Height settings

```
1F effective ceiling height  6.0 m
1F ceiling ↔ 2F floor        1.0 m (structural zone)
2F floor level               7.0 m
Poster board                 height 4.5 m / width 4.5÷√2 ≈ 3.18 m (A-series aspect ratio)
```

The poster board's aspect ratio matches the A-series paper sizes so that the posters actually hung on it are not distorted.

### 28-3. Category classification

Elements are classified into 18 categories, each with its own material, collision and rendering.

```
floor / no-entry / entrance / stage / kitchen / classroom /
stairs / elevator / elevator hall / atrium / corridor /
staff room / laboratory / wall / glass wall / automatic door /
glass balustrade / chair / main staircase
```

We implemented a renderer per category: floor tiles, walls (including glass transparency), the stage, poster boards, monitors, elevator housings, switchback stairs, the suspended main staircase, sloped colliders, the structural band between floors, and scenery down to street trees and the outdoor terrace.

---

## 29. Automatic poster assignment

The mechanism that automatically hangs the current session's presenters' posters onto the venue's 36 poster surfaces.

```
① fetch all submissions (authentication required)
② fetch "the current session" (polled every 3 seconds)
③ extract only the submissions belonging to the current session
④ normalise the booth number to a position number in 1–36
⑤ reverse-look-up the board surface from the position number
⑥ fetch the poster PDF with authentication
⑦ render page 1 and turn it into a texture
⑧ apply it to the material of the matching board surface
```

### 29-1. Absorbing the messiness of real data

This was the most laborious part of working with real data.

```
Session notation:      "1" / "2" / "3" / "part_1" / "part_2" / "part_3" / numeric
Booth number notation: "1-27" (session-position composite) → 27
                       "27"   (position only)             → 27
                       "01-05" (zero padded)              → 5
                       " 27 "  (with whitespace)          → 27
                       out-of-range values                → discarded as invalid
```

We designed the 3D side to absorb the notational variance in real data imported from CSV, starting from the premise that **real data is not clean**. Normalising on the backend was an option, but rewriting historical data destroys the record of what was actually there at the time, so we chose to absorb it on the reading side.

### 29-2. Rendering Japanese PDFs

Rendering Japanese PDFs requires character-set maps and standard font data. We added configuration to reference these from a CDN. **Japanese posters appearing on the walls of the 3D space without mojibake** is down to that configuration.

When rendering we fill the canvas with white before drawing (eliminating transparent pixels), and raise the resolution and anisotropic filtering to secure quality. Posters are meant to be read up close, so illegible text defeats the point.

---

## 30. Multiplayer and the venue experience

### 30-1. Room separation

```
logged out → anonymous room (other participants invisible)
logged in  → authenticated room, one per event
```

**Isolating logged-out visitors in an anonymous room** is how the design requirement "keep logged-out visitors out of the 3D venue" is satisfied in the implementation. The page itself opens, but neither other participants nor posters are visible.

### 30-2. The multiple-tab problem

Worth recording: the problem that ate the most time in the multiplayer implementation.

The synchronisation library internally persists the player ID in the browser's session storage. However,

- duplicating a tab copies session storage,
- and in some browsers and extensions session storage is shared.

The result is that multiple tabs **enter the room with the same player ID**, the server judges it a reconnection by the same player, and the earlier session is disconnected. It surfaced as "open two tabs during a demo and one of them dies."

We fixed it by setting a flag, after the library loads but before it initialises, that switches its internal storage to an in-memory one — so each tab is issued an independent ID.

### 30-3. The iframe embedding trap

The portal passes authentication information to the 3D venue via a URL query. There was a problem here too.

An iframe's `src` can only be finalised on the browser side. If `src` differs between server rendering and client rendering, React **remounts** the iframe. That re-establishes the synchronisation connection, and **multi-tab synchronisation breaks down**.

We avoided it by not rendering the iframe until mounting completes, and fixing the element's key. A good lesson in how, once 3D and multiplayer are involved, a framework's perfectly ordinary behaviour becomes a problem.

---

## 31. Venue feature list

| Feature | Description |
| --- | --- |
| Walk mode / fly mode | Toggles physical collision on and off |
| Zoom control | Adjusts the field of view in steps |
| Respawn | Return to the starting position |
| Pointer lock | Look around with the mouse |
| Automatic poster assignment | Maps onto 36 surfaces according to the current session, with progress shown |
| Manual PDF assignment | Hang an arbitrary PDF on an arbitrary surface |
| Screen sharing | Show a shared screen on a monitor inside the venue |
| Screenshot | Capture the scene |
| Session switching | Operable by the organiser role only |
| Session polling | Checked every 3 seconds; all posters are re-hung on change |

**How it works on the day**: when an organiser sets "we are now in session 2", every poster in the venue switches to session 2's presenters within three seconds. **The changeover on site and the changeover in the 3D space happen together** — this was the last piece needed to keep the 3D venue from being just something we "tried building".
