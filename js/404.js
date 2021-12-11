const params = new URLSearchParams(window.location.search);

const errorMessage = params.get("errorMessage");
if (errorMessage) {
    const message = document.querySelector(".not-found__main-text");
    message.innerHTML = `<p>${errorMessage}</p>`;
}

const statusCode = params.get("statusCode");
if (statusCode) {
    const header = document.querySelector("h2");
    header.innerHTML = statusCode;
}