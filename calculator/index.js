"use strict";
const digitsEl = document.querySelectorAll('button[data-action="digit"]');
const operatorsEl = document.querySelectorAll('button[data-action="operator"]');
const clearBtnEl = document.querySelector('button[data-action="clear"]');
const backSpaceBtnEl = document.querySelector(
  'button[data-action="backspace"]'
);
const displayEl = document.getElementById("display");
const inputEl = document.getElementById("calc-input");
let fDigit = "",
  operator = "",
  sDigit = "",
  temp = 0;

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

digitsEl.forEach((digitEl) =>
  digitEl.addEventListener("click", (e) => {
    console.log(e.target.value);
    if (operator) sDigit += e.target.value;
    else fDigit += e.target.value;
  })
);

operatorsEl.forEach((operatorEl) =>
  operatorEl.addEventListener("click", (e) => {
    console.log(e.target.value);
    if (e.target.value === "=") operate(fDigit, operator, sDigit);
    else if (operator) {
      fDigit = operate(fDigit, operator, sDigit);
      sDigit = "";
      operator = e.target.value;
    } else operator = e.target.value;
  })
);

clearBtnEl.addEventListener("click", (e) => {
  console.log("clear");
});

backSpaceBtnEl.addEventListener("click", (e) => {
  console.log("backspace");
});
