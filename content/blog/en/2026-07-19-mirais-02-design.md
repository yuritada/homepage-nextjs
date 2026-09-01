---
title: "MIRAIS Design Record #2｜How It Is Put Together — Information Architecture, System Architecture, Data Model"
date: "2026-07-19"
tags: ["MIRAIS", "Architecture", "Data Modelling", "PostgreSQL"]
summary: "Part 2 is the design chapter. A sitemap and permission matrix across six roles, the public-data policy behind \"hiding a screen and withholding data are different problems\", the reasoning behind each technology choice, and the star schema that keeps years from ever mixing."
series: "mirais"
seriesOrder: 2
seriesTitle: "MIRAIS Design & Implementation Record"
seriesLabel: "Part 2 — Design"
---

# Part 2 — How it is put together

This instalment turns the requirements fixed in [Part 1](/blog/2026-07-16-mirais-01-origin) into actual structure: a sitemap built for six roles, the policy that cuts information off from logged-out visitors, the reasoning behind each technology choice, and the 20-table star schema.

# Part IV — Information architecture

---

## 12. Sitemap

Designed as a structure that satisfies the permissions and security constraints of six roles (logged-out / student / faculty / administrator / participating company / developer).

```
├── Common, publicly accessible area (logged-out allowed)
│   ├── /                 top page
│   ├── /login            login
│   └── /themes           research topic listing
│       └── /[id]         topic detail (personal, company and poster data fully hidden)
│
├── Shared by logged-in users
│   └── /3d-venue         3D virtual exhibition venue
│
├── /student              students only
│   ├── /dashboard        topic registration, submission, matching progress, voting
│   └── /archive          archive of previous years
│
├── /teacher              faculty only
│   ├── /dashboard        seminar progress monitor
│   └── /recommend        departmental award nominations
│
├── /company              participating companies only
│   ├── /                 company dashboard
│   ├── /match            matching and vote management
│   └── /venue            management of the company's own 3D booth
│
├── /admin                administration only
│   ├── /dashboard        overall status and KPIs
│   ├── /companies        participating company management
│   │   └── /[id]         company detail, contacts, participation and award history
│   ├── /assets           submitted asset management, print material generation
│   ├── /awards           award selection
│   ├── /sync             external data synchronisation
│   └── /settings         system-wide settings, event period, phase
│
└── /backdoor             developers only (disabled in production)
    └── /debug            debug and demo phase switching
```

**Twenty pages were implemented** (~5,300 lines including components). Two pages were added to the original sitemap during implementation — the award selection screen and the company detail screen. Both exist to handle operational details revealed in interviews: selecting company awards based on ranking, and managing contacts who change every year.

---

## 13. Specification of the main pages

### 13-1. Top page

Complete carry-over of the existing site's features (F-01). It carries the event overview, schedule, venue information, announcements, an excerpt from the research listing, and the login route.

Content differs by authentication state. Logged-out visitors read only the public endpoint; logged-in users retrieve every attribute of the event, including submission deadlines. On top of that, **announcements containing student-facing keywords such as "submission", "deadline" or "reminder" are hidden from logged-out visitors** — to prevent internal communication from being visible externally.

### 13-2. Login page

Three authentication methods on one screen.

1. **Google login** (campus users)
2. **Magic-link landing** (participating companies — opening the invitation URL logs you in)
3. **Development login** (hidden in production)

### 13-3. Research topic listing and detail

The listing offers keyword search and tag filters, and shows an LLM recommendation section when a company is logged in.

The detail page unlocks the presenter's name, seminar, poster PDF, comment section, vote button and award badges after login. **Logged-out visitors see only the title and abstract** — no field labels and no empty space remain for anything else.

### 13-4. Student dashboard

We limited what a student enters themselves to just three items: **title**, **abstract** and **poster file** — to keep the burden minimal. Seminar, booth number, presentation time and so on are all set by administrators or assigned automatically.

Submission is a two-step UI (① enter title and abstract → ② drag and drop the poster PDF). Beyond that, students can read comments from faculty and companies, accept company offers, and vote on other topics.

