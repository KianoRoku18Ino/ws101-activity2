/* ============================================================
   260003GalaridoOddEven.js
   WS101 Activity 2, Item B | Karl Ian Ranay Galarido

   The shortest of my four scripts — odd/even really only needs one
   operator, so I kept the actual test and the page-reading/writing
   in two small functions instead of cramming it into one.
   ============================================================ */

/**
 * isEvenNumber
 * My whole test for this task: dividing an even number by 2 always
 * leaves a remainder of 0, dividing an odd number never does.
 * @param {number} n - the number to test
 * @returns {boolean} true if n is even, false if odd
 */
function isEvenNumber(n) {
  return n % 2 === 0;
}

/**
 * handleOddEvenCheck
 * Reads my one input, makes sure it's a real whole number, and
 * reports odd or even.
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
  // odd/even isn't defined for something like 3.5 — I decided the
  // honest answer here is to say so, not just silently round it
  if (!Number.isInteger(n)) {
    result.textContent = `${n} is not a whole number — odd/even only applies to integers.`;
    return;
  }

  result.textContent = `${n} is ${isEvenNumber(n) ? "EVEN" : "ODD"}.`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("oddEvenBtn").addEventListener("click", handleOddEvenCheck);
});
