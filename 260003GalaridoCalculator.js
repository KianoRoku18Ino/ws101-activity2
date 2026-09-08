/* ============================================================
   260003GalaridoCalculator.js
   Basic four-function calculator.
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
 * Reads both inputs and the operator dropdown, validates them, and
 * writes the result into the Result line.
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
 * Clears both inputs, resets the operator to its default, and empties
 * the result line.
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