We also infer the year of enrolment from the first two digits of the student ID, and route students whose year differs from the running event to their own past submissions — so that a student close to graduation does not open the dashboard and find nothing there.

### 13-5. Faculty screens

Shows the list of students in the professor's seminars and their progress (complete / title only / not submitted). Faculty can see **only the students in the seminars they supervise**; they cannot retrieve a list of all students. Departmental award nominations are entered here too, and passed to the administrators in one click.

### 13-6. Company screens

Editing their own profile (interest text), the LLM recommendation list, bookmarking interesting research, sending match requests (offers), ranked voting, and decorating their own booth in the 3D venue (banner, video, description, coordinates).

### 13-7. Administrator screens

- **Dashboard**: KPIs for student count, submission status, company count, votes and comments, plus the voting ranking
- **Asset management**: reviewing all posters, the student list, A4 name-tag imposition preview, booth guide sheets, and running the automatic booth allocation
- **Award selection**: nomination quotas per seminar, automatic filling of the nomination pool, running the company selection, manually adding/changing/swapping awards, reordering the company ranking, and exporting award slides
- **Company management**: approval, ranking, issuing invitation links, contact management, and participation and award history from previous years
- **Sync**: export to a spreadsheet, import of previous-year CSVs, sync job history
- **Settings**: creating and editing events (year, name, date, venue, background image, theme colour, phase, submission deadline)

---

## 14. Access permissions by role

| Page | Logged-out | Student | Faculty | Company | Admin | Developer |
| --- | --- | --- | --- | --- | --- | --- |
| Top, login | ○ | ○ | ○ | ○ | ○ | ○ |
| Research listing | ○ | ○ | ○ | ○ | ○ | ○ |
| Research detail | △ | ○ | ○ | ○ | ○ | ○ |
| 3D venue | △ | ○ | ○ | ○ | ○ | ○ |
| Student area | × | ○ | × | × | ○ | ○ |
| Faculty area | × | × | ○ | × | ○ | ○ |
| Company area | × | × | × | ○ | ○ | ○ |
| Admin area | × | × | × | × | ○ | ○ |
| Developer area | × | × | × | × | × | ○ |

- **△ on research detail**: title and abstract only. Nothing else is included in the response.
- **△ on the 3D venue**: the page opens, but logged-out visitors are isolated in an anonymous room so no other participants are visible, and because fetching posters requires authentication, nothing is displayed.

**The important point is that display control on the frontend is not a security boundary.** The real boundary lives in the API's dependencies (authentication required, role restricted, owner restricted). Hiding a screen and withholding data were treated as separate problems.

---

## 15. The public-data cutoff policy

This is the most strictly enforced rule in the system. In the implementation it is written as a policy at the top of the public endpoint module.

```
- Return only the "title" and "abstract" of a piece of research to logged-out visitors.
- Names, tags, seminar names, poster URLs, comments, votes and so on are
  excluded from the API entirely (to genuinely satisfy the requirement that
  they be removed from the DOM outright).
- No additional fields may be added here.
  If a field is needed, serve it from an authenticated route.
```

**Why go this far?** A poster PDF may contain the student's name and ID number, their supervisor's name, the lab name, and the names of collaborating companies. In a research poster, all of that is normally printed on the sheet. Therefore poster files must never be servable without authentication. And once we had decided to show "only the title and abstract", the safest thing was to **treat every other field as though it did not exist**.

The reason the public response type is defined as a model with exactly three fields: if someone in the future who does not know this policy tries to add a field, they will have to **change the type** — an explicit act. The structure should not leak by accident.

---
---

# Part V — System architecture

---

## 16. Overall structure

