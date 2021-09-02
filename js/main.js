// preloader
const loader = param =>{
    document.getElementById('spinner').style.display = param;
}


// load data from api
const searchBook = async () => {
    const searchBtn = document.getElementById('inputSearch');
    const searchText = searchBtn.value;


    // empty search handle
    if (searchText === '') {
        document.getElementById('count').innerText = `
        Please search Something`;
        document.getElementById('books-container').textContent = '';
    }
    else {
        loader('block');
        // url dynamic
        const apiUrl = `http://openlibrary.org/search.json?q=${searchText}`
        const res = await fetch(apiUrl);
        const data = await res.json();
        displaySearchResult(data.docs);
        searchBtn.value = '';
    }





}

const displaySearchResult = (books) => {
    const booksContainer = document.getElementById('books-container');
    // clear books container data
    booksContainer.textContent = '';
    // count Items
    document.getElementById('count').innerText = `
    your Result : ${books.length}`;
    // error handle no item in result
    if (books.length === 0) {
        document.getElementById('count').innerText = `
        Result Not found.`;

    }
    else {
        books.forEach(book => {
            // create dynamically div in ui
            const div = document.createElement('div');
            div.classList.add('col');
            div.classList.add('card-style')
            div.innerHTML = `
            <div class="card">
            <img height= '250px' src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title"> <b>Book Name:</b> ${book.title}</h5>
            <p><b>Author Name:</b> ${book.author_name}</p>
            <p><b>Publisher:</b> ${book.publisher}</p>

            <p class="card-text"><b>Published year:</b> ${book.first_publish_year}</p>
            </div>
        </div>
      `;
      booksContainer.appendChild(div);

        });
    }
    loader('none');
}
