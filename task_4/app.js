let library = JSON.parse(localStorage.getItem('library')) || [];
//  Получаем сохраненный массив книг из localStorage. Если данных нет, инициализируем library пустым массивом []

// Функция отображения книг на главной странице
function displayBooks() {
    const bookList = document.getElementById('bookList');
    if (bookList) {
        bookList.innerHTML = '';
        library.forEach((book, index) => {
            const li = document.createElement('li');
            li.textContent = `${book.title} - ${book.author}`;
            
            // создаем кнопки для каждой книги
            const readBtn = document.createElement('button');
            readBtn.textContent = 'Читать';
            readBtn.onclick = () => openBook(index);
            li.appendChild(readBtn);

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Редактировать';
            editBtn.onclick = () => editBook(index);
            li.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Удалить';
            deleteBtn.onclick = () => deleteBook(index);
            li.appendChild(deleteBtn);

            bookList.appendChild(li);
        });
    }
}

// Функция для удаления книги
function deleteBook(index) {
    library.splice(index, 1);
    localStorage.setItem('library', JSON.stringify(library));
    const currentIndex = localStorage.getItem('currentBookIndex');
    if (currentIndex && currentIndex == index) {
        localStorage.removeItem('currentBookIndex'); // Удаляем индекс текущей книги
    }
    displayBooks(); // Обновляем список книг после удаления
}

// Функция для перехода на страницу чтения книги
function openBook(index) {
    localStorage.setItem('currentBookIndex', index);
    window.location.href = 'read-book.html';
}

// Функция для перехода на страницу редактирования книги
function editBook(index = null) {
    if (index !== null) localStorage.setItem('currentBookIndex', index);
    window.location.href = 'edit-book.html';
}

// Функция добавления книги
function addBook(event) {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const content = document.getElementById('content').value.trim();

    if (title && author && content) {
        library.push({ title, author, content });
        localStorage.setItem('library', JSON.stringify(library));
        window.location.href = 'index.html'; // Возврат на главную страницу после добавления
    }
}

// Функция отображения выбранной книги на странице чтения
function displayCurrentBook() {
    const index = localStorage.getItem('currentBookIndex');
    if (index !== null) {
        const book = library[index];
        if (book) {
            document.getElementById('bookHeader').textContent = `${book.author} - ${book.title}`;
            document.getElementById('bookContent').textContent = book.content;
        } else {
            window.location.href = 'index.html';
        }
    }
}

// Функция отображения книги для редактирования
function loadBookForEditing() {
    const index = localStorage.getItem('currentBookIndex');
    if (index !== null) {
        const book = library[index];
        if (book) {
            document.getElementById('title').value = book.title;
            document.getElementById('author').value = book.author;
            document.getElementById('content').value = book.content;
        }
    }
}

// Функция сохранения изменений книги
function saveBookEdit(event) {
    event.preventDefault();
    const index = localStorage.getItem('currentBookIndex');
    library[index] = {
        title: document.getElementById('title').value.trim(),
        author: document.getElementById('author').value.trim(),
        content: document.getElementById('content').value.trim(),
    };
    localStorage.setItem('library', JSON.stringify(library));
    window.location.href = 'index.html';
}

// Инициализация для разных страниц
document.addEventListener('DOMContentLoaded', () => {
    displayBooks();

    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', addBook); // Обработка отправки формы
    }

    if (window.location.pathname.endsWith('read-book.html')) {
        displayCurrentBook();
    } else if (window.location.pathname.endsWith('edit-book.html')) {
        loadBookForEditing();
        const editBookForm = document.getElementById('editBookForm');
        editBookForm.addEventListener('submit', saveBookEdit);
    }
});