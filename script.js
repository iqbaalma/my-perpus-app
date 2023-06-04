const DATA = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fantasy',
    publisher: 'Scribner',
    description: 'A story of the decadent excesses of the Jazz Age.',
    createdAt: new Date('2023-05-30T12:00:00Z').toLocaleDateString('en-GB').split('/').join('-'),
    lastRead: 34,
    totalPages: 218,
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fantasy',
    publisher: 'J. B. Lippincott & Co.',
    description: 'A coming-of-age story set in the fictional town of Maycomb, Alabama.',
    createdAt: new Date('2023-05-29T09:15:00Z').toLocaleDateString('en-GB').split('/').join('-'),
    lastRead: 90,
    totalPages: 281,
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    category: 'Fantasy',
    publisher: 'Secker & Warburg',
    description: 'A dystopian novel set in a totalitarian society.',
    createdAt: new Date('2023-05-28T16:20:00Z').toLocaleDateString('en-GB').split('/').join('-'),
    lastRead: 2,
    totalPages: 328,
  }
].sort((a, b) => {
  const titleA = a.title.toLowerCase();
  const titleB = b.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  }

  if (titleA > titleB) {
    return 1;
  }

  return 0;
});

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
        <button type="button" class="edit-button success rounded" data-id="${id}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        <button type="button" class="delete-button danger rounded" data-id="${id}"><i class="fa fa-trash" aria-hidden="true"></i></button>
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
    const message = document.createElement('li');
    message.style = 'text-align: center; font-size: 28px;';
    message.textContent = '-- 🤪 --'.trim();

    dataContainer.appendChild(message);
    return;
  }

  DATA.forEach((data) => {
    const list = bookCard(data);

    dataContainer.appendChild(list);
    return;
  });
});
dataContainer.dispatchEvent(new Event('RENDER'));

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

const editButton = document.querySelectorAll('.edit-button');
const editDialogPopup = document.getElementById('edit-dialog-popup');
const editForm = document.getElementById('edit');
const editFormCloseModal = document.getElementById('close-modal-edit');

console.log(editButton);

const totalPagesEdit = document.getElementById('edit-total-pages');
const displayLastReadEdit = document.getElementById('display-edit-last-read');
const displayTotalPagesEdit = document.getElementById('display-edit-total-pages');

const lastReadEdit = document.getElementById('edit-last-read');
const finishedEdit = document.getElementById('edit-finished');
const finishedEditConfirmation = document.getElementById('edit-finished-confirmation');
finishedEdit.addEventListener('change', () => {
  if (finishedEdit.checked) {
    lastReadEdit.placeholder = 'Finished';
    lastReadEdit.disabled = true;
    lastReadEdit.value = totalPagesEdit.value;
    lastReadEdit.dispatchEvent(new Event('change'));
  } else {
    lastReadEdit.placeholder = 'Page';
    lastReadEdit.disabled = false;
  }
});

lastReadEdit.addEventListener('change', () => {
  if (lastReadEdit.value === totalPagesEdit.value) {
    finishedEdit.checked = true;
    finishedEdit.dispatchEvent(new Event('change'));
  }

  lastReadEdit.max = totalPagesEdit.value;
  displayLastReadEdit.textContent = lastReadEdit.value;
});

lastReadEdit.addEventListener('hide-input', () => {
  if (totalPagesEdit.value === 1 || totalPagesEdit.value == '') {
    lastReadEdit.disabled = true;
    finishedEditConfirmation.style.display = 'none';
  }
});
lastReadEdit.dispatchEvent(new Event('hide-input'));

lastReadEdit.addEventListener('allow-input', () => {
  if (totalPagesEdit.value !== 1 || totalPagesEdit.value != '') {
    lastReadEdit.disabled = false;
    finishedEditConfirmation.style.display = 'inline';
  }
});

