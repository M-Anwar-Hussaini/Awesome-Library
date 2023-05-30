class Library{
    constructor (){
        this.allbooks = [];
        this.storageName = 'libraryStorage';
    }

    addBook(title, author){
        this.allbooks.push([title, author])
        localStorage.setItem(this.storageName, JSON.stringify(this.allBooks));
    }

    removeBook(bookContainer, elem){
      const index = this.allbooks.indexOf(elem);
      this.allbooks.splice(index, 1);
      localStorage.setItem(this.storageName, JSON.stringify(this.allbooks));
      const child = document.getElementById(elem[0]);
      bookContainer.removeChild(child);
    }
}

const bookContainer = document.querySelector('.container--book');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const form = document.querySelector('form');
const storageName = 'libraryStorage';

var LybraryBooks = new Library();

// Show all the book from the local storage
function showAllBooks() {
    bookContainer.innerHTML = '';
    if (LybraryBooks.allbooks === null) {
      return;
    }
    console.log(LybraryBooks.allbooks)
    LybraryBooks.allbooks.forEach((item) => {
      const book = document.createElement('div');
      // eslint-disable-next-line prefer-destructuring
      book.id = item[0];
      book.className = 'row border border-success-subtle rounded-2 align-items-center p-2 mt-2';
      book.innerHTML = `    
        <div class="col col-12 col-md-8 mb-3 mb-md-0 text-center text-md-start">
          <p class="book-title mb-0">
            <strong>${item[0]}</strong> by <strong>${item[1]}</strong>
          </p>
        </div>
        <div class="col col-12 col-md-4">
          <button class="btn btn-danger w-100" data-booktitle="${item[0]}" onclick="removeBook(event)">Remove</button>
        </div>
    `;
      bookContainer.append(book);
    });
  }

// When the add button is clicked the info will be saved to the localStroage.
form.addEventListener('submit', (e) => {
    e.preventDefault();
    LybraryBooks.addBook(bookTitle.value, bookAuthor.value);
    showAllBooks();
    bookAuthor.value = '';
    bookTitle.value = '';
  });

  // Remove book
function removeBook(event = null) {
    const botdelete = event.target.dataset.booktitle;
    LybraryBooks.allbooks.forEach((elem) => {
      if (elem[0] === botdelete) {
        LybraryBooks.removeBook(bookContainer, elem);
      }
    });
  }