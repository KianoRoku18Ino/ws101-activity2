/* ============================================================
   260003GalaridoOddEven.js
   Checks whether an input integer is odd or even.
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
 * Reads the input, validates it, and reports odd or even.
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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("oddEvenBtn").addEventListener("click", handleOddEvenCheck);
});
