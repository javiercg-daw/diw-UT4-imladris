import {fetchAndRenderList} from "./service.js";

const URL = '/character?limit=50';
const CONTAINER_SELECTOR = '.list__main-grid';
const TEMPLATE = item => `
    <article class="list__article list__article-character">
        <p class="list__article-title" >${item.name}</p>
        <a class="list__article-link" href="/character.html?id=${item._id}"></a>
    </article>
`;

document.addEventListener('DOMContentLoaded', async () => await fetchAndRenderList(URL, TEMPLATE, CONTAINER_SELECTOR));
