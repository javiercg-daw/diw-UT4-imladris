import {API_URI, TOKEN} from "./secret.js";

const HEADERS = new Headers({
        'Accept': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    }
)

const LIMIT = 18;

const request = new Request(`${API_URI}/character?limit=${LIMIT}`)
const init = {
    method: 'GET',
    headers: HEADERS,
    mode: 'cors',
    cache: 'default'
}

const fetchAndRender = async function () {
    const response = await fetch(request, init);
    // TODO: error handling (how? try several times and redirect to 404?)
    const body = await response.json();
    const data = body.docs;

    const container = document.querySelector('.list__main-grid');
    data.forEach(item => container.insertAdjacentHTML('beforeend', `
        <article class="list__article list__article-character">
            <a class="list__article-title" 
            href="#">${item.name}</a>
        </article>
    `))
}

document.addEventListener('DOMContentLoaded', fetchAndRender)