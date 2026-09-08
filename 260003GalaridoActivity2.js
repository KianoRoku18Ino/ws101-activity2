/* ============================================================
   260003GalaridoActivity2.js
   WS101 Activity 2 — JavaScript Fundamentals + Simple Calculator
   No inline event handlers — every listener is attached down in
   the "EVENT WIRING" section at the bottom, once the DOM is ready.
   ============================================================ */

/* ============================================================
   TASK 1A — Sum, Product, Quotient, Remainder of 3 input numbers
   ============================================================ */

/**
 * computeThreeNumberOps
 * Computes the sum, product, quotient, and remainder across three
 * numbers. Sum and product are unambiguous for 3 numbers (a+b+c,
 * a*b*c). Quotient and remainder are not — division only has a
 * standard meaning for two numbers — so this chains left to right:
 * quotient = (a / b) / c, remainder = (a % b) % c. That choice is
 * shown to the user in the result, not hidden.
 * @param {number} a - first input
 * @param {number} b - second input
 * @param {number} c - third input
 * @returns {{sum: number, product: number, quotient: number, remainder: number}}
 */
function computeThreeNumberOps(a, b, c) {
  const sum = a + b + c;
  const product = a * b * c;
  const quotient = a / b / c;   // chained left to right: (a / b) / c
  const remainder = (a % b) % c; // chained left to right: (a % b) % c
  return { sum, product, quotient, remainder };
}

/**
 * handleThreeNumberOps
 * Reads the three number inputs for Task 1a, validates them, runs
 * computeThreeNumberOps, and writes a formatted result — or a
 * validation message — into the result box.
 * @param {void}
 * @returns {void}
 */
function handleThreeNumberOps() {
  const a = parseFloat(document.getElementById("opsInputA").value);
  const b = parseFloat(document.getElementById("opsInputB").value);
  const c = parseFloat(document.getElementById("opsInputC").value);
  const result = document.getElementById("opsResult");

  if ([a, b, c].some((n) => Number.isNaN(n))) {
    result.textContent = "Please fill in all three numbers.";
    return;
  }

  const { sum, product, quotient, remainder } = computeThreeNumberOps(a, b, c);
  result.textContent =
    `Sum: ${sum}\n` +
    `Product: ${product}\n` +
    `Quotient (a / b / c): ${quotient}\n` +
    `Remainder (a % b % c): ${remainder}`;
}

/* ============================================================
   TASK 1B — Odd or Even
   ============================================================ */

/**
 * isEvenNumber
 * Determines whether a number is even.
 * @param {number} n - the number to test
 * @returns {boolean} true if n is even, false if odd
 */
function isEvenNumber(n) {
  return n % 2 === 0;
}

/**
 * handleOddEvenCheck
 * Reads the Task 1b input, validates it, and reports odd or even.
 * @param {void}
 * @returns {void}
 */
function handleOddEvenCheck() {
  const n = parseFloat(document.getElementById("oddEvenInput").value);
  const result = document.getElementById("oddEvenResult");

  if (Number.isNaN(n)) {
    result.textContent = "Please enter a number.";
    return;
  }
  if (!Number.isInteger(n)) {
    result.textContent = `${n} is not a whole number — odd/even only applies to integers.`;
    return;
  }

  result.textContent = `${n} is ${isEvenNumber(n) ? "EVEN" : "ODD"}.`;
}

/* ============================================================
   TASK 1C — Grade Equivalent
   Table transcribed exactly from the activity brief.
   ============================================================ */

/**
 * GRADE_TABLE
 * Each row's `min` is the lower bound (inclusive) of that percentage
 * band, read top to bottom against a descending score so the first
 * row a score qualifies for is the correct one.
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
// Note: the brief's table also lists a "Passing level: INC — Incomplete —
// Conditional" row. That's not a percentage band (it covers a missing/
// incomplete score, not a numeric one), so it isn't reachable from a
// percentage input and is intentionally left out of this lookup rather
// than silently dropped.

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
 * Reads the Task 1c input, validates it's a 0-100 percentage, and
 * displays the matching numerical grade, rating, and remarks.
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

/* ============================================================
   TASK 2 — Simple Calculator
   ============================================================ */

/**
 * calculate
 * Applies the chosen operator to two numbers.
 * @param {number} first - first operand
 * @param {number} second - second operand
 * @param {string} operator - one of "+", "-", "*", "/"
 * @returns {number|string} the numeric result, or an error string
 *   (e.g. for division by zero)
 */
function calculate(first, second, operator) {
  switch (operator) {
    case "+": return first + second;
    case "-": return first - second;
    case "*": return first * second;
    case "/":
      if (second === 0) return "Undefined (division by zero)";
      return first / second;
    default:
      return "Unknown operator";
  }
}

/**
 * handleCalculate
 * Reads both calculator inputs and the operator dropdown, validates
 * them, and writes the result into the Result line.
 * @param {void}
 * @returns {void}
 */
function handleCalculate() {
  const first = parseFloat(document.getElementById("calcFirst").value);
  const second = parseFloat(document.getElementById("calcSecond").value);
  const operator = document.getElementById("calcOperator").value;
  const result = document.getElementById("calcResult");

  if (Number.isNaN(first) || Number.isNaN(second)) {
    result.textContent = "Please enter both numbers.";
    return;
  }

  result.textContent = `Result: ${calculate(first, second, operator)}`;
}

/**
 * handleReset
 * Clears both calculator inputs, resets the operator to its default,
 * and empties the result line.
 * @param {void}
 * @returns {void}
 */
function handleReset() {
  document.getElementById("calcFirst").value = "";
  document.getElementById("calcSecond").value = "";
  document.getElementById("calcOperator").selectedIndex = 0;
  document.getElementById("calcResult").textContent = "";
}

/* ============================================================
   EVENT WIRING — attached here, not as inline onclick attributes
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("opsBtn").addEventListener("click", handleThreeNumberOps);
  document.getElementById("oddEvenBtn").addEventListener("click", handleOddEvenCheck);
  document.getElementById("gradeBtn").addEventListener("click", handleGradeLookup);
  document.getElementById("calcBtn").addEventListener("click", handleCalculate);
  document.getElementById("resetBtn").addEventListener("click", handleReset);
});