```
                Browser / smartphone
                          │  HTTPS
                          ▼
             ┌────────────────────────┐
             │  reverse proxy (nginx)  │
             │   /api   → backend      │
             │   /docs  → backend      │
             │   /      → frontend     │
             └──────┬──────────────┬──┘
                    │              │
    ┌───────────────▼──┐      ┌────▼───────────────────┐
    │ frontend         │      │ backend                │
    │ Next.js 15       │      │ FastAPI                │
    │ React 19 / SWR   │      │ SQLAlchemy 2.0         │
    │                  │      │                        │
    │ bundles the 3D   │      │ poster storage area    │
    │ venue (Vite)     │      │ credentials            │
    └──────────────────┘      └────┬───────────────────┘
                                   │
                      ┌────────────▼────────────┐
                      │ PostgreSQL 16           │
                      └─────────────────────────┘

  External integrations (all optional; the core runs without any of them)
    ├─ campus LLM server   … embedding generation
    ├─ slides API          … award / booth-guide slides
    ├─ spreadsheet API     … export of submissions, companies, awards
    ├─ storage API         … archiving student posters
    ├─ Google Identity     … campus OAuth
    └─ chat tool           … reminders for missing submissions
```

The structural point is that **every external integration is optional**. If the campus LLM is down, recommendations still work; if the slides API is unconfigured, the portal still works; without the chat integration, reminders are still recorded in the history. A failure in an external service does not propagate into a system-wide outage.

Deployment is onto a campus GPU server (ARM architecture) as containers via Docker Compose. Permission to run on a university server came through during development, so that is where it runs today, and **there is no ongoing cost at all**. Only the reverse proxy is exposed externally; the frontend and the database are not published directly.

---

## 17. Technology stack and the reasoning behind it

### 17-1. Backend: Python + FastAPI

**Why**: strong input validation, and the ability to build APIs fast while keeping business logic readable. OpenAPI is generated automatically, so the contract with the frontend is explicit. And in the context of a data science faculty, Python is the common language everyone on the team can read.

The main libraries are SQLAlchemy 2.0 (`Mapped` / `mapped_column`, 2.0 style), Pydantic v2, python-jose (JWT) and httpx (external API calls).

### 17-2. Frontend: TypeScript + Next.js App Router

**Why**: the contract between UI and API can be fixed in types, and responsibilities split per route. File-based routing maps one-to-one onto the sitemap we designed.

Worth noting: **we use no UI library at all.** No Tailwind, no Material UI — every page is built from our own design tokens and classes. We judged that the fastest way to honour the "avoid UI that feels like a generic template" principle was not to start from an off-the-shelf component set. Theme colours are injected dynamically from the event settings, so administrators can change them from the admin screen.

### 17-3. Database: PostgreSQL 16

**Why**: it makes it straightforward to maintain the consistency that year-based operation and role-specific workflows require. In particular, the **deferrable unique constraint** (deferring evaluation until the end of the transaction) that swapping award recipients requires cannot be expressed in the lighter alternatives. That single point decided the choice (Chapter 21).

### 17-4. 3D: React Three Fiber

At the planning stage we assumed a different 3D library, but the implementation uses React Three Fiber. Three reasons for the change:

1. We needed to **assemble more than 300 geometries declaratively** from the floor plan, and the ability to split that into React components was a big advantage.
2. We needed avatar movement with physics and collision.
3. We wanted to handle dynamic swapping of PDF textures through React state.

It combines libraries for physics, multiplayer synchronisation and PDF rendering.

### 17-5. LLM: campus server plus fallback

If a campus LLM server is configured, use it; if it is unconfigured or unresponsive, fall back to a **deterministic mock embedding**. The design point is that **recommendations do not stop working in an environment where the LLM is unavailable** ([Chapter 32 / Part 5](/blog/2026-07-28-mirais-05-algorithms)).

### 17-6. Authentication: our own JWT

Rather than an external authentication SaaS, we issue HS256 JWTs ourselves — because of the commitment to depend on nothing external, and because we needed the freedom to design a non-standard flow (magic links for companies).

---

## 18. Repository structure

```
mirais/
├── docs/                  planning, meeting notes, design
│
├── portal/                the system itself
│   ├── backend/           FastAPI (~6,700 lines)
│   │   └── app/
│   │       ├── main.py    entry point, router registration
│   │       ├── models.py  data model (20 tables)
│   │       ├── schemas.py API contract schemas
│   │       ├── cli.py     management CLI
│   │       ├── core/      settings / DB / security
│   │       ├── api/       routing layer (17 modules)
│   │       └── services/  business logic layer (13 modules)
│   │
│   ├── frontend/          Next.js (~5,300 lines, 20 pages)
│   │   ├── app/           App Router
│   │   ├── components/    9 components
│   │   └── lib/           API client / session
│   │
│   ├── 3d-venue/          3D venue (Vite + R3F, ~3,100 lines)
│   ├── nginx/             reverse proxy configuration
│   └── scripts/           startup and deployment scripts
│
├── data/                  real data (outside version control)
│
└── Reference/             R&D-period technical validation (reference only, no reuse)
```

