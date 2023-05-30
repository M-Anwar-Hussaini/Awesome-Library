/* **************
 * All Variables *
 * ************* */
const bookContainer = document.querySelector('.container--book');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const form = document.querySelector('form');
const storageName = 'libraryStorage';
let allBooks = [];

// If we don't have a local stroage
if (!localStorage.getItem(storageName)) {
  localStorage.setItem(storageName, null);
}

if (localStorage.getItem(storageName) !== null) {
  allBooks = JSON.parse(localStorage.getItem(storageName));
}

// It will add the new book to local storage and allBooks array.
function addBook(bookTitle, bookAuthor) {
  if (allBooks === null) {
    allBooks = [];
  }
  allBooks.push([bookTitle, bookAuthor]);
  localStorage.setItem(storageName, JSON.stringify(allBooks));
}

// Show all the book from the local storage
function showAllBooks() {
  bookContainer.innerHTML = '';
  if (allBooks === null) {
    return;
  }
  allBooks.forEach((item) => {
    const book = document.createElement('div');
    // eslint-disable-next-line prefer-destructuring
    book.id = item[0];
    book.innerHTML = `
    <div
      class="row mt-2 justify-content-between align-items-center p-2 border border-success"
    >
      <p class="book-title col-9 fs-5">
        ${item[0]} by ${item[1]}
      </p>
      <button class="btn btn-danger col-3 btn--remove-book" data-booktitle="${item[0]}" onclick="removeBook(event)">
        Remove
      </button>
    </div>
  `;
    bookContainer.append(book);
  });
}

showAllBooks();

// When the add button is clicked the info will be saved to the localStroage.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook(bookTitle.value, bookAuthor.value);
  showAllBooks();
  bookAuthor.value = '';
  bookTitle.value = '';
});

// Remove book
function removeBook(event = null) {
  const botdelete = event.target.dataset.booktitle;
  allBooks.forEach((elem) => {
    if (elem[0] === botdelete) {
      const index = allBooks.indexOf(elem);
      allBooks.splice(index, 1);
      localStorage.setItem(storageName, JSON.stringify(allBooks));
      const child = document.getElementById(elem[0]);
      bookContainer.removeChild(child);
    }
  });
}

if (!allBooks) {
  removeBook();
}
