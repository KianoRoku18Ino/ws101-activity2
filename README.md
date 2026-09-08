# WS101 Activity 2 — JavaScript Fundamentals & Simple Calculator

Four small vanilla JavaScript programs built for **Web Systems and Technologies 1 (WS101)**,
Quezon City University. No frameworks, no build tools — plain HTML, CSS, and JS.

**Split into separate pages per the instructor's clarification** that items A, B, and C
should each be their own file, not sections on one page.

## Live Demo

https://kianoroku18ino.github.io/ws101-activity2/

## What's inside

| Page | What it does |
| --- | --- |
| `260003GalaridoThreeNumberOps.html` | Sum, product, quotient, and remainder of three input numbers (quotient/remainder chained left to right, since those two only have a standard two-number meaning) |
| `260003GalaridoOddEven.html` | Checks whether an input integer is odd or even |
| `260003GalaridoGradeEquivalent.html` | Looks up the numerical grade, descriptive rating, and remarks for a percentage score, against its own copy of the reference table |
| `260003GalaridoCalculator.html` | Add, subtract, multiply, or divide two numbers, with a Reset button |
| `index.html` | Hub page — links to all four, also shows the reference table up front |

A reference table (the grading scale, transcribed exactly from the activity brief) appears
on `index.html` and again on the Grade Equivalent page, since that's the one the lookup
logic is actually built on. Every task page ends with a collapsible "Show the code & how
it works" section — closed by default, click to expand.

A music-toggle button in the top-right corner of every page plays/pauses
`assets/audio/background-music.mp3` on click — off by default, nothing plays until it's
pressed. Each page controls its own `<audio>` element independently — switching pages
stops the music, since there's no shared player across page loads on a plain static site.

See `STUDY-GUIDE.md` for a full tag-by-tag, concept-by-concept breakdown of everything
used in the source, for quiz/defense review.

## File Structure

```
index.html                              — hub page (nav + reference table + links)
260003GalaridoThreeNumberOps.html/.js   — Task A, self-contained
260003GalaridoOddEven.html/.js          — Task B, self-contained
260003GalaridoGradeEquivalent.html/.js  — Task C, self-contained
260003GalaridoCalculator.html/.js       — Task 2, self-contained
260003GalaridoActivity2Style.css        — shared stylesheet (letterhead, nav, cards, all five pages)
common.js                               — shared script (music toggle only — every page's own
                                           math/logic lives in that page's own .js file)
assets/images/                          — QCU and CCS seals used in the letterhead
assets/audio/background-music.mp3       — background track (toggle, off by default)
STUDY-GUIDE.md                          — tag/concept-by-concept breakdown for review
```

No separate GitHub-Pages-only copies this time — `index.html` is a genuine hub page now
that there are multiple task pages to link between, not a duplicate of a single one.

## Tech

Plain HTML5 + CSS3 + vanilla JS (no libraries). Google Fonts (Inter, JetBrains Mono).
Letterhead uses QCU's navy/gold palette; each calculator-style card keeps the light theme
and green actions shown in the activity brief's own mockup.

---

_Compiled by KianoRoku18Ino_