`Reference/` holds the output of the validation period: two generations of portal demo implementations, three 3D experiments, an authentication experiment and a slide-generation experiment. We set a rule that **this code is used only to understand behaviour and scope, and is never carried into the real implementation**. Validation code is written with only "does it work" in mind, and bringing it into a product muddies the design.

---
---

# Part VI — Data model

---

## 19. Design philosophy: a star schema

### 19-1. Put the event at the centre

The requirement was clear: **however many years accumulate, data must never mix, while simultaneously supporting no-code organiser settings and an archive of previous years.** We set two principles for that.

1. **Rigorous year IDs** — every piece of data specific to a single year, down to student submissions, participating companies, votes, comments and seminar membership, carries a foreign key to the event.
2. **Separation of immutable data** — users (student and faculty account information) persist across years, so "basic user information" is managed separately from "this year's submission and seminar membership".

### 19-2. How this structure solves the problems

**Protecting and searching past years**
Even after a student graduates and their account information is updated, past submission records keep the title, abstract and seminar as they were, tied to that year. Switching the year on screen is enough to dig up past assets.

**No-code year rollover and re-skinning**
Creating a new year's event from the settings screen issues a new event ID and generates an empty dashboard. The background image and integration URLs are stored on that single event record, so **not a line of program code needs to be touched**.

### 19-3. From 7 tables to 20

The draft settled in the design meeting had 7 tables (event / user / seminar / submission / company / comment / vote). The implementation added 13, ending at 20. Most of the additions handle **operational details revealed in interviews**.

| Added table | Why it was added |
| --- | --- |
| Seminar ⇄ faculty join table | To treat seminars with multiple supervisors consistently with single-supervisor ones |
| Company contacts | For "the contact changes every year" and "CC management is hard" |
| Awards | The two tracks (departmental / company) and the promotion workflow |
| Announcements, FAQ, timetable | Carrying over the existing site's features (F-01) |
| Invitation tokens | Managing expiry and usage history |
| System settings | KV store for no-code settings |
| Reminder history | Recording send results |
| Bookmarks, offers | Companies expressing interest, and matching status |
| Company booths | Decoration and coordinates in the 3D space |
| Sync jobs | Execution history of exports and imports |

We could not foresee 20 tables at the requirements stage. What actually happened is that each time an interview revealed an operational detail, a table stood up to meet it.

---

## 20. Overview of the tables

### 20-1. Enumerations

```
Role              : admin | faculty | student | company
Phase             : preparing | accepting submissions | voting | archived
Submission status : not submitted | title entered | complete
Approval status   : pending | approved
Poster badge      : senior | peer | faculty | company | organiser
Offer state       : pending | accepted | declined | withdrawn
```

All defined as strings plus constraints. PostgreSQL's native enum type requires a schema change to add a value, which makes migrations heavy, so we deliberately avoided it.

### 20-2. Core tables

**Event**
Year (unique), event name, date, venue name and address, linked spreadsheet URL, **background image URL**, **theme colour**, phase, submission deadline. Because year is unique, **one event per year** is structurally guaranteed. Every setting an organiser touches is collected into this single record.

**User**
Email (unique), name, system role, student ID, chat tool ID. **It has no foreign key to the year**, because users exist across years.

**Seminar / seminar faculty**
Seminars are tied to a year and connect many-to-many with faculty. Seminars with a single supervisor and seminars with several are handled consistently through the same structure.

**Student submission**
Year, user, seminar, title, abstract, tags, poster URL, external storage file ID, submission status, presentation session, booth number, **embedding vector**.
There is a unique constraint on `(year, user)`, so **one submission per student per event** is guaranteed structurally.

