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


document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch(request, init);
    // TODO: error handling (how? try several times and redirect to 404?)
    const body = await response.json();
    const data = body.docs;
    console.log(body);
    const container = document.querySelector('.list__main');
    data.forEach(item => container.insertAdjacentHTML('beforeend', `
        <article class="list__article">
            <a href="#">${item.name}</a>
        </article>
    `))
})