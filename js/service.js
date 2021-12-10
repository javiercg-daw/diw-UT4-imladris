import {API_URI, TOKEN} from "./env.js";

/*
Fetches API response body. Used in all API calls.
 */
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
            document.location.replace(`./404.html?statusCode=${encodeURIComponent(response.status)}
            &errorMessage=${encodeURIComponent(response.statusText)}`);
            return;
        }
        return await response.json();
    } catch (error) {
        document.location.replace(`./404.html?errorMessage=${encodeURIComponent(error.message)}`);
    }
}

/*
Fetches image URL from the wiki URL provided by the API, then sets it as the HTML src attribute for the element
specified by the selector. (The API does not provide image URLs or data for its resources.)
 */
const fetchImageFromWikiUrl = async function (url, imgElementSelector = '.detail__image') {
    try {
        // The request is sent through a CORS proxy to add the Access-Control-Allow-Origin header to the response
        const wikiResponse = await fetch(new Request(
                `https://guarded-sands-92210.herokuapp.com/${url}`),
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
            // Before being set as the element's src, the image URL is split to remove unnecessary parts
            document.querySelector(imgElementSelector).src = image.src.split('/revision/')[0];
        }
    } catch (error) {
        console.error(error);
    }
}

/*
Fetches a single resource from an URL, then inserts the HTML template with the resource's data in the specified
container. Used in character, film and book detail pages. Provides an option to fetch the resource's image URL from the
wiki (currently only used in the character detail page).
 */
export const fetchAndRenderItem = async function (url, template, containerSelector, fetchImage = false) {
    const data = (await fetchResponseBody(url)).docs[0];
    const container = document.querySelector(containerSelector);

    // If a property is empty, set its value to 'Unknown'
    Object.keys(data).forEach(k => {
        if (!data[k]) {
            data[k] = 'Unknown';
        }
    })

    document.title = `${data.name} - Imladris`;
    container.insertAdjacentHTML('afterbegin', template(data));

    if (fetchImage && data.wikiUrl) {
        await fetchImageFromWikiUrl(data.wikiUrl);
    }
}

/*
Fetches an array of resources, then inserts each one of them in the specified container based on the template.
 */
export const fetchAndRenderList = async function (url, template, containerSelector, emptyMessage) {
    const data = (await fetchResponseBody(url)).docs;
    const container = document.querySelector(containerSelector);

    // In case the response data is empty, add a message to the container and return. This is used in the
    // character detail page, where there might not be any items (quotes) associated to the character.
    if (emptyMessage !== null && !data.length) {
        container.insertAdjacentHTML('beforeend', `<p class="items__no-items">${emptyMessage}</p>`);
        return;
    }

    data.forEach(item =>
        container.insertAdjacentHTML('beforeend', template(item))
    )
}

/*
Gets the resource ID parameter from the URL and returns it, or redirects to the 404 page if it is not present.
 */
export function getIdOr404() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        document.location.replace('./404.html');
    }
    return id;
}