**Company**
Year, company name, contact details, contact person, CC information, **interest text**, embedding vector, logo URL, **ranking**, **a flag for whether the ranking was adjusted manually**, invitation token, approval status.

The "manually adjusted" flag on ranking exists so that automatic calculation and manual reordering can coexist. Once an organiser reorders by hand, that company is excluded from automatic calculation from then on. The principle that a machine must not overwrite a human judgement, expressed in the data structure.

**Comment**
Year, submission, author (campus user **or** company), **snapshot of the display name**, attribute badge, body.

The display name is kept separately as a snapshot so that the display stays intact after the author graduates or leaves. It guarantees the archive of past years is "as it was".

**Vote**
Year, submission, voter (campus user **or** company), rank, score.
There is a unique constraint on `(year, company, rank)`, so **a company cannot cast the same rank twice within an event**.

**Award**
Year, submission, type (departmental / company), label, awarding body, company.
Unique on `(year, submission)` — but **deferrable** (Chapter 21).

### 20-3. Relationship diagram

```
                       ┌──────────────┐
                       │    Event     │ ← centre of all year-scoped data
                       │ year(unique) │
                       └──┬───────────┘
      ┌────────────┬───────┼────────────┬──────────────┐
      │            │       │            │              │
 ┌────▼─────┐ ┌────▼────┐  │      ┌─────▼──────┐ ┌─────▼────────┐
 │ Seminar  │ │ Company │  │      │Announcement│ │FAQ/Programme │
 └────┬─────┘ └────┬────┘  │      └────────────┘ └──────────────┘
      │            │       │
 ┌────▼──────┐ ┌───▼──────────────┐
 │Seminar ⇄  │ │ Company contact  │
 │  faculty  │ │ Invitation token │
 └────┬──────┘ │ Company booth    │
      │        └───┬──────────────┘
 ┌────▼───┐        │
 │  User  │        │
 │(no year)        │
 └────┬───┘        │
      │            │
 ┌────▼────────────▼──────────────────────┐
 │           Student submission            │
 │  unique(year, user)                     │
 │  embedding / poster / booth number      │
 └────┬───────────────────────────────────┘
      │
 ┌────┼──────────────┬──────────────┬──────────────┐
 │    │              │              │              │
┌▼────▼───┐   ┌──────▼─────┐  ┌─────▼──────┐ ┌─────▼──────────┐
│ Comment │   │    Vote    │  │   Award    │ │   Bookmark     │
│  badge  │   │    rank    │  │ deferrable │ │    Offer       │
└─────────┘   └────────────┘  └────────────┘ └────────────────┘
```

---

## 21. The subtle points of the design

### 21-1. A deferrable unique constraint

The unique constraint on `(year, submission)` in the award table is defined so that **its evaluation is deferred until the end of the transaction**.

The reason is swapping award recipients. Exchanging two awards consists of two updates, and in the intermediate state the same submission temporarily exists on two rows. With an immediately-evaluated constraint, that intermediate state violates it and the operation fails. Deferring evaluation to the end of the transaction lets the swap execute safely in a single transaction.

**This constraint cannot be expressed without PostgreSQL.** It became one of the deciding factors in the database choice. An operational requirement — "we want to swap award recipients" — turning directly into a database selection criterion is, I think, a satisfying example of requirements and technology choice lining up.

### 21-2. Exclusive foreign keys

Comments and votes are authored by either a campus user or a company. Rather than inheritance or a polymorphic association, we took the simple approach of **two nullable foreign keys side by side**. Polymorphic associations are hard to read and felt excessive at this scale. We prioritised readability.

### 21-3. How embeddings are stored

Embeddings are stored as JSON arrays in a text column. Three reasons we did not use a vector search extension:

1. It was uncertain whether the campus LLM server would be usable.
2. The system had to work with mock embeddings too.
3. At the current scale (around 100 records), a full scan with cosine similarity computed in the application is more than fast enough.

We deliberately deferred the decision to move to a vector extension until the scale exceeds a few thousand records. The policy is: **do not add optimisations that the current scale does not need.**
