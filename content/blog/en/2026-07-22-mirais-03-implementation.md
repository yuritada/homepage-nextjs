---
title: "MIRAIS Design Record #3｜Server and Screens — Backend and Frontend Implementation"
date: "2026-07-22"
tags: ["MIRAIS", "FastAPI", "Next.js", "Authentication"]
summary: "Part 3 is the implementation chapter. Separating routers from services, handling three login paths (Google ID Token, magic link, development) through a single JWT format, multi-stage file validation, and displaying an authentication-only PDF in an iframe via a blob URL."
slides: "/slides/mirais.pdf"
slidesTitle: "MIRAIS presentation — the ‘product overview’ section matches this part"
series: "mirais"
seriesOrder: 3
seriesTitle: "MIRAIS Design & Implementation Record"
seriesLabel: "Part 3 — Implementation"
---

# Part 3 — Server and screens

This instalment turns the design into code: layer separation, the three-path authentication design, the API's domain structure, the frontend's construction, and the implementation needed to show an authentication-only poster PDF in a browser.

# Part VII — Backend

---

## 22. Application structure

### 22-1. Layer separation

```
app/
├── main.py       entry point, CORS, startup, router registration
├── models.py     data model (persistence layer)
├── schemas.py    API contract schemas
├── cli.py        management CLI
├── core/         settings / DB session / JWT
├── api/          routing layer (17 modules) — HTTP and authorisation only
└── services/     business logic layer (13 modules) — pure processing
```

**The principle: business rules live in the service layer, not in routers.** In practice all the heavy processing — the award algorithm, slide generation — is in the service layer, and the routing layer sticks to converting input and output and to authorisation.

The benefit of holding that separation showed up less in testability than in **readability**. When looking for "where is this feature?", HTTP concerns are in `api/` and business logic in `services/` — you follow it without hesitating.

### 22-2. Startup behaviour

Tables are created automatically at startup, and demo data is seeded **only in development mode**. In production mode no seeding runs at all. When data genuinely has to be loaded in production, the design is to use a separate management CLI. Splitting the development flag and production data loading into different paths avoids the dangerous dependency of "you cannot load data without raising the development flag."

---

## 23. Authentication and authorisation design

### 23-1. Three authentication paths

```
① Campus users (students, faculty, administration)
   browser → Google Identity → ID Token
   → backend verifies the ID Token
   → resolve the role from the email address, verify the domain
   → create or update the user → issue our own JWT

② Participating companies
   an organiser issues an invitation link from the admin screen (token with an expiry)
   → the company logs in simply by opening the URL
   → check the token's expiry and usage history; reject unapproved companies
   → issue our own JWT

③ Development (disabled in production)
   instant login with a specified role, to speed up demos and validation
```

We designed companies not to set a password, following the principle of **not making participating companies create a new account**. Making someone manage a password for a service they use once a year is nothing but a burden.

### 23-2. Handling two kinds of subject with one token format

The JWT payload carries a "subject type", and that decides whether to look the subject up in the user table or the company table. This lets **two different entities — campus users and companies — be handled by a single token format**.

The API layer only needs to look at an abstracted "principal" object, and the "user or company?" branch is closed inside a single place. Putting that abstraction in early is what let us add the company-facing features that came later without touching authentication.

### 23-3. Authorisation dependencies

```
authentication required   reject if unauthenticated
campus users only         reject company tokens
companies only            reject user tokens
role restricted           reject anything but the specified role
```

Role resolution includes a mechanism that automatically promotes email addresses registered as administrators or faculty. An existing user's role is auto-updated **only upwards**; demotion never happens.

### 23-4. Resolving "the current event"

We settled on a simple rule: **the current event is the one with the highest year.** Rolling over to a new year is complete once you create the new year's event record. We considered date-based resolution and a manual flag, but chose this because the simpler the rule, the less can go wrong.

---

## 24. API structure

The exhaustive endpoint listing is omitted from the public edition; here is a summary by functional domain.