totalPagesEdit.addEventListener('change', () => {
  lastReadEdit.dispatchEvent(new Event('hide-input'));
  lastReadEdit.dispatchEvent(new Event('allow-input'));

  if (lastReadEdit.value < totalPagesEdit.value) {
    finishedEdit.checked = false;
    finishedEdit.dispatchEvent(new Event('change'));
  }

  // Reassign max value for lastRead
  lastReadEdit.max = totalPagesEdit.value;
  displayTotalPagesEdit.textContent = totalPagesEdit.value;
});

editButton.forEach((editSession) => {
  editSession.addEventListener('click', (event) => {
    event.stopImmediatePropagation();

    const bookId = Number(editSession.getAttribute('data-id'));
    console.log(bookId);

    const data = DATA.find((book) => book.id === bookId);

    if (data !== undefined) {
      console.log(data);

      const title = document.getElementById('edit-title');
      const author = document.getElementById('edit-author');
      const category = document.getElementById('edit-category');
      const publisher = document.getElementById('edit-publisher');
      const description = document.getElementById('edit-description');
      const lastRead = document.getElementById('edit-last-read');
      const totalPages = document.getElementById('edit-total-pages');

      title.value = ''; // Clear first 🤪
      title.value = data.title
      author.value = ''; // Clear first 🤪
      author.value = data.author
      category.value = ''; // Clear first 🤪
      category.value = data.category
      publisher.value = ''; // Clear first 🤪
      publisher.value = data.publisher
      description.value = ''; // Clear first 🤪
      description.value = data.description
      lastRead.value = ''; // Clear first 🤪
      lastRead.value = data.lastRead
      totalPages.value = ''; // Clear first 🤪
      totalPages.value = data.totalPages

      editForm.addEventListener('submit', (event) => {
        event.preventDefault();
      
        const titleValue = document.getElementById('edit-title').value;
        const authorValue = document.getElementById('edit-author').value;
        const categoryValue = document.getElementById('edit-category').value;
        const publisherValue = document.getElementById('edit-publisher').value;
        const descriptionValue = document.getElementById('edit-description').value;
        const lastReadValue = document.getElementById('edit-last-read').value;
        const totalPagesValue = document.getElementById('edit-total-pages').value;
      
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
      
        const index = DATA.findIndex((book) => book.id === bookId);
      
        if (index !== -1) {
          const updatedBook = {
            ...DATA[index],
            title: titleValue,
            author: authorValue,
            category: categoryValue,
            publisher: publisherValue,
            description: descriptionValue,
            lastRead: lastReadValue,
            totalPages: totalPagesValue
          }

          // Replace the object at the found index with the updated object
          DATA.splice(index, 1, updatedBook);
        }
        
        dataContainer.dispatchEvent(new Event('RENDER'));
      
        editFormCloseModal.dispatchEvent(new Event('click'));
      
        editForm.reset();
      
        console.log(DATA);
      });

      editDialogPopup.showModal();
    } else {
      console.warn('Not found');
    }
  })
});

editFormCloseModal.addEventListener('click', (event) => {
  event.preventDefault();
  editDialogPopup.close();
});

const deleteButton = document.querySelectorAll('.delete-button');

console.log(deleteButton);

/*
==============================================

@iqbaalma error

*/

deleteButton.forEach((deleteSession) => {
  deleteSession.addEventListener('click', () => {
    const bookId = Number(deleteSession.getAttribute('data-id'));
    console.log(bookId);

    const index = DATA.findIndex((book) => book.id === bookId);
    console.log(index);
    
    // Delete the object at the found index
    if (index !== -1) {
      DATA.splice(index, 1);

      console.log(DATA);

      dataContainer.innerHTML = '';

      // if (DATA.length === 0) {
      //   const message = document.createElement('li');
      //   message.style = 'text-align: center; font-size: 28px;';
      //   message.textContent = '-- 🤪 --'.trim();

      //   dataContainer.appendChild(message);
      // } else {
      //   DATA.forEach((data) => {
      //     const list = bookCard(data);
    
      //     dataContainer.appendChild(list);
      //   });
      // }
      // // console.log(DATA);
      DATA.forEach((data) => {
        const list = bookCard(data);
        dataContainer.appendChild(list);
      });

      console.log(DATA);
    } else {
      console.log(-1);
    }
  })
});
