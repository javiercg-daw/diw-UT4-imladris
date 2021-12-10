"use strict"

const mockUsers = [
    {
        "id": 0,
        "email": "user@user.com",
        "password": "password"
    }
]

const registerHTMLMain = `
<main class="register__main card">
        <h2 class="text-xl text-align-center">Sign Up</h2>
        <form action="" method="post" data-action="register">
            <fieldset class="register__fieldset">
                <p class="register__field-validation"></p>         
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
                <label class="register__label"
                       for="password-confirm">
                    Confirm password
                    <input class="register__field"
                           type="password" name="password-confirm" id="password-confirm"/>
                </label>

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
                <p class="register__field-validation"></p>            
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

const urlParams = new URLSearchParams(window.location.search);
const register = urlParams.get('register');
const header = document.querySelector('header');

const toggleHandler = function () {
    const action = this.dataset.action;
    const mainHTML = document.querySelector('.register__main')
    mainHTML.remove()
    insertHTML(action === "register");
}

const insertHTML = function (condition) {
    if (condition) {
        header.insertAdjacentHTML('afterend', registerHTMLMain);
    } else {
        header.insertAdjacentHTML('afterend', loginHTMLMain);
    }

    const formToggle = document.querySelector('#register-login-toggle');
    formToggle.addEventListener('click', toggleHandler);
    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = new FormData(this);
        const email = data.get('email').valueOf();
        const password = data.get('password').valueOf();
        const validationMessage = document.querySelector('.register__field-validation')

        if (this.dataset.action === 'register') {
            const confirmPassword = data.get('password-confirm');
            if (confirmPassword === password) {
                window.location.replace('./home.html');
            } else {
                validationMessage.insertAdjacentText('afterbegin', 'Passwords don\'t match')
            }
        } else if (this.dataset.action === 'login') {
            if (mockUsers.find(u => u.email === email && u.password === password)) {
                window.location.replace('./home.html');
            } else {
                validationMessage.insertAdjacentText('afterbegin', 'Incorrect user and/or password')
            }
        }
    })
}

document.addEventListener('DOMContentLoaded', function () {
    insertHTML(register)
})
