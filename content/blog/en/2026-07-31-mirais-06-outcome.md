---
title: "MIRAIS Design Record #6｜Defence and Results — Security Design, Remaining Work, What I Learned"
date: "2026-07-31"
tags: ["MIRAIS", "Security", "Technical Debt", "Retrospective"]
summary: "The final part. The security design built around \"hiding something on the frontend is not security\", an honest inventory of what remains — no tests, no migrations — and three things I learned about constraints, other people's workflows, and where to fix the axis."
slides: "/slides/mirais.pdf"
slidesTitle: "MIRAIS presentation — ‘development highlights’ and ‘closing’ match this part"
series: "mirais"
seriesOrder: 6
seriesTitle: "MIRAIS Design & Implementation Record"
seriesLabel: "Part 6 — Results"
---

# Part 6 — Defence, and how far we got

The final instalment. What we protected and how, as a system handling personal data — and, honestly, what is still outstanding. At the end, three things I learned through the design decisions in this project.

# Part XII — Quality and security design

---

## 40. Security design principles

Since this is a system that handles personal data, I treated security not as a feature but as a precondition. The design rests on the following ideas.

### 40-1. Distinguish display control from withholding data

Hiding something on the frontend is not security. **Data we have decided not to show to unauthenticated visitors is not put in the API response.** The public response type is defined with only the minimum necessary fields, so that the policy is upheld at the type level.

### 40-2. Put constraints in both the application and the database

Preventing double voting, one submission per student, one award per student — all of these are guaranteed **both** in application logic and by a database unique constraint. Guarding only in the logic breaks down the moment something writes through another path.

### 40-3. Require multiple conditions for dangerous operations

The development and demo features can only run when **both** conditions hold: development mode, and the administrator role. Forgetting to set a single flag must not be fatal.

### 40-4. Distrust files before accepting them

Uploads are checked in stages: role, registration state, operational phase, declared type, extension, **the leading bytes of the actual file content**, and size. And the stored filename is **generated from the authenticated user's information**, never derived from a request value. The idea is not to create a path for overwriting someone else's file in the first place.

### 40-5. Permissions are "the people who need it, for the scope they need"

Lists containing every student's contact details are restricted to administrators, and faculty are given a dedicated route that returns only the students in their own seminars. Not "faculty can see everything", but "you can see the scope you supervise" — that is the correct design.

### 40-6. Keep personal data out of the repository

Real data (research topics, award recipients, posters) is isolated outside version control, and demo code contains no real names. Source code is something that gets shared, and once personal information is in it, retrieving it is hard.

---

## 41. What remains (nature only)

Because this is the public edition, specific locations and reproduction steps are not described — only the nature of each issue and the intended remedy.

| Category | Nature of the issue | Remedy |
| --- | --- | --- |
| Authorisation | On some endpoints, the granularity of the authorisation setting does not match the public-data policy | Tighten authorisation to match the policy. **Top priority** |
| Credential handling | There is room to move to a safer method of holding credentials | Change the storage method and add the accompanying protections |
| Abuse prevention | No mechanism limiting the number of attempts | Introduce rate limiting |
| Traceability | No change history for important operations | Add an audit log |
| Dependency management | Dependency vulnerabilities are not continuously scanned | Build scanning into CI |
| Secrets | The way configuration values are managed could be improved | Move to a dedicated management mechanism |
| Schema changes | No mechanism for safely applying database schema changes | Introduce a migration tool. **Top priority** |
| Monitoring | No structured logging or failure tracing | Set up a logging platform and monitoring |
| Testing | No automated tests, so a change breaking an existing feature goes undetected | Build a test foundation. **Top priority** |

### 41-1. On the three top priorities

**The authorisation mismatch** arose because, while we defined the public-data cutoff policy strictly, some features added later did not apply it rigorously. Guarding a policy with prose and comments is not enough; it needed to be **enforced mechanically, through types and shared dependencies**.

**The schema-change mechanism** follows from choosing "create the tables automatically at startup" early in development. Comfortable while building, but once the system is in operation there is no way to add a column. **This is debt that must be cleared before entering the operational phase.**

**The absence of tests** is, frankly, the biggest problem. Logic like the award algorithm — many branches, high cost when wrong — is currently guaranteed only by manual checking. This should be filled in before any new features are added.

---
---

# Part XIII — Results and outlook

---

## 42. Feature implementation status

