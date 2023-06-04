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

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const category = document.getElementById('category').value;
  const publisher = document.getElementById('publisher').value;
  const description = document.getElementById('description').value;

  const generateId = () => {
    const minId = 1;
    const maxId = 99999;
    const combineMinMax = Math.floor(
        Math.random() * (maxId - minId + 1) + minId
    );
    const timeStamp = Number(new Date());
    const id = Number(combineMinMax + timeStamp);

    return Number(id);
  };

  const bookObject = () => {
    return {
      id: generateId(),
      title: title,
      author: author,
      category: category,
      publisher: publisher,
      description: description,
      createdAt: new Date().toLocaleDateString('en-GB').split('/').join('-'),
    };
  };

  const book = bookObject();
  console.log(book);
});
