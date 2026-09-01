---
title: "MIRAIS Design Record #1｜Why We Built It — Problem Framing, Interviews, Requirements"
date: "2026-07-16"
tags: ["MIRAIS", "Requirements", "User Research", "Project Design"]
summary: "Part 1 of the record of rebuilding my department's annual research showcase. The origins of the project, an inventory of the existing workflow, the interview with the administrator who runs the event, and the twelve features and non-functional requirements we drew out of it."
slides: "/slides/mirais.pdf"
slidesTitle: "MIRAIS presentation — the ‘problem framing’ and ‘interviews’ sections match this part"
series: "mirais"
seriesOrder: 1
seriesTitle: "MIRAIS Design & Implementation Record"
seriesLabel: "Part 1 — Planning"
---

# Part 1 — Why we built it

This is the design and implementation record of **MIRAIS**, a portal system that unifies the annual research showcase ("Mirai Sozo Happyokai") of the Faculty of Data Science at Musashino University, from preparation through to the awards ceremony. It is published in six parts.

| Item | Detail |
| --- | --- |
| Version | Public edition v1.0 |
| Author | Yuri Tada (third year, Faculty of Data Science / project lead) |
| Team | Me (lead, overall design / backend) + two juniors (UI/UX and 3D; backend and external integrations) |
| Scale | Backend ~6,700 lines / frontend ~5,300 lines / 3D venue ~3,100 lines |

Part 1 covers the problem framing the project started from, the interviews with the people involved, and the requirements we drew out of them.

If you would rather take in the whole picture first, start with the [summary design notes](/blog/2026-07-14-mirais).

## 0. About this document

### 0-1. What this is

It is the record of a project that rebuilt the running of our faculty's annual event, the Mirai Sozo Research Showcase, as a web system. It traces a single line from the problem framing the plan began with, through interviews with the people involved, requirements, information architecture, implementation, algorithms and external integrations, to the work that remains.

For every technical decision I have written not just *what* was chosen but *why*. I believe **how a judgement was made under constraints** is worth more to a reader than the details of the implementation.

### 0-2. Editorial policy for publication

This is the public edition. The following has been changed from the internal original.

- **Real names and contact details have been removed.** University administrative staff and faculty are referred to by role, and students have been replaced with fictional examples. Where interviewees described their own work, phrasing that touched on an individual's workload has been rewritten neutrally.
- **Team members other than me (the author)** are referred to by role. It is not my place to publish my collaborators' names.
- **Concrete infrastructure values** (server identifiers, directory layouts, port numbers, connection details, deployment procedures) have been abstracted or removed.
- **The exhaustive list of API endpoints** has been replaced with a summary by functional domain.
- **Security content** keeps the design reasoning, but for unresolved items only the nature of the issue is stated, with specific locations and reproduction steps withheld.

Design philosophy, algorithms, and the data model are described at the same density as the internal version.

### 0-3. Structure

```
Part I     Origins of the project   (ch. 1–4)    why we built it
Part II    Current-state analysis   (ch. 5–7)    what was actually happening
Part III   Requirements             (ch. 8–11)   what we decided to build
Part IV    Information architecture (ch. 12–15)  how it is presented
Part V     System architecture      (ch. 16–18)  how it is assembled
Part VI    Data model               (ch. 19–21)  what is stored
Part VII   Backend                  (ch. 22–24)  what the server does
Part VIII  Frontend                 (ch. 25–26)  what the screens do
Part IX    3D virtual venue         (ch. 27–31)  how the metaverse exhibit works
Part X     Algorithms in detail     (ch. 32–35)  the design of the brains
Part XI    External integrations    (ch. 36–39)  connecting to existing tools
Part XII   Quality and security     (ch. 40–41)  what is protected, and how
Part XIII  Results and outlook      (ch. 42–44)  how far we got
Part XIV   Appendix                 (ch. 45–47)  reverse-lookup reference
```

---
---

# Part I — Origins of the project

---

## 1. Background and purpose

### 1-1. What the Mirai Sozo Research Showcase is

It is the annual event of the Faculty of Data Science at Musashino University (MUDS). Students present a year of research in poster form, communicating it inside and outside the university — visiting companies above all.

