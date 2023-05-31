class Library {
  constructor() {
    this.allbooks = [];
    this.storageName = 'libraryStorage';
  }

  addBook(title, author) {
    this.allbooks.push([title, author]);
    localStorage.setItem(this.storageName, JSON.stringify(this.allbooks));
  }

  removeBook(bookContainer, elem) {
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

const libraryBooks = new Library();

function showAllBooks() {
  bookContainer.innerHTML = '';
  if (libraryBooks.allbooks === null) {
    return;
  }
  libraryBooks.allbooks.forEach((item) => {
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
showAllBooks();

// If we don't have a local stroage
if (!localStorage.getItem(libraryBooks.storageName)) {
  localStorage.setItem(libraryBooks.storageName, null);
}

if (localStorage.getItem(libraryBooks.storageName)) {
  libraryBooks.allbooks = JSON.parse(localStorage.getItem(libraryBooks.storageName));
  showAllBooks();
}

// Remove book
function removeBook(event = null) {
  const botdelete = event.target.dataset.booktitle;
  libraryBooks.allbooks.forEach((elem) => {
    if (elem[0] === botdelete) {
      libraryBooks.removeBook(bookContainer, elem);
    }
  });
}

if (!form) {
  removeBook();
}
// When the add button is clicked the info will be saved to the localStroage.
form.addEventListener('submit', (e) => {
  e.preventDefault();
  libraryBooks.addBook(bookTitle.value, bookAuthor.value);
  showAllBooks();
  bookAuthor.value = '';
  bookTitle.value = '';
});

// Display sections
// eslint-disable-next-line no-unused-vars
function showSection(name) {
  const section = document.querySelectorAll('section');
  for (let i = 0; i < section.length; i += 1) {
    const { id } = section[i];
    if (id === name) {
      section[i].classList.remove('d-none');
    } else {
      section[i].classList.add('d-none');
    }
  }
}
const buttons = document.querySelectorAll('.btn--nav');
for(let i = 0; i < buttons.length; i += 1){
  buttons[i].addEventListener('click', () => {
    showSection(buttons[i].title);
    for(let j = 0; j < buttons.length; j +=1){
      if(i === j){
        buttons[j].classList.add('btn-success');
        buttons[j].classList.remove('btn-light');
      }else{
        buttons[j].classList.remove('btn-success');
        buttons[j].classList.add('btn-light');
      }
    }
  })
}

//Set date
const date = document.getElementById('now');
const newdate = new Date();
date.textContent = newdate.toDateString();