import {API_URI, TOKEN} from "./secret.js";

export const fetchResponseBody = async url => {
    const response = await fetch(
        new Request(API_URI + url),
        {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${TOKEN}`
            }),
            mode: 'cors',
            cache: 'force-cache'
        });
    return await response.json();
}

export const fetchAndRenderItem = async function (url, template, containerSelector) {
    const data = (await fetchResponseBody(url)).docs[0];

    const container = document.querySelector(containerSelector);
    Object.keys(data).forEach(k => {
        if (!data[k]) {
            data[k] = 'Unknown';
        }
    })

    document.title = `${data.name} - Imladris`;
    container.insertAdjacentHTML('afterbegin', template(data));
}

export const fetchAndRenderList = async function (url, template, containerSelector, removeEmptyMessage = false) {
    const data = (await fetchResponseBody(url)).docs;

    const container = document.querySelector(containerSelector);

    if (removeEmptyMessage) {
        if (!data.length) {
            return;
        }
        container.children[container.children.length - 1].remove();
    }

    data.forEach(item =>
        container.insertAdjacentHTML('beforeend', template(item))
    )
}
