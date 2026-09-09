/* ============================================================
   260003GalaridoThreeNumberOps.js
   WS101 Activity 2, Item A | Karl Ian Ranay Galarido

   Everything this one page needs — I kept computeThreeNumberOps()
   separate from handleThreeNumberOps() on purpose: the first function
   only does math and never touches the page, the second only reads
   the page and never does math itself. That way if I ever need to
   double-check my arithmetic, I can test computeThreeNumberOps() on
   its own without needing a browser open at all.
   ============================================================ */

/**
 * computeThreeNumberOps
 * Sum and product of three numbers are obvious extensions of the
 * two-number version — a+b+c, a*b*c. Quotient and remainder aren't;
 * division only has one standard meaning for TWO numbers, so I had to
 * decide myself how to extend it to three. I chose to chain left to
 * right, the same order I'd naturally read the expression in:
 * quotient = (a / b) / c, remainder = (a % b) % c.
 * @param {number} a - first input
 * @param {number} b - second input
 * @param {number} c - third input
 * @returns {{sum: number, product: number, quotient: number, remainder: number}}
 */
function computeThreeNumberOps(a, b, c) {
  const sum = a + b + c;
  const product = a * b * c;
  const quotient = a / b / c;   // my chosen reading: (a / b) / c
  const remainder = (a % b) % c; // same idea: (a % b) % c
  return { sum, product, quotient, remainder };
}

/**
 * handleThreeNumberOps
 * Reads my three number fields, checks that none of them are empty,
 * runs the actual math above, and writes the results into the page.
 * @param {void}
 * @returns {void}
 */
function handleThreeNumberOps() {
  const a = parseFloat(document.getElementById("opsInputA").value);
  const b = parseFloat(document.getElementById("opsInputB").value);
  const c = parseFloat(document.getElementById("opsInputC").value);
  const result = document.getElementById("opsResult");

  // parseFloat() on an empty field returns NaN, not an error I can
  // catch — .some() lets me check all three inputs at once instead of
  // writing three separate if-checks
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

// wiring my button up here, not as onclick="" in the HTML — keeps
// every bit of behavior in this one file instead of scattered across
// both files
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("opsBtn").addEventListener("click", handleThreeNumberOps);
});
