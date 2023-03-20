"use strict";

const booksContainer = document.querySelector(".books");
const inputEls = document.querySelectorAll("input");
const addBtn = document.querySelector("header .add");
const formAside = document.querySelector("aside");
const closeAsideBtn = document.querySelector(".close");
const submitForm = document.querySelector(".submit");
const form = document.querySelector("form");
let library = JSON.parse(localStorage.getItem("library")) || [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

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
  localStorage.setItem("library", JSON.stringify(library));
  e.target.reset();
  console.log(e);
  formAside.classList.remove("open");
  renderBooks([book]);
}

function toggleReadStatus(e) {
  const id = +e.target.closest(".book").dataset.id;
  library.forEach((book, index) => {
    if (book.id === id) {
      library[index] = { ...book, read: !book.read };
      document.querySelector(`[data-id="${id}"] .read`).textContent = `Read: ${
        library[index].read ? "Yes" : "Not yet"
      }`;
    }
  });
  localStorage.setItem("library", JSON.stringify(library));
}

function deleteBook(e) {
  const id = +e.target.closest(".book").dataset.id;
  library = library.filter((book) => id !== book.id);
  localStorage.setItem("library", JSON.stringify(library));
  document.querySelector(`[data-id="${id}"]`).remove();
}

function renderBooks(books) {
  console.log(books);
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
  document
    .querySelectorAll(".toggle-read")
    .forEach((btn) =>
      btn.addEventListener("click", (e) => toggleReadStatus(e))
    );
  document
    .querySelectorAll(".remove")
    .forEach((btn) => btn.addEventListener("click", (e) => deleteBook(e)));
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
