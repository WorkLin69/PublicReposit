// Система запоминания пользователя
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
        const settingsForm = document.getElementById('settingsForm');

        document.addEventListener('DOMContentLoaded', () => {
            const fontSize = document.cookie.split('; ').find(row => row.startsWith('fontSize='));
            const theme = document.cookie.split('; ').find(row => row.startsWith('theme='));
            if (fontSize) document.getElementById('fontSize').value = fontSize.split('=')[1];
            if (theme) document.getElementById('theme').value = theme.split('=')[1];
            applySettings();
        });

        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fontSize = document.getElementById('fontSize').value;
            const theme = document.getElementById('theme').value;
            const date = new Date();
            date.setDate(date.getDate() + 30);
            document.cookie = `fontSize=${fontSize}; expires=${date.toUTCString()}; path=/`;
            document.cookie = `theme=${theme}; expires=${date.toUTCString()}; path=/`;
            applySettings();
        });

        function applySettings() {
            const fontSize = document.cookie.split('; ').find(row => row.startsWith('fontSize='))?.split('=')[1] || '16';
            const theme = document.cookie.split('; ').find(row => row.startsWith('theme='))?.split('=')[1] || 'light';
            document.body.style.fontSize = `${fontSize}px`;
            if (theme === 'dark') {
                document.body.style.backgroundColor = '#333';
                document.body.style.color = '#fff';
            } else {
                document.body.style.backgroundColor = '#f5f5f5';
                document.body.style.color = '#333';
            }
        }

        // Анализ поведения пользователя
        const behaviorResult = document.getElementById('behaviorResult');

        document.addEventListener('DOMContentLoaded', () => {
            let firstVisit = document.cookie.split('; ').find(row => row.startsWith('firstVisit='));
            let visitCount = document.cookie.split('; ').find(row => row.startsWith('visitCount='));

            if (!firstVisit) {
                firstVisit = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                document.cookie = `firstVisit=${firstVisit}; path=/`;
                behaviorResult.innerHTML = `Добро пожаловать! Первое посещение: ${firstVisit} BST<br>Посещений: 1`;
            } else {
                visitCount = (Number(visitCount?.split('=')[1]) || 0) + 1;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                document.cookie = `visitCount=${visitCount}; expires=${date.toUTCString()}; path=/`;
                behaviorResult.textContent = `Первое посещение: ${firstVisit.split('=')[1]} BST\nПосещений: ${visitCount}`;
            }
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