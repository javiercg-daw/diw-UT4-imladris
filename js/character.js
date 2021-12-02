import {fetchAndRenderItem, fetchAndRenderList} from "./service.js";

const ID = new URLSearchParams(window.location.search).get('id');

const CHARACTER_URL = `/character/${ID}`;
const CHARACTER_CONTAINER_SELECTOR = '.character__main';
const CHARACTER_TEMPLATE = data => `
    <section class="character__data bg-blue-dark text-blue-light">
        <div class="character__img-container">
            <img class="character__img"
                 src="./img/galadriel.jpg" alt="${data.name}"/>
        </div>
        <div class="character__data-text">
            <h2 class="character__data-title">${data.name}</h2>
            <ul>
                <li><span>Race:</span> ${data.race}</li>
                <li><span>Gender:</span> ${data.gender}</li>
                <li><span>Birth:</span> ${data.birth}</li>
                <li><span>Death:</span> ${data.death}</li>
                <li><span>Realm:</span> ${data.realm}</li>
                <li><span>Spouse:</span> ${data.spouse}</li>
                <li><span>Hair:</span> ${data.hair}</li>
                <li><span>Height:</span> ${data.height}</li>
            </ul>
        </div>
    </section>
`;

const QUOTES_URL = `/character/${ID}/quote`;
const QUOTES_CONTAINER_SELECTOR = '.character__quotes';
const QUOTES_TEMPLATE = data => `
    <article class="character__quote">
        <p>${data.dialog}</p>
    </article>
`

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndRenderItem(CHARACTER_URL, CHARACTER_TEMPLATE, CHARACTER_CONTAINER_SELECTOR);
    await fetchAndRenderList(QUOTES_URL, QUOTES_TEMPLATE, QUOTES_CONTAINER_SELECTOR);
});
