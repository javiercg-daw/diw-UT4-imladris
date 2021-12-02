import {fetchAndRenderList} from "./service.js";

const CHARACTERS_URL = '/character?limit=50';
const CHARACTERS_CONTAINER_SELECTOR = '.list__main-grid';
const CHARACTERS_TEMPLATE = item => `
    <article class="list__article list__article-character">
        <p class="list__article-title" >${item.name}</p>
        <a class="list__article-link" href="/character.html?id=${item._id}"></a>
    </article>
`;

document.addEventListener('DOMContentLoaded', async () => await fetchAndRenderList(CHARACTERS_URL, CHARACTERS_TEMPLATE, CHARACTERS_CONTAINER_SELECTOR));
