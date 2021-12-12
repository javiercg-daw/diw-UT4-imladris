import {fetchAndRenderItem, fetchResponseBody, getIdOr404} from "./service.js";

const ID = getIdOr404();

const FILM_URL = `/movie/${ID}`;
const FILM_CONTAINER_SELECTOR = ".detail";
const FILM_TEMPLATE = data => `
    <section class="data bg-blue-dark text-blue-light">
        <div class="detail__image-container">
            <img class="detail__image"
                 src="./img/film/${data._id}.jpg" alt="${data.name}"/>
        </div>
        <div class="data-text">
            <h2 class="data__title">${data.name}</h2>
            <ul>
                <li class="data__list-element">
                    <span>Runtime:</span> ${data.runtimeInMinutes} min
                </li>
                <li class="data__list-element">
                    <span>Budget:</span> $${data.budgetInMillions}.000.000
                </li>
                <li class="data__list-element">
                    <span>Box Office Revenue:</span> $${data.boxOfficeRevenueInMillions}.000.000
                </li>
                <li class="data__list-element">
                    <span>Academy Award Nominations:</span> ${data.academyAwardNominations}
                </li>
                <li class="data__list-element">
                    <span>Academy Award Wins:</span> ${data.academyAwardWins}
                </li>
                <li class="data__list-element">
                    <span>Rotten Tomatoes Score:</span> ${data.rottenTomatoesScore}%
                </li>
            </ul>
        </div>
    </section>
`;

const QUOTES_URL = `/movie/${ID}/quote`;
const CHARACTERS_URL = "/character";
const QUOTES_CONTAINER_SELECTOR = ".items";
const QUOTE_TEMPLATE = data => `
    <article class="items__item">
        <p class="quote-text">${data.dialog}</p>
        <p class="quote-character items__quote-character">${data.character.name}</p>
    </article>
`;

/*
 Fetches the quotes from the film and renders them with the name of the characters that say them. All characters are
 fetched at once to make the minimum possible number of calls.
 */
const fetchAndRenderQuotesWithCharacter = async function (quoteUrl, characterUrl, template, containerSelector) {
    let [characterData, quoteData] = await Promise.all([
            fetchResponseBody(characterUrl).then(data => data.docs),
            fetchResponseBody(quoteUrl).then(data => data.docs)
        ]
    );
    const container = document.querySelector(containerSelector);

    // In case there are no quotes, add a message to the container and return.
    if (!quoteData.length) {
        container.insertAdjacentHTML("beforeend",
            `<p class="items__no-items">This film has no quotes</p>`);
        return;
    }

    quoteData.forEach(item => {
            let character = characterData.find(c => c._id === item.character);
            if (character.name === "MINOR_CHARACTER") {
                character.name = "Minor character";
            }
            item.character = character;
            container.insertAdjacentHTML("beforeend", template(item));
        }
    );
};

document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        await fetchAndRenderItem(FILM_URL, FILM_TEMPLATE, FILM_CONTAINER_SELECTOR),
        await fetchAndRenderQuotesWithCharacter(QUOTES_URL, CHARACTERS_URL, QUOTE_TEMPLATE, QUOTES_CONTAINER_SELECTOR)
    ]);
});
