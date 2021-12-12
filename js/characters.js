import {fetchAndRenderList} from "./service.js";


const CHARACTERS_URL = "/character";
const CHARACTERS_CONTAINER_SELECTOR = ".list__grid";
const CHARACTERS_TEMPLATE = item => `
    <article class="list__article list__character">
        <p class="list__article-title" >${item.name}</p>
        ${item.hasImage ? `
        <img class="list__image" src="./img/character/${item._id}.png" alt="${item.name}"/>
        <div class="list__image-gradient"></div>
        ` : ""}
        <a class="list__link" href="./character.html?id=${item._id}"></a>
    </article>
`;

document.addEventListener("DOMContentLoaded", async () =>
    await fetchAndRenderList(CHARACTERS_URL, CHARACTERS_TEMPLATE, CHARACTERS_CONTAINER_SELECTOR, "",
        true)
);
