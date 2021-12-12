import {API_URI, TOKEN} from "./env.js";
import {CHARACTERS_WITH_IMAGE} from "./characters-with-image.js";

/*
 Fetches API response body. Used in all API calls.
 */
export const fetchResponseBody = async url => {
    try {
        const response = await fetch(
            new Request(API_URI + url),
            {
                method: "GET",
                headers: new Headers({
                    "Accept": "application/json",
                    "Authorization": `Bearer ${TOKEN}`
                }),
                mode: "cors",
                cache: "force-cache"
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
};

/*
 Fetches a single resource from an URL, then inserts the HTML template with the resource's data in the specified
 container. Used in character, film and book detail pages. If the isCharacter argument is true, it checks if the ID is
 included in the array of characters with images, in which case it sets its hasImage property to true.
 */
export const fetchAndRenderItem = async function (url, template, containerSelector, isCharacter = false) {
    const data = (await fetchResponseBody(url)).docs[0];
    const container = document.querySelector(containerSelector);

    // If a property is empty, set its value to 'Unknown'
    Object.keys(data).forEach(k => {
        if (!data[k]) {
            data[k] = "Unknown";
        }
    });

    if (isCharacter && CHARACTERS_WITH_IMAGE.includes(data._id)) {
        data.hasImage = true;
    }

    document.title = `${data.name} - Imladris`;
    container.insertAdjacentHTML("afterbegin", template(data));
};

/*
 Fetches an array of resources, then inserts each one of them in the specified container based on the template. If the
 isCharacterList argument is set to true, it adds a hasImage property to each character that has an image.
 */
export const fetchAndRenderList = async function (url, template, containerSelector,
                                                  emptyMessage, isCharacterList = false) {
    const data = (await fetchResponseBody(url)).docs;
    const container = document.querySelector(containerSelector);

    // In case the response data is empty, add a message to the container and return. This is used in the
    // character detail page, where there might not be any items (quotes) associated to the character.
    if (emptyMessage !== null && !data.length) {
        container.insertAdjacentHTML("beforeend", `<p class="items__no-items">${emptyMessage}</p>`);
        return;
    }

    if (isCharacterList) {
        CHARACTERS_WITH_IMAGE.forEach(id =>
            data.find(c => c._id === id).hasImage = true
        );
    }

    data.forEach(item =>
        container.insertAdjacentHTML("beforeend", template(item))
    );
};

/*
 Gets the resource ID parameter from the URL and returns it, or redirects to the 404 page if it is not present.
 */
export function getIdOr404() {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
        document.location.replace("./404.html");
    }
    return id;
}
