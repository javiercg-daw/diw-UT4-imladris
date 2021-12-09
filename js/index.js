function toggleDarkMode(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

const toggleButton = document.querySelector('#theme-toggle');
toggleButton.addEventListener('click', toggleDarkMode);