- **Three sessions**: the day is split into sessions 1, 2 and 3, with students rotating through the same poster-board positions.
- **Venue**: a two-floor hall on the university campus.
- **Flow of the day**: doors and reception → opening → sessions 1–3 (45 minutes each) → judging and voting → social → awards ceremony → closing. Roughly a six-hour programme.
- **Awards**: two tracks — the *departmental award*, chosen by the seminars, and the *company award*, chosen by visiting companies. Companies have a ranking among themselves, and entries are "promoted" from the departmental shortlist to a company award through that process.

### 1-2. A new variable this year: a new correspondence faculty

This year a new correspondence-course faculty, the Faculty of International Data Science (MIDS), was established. That created problems that had not existed before.

- **How to secure a place to exhibit** for students who are physically remote
- **How to make participation work** for companies and students who cannot come to the venue

MIRAIS's 3D virtual venue is positioned as a direct answer to that. It is true that the wish to "try using 3D" came first — but refusing to let it end as a showcase of technology, and redesigning it as an answer to a concrete problem in front of us, is one of the things I cared about most in this project.

### 1-3. Purpose

> **Everyone involved in the showcase completes the whole journey — from preparation to the awards — inside this portal, and the friction people have felt until now ends with our cohort.**

We fixed that as the core experience, and agreed as a team at the outset that however much the detailed requirements changed, this one line would not move.

We also set a precondition: this must not end as a hackathon submission. It had to be designed as **infrastructure that keeps running in the years that follow**. If it stops working once its authors graduate, nothing has actually been solved.

### 1-4. The premise: self-contained on campus resources

At the planning stage we committed to **depending on no external commercial service, and running entirely on the university's own computing resources**. This premise directly determined the following architectural decisions.

- Do not depend on a commercial LLM API. Make the **LLM running on the university's own GPU server** the first choice, and build so that nothing stops working in an environment where it is unavailable.
- Do not use an external SaaS for authentication; cover it with Google ID Token verification and our own JWT issuance.
- Host on the university's own computing resources.

Partway through development we were granted permission to run on a university server, so the system runs on a campus GPU server today. **There is no ongoing cost at all.**

Constraints were not the enemy of the design; they were material that forced our judgements to be explicit. Being able to think in the order "what we can use is limited, therefore this is the architecture" rather than "it is limited, so we give up" is, I think, what ultimately made the architecture coherent.

---

## 2. How it went, from plan to implementation

MIRAIS was not designed in one go. It took shape through a series of meetings and interviews from June onwards.

### 2-1. The starting point

We began by comparing what each of the three of us was good at, and how deeply. I took full-stack work — overall design and implementation — and the two juniors took UI/UX and frontend-leaning implementation, and backend and external integrations, respectively.

In the following session we put forward a plan at the granularity of "build a website for the showcase" and listed what we wanted in it.

- Carry over **every** feature the current site has
- Reflect the research listing in real time
- Voting
- Poster management
- Use of 3D technology (to be discussed)
- Depend on no external commercial service

For technologies we wanted to use, we named FastAPI / Next.js / LLMs and embeddings / a 3D library. At this point one junior proposed that **it should be split into three patterns: administration, students and companies**, and the other proposed **reminders and comments** — the prototype of what later became the role design.

We also settled the names for our timeline here: **research-and-development period = before kickoff / development period = after kickoff**. The former was for technical validation, the latter for building at speed.

### 2-2. The session that fixed the axis

The agenda was "a first pass at the requirements." The most important agreement of the project was formed here.

> The detailed requirements will change a great deal from here. But **we want to hold the core experience — the essential part — unchanged all the way through.**

Each member's sense of the problem was put into words in the same session.

- There is too much waste in the way the showcase is run; I want to remove it.
- The existing mechanism is awkward to use; I want to make it easy.
- As a shared axis, always ask: **who, in what situation, uses this how, and how do they feel about it?**

We also set the rule for how the feature list would be written: always pair **the feature name with why it is needed (whose problem does it solve?)**. Chapter 10 of this document follows that format. A list of bare feature names becomes unreadable later, because you can no longer tell what it was trying to solve.

### 2-3. Understanding the current state

We took an inventory of the existing system's features and reconstructed the workflows of the people involved. Two non-functional requirements were added here: "we should also handle security and personal data" and "lasting a long time matters too." Both had a decisive influence on the design that followed.

### 2-4. Interviews

I spoke directly with the administrative staff member primarily responsible for running the showcase. It is the highest-density primary information in the project, and it is structured into Chapter 7.

