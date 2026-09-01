---
title: "MIRAIS Design Record #5｜The Brains — Matching, Awards, Allocation Algorithms and External Integrations"
date: "2026-07-28"
tags: ["MIRAIS", "Algorithms", "LLM", "API Integration"]
summary: "Part 5 covers the algorithms: a dual strategy and deterministic mock embeddings that keep recommendations alive when the LLM is down, proportional allocation of nomination quotas via the Hamilton method, a two-phase award algorithm whose idempotency had to be retrofitted, and the design decisions behind slide generation and spreadsheet export."
series: "mirais"
seriesOrder: 5
seriesTitle: "MIRAIS Design & Implementation Record"
seriesLabel: "Part 5 — Algorithms"
---

# Part 5 — The brains, and the connections outward

This instalment translates the workflows described in the interviews — "companies have a ranking", "entries are promoted from the departmental shortlist to a company award", "copy the template and fill in the data" — directly into algorithms and integration code.

# Part X — Algorithms in detail

---

## 32. LLM semantic matching

### 32-1. The overall flow

```
student saves a submission → vectorise title + abstract + tags and store the embedding
company saves interest text → vectorise the interest text and store the embedding
at recommendation time     → compute cosine similarity between the company vector and
                             each submission vector, and return the top matches
```

### 32-2. The dual strategy

```
campus LLM server not configured → use the mock embedding
configured                       → call the API; normalise and use it on success
the call failed                  → fall back to the mock embedding
```

**The design point is that recommendations never return an error, whether the LLM is down or the network is unreachable.** Even when the campus server does not respond, recommendations keep working.

That is the implementation of NF-C2, and at the same time an insurance policy for live demonstrations. Designing away the chance that an external dependency dies during a few-minute demo — not having to stand in front of people carrying the worry that "this might not work" — turned out to matter more than I expected.

### 32-3. What is inside the mock embedding

It may be the alternative path, but it is built seriously.

```
① lowercase, strip newlines
② split into alphanumeric tokens and Japanese tokens
③ for Japanese tokens of 2+ characters, also add 2-grams
   e.g. "機械学習" (machine learning) → ["機械学習", "機械", "械学", "学習"]
④ hash each token and accumulate into one of 256 buckets
⑤ L2-normalise
```

- **A 256-dimension hashing trick.** No vocabulary table, so unknown words are handled and memory is fixed.
- **Japanese 2-grams** are added to capture partial matches in Japanese without adding a morphological analyser as a dependency. "機械学習" (machine learning) and "学習支援" (learning support) share `学習` and score higher against each other.
- **Deterministic.** The same input always returns the same vector, which guarantees reproducibility in a live demo.

### 32-4. Cosine similarity

Because vectors are L2-normalised at generation time, the dot product *is* the cosine similarity.

If vectors of different dimensionality end up mixed (for instance when the campus LLM is configured later), we truncate to the shorter one and compute. That is not mathematically correct, but it is the pragmatic choice, prioritising **not crashing**. The correct operational procedure is to re-index after changing the configuration.

### 32-5. Self-healing through lazy generation

Submissions with no embedding have one **generated and stored automatically at search time**. Even when embeddings are missing — after importing previous-year data, for example — "we forgot to re-index" is not fatal in practice.

---

## 33. The award selection algorithm

This translates the workflow described in interviews — "the seminars supply the departmental award list, and companies promote entries from it", "companies have a ranking" — directly into an algorithm.

### 33-1. Phase 1: faculty nominations

```
① tally the number of students who completed their submission, per seminar
② distribute 30 nomination slots across seminars in proportion to student
   numbers, using the Hamilton method
③ per seminar, create departmental award candidates from the top of the total
   vote score, as many as the seminar's quota
④ faculty and administrators can adjust by hand from the screen
```

**Why the Hamilton method (largest remainder)?**

Simple rounding does not sum to 30. Truncation leaves slots unused. The Hamilton method — "hand out the leftovers one at a time, in descending order of fractional part" — **keeps the total exact while preserving proportionality as far as possible.** It is the classical method once used to apportion seats in the US House of Representatives.

```
① compute the proportional allocation (fractional)
② truncate to fix the integer parts
③ distribute the undistributed remainder one at a time, in descending order of
   fractional part
④ clip so no seminar exceeds its student count
```

