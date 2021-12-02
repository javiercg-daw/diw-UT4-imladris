import {fetchAndRenderItem, fetchResponseBody} from "./service.js";

const ID = new URLSearchParams(window.location.search).get('id');

const FILM_URL = `/movie/${ID}`;
const FILM_CONTAINER_SELECTOR = '.detail__main';
const FILM_TEMPLATE = data => `
    <section class="detail__data bg-blue-dark text-blue-light">
        <div class="detail__img-container">
            <img class="detail__img"
                 src="./img/fellowship.jpg" alt="${data.name}"/>
        </div>
        <div class="detail__data-text">
            <h2 class="detail__data-title">${data.name}</h2>
            <ul>
                <li><span>Runtime:</span> ${data.runtimeInMinutes} min</li>
                <li><span>Budget:</span> $${data.budgetInMillions}.000.000</li>
                <li><span>Box Office Revenue:</span> $${data.boxOfficeRevenueInMillions}.000.000</li>
                <li><span>Academy Award Nominations:</span> ${data.academyAwardNominations}</li>
                <li><span>Academy Award Wins:</span> ${data.academyAwardWins}</li>
                <li><span>Rotten Tomatoes Score:</span> ${data.rottenTomatoesScore}%</li>
            </ul>
        </div>
    </section>
`;

const QUOTES_URL = `/movie/${ID}/quote`;
const CHARACTERS_URL = '/character';
const QUOTES_CONTAINER_SELECTOR = '.detail__items';
const QUOTE_TEMPLATE = data => `
    <article class="detail__item">
        <p class="detail__quote-text">${data.dialog}</p>
        <p class="detail__quote-character">${data.character.name}</p>
    </article>
`

const fetchAndRenderQuotesWithCharacter = async function (quoteUrl, characterUrl, template, containerSelector) {
    const quoteData = (await fetchResponseBody(quoteUrl)).docs;
    const characterData = (await fetchResponseBody(characterUrl)).docs;

    const container = document.querySelector(containerSelector);
    quoteData.forEach(item => {
            let character = characterData.find(c => c._id === item.character);
            if (character.name === 'MINOR_CHARACTER') {
                character.name = "Minor character"
            }

            item.character = character;
            container.insertAdjacentHTML('beforeend', template(item));
        }
    )
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAndRenderItem(FILM_URL, FILM_TEMPLATE, FILM_CONTAINER_SELECTOR);
    await fetchAndRenderQuotesWithCharacter(QUOTES_URL, CHARACTERS_URL, QUOTE_TEMPLATE, QUOTES_CONTAINER_SELECTOR);
});
