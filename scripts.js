const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

const newBookBtn = document.getElementById("newBookBtn");
const formContainer = document.getElementById("formContainer");
const bookForm = document.getElementById("bookForm");
const libraryContainer = document.getElementById("library");

newBookBtn.addEventListener("click", () => {
  formContainer.classList.toggle("hidden");
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  bookForm.reset();
  formContainer.classList.add("hidden");
});

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <button class="read-toggle ${
              !book.read ? "not-read" : ""
            }" onclick="toggleRead(${index})">
                ${book.read ? "Read" : "Not Read"}
            </button>
            <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
        `;

    libraryContainer.appendChild(bookCard);
  });
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  displayBooks();
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}
