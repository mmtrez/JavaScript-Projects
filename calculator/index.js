"use strict";
const digitsEl = document.querySelectorAll('button[data-action="digit"]');
const operatorsEl = document.querySelectorAll('button[data-action="operator"]');
const clearBtnEl = document.querySelector('button[data-action="clear"]');
const backSpaceBtnEl = document.querySelector(
  'button[data-action="backspace"]'
);
let fDigit, operator, sDigit;

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
  console.log(res);
};

operate("2", "+", "3");
operate("2", "-", "3");
operate("2", "x", "3");
operate("2", "÷", "3");

digitsEl.forEach((digitEl) =>
  digitEl.addEventListener("click", (e) => {
    if (fDigit) sDigit = e.target.value;
    else fDigit = e.target.value;
  })
);

operatorsEl.forEach((operatorEl) =>
  operatorEl.addEventListener("click", (e) => {
    if (e.target.value === "=") return operate(fDigit, operator, sDigit);
    else operator = operator || e.target.value;
  })
);

clearBtnEl.addEventListener("click", (e) => {
  console.log("clear");
});

backSpaceBtnEl.addEventListener("click", (e) => {
  console.log("backspace");
});
