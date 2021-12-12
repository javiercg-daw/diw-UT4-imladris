import {fetchResponseBody} from "./service.js";

const ITEM_TEMPLATE = (item, url) => `
    <article class="list__article">
        <p class="list__article-title">${item.name}</p>
        <img class="list__image" src="./img/${url}/${item._id}.jpg" 
            alt="The Lord of the Rings: The Fellowship of the Ring Poster"/>
        <div class="list__image-gradient"></div>
        <a class="list__link" href=".${url}.html?id=${item._id}"></a>
    </article>
`;

/*
 Fetches all books and films from the API, then creates elements for each one in their respective containers.
 */
const fetchAndRenderFilmsAndBooks = async function () {
    let [filmsData, booksData] = await Promise.all([
            fetchResponseBody("/movie").then(data => data.docs),
            fetchResponseBody("/book").then(data => data.docs)
        ]
    );

    // Film data includes both LOTR and Hobbit films in no particular order, so we need to separate and sort them
    const lotrFilms = filmsData.filter(f =>
        ["The Fellowship of the Ring", "The Two Towers ", "The Return of the King"].includes(f.name)
    ).sort((a, b) => a.boxOfficeRevenueInMillions - b.boxOfficeRevenueInMillions);
    const hobbitFilms = filmsData.filter(f =>
        ["The Unexpected Journey", "The Desolation of Smaug", "The Battle of the Five Armies"].includes(f.name)
    ).sort((a, b) => b.boxOfficeRevenueInMillions - a.boxOfficeRevenueInMillions);

    const booksContainer = document.querySelector("#books");
    booksData.forEach(item => {
        const article = document.createElement("article");
        booksContainer.appendChild(article);
        article.outerHTML = ITEM_TEMPLATE(item, "/book");
    });

    const lotrContainer = document.querySelector("#lotr-films");
    lotrFilms.forEach(item => {
        const article = document.createElement("article");
        lotrContainer.appendChild(article);
        article.outerHTML = ITEM_TEMPLATE(item, "/film");
    });

    const hobbitContainer = document.querySelector("#hobbit-films");
    hobbitFilms.forEach(item => {
        const article = document.createElement("article");
        hobbitContainer.appendChild(article);
        article.outerHTML = ITEM_TEMPLATE(item, "/film");
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    await fetchAndRenderFilmsAndBooks();
});