The remark that came out of it — **"it doesn't have to end up in the same shape as the spreadsheet we manage today"** — is what made it possible to treat our own database as the single source of truth. Without that sentence, we would have been dragged into the existing spreadsheet's shape and ended up with a far more cramped data model.

### 2-5. The skeleton of the design

We reflected the interview findings into a proposal document, then produced a grand design defining a pain × solution × implementation-approach matrix, the feature list F-01 to F-12, the technical architecture, and a plan for technical validation (PoC).

After that we settled on 4 + 1 roles (administration / faculty / students / participating companies / development), and finalised the star-schema design of the database. We then defined a sitemap and permission matrix on the assumption of 6 roles (including logged-out), and wrote down as an explicit security requirement that **for logged-out visitors, poster files are removed from the API and the DOM entirely**.

### 2-6. Implementation

We enumerated the remaining pages, drew a Phase 0–5 roadmap, and started building: foundations → CI/CD → feature implementation (over several rounds) → the 3D space → deployment tuning.

---

## 3. Team structure and technical validation

| Owner | Role | Validation task during the R&D period |
| --- | --- | --- |
| **Me** (3rd year, lead) | Overall design, backend, integration | External connectivity test against the campus LLM server, and accuracy validation of embeddings |
| **Junior** (UI/UX, 3D) | Frontend, 3D space | Rendering a space with a 3D library, and dynamic texture mapping of image URLs fetched from the DB |
| **Junior** (backend, integrations) | APIs, external service integration | Verifying bot reminders to a specific user via the Slack API |

We ran technical validation first to **prevent technology from being the reason the core experience collapses**. The detailed requirements were allowed to change. But an LLM that does not run, 3D that is too heavy to be usable, Slack that does not get through — those technical failure modes had to be eliminated before the plan was locked.

All three validations concluded "it works", and we moved straight into the real implementation. In particular, the LLM validation led to the decision to prepare an alternative path that works even when the campus server is unavailable ([Chapter 32 / Part 5](/blog/2026-07-28-mirais-05-algorithms)).

---

## 4. Naming

**MIRAIS** = **M**UDS & M**I**DS Innovative **R**esearch **A**ctivity Integrated **S**ystem

Three things mattered when choosing the name.

1. **It had to sound like "mirai" (未来, *the future*).** The name alone should convey that this is the system for the Mirai Sozo Research Showcase.
2. **It had to name both faculties explicitly.** The context specific to this year — the founding of MIDS — should be carried at the level of the name.
3. **It had to feel friendly enough to be used day to day on campus.** The university already has an academic support system; we wanted a name that could stand alongside it.

Friendly, clear, and precisely covering the project's scope — finding a candidate that satisfied all three at once took more time than I expected.

---
---

# Part II — Current-state analysis

---

## 5. Feature inventory of the existing site

We set it as a precondition (F-01) that MIRAIS would be a **complete superset** of the existing site. If even one instance of "that feature is gone" occurred during migration, adoption would fail on that alone. So we began by exhaustively inventorying what the current site provides.

### 5-1. Elements on the top page

- Title / date and time / access
- Link to the participation application form
- Announcements
- Link to the contact form
- Content tabs (student topic list / participants-only site / seminar introductions / programme / FAQ)

### 5-2. Structural problems

- Apart from the top page, pages hold little more than link titles; there is almost no substantive content.
- The "participants-only site" exists only as a button, with a separate URL emailed after approval — a two-layer structure. **The site's own navigation does not close.**
- The research topic list is manually re-typed from form → spreadsheet → site. There is no real-time element.

### 5-3. What the participating-companies site contained

Discovered during interviews.

- Topic list / venue map / voting form / award rules

In MIRAIS these were absorbed into the unified portal as the research listing, the 3D venue, the voting UI, and announcements/FAQ — **eliminating the very concept of a separate "dedicated site"**. Instead, an approved company simply sees more information inside the same portal.

---

## 6. Current workflows of the people involved

### 6-1. Administrative staff

```
1. Begin outreach to external companies
2. Tally which companies will participate
3. Create a student form to collect the presentation content shown to companies
4. Compile the collected topics into a spreadsheet and publish them to the site
5. Assign who presents at which point in the three sessions
6. Send poster-printing instructions to students
7. Send arrival-time and other instructions to students
```