Tie-breaking has three stages (fractional part → student count → definition order) to guarantee **determinism: the result never changes between runs.** "The quotas were different yesterday" is the kind of bug that loses the organisers' trust.

### 33-2. Phase 2: company selection

```
① return previously selected company awards to departmental awards, restoring
   them to the nomination pool
   ← without this, the candidate pool shrinks on every re-run
② walk approved companies in descending order of ranking
③ follow each company's votes in ascending order of rank
④ claim one submission that is "in the nomination pool and not yet claimed by
   another company"
⑤ update the claimed record in place, promoting departmental → company award
⑥ skip companies that match no nomination, recording the company name and
   returning it to the organisers
```

**The rules this design embodies**

- A company award is **always drawn from the departmental nomination pool**. No student wins purely on a company's say-so without a faculty nomination.
- **Higher-ranked companies choose first.** The ranking the organisers set becomes the priority order directly.
- **One award per student.** A student already claimed by another company cannot be chosen.
- **Idempotent.** Running it any number of times gives the same result (thanks to the restoration in step ①).

Step ① was not in the first implementation, and it surfaced as a bug: "the pool of candidates shrinks every time you run it." This is where I learned viscerally that **idempotency is not something you bolt on afterwards; it belongs in the design from the start.**

### 33-3. Respecting manual edits

The combined run only executes Phase 1 when the nomination pool is empty, and never overwrites an existing one — so that a pool a professor has adjusted cannot be wiped out because an organiser happened to press the automation button.

**Automation goes only as far as it does not overwrite a human judgement.** Same instinct as the decision to accept the copy-and-paste workflow for logos ([section 7-5 / Part 1](/blog/2026-07-16-mirais-01-origin)).

### 33-4. Swapping award recipients

Reassigning an award to a different student is where the deferrable constraint from [section 21-1 / Part 2](/blog/2026-07-19-mirais-02-design) earns its keep. Exchanging two records temporarily violates the constraint in the intermediate state, but because evaluation is deferred to the end of the transaction, the operation succeeds.

---

## 34. Automatic booth allocation

The answer to "who presents at which point in the three sessions" (P-A3).

### 34-1. Rules

```
① target submissions that have a seminar assigned
   (students without one are skipped, and their names returned to the organisers)
② split each seminar three ways across the sessions, via the Hamilton method
③ within each session, order by seminar name so students from the same seminar
   are adjacent, and assign "session-sequence" as the booth number
④ independent of submission status (students who have not submitted are still placed)
⑤ idempotent — every run recalculates and overwrites the previous allocation
```

### 34-2. Thirds, and where the remainder goes

```
10 people → [4, 3, 3]
11 people → [4, 4, 3]
 9 people → [3, 3, 3]
```

**The remainder goes to the earlier sessions** because session 1 has the most visitors, so weighting it more heavily means less lost opportunity for presenters.

### 34-3. Ordering

Using the student ID as the primary key means **students from the same seminar are ordered by student ID**. That matches the existing practice of producing name tags and taking a roll call in student-ID order.

### 34-4. Not hiding failure

The allocation result includes "the list of students who could not be allocated because no seminar was set". Organisers immediately notice that they have forgotten to set a student's seminar.

If the design only returned whether the process succeeded, this kind of omission would go unnoticed until the day. **Returning a partial failure as a failure** — unglamorous, but a design decision that pays off in operation.

---

## 35. Tallying votes

### 35-1. Two voting modes

```
[Company ranked voting]
  if a vote already exists for the same (event, company, rank), rewrite its target
  = the operation "change my 1st place from A to B"

[General rating voting]
  if a vote already exists for the same (event, submission, voter), update the score
  = "one vote per person per submission"
```

Company ranked voting is also protected against duplicates at the database level by a unique constraint. **Defence in depth across application logic and database constraints.** Guarding it only in the logic breaks down the moment something writes through another path.

### 35-2. Reading the same data from two angles

The tally returns total votes, total score and the vote count per rank. Having the per-rank breakdown makes it possible to display qualitative information such as "this received first-place votes from three companies."

