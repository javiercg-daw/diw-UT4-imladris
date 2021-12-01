import {API_URI, TOKEN} from "./secret.js";

const HEADERS = new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    }
)

const LIMIT = 18;

const characterId = new URLSearchParams(window.location.search).get('id')

const request = new Request(`${API_URI}/character/${characterId}`)
const init = {
    method: 'GET',
    headers: HEADERS,
    mode: 'cors',
    cache: 'default'
}

const fetchAndRender = async function () {
    const response = await fetch(request, init);
    const body = await response.json();
    const container = document.querySelector('.character__main');

    const characterData = body.docs[0];
    Object.keys(characterData).forEach(k => {
        if (!characterData[k]) {
            characterData[k] = 'Unknown'
        }
    })

    container.insertAdjacentHTML('afterbegin', `
        <section class="character__data bg-blue-dark text-blue-light">
            <div class="character__img-container">
                <img class="character__img"
                     src="./img/galadriel.jpg" alt="${characterData.name}"/>
            </div>
            <div class="character__data-text">
                <h2 class="character__data-title">${characterData.name}</h2>
                <ul>
                    <li><span>Race:</span> ${characterData.race}</li>
                    <li><span>Gender:</span> ${characterData.gender}</li>
                    <li><span>Birth:</span> ${characterData.birth}</li>
                    <li><span>Death:</span> ${characterData.death}</li>
                    <li><span>Realm:</span> ${characterData.realm}</li>
                    <li><span>Spouse:</span> ${characterData.spouse}</li>
                    <li><span>Hair:</span> ${characterData.hair}</li>
                    <li><span>Height:</span> ${characterData.height}</li>
                </ul>
            </div>
        </section>
    `)

    const quotesContainer = document.querySelector('.character__quotes');
    const quotesRequest = new Request(`${API_URI}/character/${characterId}/quote`)
    const quotesResponse = await fetch(quotesRequest, init);
    const quotesBody = await quotesResponse.json();
    const quotesData = quotesBody.docs
    // TODO: refactor to avoid code repetition
    // TODO: eventually add movie title to quote (low priority)

    quotesData.forEach(q => quotesContainer.insertAdjacentHTML('beforeend', `
<article class="character__quote">
    <p>${q.dialog}</p>
</article>
    `))
}

document.addEventListener('DOMContentLoaded', fetchAndRender)