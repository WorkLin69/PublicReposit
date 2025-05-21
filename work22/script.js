     // Безопасная авторизация
        const loginForm = document.getElementById('loginForm');
        const loginResult = document.getElementById('loginResult');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const usernameError = document.getElementById('usernameError');
            const passwordError = document.getElementById('passwordError');

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
                // Эмуляция сервера: создание токена и установка HttpOnly cookie
                const token = btoa(username + ':' + Date.now()); // Простая эмуляция токена
                document.cookie = `authToken=${token}; HttpOnly; Secure; path=/`;
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                loginResult.textContent = `Вход выполнен в ${time} BST: ${username}`;
                loginForm.reset();
            }
        });

        // Миграция с cookies на localStorage
        const migrationResult = document.getElementById('migrationResult');

        function migrateSettings() {
            // Пример с cookies (из предыдущей практики: размер шрифта)
            const oldFontSize = document.cookie.split('; ').find(row => row.startsWith('fontSize='))?.split('=')[1] || '16';
            document.cookie = `fontSize=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`; // Удаление cookie
            localStorage.setItem('fontSize', oldFontSize);

            // Производительность: измерение времени
            const startCookie = performance.now();
            document.cookie = `test=123; path=/`;
            const endCookie = performance.now();
            const cookieTime = endCookie - startCookie;

            const startLocal = performance.now();
            localStorage.setItem('test', '123');
            const endLocal = performance.now();
            const localTime = endLocal - startLocal;

            migrationResult.textContent = `Cookie: ${cookieTime.toFixed(2)}ms, localStorage: ${localTime.toFixed(2)}ms. localStorage быстрее при больших данных.`;
        }

        // Гибридное хранилище
        const hybridForm = document.getElementById('hybridForm');
        const hybridResult = document.getElementById('hybridResult');

        hybridForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const token = document.getElementById('token').value;
            const fontSize = document.getElementById('fontSize').value;
            const tempData = document.getElementById('tempData').value;
            const tokenError = document.getElementById('tokenError');
            const fontSizeError = document.getElementById('fontSizeError');
            const tempDataError = document.getElementById('tempDataError');

            let isValid = true;
            if (!token) {
                tokenError.textContent = 'Введите токен';
                isValid = false;
            } else tokenError.textContent = '';
            if (fontSize < 12 || fontSize > 20) {
                fontSizeError.textContent = 'Размер от 12 до 20';
                isValid = false;
            } else fontSizeError.textContent = '';
            if (!tempData) tempDataError.textContent = 'Временные данные опциональны';
            else tempDataError.textContent = '';

            if (isValid) {
                // Критичные данные в HttpOnly cookie
                document.cookie = `authToken=${btoa(token)}; HttpOnly; Secure; path=/`;
                // UI настройки в localStorage
                localStorage.setItem('fontSize', fontSize);
                document.body.style.fontSize = `${fontSize}px`;
                // Временные данные в sessionStorage
                sessionStorage.setItem('tempData', tempData);
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                hybridResult.textContent = `Сохранено в ${time} BST: токен, размер ${fontSize}px, временные данные "${tempData}"`;
                hybridForm.reset();
            }
        });

        // Применение сохранённых настроек при загрузке
        document.addEventListener('DOMContentLoaded', () => {
            const savedFontSize = localStorage.getItem('fontSize') || '16';
            document.body.style.fontSize = `${savedFontSize}px`;
            const tempData = sessionStorage.getItem('tempData');
            if (tempData) hybridResult.textContent += `\nВременные данные: ${tempData}`;
        });