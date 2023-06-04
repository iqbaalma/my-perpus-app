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
    id, // unused
    title,
    author,
    category,
    publisher,
    description, // unused
    createdAt,
    lastRead,
    totalPages
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
      <p><small>Author: <em>${author}</em></small></p>
      <p><small><small>${createdAt}</small></small></p>
    </div>
    <div class="flex flex-row full-width space-between align-center">
      <p><small>${publisher}</small></p>
      <p><small><small>${lastRead}/${totalPages}</small></small></p>
    </div>
  `.trim();

  return cardContainer;
}

const dataContainer = document.getElementById('data-container');
dataContainer.addEventListener('RENDER', (event) => {
  event.stopImmediatePropagation();

  dataContainer.innerHTML = '';

  if (DATA.length === 0) {
    const message = document.createElement('span');
    message.textContent = '-- No Data --';

    dataContainer.appendChild(message);
  } else {
    DATA.forEach((data) => {
      const list = bookCard(data);
  
      dataContainer.appendChild(list);
    });
  }
});

const totalPagesInput = document.getElementById('total-pages');
const displayLastRead = document.getElementById('display-last-read');
const displayTotalPages = document.getElementById('display-total-pages');

const lastReadInput = document.getElementById('last-read');
const finishedInput = document.getElementById('finished');
const finishedInputConfirmation = document.getElementById('finished-confirmation');
finishedInput.addEventListener('change', () => {
  if (finishedInput.checked) {
    lastReadInput.placeholder = 'Finished';
    lastReadInput.disabled = true;
    lastReadInput.value = totalPagesInput.value;
    lastReadInput.dispatchEvent(new Event('change'));
  } else {
    lastReadInput.placeholder = 'Page';
    lastReadInput.disabled = false;
  }
});

lastReadInput.addEventListener('change', () => {
  if (lastReadInput.value === totalPagesInput.value) {
    finishedInput.checked = true;
    finishedInput.dispatchEvent(new Event('change'));
  }

  lastReadInput.max = totalPagesInput.value;
  displayLastRead.textContent = lastReadInput.value;
});

lastReadInput.addEventListener('hide-input', () => {
  if (totalPagesInput.value === 1 || totalPagesInput.value == '') {
    lastReadInput.disabled = true;
    finishedInputConfirmation.style.display = 'none';
  }
});
lastReadInput.dispatchEvent(new Event('hide-input'));

lastReadInput.addEventListener('allow-input', () => {
  if (totalPagesInput.value !== 1 || totalPagesInput.value != '') {
    lastReadInput.disabled = false;
    finishedInputConfirmation.style.display = 'inline';
  }
});

totalPagesInput.addEventListener('change', () => {
  lastReadInput.dispatchEvent(new Event('hide-input'));
  lastReadInput.dispatchEvent(new Event('allow-input'));

  if (lastReadInput.value < totalPagesInput.value) {
    finishedInput.checked = false;
    finishedInput.dispatchEvent(new Event('change'));
  }

  // Reassign max value for lastRead
  lastReadInput.max = totalPagesInput.value;
  displayTotalPages.textContent = totalPagesInput.value;
});

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const titleValue = document.getElementById('title').value;
  const authorValue = document.getElementById('author').value;
  const categoryValue = document.getElementById('category').value;
  const publisherValue = document.getElementById('publisher').value;
  const descriptionValue = document.getElementById('description').value;

  const lastReadValue = lastReadInput.value;
  const totalPagesValue = totalPagesInput.value;

  if (
    titleValue === '' ||
    titleValue == null ||
    titleValue == undefined
  ) {
    alert('Title is empty!');
    return false;
  }

  if (
    authorValue === '' ||
    authorValue == null ||
    authorValue == undefined
  ) {
    alert('Author is empty!');
    return false;
  }

  if (
    categoryValue === '' ||
    categoryValue == 'null' ||
    categoryValue == null ||
    categoryValue == undefined
  ) {
    alert('Category is empty!');
    return false;
  }

  if (
    publisherValue === '' ||
    publisherValue == null ||
    publisherValue == undefined
  ) {
    alert('Publisher is empty!');
    return false;
  }

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
   * @param {Number} lastRead
   * - valid Number value.
   * @param {Number} totalPages
   * - valid Number value.
   * @return {Object}
   * return `Object` with value initialized.
   */
  const bookObject = ({
    title,
    author,
    category,
    publisher,
    description,
    lastRead,
    totalPages
  }) => {
    return {
      id: generateId(),
      title: title,
      author: author,
      category: category,
      publisher: publisher,
      description: description,
      lastRead: Number(parseInt(lastRead)),
      totalPages: Number(parseInt(totalPages)),
      createdAt: new Date().toLocaleDateString('en-GB').split('/').join('-'),
    };
  };

  // Initialize object with book's values
  const book = bookObject({
    title: titleValue,
    author: authorValue,
    category: categoryValue,
    publisher: publisherValue,
    description: descriptionValue,
    lastRead: lastReadValue,
    totalPages: totalPagesValue
  });

  DATA.push(book);
  
  dataContainer.dispatchEvent(new Event('RENDER'));

  btnCloseModal.dispatchEvent(new Event('click'));

  form.reset();

  console.log(book);
});

// Reset form after reloading page
window.addEventListener('load', () => {
  form.reset();
})
