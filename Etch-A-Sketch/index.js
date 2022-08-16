"use strict";

const gridContainer = document.getElementById("grid-container");
const sizeTitleEl = document.getElementById("size-title");
const sizeInputEl = document.getElementById("size-input");
const gridItem = document.createElement("div");
gridItem.classList.add("grid-item");
let gridSize = 6;

const makeGrid = () => {
  gridContainer.textContent = ""; // remove grid items
  gridContainer.style.gridTemplateColumns = "auto ".repeat(gridSize); // make the grid style
  for (let i = 0; i < gridSize * gridSize; i++) {
    gridContainer.appendChild(gridItem.cloneNode(true)); // insert grid items
  }
  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach((gridItem) => {
    gridItem.addEventListener("mouseover", function () {
      this.classList.add("paint"); // paint on hover
    });
  });
};
makeGrid(); // make default grid

sizeInputEl.addEventListener("input", (e) => {
  sizeTitleEl.textContent = `Size: ${e.target.value} x ${e.target.value}`; // update size title on range being draged.
});
sizeInputEl.addEventListener("change", (e) => {
  gridSize = e.target.value;
  makeGrid(); // make grid on range new value (when undrag range)
});
