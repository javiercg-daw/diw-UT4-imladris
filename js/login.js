"use strict"

const mockUsers = [
    {
        "id": 0,
        "email": "user@user.com",
        "username": "user",
        "password": "password"
    }
]

const registerHTMLMain = `
<main class="register__main card">
        <h2 class="text-xl text-align-center">Sign Up</h2>
        <form action="" method="post" data-action="register">
            <fieldset class="register__fieldset">  
                <label class="register__label"
                       for="email">
                    Email
                    <input class="register__field"
                           type="email" name="email" id="email" required/>            
                </label>
                <label class="register__label"
                       for="username">
                    Username
                    <input class="register__field"
                           type="text" name="username" id="username" required/>            
                </label>
                <label class="register__label"
                       for="password">
                    Password
                    <input class="register__field"
                           type="password" name="password" id="password"/>                  
                </label>
                <label class="register__label"
                       for="password-confirm">
                    Confirm password
                    <input class="register__field"
                           type="password" name="password-confirm" id="password-confirm"/>
                </label>
                <ul class="register__field-validation"></ul>       
                <button class="register__btn btn btn-light"
                        type="submit">Sign Up
                </button>
            </fieldset>
        </form>

        <footer class="register__footer">
            <p class="text-align-center">
                By clicking "Sign Up", you confirm that you have read and accept our
                <a class="text-underline" href="">terms of service</a> and our <a class="text-underline" href="">privacy policy</a>.
            </p>
            <button
                    id="register-login-toggle"
                    class="register__toggle text-align-center"
                    data-action="login"
                    type="button">
                Log In
            </button>
        </footer>
    </main>
`

const loginHTMLMain = `
    <main class="register__main card">
        <h2 class="text-xl text-align-center">Log In</h2>
        <form action="" method="post" data-action="login">
            <fieldset class="register__fieldset">
                <label class="register__label"
                       for="email">
                    Email
                    <input class="register__field"
                           type="email" name="email" id="email" required/>
                </label>
                <label class="register__label"
                       for="password">
                    Password
                    <input class="register__field"
                           type="password" name="password" id="password"/>
                </label>
                <ul class="register__field-validation"></ul>
                <button class="register__btn btn btn-light" type="submit">Log In</button>
            </fieldset>
        </form>

        <footer class="register__footer">
            <a class="text-align-center text-underline"
               href="">Forgot your password?</a>
            <button
                    id="register-login-toggle"
                    class="register__toggle text-align-center"
                    data-action="register"
                    type="button">
                Sign Up
            </button>
        </footer>
    </main>
`

const insertHTML = function (isRegister) {
    const header = document.querySelector('header');

    if (isRegister) {
        header.insertAdjacentHTML('afterend', registerHTMLMain);
    } else {
        header.insertAdjacentHTML('afterend', loginHTMLMain);
    }

    const formToggle = document.querySelector('#register-login-toggle');
    formToggle.addEventListener('click', toggleHandler);
    const form = document.querySelector('form');
    form.addEventListener('submit', validateForm);
}

const toggleHandler = function () {
    this.removeEventListener('click', toggleHandler);
    const isRegister = this.dataset.action === 'register';
    const mainHTML = document.querySelector('.register__main')
    mainHTML.remove()
    insertHTML(isRegister);
}

const validateForm = function (event) {
    event.preventDefault();
    const data = new FormData(this);
    const email = data.get('email').valueOf();
    const password = data.get('password').valueOf();
    const validationMessageList = document.querySelector('.register__field-validation');
    validationMessageList.innerHTML = "";

    if (this.dataset.action === 'register') {
        let isValid = true;
        const confirmPassword = data.get('password-confirm');
        if (!(confirmPassword === password)) {
            isValid = false;
            validationMessageList.insertAdjacentHTML('afterbegin', '<li>Passwords don\'t match</li>')
        }
        if (!(password.length >= 6)) {
            isValid = false;
            validationMessageList.insertAdjacentHTML('afterbegin', '<li>Password must be at least six ' +
                'characters long.</li>')
        }

        const username = data.get('username');
        const regex = /^[a-z][a-z0-9_-]{4,}$/i;
        if (!regex.test(username)) {
            isValid = false
            validationMessageList.insertAdjacentHTML('beforeend', '<li>Username must be at least five ' +
                'characters long and start with a letter, and may only contain numbers, letters, hyphens and ' +
                'underscores.</li>')
        }
        if (isValid) {
            window.location.replace('./home.html');
        }

    } else if (this.dataset.action === 'login') {
        if (!(mockUsers.find(u => u.email === email && u.password === password))) {
            validationMessageList.insertAdjacentHTML('afterbegin', '<li>Incorrect user and/or password</li>');
        }
        window.location.replace('./home.html');
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const isRegister = urlParams.get('register');
    insertHTML(isRegister);
})
