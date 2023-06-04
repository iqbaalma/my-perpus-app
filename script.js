const DATA = [];

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

const bookCard = (obj) => {
  const {
    id,
    title,
    author,
    category,
    publisher,
    description,
    createdAt
  } = obj;

  const cardContainer = document.createElement('li');
  cardContainer.setAttribute('class', `
    data flex flex-col full-width field-margin
  `.trim());
  
  cardContainer.innerHTML = `
    <div class="flex flex-row full-width space-between">
      <h4 class="flex flex-row align-center">${title}&nbsp;&nbsp;<small><div class="breadcrumbs">&#62; ${category}</div></small></h4>
      <div class="flex flex-row soft-gap">
        <button type="button" id="edit" class="rounded warning"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        <button type="button" id="delete" class="rounded danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
      </div>
    </div>
    <div class="flex flex-row full-width space-between align-center">
      <p><small><strong>Publisher:</strong>&nbsp;${publisher}</small></p>
      <p><small><small>${createdAt}</small></small></p>
    </div>
  `.trim();

  return cardContainer;
}

const dataContainer = document.getElementById('data-container');
dataContainer.addEventListener('RENDER', (event) => {
  event.stopImmediatePropagation();

  dataContainer.innerHTML = '';

  DATA.forEach((data) => {
    const list = bookCard(data);

    dataContainer.appendChild(list);
  });
});

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const categoryValue = document.getElementById('category').value;
  const publisherValue = document.getElementById('publisher').value;
  const descriptionValue = document.getElementById('description').value;

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

  /**
   * 
   * @param {string} title
   * - valid string value.
   * @param {string} author
   * - valid string value.
   * @param {string} category
   * - valid string value.
   * @param {string} publisher
   * - valid string value.
   * @param {string} description
   * - valid string value.
   * @return {Object}
   * return `Object` with value initialized.
   */
  const bookObject = ({
    title,
    author,
    category,
    publisher,
    description
  }) => {
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

  // Initialize object with book's values
  const book = bookObject({
    title: titleValue,
    author: authorValue,
    category: categoryValue,
    publisher: publisherValue,
    description: descriptionValue
  });

  DATA.push(book);
  
  dataContainer.dispatchEvent(new Event('RENDER'));

  btnCloseModal.dispatchEvent(new Event('click'));

  form.reset();

  console.log(book);
});