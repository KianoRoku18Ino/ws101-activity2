/* ============================================================
   260003GalaridoGradeEquivalent.js
   Looks up numerical grade, descriptive rating, and remarks for a
   percentage score, against the table transcribed from the brief.
   ============================================================ */

/**
 * GRADE_TABLE
 * Each row's `min` is the lower bound (inclusive) of that percentage
 * band, ordered highest-to-lowest so Array.find() below can stop at
 * the first row a given score still qualifies for.
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
// The brief's table also lists a "Passing level: INC — Incomplete —
// Conditional" row (shown in the reference table on this page). That
// covers a missing score, not a percentage band, so it isn't reachable
// from a percentage input and is intentionally left out of this array.

/**
 * getGradeEquivalent
 * Finds the first GRADE_TABLE row whose min threshold the score meets.
 * @param {number} score - final percentage score, 0-100
 * @returns {{min: number, grade: number, rating: string, remarks: string}}
 */
function getGradeEquivalent(score) {
  return GRADE_TABLE.find((row) => score >= row.min);
}

/**
 * handleGradeLookup
 * Reads the input, validates it's a 0-100 percentage, and displays
 * the matching numerical grade, rating, and remarks.
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
