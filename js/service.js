import {API_URI, TOKEN} from "./secret.js";

export const fetchAndRenderItem = async function (url, template, containerSelector) {
    const response = await fetch(
        new Request(API_URI + url),
        {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }),
            mode: 'cors',
            cache: 'default'
        });
    const body = await response.json();
    const data = body.docs[0];

    const container = document.querySelector(containerSelector);
    Object.keys(data).forEach(k => {
        if (!data[k]) {
            data[k] = 'Unknown'
        }
    })

    container.insertAdjacentHTML('afterbegin', template(data))
}

export const fetchAndRenderList = async function (url, template, containerSelector) {
    const response = await fetch(
        new Request(API_URI + url),
        {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }),
            mode: 'cors',
            cache: 'default'
        });
    const body = await response.json();
    const data = body.docs;

    const container = document.querySelector(containerSelector);
    data.forEach(item =>
        container.insertAdjacentHTML('beforeend', template(item))
    )
}