This workflow consists of two kinds of labour: three stages of manual re-typing (form → spreadsheet → site), and individual messages over a chat tool.

### 6-2. Students

```
1. Enter the research title into a form
2. Create a poster and save it to cloud storage (where exactly is unclear)
3. Print the poster yourself and keep it until the day
4. On the day, put the poster up at the assigned time and place, and present in front of it
```

### 6-3. Participating companies

```
1. Submit the participation form
2. Receive an email pointing to the participants-only site, and access it
3. Everything after that is invisible from the organisers' side
```

The third line being blank was itself the problem. **Nobody knew how the companies were experiencing this.** MIRAIS brings bookmarks, offers and voting into the system, making that visible.

---

## 7. What the interviews produced

I asked the person responsible for administration to walk me through their work along the annual schedule. It is the primary information that most strongly shaped the design decisions.

### 7-1. The annual cycle

| When | Work |
| --- | --- |
| Early December | Ask faculty for candidate companies to invite |
| Mid December | Send invitation emails to companies / build the website / **make the background image changeable** / notify companies that the site is live |
| 1 week before | Registration deadline for companies |
| The week before | Prepare name tags, guide sheets and other props |
| During the event | Produce the award-announcement slides |

### 7-2. Requests that fed straight into the design

**"Make the background image changeable"**
→ This produced **F-12, the no-code organiser settings screen**. They want to change the site's look every year, but they cannot touch program code. The only way to satisfy both is to hold design elements as data.

**Preparing name tags**
"Cutting them up and putting them into holders is hard, but **producing the sheet before it gets cut could probably be automated**."
→ A4 imposition data generation. Having the user themselves draw the line for how far automation should reach was a significant gain.

**Preparing guide sheets**
"The slip we stick above the poster, saying who presents on this board and when."
→ **Auto-generated booth-guide slides.** The implementation settled on "one slide = one physical booth position, with the presenters for sessions 1–3 at that position collected on a single sheet."

**Award-announcement slides**
"I want to produce a list, generate it automatically from the algorithm, and **still be able to change it by hand**. There is an existing macro, but entering the names is laborious and the layout does not fit. **Preparing a template, copying it, and filling in the data** would be better."
→ **Auto-generated award slides.** The phrase "copy the template and fill it in" became the implementation approach verbatim.

### 7-3. Award rules and company ranking

- Participating companies have a **ranking**, maintained by hand.
- The seminars supply a **shortlist for the departmental award**, from which entries are **promoted to a company award**.
- The lead professor rotates, supervising students in turn.

→ This produced the **two-phase award algorithm** (Phase 1: build the faculty nomination pool → Phase 2: companies select from the pool in ranking order, promoting "departmental award → company award"). Detailed in [Chapter 33 / Part 5](/blog/2026-07-28-mirais-05-algorithms).

### 7-4. Collecting from students

- Titles and abstracts are collected from each seminar's students **by two weeks before** (the schedule is built **assuming people will be late**).

The phrase "assuming people will be late" promoted the reminder feature from "nice to have" to "essential, because the premise is built into the schedule."

### 7-5. Operational realities, and how they shaped the design

| Reality revealed in the interview | How it was reflected in the design |
| --- | --- |
| The company contact person changes every year | Tie company information to the year, and allow multiple contacts to be registered |
| Managing email CC lists is laborious | Hold CC information in the system and manage it through a screen |
| **It does not have to match the current spreadsheet's shape** | **The DB can be the source of truth.** The spreadsheet only needs a readable export |
| The wording of invitation emails differs slightly per recipient | Provide templates, but do not force fully automatic sending |
| Collecting company logos involves the partner's approval process and takes time. **Organisers place them by hand** | Do not automate logo collection; make it possible to attach them afterwards from the admin screen |

The last two points were the biggest thing I learned in this project. **Rather than forcing a workflow through the system, accept the existing one and provide the feature that makes it take the fewest steps.** Automating logo collection would have meant dragging the partner's internal approval process into the system. But if you accept "the organiser pastes it in by hand" as the workflow, all you need is one column storing an image URL, and a field to paste it into.

Do not mistake "user first" for granting every request. Deciding where *not* to touch someone's workflow is, I believe, just as much a part of design.

---
---

# Part III — Requirements

---

## 8. The list of problems