In the award algorithm, Phase 1 uses the total score and Phase 2 uses ascending rank. Structuring it so that **the same voting data is read from two different angles** lets us evaluate "research supported by many people" and "research a particular company wanted most" separately.

---
---

# Part XI — External service integrations

---

## 36. Automatic slide generation

The answer to the "award slides" and "booth guide sheets" described in the interviews.

### 36-1. The basic approach

```
① connect to the slides API with a service account
② duplicate the template
③ replace the placeholders in the copy with real data
④ return the URL of the generated deck
```

The organiser's own words — "prepare a template, copy it, and fill in the data" — became the implementation approach verbatim. **Fitting the work model the user already has** is more reliable than asking them to learn a new concept.

### 36-2. Award slides

**Company awards**: one slide per company. The template is duplicated once per company, and a scoped replacement applied to each. Company name, recipient name, seminar name, research title and company logo are inserted.

**Departmental awards**: the list of names is **automatically split across multiple columns**. The number of column placeholders in the template determines the column count, and the name list is divided evenly and poured in. When the number of recipients changes from year to year, swapping the template is enough.

**A technical trap**: the slide-reordering API requires that IDs be passed in their existing order, so a naive reorder fails. We got the visual order right by reversing the order of the duplicated IDs.

### 36-3. Booth guide slides

**One slide = one physical booth position.** On the premise that presenters for sessions 1–3 rotate through the same position, all three are collected onto a single sheet.

```
booth position number
session 1 presentation ID / presenter / seminar
session 2 presentation ID / presenter / seminar
session 3 presentation ID / presenter / seminar
```

This is exactly what the interview described: "the slip we stick above the poster, saying who presents on this board and when." **Translating the structure of a single sheet of paper into a data structure** — unglamorous, but essential work.

---

## 37. Spreadsheet export

The implementation of "make the DB the source of truth, and export to a spreadsheet in a shape the organisers find readable."

Three tabs (submissions, companies, awards) are written out **with Japanese headers**. If no destination is specified, a new sheet is created and shared automatically with whoever ran it.

### 37-1. Why one-way?

Being told in the interview that "it does not have to match the current spreadsheet's shape" confirmed that **the DB could be the single source of truth**. Bidirectional sync means complex conflict resolution and the risk of corrupting data. Restricting it to a one-way export gave us three benefits:

- the sync logic is simple and does not break
- someone hand-editing the spreadsheet cannot contaminate the DB
- the spreadsheet functions as "a backup, and the view the organisers are used to"

**Syncing is hard; exporting is easy.** Being able to agree on that distinction with the user was a big design win.

---

## 38. Poster archiving

### 38-1. Dual storage

```
[Local storage] always executed
  → used for the authenticated instant preview
  → expected to be deleted after the event closes

[External storage] only when configured
  → so organisers and faculty can work with files in their usual environment
  → on re-upload, the old file is deleted before registering the new one,
    maintaining "one person = one file"
```

Even if the external storage integration fails, **local storage is still treated as a success**. A student's submission must not be blocked by an outage in an external service. From the student's point of view, nothing is more unsettling than "I submitted it and got an error."

### 38-2. An implementation note

A service account has no storage quota of its own, so an administrator-owned folder must be prepared in advance and write permission granted to it. Implementing without knowing this results in quota errors. The kind of knowledge that belongs in documentation.

---

## 39. Reminder integration

A feature that extracts students who have not submitted and notifies them through a chat tool.

```
among students with a submission tied to the current event, extract those not complete
→ send if a notification target is configured
→ if unconfigured, record it in the history only, as "pending"
→ if sending fails, record it as "failed"
```

The extraction uses an inner join specifically **so that students from previous years are not mixed in**. The accident of chasing a graduate is prevented at the query level.

### 39-1. Current state and remaining work

| Intended | Current state |
| --- | --- |
| Automatic execution just before a deadline | **Not implemented.** Manual trigger only |
| Individual DM sending | Not implemented. Simple notifications only |
| On/off and message editing from the admin screen | Partial |
| Flow for collecting students' chat IDs | Not implemented |

This is the only feature left as "partially implemented". Introducing a bot into the campus chat tool requires an application process, and that was expected to proceed in parallel, so we deliberately pushed it back. The bottleneck here is not technical difficulty but **organisational sequencing**.
