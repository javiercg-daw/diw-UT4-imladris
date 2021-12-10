import {fetchResponseBody} from "./service.js";

const ITEM_TEMPLATE = (item, url) => `
    <article class="list__article">
        <p class="list__article-title" >${item.name}</p>
        <img class="list__image" src="./img/movie-blank.jpg" alt="The Lord of the Rings: The Fellowship of the Ring Poster"/>
        <div class="list__image-gradient"></div>
        <a class="list__link" href="${url}?id=${item._id}"></a>
    </article>
`;

/*
Fetches all books and films from the API, then renders them in their respective containers.
 */
const fetchAndRenderFilmsAndBooks = async function () {
    const filmsData = (await fetchResponseBody('/movie')).docs;
    const booksData = (await fetchResponseBody('/book')).docs;

    // Film data includes both LOTR and Hobbit films in no particular order, so we need to separate and sort them
    const lotrFilms = filmsData.filter(f =>
        ["The Fellowship of the Ring", "The Two Towers ", "The Return of the King"].includes(f.name)
    ).sort((a, b) => a.boxOfficeRevenueInMillions - b.boxOfficeRevenueInMillions);
    const hobbitFilms = filmsData.filter(f =>
        ["The Unexpected Journey", "The Desolation of Smaug", "The Battle of the Five Armies"].includes(f.name)
    ).sort((a, b) => b.boxOfficeRevenueInMillions - a.boxOfficeRevenueInMillions);

    const booksContainer = document.querySelector('#books');
    booksData.forEach(item => booksContainer.insertAdjacentHTML('beforeend', ITEM_TEMPLATE(item, './book.html')));
    const lotrContainer = document.querySelector('#lotr-films');
    lotrFilms.forEach(item => lotrContainer.insertAdjacentHTML('beforeend', ITEM_TEMPLATE(item, './film.html')));
    const hobbitContainer = document.querySelector('#hobbit-films');
    hobbitFilms.forEach(item => hobbitContainer.insertAdjacentHTML('beforeend', ITEM_TEMPLATE(item, './film.html')));
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndRenderFilmsAndBooks();
});
