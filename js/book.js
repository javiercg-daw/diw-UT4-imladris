import {fetchAndRenderItem, fetchAndRenderList} from "./service.js";

const ID = new URLSearchParams(window.location.search).get('id');

const BOOK_URL = `/book/${ID}`;
const BOOK_CONTAINER_SELECTOR = '.detail__main';
const BOOK_TEMPLATE = data => `
    <section class="detail__data bg-blue-dark text-blue-light">
        <div class="detail__img-container">
            <img class="detail__img"
                 src="./img/fellowship.jpg" alt="${data.name}"/>
        </div>
        <div class="detail__data-text">
            <h2 class="detail__data-title">${data.name}</h2>
        </div>
    </section>
`;

const CHAPTERS_URL = `/book/${ID}/chapter`;
const CHAPTERS_CONTAINER_SELECTOR = '.detail__items';
const CHAPTERS_TEMPLATE = data => `
    <li class="detail__item detail__quote">
        <p class="detail__quote-text">${data.chapterName}</p>
    </li>
`

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndRenderItem(BOOK_URL, BOOK_TEMPLATE, BOOK_CONTAINER_SELECTOR);
    await fetchAndRenderList(CHAPTERS_URL, CHAPTERS_TEMPLATE, CHAPTERS_CONTAINER_SELECTOR);
});
