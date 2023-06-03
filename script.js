const btnAddBook = document.getElementById('add-book');
const btnCloseModal = document.getElementById('close-modal');
const formAddBook = document.getElementById('form-input');

btnAddBook.addEventListener('click', (event) => {
  event.preventDefault();

  formAddBook.showModal();
});

btnCloseModal.addEventListener('click', (event) => {
  event.preventDefault();

  formAddBook.close();
});