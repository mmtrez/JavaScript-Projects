"use strict"; // Nodes
// const digitsEl = document.querySelectorAll('button[data-action="digit"]');
const operatorsEl = document.querySelectorAll('button[data-action="operator"]');
const clearBtnEl = document.querySelector('button[data-action="clear"]');
const backSpaceBtnEl = document.querySelector(
  'button[data-action="backspace"]'
);
const displayEl = document.getElementById("display");
const inputEl = document.getElementById("calc-input");
const buttonsContainer = document.querySelector(".buttons-container");

// Buttons Events
buttonsContainer.addEventListener("click", ({ target: btn }) => {
  if (btn.dataset.action === "digit") handleDigitClicked(btn.textContent);
  else if (btn.dataset.action === "operator")
    handleOperatorClicked(btn.textContent);
  else if (btn.dataset.action === "backspace") handleBackSpace();
  else if (btn.dataset.action === "clear") handleAllClear();
  else if (btn.dataset.action === "equal") handleCalculation();
});

// Keyboard Events
window.addEventListener("keydown", ({ key }) => {
  key === "*" ? (key = "x") : key === "/" ? (key = "÷") : "";
  console.log(key);
  if (isDigit(key)) handleDigitClicked(key);
  else if (isOperator(key)) handleOperatorClicked(key);
  else if (key === "Backspace") handleBackSpace();
  else if (key === "Escape") handleAllClear();
});

const handleDigitClicked = (val) => {
  inputEl.value += val;
};

const handleOperatorClicked = (op) => {
  if (isOperator(inputEl.value.at(-1)) || inputEl.value === "") return;
  else inputEl.value += op.trim("");
};

const handleBackSpace = () => {
  const curVal = inputEl.value;
  inputEl.value = curVal.slice(0, curVal.length - 1);
};

const handleAllClear = () => (inputEl.value = "");

const multiplication = (arr, index) => {
  return +arr[index - 1] * +arr[index + 1];
};

const division = (arr, index) => {
  return +arr[index - 1] / +arr[index + 1];
};

const addition = (arr, index) => {
  return +arr[index - 1] + +arr[index + 1];
};

const subtraction = (arr, index) => {
  return +arr[index - 1] - +arr[index + 1];
};

const getPrePostStr = (arr, index) => {
  const preStr = arr.slice(0, index - 1);
  const postStr = arr.slice(index + 2, arr.length);
  return { preStr, postStr };
};

const handleCalculation = () => {
  let inputStr = inputEl.value;
  let inputArr = inputStr.split(/([-,x,+,÷])/g);
  console.log(inputArr);

  // handle multiplication and division first
  for (let i = 0; inputArr.some((char) => char === "x" || char === "÷"); i++) {
    if (inputArr[i] === "x" || inputArr[i] === "÷") {
      const { preStr, postStr } = getPrePostStr(inputArr, i);
      const solve =
        inputArr[i] === "x"
          ? multiplication(inputArr, i)
          : inputArr[i] === "÷"
          ? division(inputArr, i)
          : "";
      inputArr = [...preStr, solve, ...postStr];
      console.log(inputArr);
    }
  }

  // handle addition and subtraction
  for (let i = 0; inputArr.some((char) => char === "+" || char === "-"); i++) {
    if (inputArr[i] === "+" || inputArr[i] === "-") {
      const { preStr, postStr } = getPrePostStr(inputArr, i);
      const solve =
        inputArr[i] === "+"
          ? addition(inputArr, i)
          : inputArr[i] === "-"
          ? subtraction(inputArr, i)
          : "";
      inputArr = [...preStr, solve, ...postStr];
      console.log(inputArr);
    }
  }
  displayEl.textContent = inputArr.join("");
  inputEl.value = "";
};

const isOperator = (val) => {
  if (val === "+" || val === "-" || val === "x" || val === "÷") return true;
  else return false;
};

const isDigit = (val) => {
  return !isNaN(val);
};
