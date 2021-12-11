import {fetchAndRenderItem, fetchAndRenderList, getIdOr404} from "./service.js";

const ID = getIdOr404();

const CHARACTER_URL = `/character/${ID}`;
const CHARACTER_CONTAINER_SELECTOR = ".detail";
const CHARACTER_TEMPLATE = data => `
    <section class="data bg-blue-dark text-blue-light">
        <div class="detail__image-container">
            <img class="detail__image"
                 src="./img/character-blank.png" alt="${data.name}"/>
        </div>
        <div class="data-text">
            <h2 class="data__title">${data.name}</h2>
            <ul>
                <li class="data__list-element"><span>Race:</span> ${data.race}</li>
                <li class="data__list-element"><span>Gender:</span> ${data.gender}</li>
                <li class="data__list-element"><span>Birth:</span> ${data.birth}</li>
                <li class="data__list-element"><span>Death:</span> ${data.death}</li>
                <li class="data__list-element"><span>Realm:</span> ${data.realm}</li>
                <li class="data__list-element"><span>Spouse:</span> ${data.spouse}</li>
                <li class="data__list-element"><span>Hair:</span> ${data.hair}</li>
                <li class="data__list-element"><span>Height:</span> ${data.height}</li>
            </ul>
        </div>
    </section>
`;

const QUOTES_URL = `/character/${ID}/quote`;
const QUOTES_CONTAINER_SELECTOR = ".items";
const QUOTES_TEMPLATE = data => `
    <article class="items__item detail__quote">
        <p class="quote-text">${data.dialog}</p>
    </article>
`;

document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        fetchAndRenderItem(CHARACTER_URL, CHARACTER_TEMPLATE, CHARACTER_CONTAINER_SELECTOR, true),
        fetchAndRenderList(QUOTES_URL, QUOTES_TEMPLATE, QUOTES_CONTAINER_SELECTOR,
            "This character has no recorded quotes")

    ]);
});
