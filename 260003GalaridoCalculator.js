/* ============================================================
   260003GalaridoCalculator.js
   WS101 Activity 2, Item 2 | Karl Ian Ranay Galarido

   My four-function calculator, matching the mockup the brief actually
   showed. calculate() only does math; handleCalculate() and
   handleReset() are the only two functions that touch the page.
   ============================================================ */

/**
 * calculate
 * Runs whichever operator the dropdown is set to. I used a switch
 * here instead of if/else-if because every branch is testing the same
 * one value (operator) — that's exactly the case switch is built for.
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
      // dividing by zero has no real numeric answer, so I check for
      // it explicitly instead of letting JS silently hand back
      // Infinity or NaN
      if (second === 0) return "Undefined (division by zero)";
      return first / second;
    default:
      return "Unknown operator";
  }
}

/**
 * handleCalculate
 * Reads both number fields and the operator dropdown, makes sure both
 * numbers actually parsed, and writes the result onto the page.
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
 * Clears both fields, puts the operator dropdown back to its first
 * option, and empties the result line — my Reset button's whole job.
 * @param {void}
 * @returns {void}
 */
function handleReset() {
  document.getElementById("calcFirst").value = "";
  document.getElementById("calcSecond").value = "";
  document.getElementById("calcOperator").selectedIndex = 0;
  document.getElementById("calcResult").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calcBtn").addEventListener("click", handleCalculate);
  document.getElementById("resetBtn").addEventListener("click", handleReset);
});
