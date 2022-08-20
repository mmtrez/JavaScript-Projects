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
let temp = "";
let state = "";

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
  return res;
};

const isDigit = (value) => {
  return value && !isNaN(value);
};

const myEval = (task) => {
  const { digits, operators } = task.split(/([+,-,x,÷])/g).reduce(
    (obj, value) => {
      isDigit(value) ? obj.digits.push(value) : obj.operators.push(value);
      return obj;
    },
    {
      digits: [],
      operators: [],
    }
  );

  const { result } = operators.reduce(
    (obj, operator) => {
      obj.result = operate(obj.result, operator, digits[obj.index + 1]);
      obj.index++;
      return obj;
    },
    {
      result: digits[0],
      index: 0,
    }
  );

  return result;
};

// Events
digitsEl.forEach((digitEl) =>
  digitEl.addEventListener("click", (e) => {
    if (state === "done") {
      // after pressing =
      temp = e.target.value;
      state = "";
      displayEl.textContent = "";
    } else {
      // = has not been pressed
      temp += e.target.value;
    }
    inputEl.value = temp;
  })
);

operatorsEl.forEach((operatorEl) =>
  operatorEl.addEventListener("click", (e) => {
    const tempLastChar = temp[temp.length - 1];
    if (e.target.value === "=") {
      displayEl.textContent = inputEl.value;
      inputEl.value = myEval(temp);
      temp = inputEl.value;
      state = "done";
    } else if (isDigit(tempLastChar)) {
      state === "done" && (state = "");
      temp += e.target.value;
      inputEl.value = temp;
    }
  })
);

clearBtnEl.addEventListener("click", (e) => {
  temp = "";
  inputEl.value = "";
  displayEl.textContent = "";
});

backSpaceBtnEl.addEventListener("click", (e) => {
  temp = temp.slice(0, temp.length - 1); // remove last char
  inputEl.value = temp;
});