| ID | Feature | State | Remaining work |
| --- | --- | --- | --- |
| **F-01** | Complete carry-over of existing features | ✅ Done | The programme is hard-coded in the frontend; move it into settings |
| **F-02** | Google OAuth authentication | ✅ Done | Improve credential storage |
| **F-03** | Student page | ✅ Done | — |
| **F-04** | Organiser dashboard | ✅ Done | Periodic automatic sync (currently manual) |
| **F-05** | Automatic reminders | 🟡 Partial | **Automatic execution not implemented.** Individual DMs unsupported |
| **F-06** | Advanced research listing | ✅ Done | Full-text search, faceted search |
| **F-07** | LLM semantic matching | ✅ Done | Migration to a vector extension, related-research recommendations |
| **F-08** | Multi-perspective feedback comments | ✅ Done | Automatic detection of the "senior" badge, anonymous/named toggle |
| **F-09** | 3D venue and virtual exhibition | ✅ **Done (beyond expectations)** | Reflecting company booth placement in 3D |
| **F-10** | Real-time voting and awards | ✅ Done | Genuine real-time updates (currently polling) |
| **F-11** | Archive of previous years | ✅ Done | Make previous-year data read-only |
| **F-12** | Organiser settings screen | ✅ Done | — |

### 42-1. Features that were not in the design but got built

Things that were invisible at the requirements stage and turned out to be necessary during interviews and implementation.

| Feature | How it came about |
| --- | --- |
| Award selection algorithm | Designed after learning about the "ranking" and "promotion" practices |
| Automatic award slide generation | From the concrete complaint that "the existing macro is unstable" |
| Automatic booth guide slide generation | From learning that "a slip goes above the poster" |
| Automatic booth allocation | From discovering the three-session assignment was done by hand |
| Company contact management | From "the contact changes every year" and "CC management is hard" |
| Company offers | So that matching does not end at merely looking |
| Company 3D booths | So companies can use the 3D space too |
| Determining a student's year | So the route for students close to graduation is not broken |
| Sync job history | To avoid "I ran it but I do not know the result" |
| Previous-year CSV import | For validation with real data, and to seed the archive |
| "Current session" linkage in the 3D venue | To synchronise the on-site and 3D experiences |

This list is also evidence that **requirements are never complete at the start**. Each time an interview revealed an operational detail, a necessary feature stood up. The agreement made in [section 2-2 / Part 1](/blog/2026-07-16-mirais-01-origin) — "the detailed requirements may change, but the core experience does not" — is what let us treat that change as progress rather than chaos.

---

## 43. Where we are, and what comes next

### 43-1. Status by phase

| Phase | Content | State |
| --- | --- | --- |
| **Phase 0** Foundations | Types, time handling, startup, CI | ✅ Mostly done (migrations and tests remain) |
| **Phase 1** MVP | Auth, submission, dashboards, voting, static pages | ✅ Done |
| **Phase 2** Core features | LLM recommendations, 3D venue | ✅ Done |
| **Phase 3** Operational strength | Automatic reminders, better search, archive, settings management | 🟡 Automatic reminder execution remains |
| **Phase 4** Productisation | Security, tests, monitoring, performance | 🔲 Largely not started |
| **Phase 5** Handover | Operations manual, incident procedures, user guide | 🟡 Operating procedures are in place |

### 43-2. The remaining critical path

```
① [Top priority, half a day] Three security and foundation items
   ・tighten authorisation to match the policy
   ・verify development features are disabled in production
   ・introduce a schema-change mechanism (or write down a no-change operating rule)

② [High, a few days] Test foundation
   tests for the award algorithm / booth allocation / authorisation boundaries
   → without them, nobody notices when a future change breaks an existing feature

③ [Medium, about a week] Automatic execution of reminders
   the only essential feature still left as "partially implemented"
```

### 43-3. What I learned from this project

To close, three things I learned through the design decisions rather than the technical conclusions.

**1. Constraints make a design clear**

Committing to "depend on no external commercial service" looked restrictive at first. In practice it forced a chain of decisions — "we cannot depend on a commercial API" → "use the university's own resources" → "make it work even when those are unavailable" — and produced **an architecture resilient to external failure**. Without that commitment, we would have simply called a commercial API, and everything would have stopped on the day it went down. And once permission to run on a university server came through mid-project, that same shape turned directly into operation with no ongoing cost.

**2. Decide where not to touch someone's workflow**

Choosing not to automate logo collection, limiting spreadsheet sync to one direction, matching the existing "copy the template and fill it in" work model. All of them are decisions to *not* do something we could have done.

What a system should solve is the user's problem, not the user's job. **Deciding what not to build is part of design** — that is what interviews taught me.

