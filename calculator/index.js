"use strict";
// Nodes
const digitsEl = document.querySelectorAll('button[data-action="digit"]');
const operatorsEl = document.querySelectorAll('button[data-action="operator"]');
const clearBtnEl = document.querySelector('button[data-action="clear"]');
const backSpaceBtnEl = document.querySelector(
  'button[data-action="backspace"]'
);
const displayEl = document.getElementById("display");
const inputEl = document.getElementById("calc-input");

// Variables
let fDigit = "",
  operator = "",
  sDigit = "",
  temp = 0;

// Set and Get Defaults

// Functions
const sum = (a, b) => {
  return +a + +b;
};

const subtract = (a, b) => {
  return +a - +b;
};

const multiply = (a, b) => {
  return +a * +b;
};

const division = (a, b) => {
  return +a / +b;
};

const operate = (a, op, b) => {
  const res =
    op === "+"
      ? sum(a, b)
      : op === "-"
      ? subtract(a, b)
      : op === "x"
      ? multiply(a, b)
      : division(a, b);
  console.log(`${a} ${op} ${b} = ${res}`);
  return res;
};

// Events
digitsEl.forEach((digitEl) =>
  digitEl.addEventListener("click", (e) => {
    console.log(e.target.value);
    if (operator) {
      sDigit += e.target.value;
      inputEl.value += e.target.value;
    } else {
      fDigit += e.target.value;
      inputEl.value += e.target.value;
    }
  })
);

operatorsEl.forEach((operatorEl) =>
  operatorEl.addEventListener("click", (e) => {
    console.log(e.target.value);
    if (e.target.value === "=") {
      displayEl.textContent = "";
      inputEl.value = operate(fDigit, operator, sDigit);
    } else if (operator) {
      fDigit = operate(fDigit, operator, sDigit);
      sDigit = "";
      operator = e.target.value;
      displayEl.textContent += inputEl.value + " " + e.target.value + " ";
      inputEl.value = "";
    } else {
      operator = e.target.value;
      displayEl.textContent += inputEl.value + " " + e.target.value + " ";
      inputEl.value = "";
    }
  })
);

clearBtnEl.addEventListener("click", (e) => {
  fDigit = "";
  sDigit = "";
  operator = "";
  displayEl.textContent = "";
  inputEl.value = "";
});

backSpaceBtnEl.addEventListener("click", (e) => {
  console.log("backspace");
});
