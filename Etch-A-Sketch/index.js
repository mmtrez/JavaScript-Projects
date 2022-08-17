"use strict";

const root = document.documentElement;
const gridContainer = document.getElementById("grid-container");
const sizeTitleEl = document.getElementById("size-title");
const sizeInputEl = document.getElementById("size-input");
const gridItem = document.createElement("div");
const modeButtons = document.querySelectorAll("#mode > button");
const colorPicker = document.getElementById("color-picker");
const clearButton = document.getElementById("clear-btn");
const sensitivityButtons = document.querySelectorAll("#sensitivity > button");
gridItem.classList.add("grid-item");
let gridSize = sizeInputEl.value; // get default grid size
let activeMode = "color"; // set default mode
// let sensetivity = "mousedown";
let mouseDown = false;
let sensetivity = "mouseover";
let paintColor = getComputedStyle(root).getPropertyValue("--paint-color"); // get default primary color from css variables
sizeTitleEl.textContent = `Size: ${gridSize} x ${gridSize}`; // show default size
// colorPicker.attributes[8].nodeValue = currentColor; // set default color on color picker

window.onmousedown = () => {
  mouseDown = true;
};
window.onmouseup = () => {
  mouseDown = false;
};

const paint = (gridItems) => {
  gridItems.forEach((gridItem) => {
    gridItem.addEventListener("mouseover", function (e) {
      if (sensetivity === "mouseover" ? true : mouseDown) {
        if (activeMode === "rainbow") {
          this.style.backgroundColor = paintColor;
          paintColor = "#" + Math.trunc(Math.random() * 16777215).toString(16);
        } else this.style.backgroundColor = paintColor; // paint on hover
      }
    });
  });
};

const makeGrid = () => {
  gridContainer.innerHTML = "<legend>Etch a sketch</legend>"; // remove grid items - add legend.
  gridContainer.style.gridTemplateColumns = "auto ".repeat(gridSize); // make the grid style
  for (let i = 0; i < gridSize * gridSize; i++) {
    gridContainer.appendChild(gridItem.cloneNode(true)); // insert grid items
  }
  const gridItems = document.querySelectorAll(".grid-item");
  paint(gridItems);
};
makeGrid(); // make default grid

sizeInputEl.addEventListener("input", (e) => {
  sizeTitleEl.textContent = `Size: ${e.target.value} x ${e.target.value}`; // update size title on range being draged.
});
sizeInputEl.addEventListener("change", (e) => {
  gridSize = e.target.value;
  makeGrid(); // make grid on range new value (when undrag range)
});

colorPicker.addEventListener("change", (e) => {
  root.style.setProperty("--paint-color", e.target.value);
  paintColor = e.target.value;
});

modeButtons.forEach((modeButton) => {
  modeButton.addEventListener("click", () => {
    document
      .querySelector("#mode > .btn-active")
      .classList.remove("btn-active"); // remove class from old acive btn
    modeButton.classList.add("btn-active"); // add class to current active btn
    activeMode = modeButton.getAttribute("data-mode");
    if (activeMode === "eraser") {
      colorPicker.classList.add("disable");
      paintColor = "white";
    }
    if (activeMode === "color") {
      colorPicker.classList.remove("disable");
      paintColor = getComputedStyle(root).getPropertyValue("--paint-color");
    }
    if (activeMode === "rainbow") {
      colorPicker.classList.add("disable");
    }
  });
});

clearButton.addEventListener("click", () => {
  makeGrid();
});

sensitivityButtons.forEach((sensitivityButton) => {
  sensitivityButton.addEventListener("click", () => {
    sensetivity = sensitivityButton.getAttribute("data-sensitivity");
    document
      .querySelector("#sensitivity > .btn-active")
      .classList.remove("btn-active");
    sensitivityButton.classList.add("btn-active");
  });
});
