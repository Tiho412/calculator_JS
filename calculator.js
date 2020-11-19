let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");

let init = () => {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", e => buttonClick(e.target.innerText));
};

let buttonClick = value => {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
};

let handleNumber = numberString => {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
};

let handleSymbol = symbol => {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      }
      buffer = buffer.substring(0, buffer.length - 1);
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      buffer = runningTotal;
      previousOperation = null;
      runningTotal = 0;
  }
};

let handleMath = symbol => {
  if (buffer === "0") {
    return;
  }
  let intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
};
let flushOperation = intBuffer => {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
};

init();
