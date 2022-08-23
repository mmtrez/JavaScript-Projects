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
  const res = +a + +b;
  return res > 0 ? res : `neg${Math.abs(res)}`;
};

const subtract = (a, b) => {
  const res = +a - +b;
  return res > 0 ? res : `neg${Math.abs(res)}`;
};

const multiply = (a, b) => {
  const res = +a * +b;
  return res > 0 ? res : `neg${Math.abs(res)}`;
};

const division = (a, b) => {
  const res = +a / +b;
  return res > 0 ? res : `neg${Math.abs(res)}`;
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

const isOperator = (value) => {
  if (
    value.includes("+") ||
    value.includes("-") ||
    value.includes("x") ||
    value.includes("÷")
  )
    return true;
  else return false;
};

const myEval = (task) => {
  const { digits, operators } = task.split(/([-,x,+,÷])/g).reduce(
    (obj, value) => {
      if (isOperator(value)) obj.operators.push(value);
      else {
        if (value.includes("neg"))
          obj.digits.push(`-${value.substring(value.indexOf("g") + 1)}`);
        else obj.digits.push(value);
      }
      return obj;
    },
    {
      digits: [],
      operators: [],
    }
  );

  console.log(digits, operators);

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
    if (e.target.value === "=" && isDigit(tempLastChar) && state !== "done") {
      displayEl.textContent = inputEl.value;
      inputEl.value = myEval(temp);
      temp = inputEl.value;
      state = "done";
    } else if (isDigit(tempLastChar) && e.target.value !== "=") {
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

// ! KNOWN BUG: 1) Has problems with negative