| Domain | What it provides | Authorisation |
| --- | --- | --- |
| **Public** | Public attributes of the event, research title and abstract only | None required |
| **Auth** | Google login, invitation-link login, retrieving your own information | Partly authenticated |
| **Event** | Event CRUD, timetable, FAQ, announcements, seminars, "current session" on the day | Read public / write admin |
| **Submissions** | Listing and detail, retrieving and updating your own submission, award information | Authenticated |
| **Companies** | Admin CRUD and invitation links; a company's own interests, recommendations, bookmarks | Admin / company |
| **Comments** | Listing and posting with attribute badges | Authenticated |
| **Votes** | Ranked and rating votes, tallying | Authenticated |
| **Matching** | Semantic search, rebuilding embeddings | Partly admin-only |
| **Offers** | Sending match requests and changing status | Company / student |
| **Booths** | Retrieving and updating company booths, listing for 3D rendering | Company / authenticated |
| **Posters** | Serving and uploading PDFs | **Authenticated / students only** |
| **Admin** | Dashboard, student list, reminders, settings, award selection, company detail, booth allocation, slide export | **Admin only** |
| **Sync** | Spreadsheet export, previous-year CSV import, job history | Admin only |
| **Faculty** | Own seminar progress, departmental award nominations, voting ranking | Faculty only |
| **Student** | Determining the student's year and where to route them | Students only |
| **Development** | Seeding, phase switching, connection status | **Disabled in production** |

### 24-1. Automatic determination of submission status

Instead of making students press a "submitted" button, status is derived automatically from what they have entered.

```
title + abstract + poster all present → complete
title only                            → title entered
neither                               → not submitted
```

This matches the real two-stage workflow: "title and abstract by two weeks before, the poster after that." From the student's point of view the state advances simply by entering things, so the accident of "I thought I'd submitted but hadn't" cannot happen.

### 24-2. Validating poster uploads

Accepting files from students is the part of the system that deserves the most care. We check the following in stages:

- The role is student
- The student ID is registered and consists only of digits
- The current phase is accepting submissions
- Content-Type and the extension are PDF
- **The leading bytes of the file are the PDF signature**
- The file size is within the limit

The stored filename is **generated from the logged-in user's student ID**, never derived from a request parameter. The design principle is not to create a path for overwriting someone else's file in the first place.

---
---

# Part VIII — Frontend

---

## 25. Structure and the API contract

### 25-1. The App Router matches the sitemap

The sitemap we designed corresponds directly to the directory structure. That one-to-one mapping was intended from the design stage. When the design document and the code share a structure, the distance from "I want to fix this screen" to "open this file" is zero.

Every page is a client component, and data fetching goes through SWR. We do not use server-side rendering for two reasons: ① the authentication token is held in the browser, so there is no server-side session to hold, and ② we prioritised simplicity in a single-container setup.

### 25-2. API client

Type definitions and the HTTP client are collected into one file. It defines TypeScript types paired with the backend's schemas, and there are more than 30 response types.

The client behaves as follows:

```
- automatically attach the stored token to the Authorization header
- automatically set Content-Type for JSON bodies (except file uploads)
- always fetch fresh (no caching)
- throw non-2xx as a custom error, adopting the server's error message
```

We display the server's wording verbatim because the backend returns clear Japanese messages ("Only PDF files can be uploaded", for instance). Writing the message at its origin is more accurate than re-translating an English status code on the frontend.

### 25-3. Managing authentication state

The session uses the "retrieve your own information" endpoint as an SWR key, with revalidation on focus disabled. Logging out is nothing but discarding the token and invalidating the cache. Because the design is stateless with no server-side session, that is all it takes.

---

## 26. Component design

| Component | Role |
| --- | --- |
| Navigation bar | Switches links dynamically by role. Shows an identity chip and logout when signed in |
| Role guard | Shows "you do not have access" to anyone outside the permitted roles |
| Phase badge | Displays the operational phase with a Japanese label |
| Stats grid | Grid of KPI cards |
| Research card | Shows seminar, booth number and match rate as pills |
| Drop zone | Accepts files by drag and drop |
| Poster viewer | Fetches the PDF with authentication and displays it via a blob |
| Comment thread | Threaded display with attribute badges |
| Voting panel | Ranked voting for companies, rating voting for everyone else |

### 26-1. The design decision behind the poster viewer

Poster PDFs **require an authentication header**. But the `src` attribute of `<img>` or `<iframe>` cannot send custom headers. So we take these steps:

```
① fetch the PDF with the authentication header attached
② build a blob URL from the retrieved data
③ feed that blob URL into the iframe
```

This is **the standard technique for displaying an authentication-only asset in a browser**, and it is the implementation linchpin that lets us show posters to authenticated users without breaking the public-data cutoff policy from [Chapter 15 / Part 2](/blog/2026-07-19-mirais-02-design). The lesson: a decision like "poster PDFs require authentication" is something you take on together with this kind of implementation cost.

### 26-2. Design system

We define our own classes in global CSS. Cards, buttons, badges, pills, phase indicators, inputs, headers — each named after its purpose. Theme colours are injected dynamically from the event settings, so a colour an organiser changes in the admin screen propagates across every page.
