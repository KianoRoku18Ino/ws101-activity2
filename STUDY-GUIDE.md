# Study Guide — WS101 Activity 2

Every HTML tag, CSS feature, and JavaScript concept actually used across this project's
five pages (`index.html` plus the four task pages, their shared
`260003GalaridoActivity2Style.css`, `common.js`, and each page's own `.js`), organized by
what it does and where it shows up. This is a reference for the code as it exists right
now — not a general language reference (see the `html-css-js-mastery-reference` project
for that).

**Why five pages instead of one:** the instructor clarified that items A, B, and C should
each be a separate file rather than sections on one page — so each task now has its own
HTML/JS pair, tied together by a shared stylesheet and a nav bar rather than one long
scrolling document.

## 1. Document Structure

Same core metadata pattern as the portfolio project — `<!DOCTYPE html>`, `<html lang="en">`,
`<meta charset="UTF-8">`, `<meta name="viewport">`, external `<link rel="stylesheet">`,
external `<script src>` — nothing inline. See the portfolio's own study guide for why each
of those matters if a refresher is needed.

## 2. Semantic Layout

| Tag | Used for |
|---|---|
| `<header class="letterhead">` | The QCU/CCS seal block at the top |
| `<header class="page-header">` | Name/student-number line under the letterhead |
| `<nav class="site-nav">` | The five-link bar between pages — duplicated on every page since this is a static multi-page site with no shared include; each page hardcodes which of its own links is `class="current"` |
| `<main>` | Everything else — the reference table and all four task cards |
| `<section>` | One per task card, plus one for the reference table, each with `aria-labelledby` pointing at its own heading |
| `<footer>` | The closing credit line |

Two `<header>` elements are valid here — a page can have more than one, each scoped to
its nearest sectioning ancestor. Both belong directly to `<body>` here, so both are
page-level headers, just for two different pieces of information (institutional
letterhead vs. student identification).

## 3. Tables — Real Tabular Data

`<table>` with `<thead>`/`<tbody>`, `<th>`, `<tr>`, `<td>` is used once, for the grading
scale transcribed from the activity brief — a genuine row × column relationship (score
band × grade/rating/remarks), which is exactly what `<table>` exists to represent.

## 4. `<details>` / `<summary>` — Native Show/Hide, No JavaScript

Every task card ends with a collapsible "Show the code & how it works" block. `<details>`
is closed by default; clicking its `<summary>` child toggles it open — the browser
handles the show/hide state natively, no click listener or `display: none` toggling
needed. The `[open]` CSS attribute selector is what flips the ▸/▾ marker in
`260003GalaridoActivity2.css`.

## 5. Forms — Inputs Used

| Type | Where | Notable attributes |
|---|---|---|
| `type="number"` | Every numeric field | `step="any"` allows decimals; `step="1"` on the odd/even input restricts it to whole numbers; `min`/`max` on the grade input caps it to 0–100 |
| `<select>` / `<option>` | The calculator's operator picker | `value` is the actual operator symbol the JS reads directly — no separate lookup needed |

Every `<input>` has a matching `<label for="...">` — clicking the label focuses the
field, and a screen reader announces the label when the field receives focus.

## 6. JavaScript Concepts

### Variables & data
- **`const` over `let`** everywhere a value doesn't need to change after it's set —
  every computed result, every DOM reference. Signals intent: "this won't be reassigned."
- **Object literals** — `computeThreeNumberOps` returns one object (`{ sum, product,
  quotient, remainder }`) instead of four separate return values, then the caller
  destructures it: `const { sum, product, quotient, remainder } = computeThreeNumberOps(...)`.
- **Arrays of objects** — `GRADE_TABLE` is an array of `{ min, grade, rating, remarks }`
  objects, one per row of the reference table — data shaped to match the table it
  represents, instead of ten separate `if` conditions.

### Operators
- **Arithmetic**: `+ - * /` for the calculator and the sum/product/quotient chain.
- **Modulo (`%`)**: the odd/even check (`n % 2 === 0`) and the chained remainder
  (`(a % b) % c`).
- **Strict equality (`===`)**: used throughout instead of `==`, so `"2" === 2` correctly
  reads as `false` — no implicit type coercion deciding the comparison.
- **Ternary (`? :`)**: `isEvenNumber(n) ? "EVEN" : "ODD"` — a one-line if/else for a
  single expression.

### Control flow
- **`if` / early `return`** — every handler function checks for invalid input first and
  returns immediately, instead of nesting the "real" logic inside an `else`.
- **`switch`** — the calculator's operator dispatch; one `case` per operator symbol,
  cleaner than an `if/else if` chain when every branch is testing the same value.

### Functions
- Every function is declared with `function name(...) { }` (not an arrow function
  assigned to a `const`) and documented with a comment block above it stating its
  purpose, parameters, and return value — the project's stated code-quality convention.
- **Pure vs. handler functions** — `computeThreeNumberOps`, `isEvenNumber`,
  `getGradeEquivalent`, and `calculate` only take inputs and return outputs; they never
  touch the DOM. The `handle*` functions are the only ones that read `document.getElementById`
  or write into a result box. Keeping the math separate from the page-reading/writing
  makes each piece easier to test and easier to reason about on its own.

### Arrays
- **`Array.prototype.find()`** — `GRADE_TABLE.find((row) => score >= row.min)` walks the
  table top to bottom and returns the first row that matches, relying on the array
  already being sorted highest-band-first.
- **`Array.prototype.some()`** — `[a, b, c].some((n) => Number.isNaN(n))` checks whether
  *any* of the three inputs failed to parse, in one line instead of three separate
  `isNaN` checks joined with `||`.

### DOM & events
- **`document.getElementById`** — every read/write to the page goes through this; no
  jQuery or other library.
- **`addEventListener("click", ...)`** — every button's behavior is wired in one place
  at the bottom of the script (`DOMContentLoaded`), not scattered as inline `onclick=""`
  attributes across the HTML.
- **`textContent`** — used instead of `innerHTML` for writing results, since the result
  text never contains actual HTML markup that needs to render — `textContent` is both
  simpler and avoids any injection risk from treating text as markup.
- **Template literals** — `` `${n} is ${isEvenNumber(n) ? "EVEN" : "ODD"}.` `` for
  building result strings, instead of string concatenation with `+`.

### Validation
- **`Number.isNaN()`** — checks whether `parseFloat()` failed to read a number from an
  empty or non-numeric field. Used instead of the older global `isNaN()`, which
  coerces its argument first and can give surprising answers for non-number types.
- **`Number.isInteger()`** — the odd/even check rejects decimal input, since "odd or
  even" isn't defined for non-whole numbers.

### The `<audio>` element & playback control
- `<audio id="bgMusic" src="..." loop preload="none">` — no `autoplay` attribute, so the
  track never starts on its own; `preload="none"` also skips downloading the file until
  playback is actually requested.
- **`audio.play()` / `audio.pause()`** — called from the music-toggle button's click
  handler. Browsers block unrequested autoplay, but a real click is "user interaction,"
  which is what allows `.play()` to succeed here.
- **`.catch()` on `audio.play()`** — `play()` returns a Promise that rejects if playback
  fails (e.g. no audio file present yet); the empty `.catch()` swallows that error
  quietly instead of throwing it to the console, so a missing file doesn't break the
  rest of the page.

## 7. CSS Features Used

- **CSS custom properties (`--qcu-navy`, `--qcu-gold`)** — defined once on `:root`, reused
  across the letterhead, task-card accents, and reference table so the palette only has
  to change in one place.
- **`nth-child(even)`** — the reference table's zebra striping.
- **Attribute selector (`[open]`)** — styles the `<details>` marker differently once it's
  expanded.
- **`::before` / `::-webkit-details-marker`** — replaces the browser's default disclosure
  triangle with a custom ▸/▾ character, since the default marker can't be recolored
  directly.
- **`position: fixed`** — the music-toggle button, pinned to the viewport corner
  regardless of scroll position.
- **`aria-live="polite"`** on every `.result` box — announces new results to screen
  readers without needing a page reload or focus change.

---

_Compiled by KianoRoku18Ino_