Problems extracted from the interviews and workflow analysis, organised by stakeholder.

### 8-1. Administration and faculty

| ID | Problem |
| --- | --- |
| P-A1 | Submission reminders are manual and sent individually |
| P-A2 | Presentation topics are manually compiled into a spreadsheet and then re-typed onto the site — double management |
| P-A3 | The three-session timetable and booth allocation are done by hand |
| P-A4 | Name tags and booth guide sheets are produced manually |
| P-A5 | The existing award-slide macro is unstable; entering names and adjusting layout is laborious |
| P-A6 | Email CC management is cumbersome, risking missed communication |
| P-A7 | Changing the date, target seminars and integration URLs each year requires program changes |
| P-A8 | Submission status is not visible at a glance, so it is impossible to judge who needs chasing |

### 8-2. Students

| ID | Problem |
| --- | --- |
| P-S1 | It is unclear where to enter a research title or upload a poster; the barrier to submitting is high |
| P-S2 | The showcase is a one-off "you talk on the day and it's over" event; no feedback accumulates |
| P-S3 | There is no way to look back at seniors' research, so the faculty's intellectual assets are lost every year |
| P-S4 | Correspondence students cannot exhibit physically, creating unequal access to participation |

### 8-3. Participating companies

| ID | Problem |
| --- | --- |
| P-C1 | Hard to find in advance which student is researching what, so the limited time on the day is used inefficiently |
| P-C2 | Booth positions are hard to find at the venue |
| P-C3 | Companies that cannot attend cannot experience the atmosphere of the showcase at all |
| P-C4 | Matching interests to research stops at keyword overlap, so genuinely well-suited research goes undiscovered |

---

## 9. Problem × solution × implementation approach

### 9-1. Administration and faculty

| Problem | Solution | Implementation approach |
| --- | --- | --- |
| P-A1 | Smart reminders: visualise progress and chase non-submitters automatically | Submission-status API and a campus chat tool bot |
| P-A2 | Make the DB the source of truth; sync/back up to the spreadsheet automatically | Export via the Sheets API. One-way, DB → spreadsheet |
| P-A3 | Automatic three-way split by seminar size, and automatic booth numbering | Hamilton-method three-way split plus sequential numbering in seminar order |
| P-A4 | Auto-generated name-tag imposition and booth guide sheets | HTML preview → print to PDF from the browser. Guide sheets duplicate a slide template |
| P-A5 | Auto-generation from voting results, still editable by hand | Duplicate the template and replace placeholders |
| P-A6 | Screens for CC information and contact management | Contact CRUD on the company detail screen |
| P-A7 | No-code organiser settings screen | Collect date, integrations, background image, theme colour and phase into a single event record |
| P-A8 | Submission-progress dashboard | KPI dashboard plus a student list with a not-submitted filter |

### 9-2. Students

| Problem | Solution | Implementation approach |
| --- | --- | --- |
| P-S1 | A submission dashboard that leaves no room for confusion | Two-step UI: ① enter title and abstract → ② drag and drop the poster PDF |
| P-S2 | Multi-perspective comments with attribute badges | Threads where the poster's attribute (senior / peer / faculty / company) is shown as a badge |
| P-S3 | Archive of previous years | Complete separation by year, with search and browsing across years |
| P-S4 | 3D virtual poster session | Submitted poster PDFs rendered dynamically as textures on wall boards in the 3D space |

### 9-3. Participating companies

| Problem | Solution | Implementation approach |
| --- | --- | --- |
| P-C1 | Fast tag filtering plus keyword search | Filtering on the frontend |
| P-C2 | 3D venue navigation | Booth numbers and posters mapped onto a 3D model built from the real floor plan |
| P-C3 | Virtual exhibition venue with multiplayer | Attendees of the same event share the same 3D space |
| P-C4 | LLM semantic matching | Vectorise the company's interest text and the research abstracts; recommend the top cosine-similarity matches |

---

## 10. Feature list (F-01 to F-12)

Each feature is defined together with **why it is needed (whose problem does it solve?)**.

