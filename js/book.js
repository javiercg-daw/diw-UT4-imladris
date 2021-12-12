import {fetchAndRenderItem, fetchAndRenderList, getIdOr404} from "./service.js";

const ID = getIdOr404();

const BOOK_URL = `/book/${ID}`;
const BOOK_CONTAINER_SELECTOR = ".detail";
const BOOK_TEMPLATE = data => `
    <section class="data bg-blue-dark text-blue-light">
        <div class="detail__image-container">
            <img class="detail__image"
                 src="./img/book/${data._id}.png" alt="${data.name}"/>
        </div>
        <div class="data-text">
            <h2 class="data__title">${data.name}</h2>
        </div>
    </section>
`;

const CHAPTERS_URL = `/book/${ID}/chapter`;
const CHAPTERS_CONTAINER_SELECTOR = ".items";
const CHAPTERS_TEMPLATE = data => `
    <li class="items__item items__ordered-item">${data.chapterName}</li>
`;

document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        fetchAndRenderItem(BOOK_URL, BOOK_TEMPLATE, BOOK_CONTAINER_SELECTOR),
        fetchAndRenderList(CHAPTERS_URL, CHAPTERS_TEMPLATE, CHAPTERS_CONTAINER_SELECTOR)
    ]);
});
