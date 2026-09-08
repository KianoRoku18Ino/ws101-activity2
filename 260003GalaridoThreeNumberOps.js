/* ============================================================
   260003GalaridoThreeNumberOps.js
   Sum, product, quotient, and remainder of three input numbers.
   ============================================================ */

/**
 * computeThreeNumberOps
 * Computes the sum, product, quotient, and remainder across three
 * numbers. Sum and product are unambiguous for 3 numbers (a+b+c,
 * a*b*c). Quotient and remainder are not — division only has a
 * standard meaning for two numbers — so this chains left to right:
 * quotient = (a / b) / c, remainder = (a % b) % c.
 * @param {number} a - first input
 * @param {number} b - second input
 * @param {number} c - third input
 * @returns {{sum: number, product: number, quotient: number, remainder: number}}
 */
function computeThreeNumberOps(a, b, c) {
  const sum = a + b + c;
  const product = a * b * c;
  const quotient = a / b / c;
  const remainder = (a % b) % c;
  return { sum, product, quotient, remainder };
}

/**
 * handleThreeNumberOps
 * Reads the three number inputs, validates them, runs
 * computeThreeNumberOps, and writes a formatted result.
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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("opsBtn").addEventListener("click", handleThreeNumberOps);
});
