import {API_URI, TOKEN} from "./env.js";

export const fetchResponseBody = async url => {
    try {
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

        if (response.status !== 200) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        document.location.replace('./404.html');
    }
}

export const fetchAndRenderItem = async function (url, template, containerSelector, fetchImage = false) {
    const data = (await fetchResponseBody(url)).docs[0];

    const container = document.querySelector(containerSelector);

    // If a property is empty, set its value to 'Unknown'
    Object.keys(data).forEach(k => {
        if (!data[k]) {
            data[k] = 'Unknown';
        }
    })

    if (fetchImage && data.wikiUrl) {
        // Due to the API not providing images, we must obtain images from the wiki URL it provides
        // First, send a request through a CORS proxy to add the Access-Control-Allow-Origin header to the response
        try {
            const wikiResponse = await fetch(new Request(
                    `https://guarded-sands-92210.herokuapp.com/${data.wikiUrl}`),
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: new Headers({
                        'Accept': 'text/html',
                    }),
                    cache: 'default'
                }
            );
            const wikiDocument = new DOMParser().parseFromString(await wikiResponse.text(), "text/html");
            const image = wikiDocument.querySelector('.pi-image-thumbnail');
            if (image) {
                // Image src URL is split to remove unnecessary parts
                data.imageUrl = image.src.split('/revision/')[0]
            }
        } catch (error) {
            console.error(error);
        }
    }

    document.title = `${data.name} - Imladris`;
    container.insertAdjacentHTML('afterbegin', template(data));
}

export const fetchAndRenderList = async function (url, template, containerSelector, emptyMessage) {
    const data = (await fetchResponseBody(url)).docs;
    const container = document.querySelector(containerSelector);

    // In case the response data is empty, add a message to the container and return. This was added for the film
    // and character detail pages, where there might not be any items (quotes) associated to the main resource.
    if (emptyMessage !== null && !data.length) {
        container.insertAdjacentHTML('beforeend', `<p class="items__no-items">${emptyMessage}</p>`);
        return;
    }

    data.forEach(item =>
        container.insertAdjacentHTML('beforeend', template(item))
    )
}

export function getIdOr404() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        document.location.replace('./404.html');
    }
    return id;
}