**3. Requirements are never complete at the start, so fix the axis first**

The agreement in [section 2-2 / Part 1](/blog/2026-07-16-mirais-01-origin) — "the detailed requirements will change a great deal, but the core experience will not" — supported this project to the end. And the requirements really did change. The table count went from 7 to 20, and 11 features that were not in the design were added.

We never got lost anyway, because we had drawn the line between what was allowed to change and what was not, right at the start. **A plan robust to change is not a detailed plan; it is a plan with a clear axis.**

---
---

# Part XIV — Appendix

---

## 44. Glossary

| Term | Meaning |
| --- | --- |
| **MIRAIS** | The name of this system. MUDS & MIDS Innovative Research Activity Integrated System |
| **MUDS** | Faculty of Data Science, Musashino University |
| **MIDS** | Faculty of International Data Science (the correspondence faculty founded this year) |
| **Mirai Sozo Research Showcase** | The faculty's annual research presentation event |
| **Three sessions** | The event's time blocks. Presenters rotate through sessions 1, 2 and 3 |
| **Departmental award** | An award nominated by the seminars |
| **Company award** | An award chosen by participating companies; "promoted" from the departmental shortlist |
| **Ranking** | The priority order of participating companies. Maintained by hand; determines company selection order |
| **Magic link** | A tokenised URL that logs you in without a password. For companies |
| **Phase** | The event's operational stage: preparing / accepting submissions / voting / archived |
| **Nomination pool** | The candidate set for the departmental award. Company awards are drawn only from it |
| **Hamilton method** | Largest remainder. Distributes leftovers in descending order of fractional part |
| **R&D period / development period** | The technical validation period before kickoff / the implementation period after it |

---

## 45. Technology stack

| Area | Technology | Key reason |
| --- | --- | --- |
| Backend | Python / FastAPI / SQLAlchemy 2.0 / Pydantic v2 | Strong input validation, automatic OpenAPI, common team language |
| Frontend | TypeScript / Next.js 15 (App Router) / React 19 / SWR | Contracts fixed in types, one-to-one mapping with the sitemap |
| Styling | Own design tokens (no UI library) | Avoiding a generic-template feel, dynamic theme injection |
| Database | PostgreSQL 16 | Deferrable unique constraints, the consistency year-based operation needs |
| 3D | React Three Fiber / physics engine / multiplayer sync / PDF renderer | Declarative geometry, collision, dynamic textures |
| LLM | Campus server + deterministic fallback | Self-containment on campus resources, resilience to external failure |
| Authentication | Google ID Token verification + own JWT | Depending on no external SaaS, freedom for a non-standard flow |
| Infrastructure | Docker Compose / nginx / campus GPU server | Using campus resources, self-contained on a single host, no ongoing cost |
| CI | GitHub Actions | Build verification and image build connectivity checks |

---

## 46. MIRAIS in numbers

| Item | Value |
| --- | --- |
| Backend | ~6,700 lines / 17 routers / 13 services |
| Frontend | ~5,300 lines / 20 pages / 9 components |
| 3D venue | ~3,100 lines / 12 files |
| Data model | 20 tables |
| Defined features | F-01 to F-12 (+ 11 added during implementation) |
| Roles | 4 + logged-out + development |
| Poster surfaces in the 3D venue | 36 |
| Building geometry categories | 18 |
| Embedding dimensions | 256 (in fallback mode) |
| Award nomination slots | 30 (distributed by seminar size) |
| Runtime environment | Campus GPU server (no ongoing cost) |

---

## 47. In closing

Honestly, this project started as little more than "I want to build a website for the showcase". That it ended up as a system with a 20-table data model and three applications is entirely because people gave me their time and told me about their work.

The reality of the administrator's work, in particular, was nothing like what we had imagined. Had we built from imagination, none of it would exist — not the name-tag imposition, not the booth guide sheets, not the template-based award slides, not the company ranking. All of it existed only inside the accounts of people who were actually struggling with something.

> **The friction people have felt until now ends with our cohort.**

If nobody does it, the same manual work repeats next year and the year after. What we set out to build was not a hackathon submission but **infrastructure to hand on to the next cohort**. That is exactly why this document records not only what was built, but why each judgement was made.

Code explains itself if you read it. The reasons behind a decision disappear unless someone writes them down.

**Yuri Tada**
Third year, Faculty of Data Science, Musashino University
September 2026

---

Thank you for reading all six parts. There is also a [summary design note](/blog/2026-07-14-mirais) that condenses the key points into a single article.
