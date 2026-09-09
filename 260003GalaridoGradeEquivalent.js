/* ============================================================
   260003GalaridoGradeEquivalent.js
   WS101 Activity 2, Item C | Karl Ian Ranay Galarido

   I typed the brief's grading table in as an array of objects instead
   of writing ten separate if/else-if branches — it's the same
   information, but this way the table on the page and the table in my
   code are shaped the same way, so it's easy to check one against the
   other by eye.
   ============================================================ */

/**
 * GRADE_TABLE
 * Every row's `min` is the lowest score that row still counts for. I
 * ordered this highest-to-lowest on purpose, since that's what lets
 * getGradeEquivalent() below just grab the first match instead of
 * needing to search the whole array.
 */
const GRADE_TABLE = [
  { min: 96.50, grade: 1.00, rating: "Excellent", remarks: "Passed" },
  { min: 92.50, grade: 1.25, rating: "Very Good", remarks: "Passed" },
  { min: 88.50, grade: 1.50, rating: "Very Good", remarks: "Passed" },
  { min: 84.50, grade: 1.75, rating: "Good", remarks: "Passed" },
  { min: 80.50, grade: 2.00, rating: "Good", remarks: "Passed" },
  { min: 76.50, grade: 2.25, rating: "Satisfactory", remarks: "Passed" },
  { min: 72.50, grade: 2.50, rating: "Satisfactory", remarks: "Passed" },
  { min: 68.50, grade: 2.75, rating: "Fair", remarks: "Passed" },
  { min: 64.50, grade: 3.00, rating: "Fair", remarks: "Passed" },
  { min: -Infinity, grade: 5.00, rating: "Poor", remarks: "Failed" },
];
// I left the brief's "Passing level: INC — Incomplete — Conditional"
// row out of this array on purpose. Every other row is a percentage
// band; that one covers a missing score instead, so there's no actual
// number that would ever match it here. I still show it on the page
// itself (in the visible reference table), just not in this lookup.

/**
 * getGradeEquivalent
 * Walks my table top to bottom and grabs the first row a score still
 * qualifies for. Because the table is sorted highest-first, the first
 * match I hit is always the right one.
 * @param {number} score - final percentage score, 0-100
 * @returns {{min: number, grade: number, rating: string, remarks: string}}
 */
function getGradeEquivalent(score) {
  return GRADE_TABLE.find((row) => score >= row.min);
}

/**
 * handleGradeLookup
 * Reads my score input, checks it's actually a valid percentage, and
 * writes the matching grade/rating/remarks onto the page.
 * @param {void}
 * @returns {void}
 */
function handleGradeLookup() {
  const score = parseFloat(document.getElementById("gradeInput").value);
  const result = document.getElementById("gradeResult");

  if (Number.isNaN(score) || score < 0 || score > 100) {
    result.textContent = "Please enter a percentage score between 0 and 100.";
    return;
  }

  const { grade, rating, remarks } = getGradeEquivalent(score);
  result.textContent =
    `Numerical Grade: ${grade.toFixed(2)}\n` +
    `Descriptive Rating: ${rating}\n` +
    `Remarks: ${remarks}`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("gradeBtn").addEventListener("click", handleGradeLookup);
});
