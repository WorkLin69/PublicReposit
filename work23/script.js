// Форма авторизации с запоминанием
        const loginForm = document.getElementById('loginForm');
        const loginResult = document.getElementById('loginResult');

        document.addEventListener('DOMContentLoaded', () => {
            const savedLogin = document.cookie.split('; ').find(row => row.startsWith('username='));
            if (savedLogin) document.getElementById('loginUsername').value = savedLogin.split('=')[1];
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            const usernameError = document.getElementById('loginUsernameError');
            const passwordError = document.getElementById('loginPasswordError');

            let isValid = true;
            if (!username) {
                usernameError.textContent = 'Введите логин';
                isValid = false;
            } else usernameError.textContent = '';
            if (!password) {
                passwordError.textContent = 'Введите пароль';
                isValid = false;
            } else passwordError.textContent = '';

            if (isValid) {
                if (rememberMe) {
                    const date = new Date();
                    date.setDate(date.getDate() + 30);
                    document.cookie = `username=${username}; expires=${date.toUTCString()}; path=/`;
                }
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                loginResult.textContent = `Вход выполнен в ${time} BST: ${username}`;
                loginForm.reset();
            }
        });

        // Персонализация сайта
        const languageForm = document.getElementById('languageForm');

        document.addEventListener('DOMContentLoaded', () => {
            const savedLang = document.cookie.split('; ').find(row => row.startsWith('language='))?.split('=')[1] || 'ru';
            document.getElementById('language').value = savedLang;
            document.body.setAttribute('lang', savedLang);
        });

        languageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const language = document.getElementById('language').value;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            document.cookie = `language=${language}; expires=${date.toUTCString()}; path=/`;
            document.body.setAttribute('lang', language);
        });

        // Счетчик посещений
        const visitCount = document.getElementById('visitCount');

        document.addEventListener('DOMContentLoaded', () => {
            let count = document.cookie.split('; ').find(row => row.startsWith('visitCount='))?.split('=')[1] || 0;
            count = parseInt(count) + 1;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            document.cookie = `visitCount=${count}; expires=${date.toUTCString()}; path=/`;
            const lang = document.body.getAttribute('lang');
            visitCount.textContent = lang === 'en' ? `You have visited our site ${count} times` : `Вы посетили наш сайт ${count} раз`;
        });

        // Корзина интернет-магазина
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function addToCart(name, price) {
            cart.push({ name, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }

        function clearCart() {
            cart = [];
            localStorage.removeItem('cart');
            updateCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            cartItems.innerHTML = cart.map(item => `<div class="cart-item">${item.name} - ${item.price} руб <button onclick="removeFromCart('${item.name}')">Удалить</button></div>`).join('');
            document.getElementById('cartCount').textContent = cart.length;
        }

        function removeFromCart(name) {
            cart = cart.filter(item => item.name !== name);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }

        document.addEventListener('DOMContentLoaded', updateCart);