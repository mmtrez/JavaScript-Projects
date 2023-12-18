"use strict";

// Elements
const booksContainer = document.querySelector(".books");
const inputEls = document.querySelectorAll("input");
const addBtn = document.querySelector("header .add");
const formAside = document.querySelector("aside");
const closeAsideBtn = document.querySelector(".close");
const submitForm = document.querySelector(".submit");
const form = document.querySelector("form");
const sortEl = document.querySelector('[name="sort"]');

// my library
let library = JSON.parse(localStorage.getItem("library")) || [];

// Constructor
function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

const setLocalStorage = () =>
  localStorage.setItem("library", JSON.stringify(library));

function addBook(e) {
  e.preventDefault();
  const {
    title: { value: title },
    author: { value: author },
    pages: { value: pages },
    read: { checked: read },
  } = e.target;
  const book = new Book(title, author, pages, read, Date.now());
  library.push(book);
  setLocalStorage();
  e.target.reset();
  closeForm();
  renderBooks([book]);
}

function toggleReadStatus(e) {
  const id = +e.target.closest(".book").dataset.id;
  library = library.map((book) => {
    if (book.id === id) {
      document.querySelector(`[data-id="${id}"] .read`).textContent = `Read: ${
        !book.read ? "Yes" : "Not yet"
      }`;
      return { ...book, read: !book.read };
    } else return book;
  });
  setLocalStorage();
}

function deleteBook(e) {
  const id = +e.target.closest(".book").dataset.id;
  library = library.filter((book) => id !== book.id);
  setLocalStorage();
  document.querySelector(`[data-id="${id}"]`).remove();
}

function renderBooks(books) {
  books?.forEach(({ title, author, pages, read, id }) => {
    const html = `<div class="book" data-id="${id}">
    <h1 class="title">${title}</h1>
    <h2 class="author"><span>By</span> ${author}</h2>
    <p class="pages">Pages: ${pages}</p>
    <p class="read">Read: ${read ? "Yes" : "Not yet"}</p>
    <div class="btns">
      <button class="add toggle-read">Toggle Read Status</button>
      <button class="add remove">Remove</button>
    </div>
  </div>`;
    booksContainer.insertAdjacentHTML("beforeend", html);
  });
}
renderBooks(library);

const openForm = () => {
  formAside.classList.add("open");
  formAside.style.transition = "0.3s";
};

const closeForm = () => {
  formAside.classList.remove("open");
};

const inputValidity = ({ target: input }) => {
  input.checkValidity()
    ? input.classList.remove("invalid")
    : input.classList.add("invalid");
};

inputEls.forEach((inputEl) =>
  inputEl.addEventListener("blur", (e) => inputValidity(e))
);

addBtn.addEventListener("click", openForm);

closeAsideBtn.addEventListener("click", closeForm);

form.addEventListener("submit", (e) => addBook(e));

booksContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-read")) {
    toggleReadStatus(e);
  } else if (e.target.classList.contains("remove")) deleteBook(e);
});

const handleSort = (type) => {
  [...booksContainer.children].forEach((child) => child.remove());
  library.sort((a, b) => (a[type][0] < b[type][0] ? -1 : 1));
  renderBooks(library);
};

sortEl.addEventListener("change", (e) => handleSort(e.target.value));