| ID | Feature | For | Why it is needed | Priority |
| --- | --- | --- | --- | --- |
| **F-01** | Complete carry-over of existing features | Everyone | Essential for migrating off the existing site. Date, access, programme, FAQ, announcements | **Required** |
| **F-02** | Google OAuth authentication | Everyone | Security and less friction. Instant login with a university account | **Required** |
| **F-03** | Student page (submission) | Students | Unify where posters and topics are submitted, so nobody gets lost | **Required** |
| **F-04** | Organiser dashboard | Administration | Visualise submission progress and export to a spreadsheet | **Required** |
| **F-05** | Automatic reminders | Admin/students | Reduce chasing costs, prevent forgotten submissions | High |
| **F-06** | Advanced research listing | Companies/students | Instantly find topics of interest among a large body of research | High |
| **F-07** | LLM semantic matching | Companies | Matching that goes beyond keywords | **High (core)** |
| **F-08** | Multi-perspective feedback comments | Students | Build an environment for continued learning from seniors and peers | Medium |
| **F-09** | 3D venue navigation and virtual exhibition | Companies/correspondence | Locate booths at the venue, and give remote students a place to exhibit | **Medium (core)** |
| **F-10** | Real-time voting and awards | Everyone | Excitement on the day, plus automated tallying | Medium |
| **F-11** | Archive of previous years | Students/faculty | Preserve outstanding research as an asset of the faculty | Medium |
| **F-12** | Organiser settings screen | Administration | Make next year's configuration no-code | Medium |

Implementation status is summarised in [Chapter 42 / Part 6](/blog/2026-07-31-mirais-06-outcome).

---

## 11. Role requirements and non-functional requirements

### 11-1. Core value by role

| Role | Core value |
| --- | --- |
| **Administration** | Automating the manual work around chasing, tallying, and preparing print materials and slides — and securing year-on-year operational continuity |
| **Faculty** | Lower supervision cost for their students, and smoother selection and coordination of departmental and company awards |
| **Students** | Submission without confusion, multi-perspective feedback that does not end with the day, and equal participation even remotely |
| **Companies** | High-precision matching to research directly relevant to their needs, and efficient booth circulation on the day |
| **Development** | Faster demonstrations and testing, and troubleshooting |

On the development role: in review and validation sessions we needed to be able to **switch, on the spot, between operational phases spanning several months** — "December, inviting companies", "two weeks before, the deadline", "voting on the day". It is a mechanism for letting someone experience months of activity in five minutes. This feature is disabled in production.

### 11-2. Non-functional requirements

**Security and personal data**

| ID | Detail |
| --- | --- |
| NF-S1 | Logged-out visitors see **only the title and abstract** of a piece of research. Names, student ID numbers, supervisor names, seminar names, partner company names and poster files are **excluded from the API response entirely** (not even a blank field or label remains in the DOM) |
| NF-S2 | Poster PDFs require authentication |
| NF-S3 | Lists containing every student's contact details are restricted to administrators. Faculty can retrieve only their own seminar's students |
| NF-S4 | Development-only features are disabled in production |
| NF-S5 | Data containing personal information is kept out of the repository and isolated from version control |

A note on NF-S1. One suggestion was "just branch on the frontend", but then anyone inspecting the traffic can obtain the data. Hiding it with CSS is of course out of the question. We judged that **not putting it in the API response** was the only reliable guarantee, and defined the public response model as a type with exactly three fields, so that the policy is enforced at the type level.

**Continuity and maintainability**

| ID | Detail |
| --- | --- |
| NF-M1 | Data never mixes across years |
| NF-M2 | Settings that change annually (date, integrations, background image, theme colour) are changeable without code changes |
| NF-M3 | Past submissions remain viewable after a student graduates |
| NF-M4 | Thorough type annotation, schema definition and layer separation |
| NF-M5 | Every significant technology choice comes with a stated reason |

**Operating cost and self-sufficiency**

| ID | Detail |
| --- | --- |
| NF-C1 | Depend on no external commercial service; run entirely on the university's own computing resources |
| NF-C2 | The LLM defaults to the campus server, and **features do not stop** when it is unconfigured |
| NF-C3 | Minimise always-on server resources |

**UI/UX**

- Aim for the experience of **a company's official product site**, not the feel of an internal campus tool.
- Define a strong visual identity (colour tokens, deliberate typography).
- Avoid UI that feels like a generic template, and flat single-colour backgrounds.
- Clarify the information hierarchy with role-specific dashboards.
- Keep motion purposeful and minimal.
- Make mobile and desktop work at the same time.
- Guarantee accessibility (keyboard operation, focus indication, contrast).
