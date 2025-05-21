  // Форма входа
        const loginForm = document.getElementById('loginForm');
        const loginOutput = document.getElementById('loginOutput');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            let isValid = true;
            document.getElementById('loginError').textContent = login ? '' : 'Введите логин';
            document.getElementById('passwordError').textContent = password.length >= 6 ? '' : 'Пароль должен быть минимум 6 символов';
            if (!login || password.length < 6) isValid = false;

            if (isValid) {
                if (rememberMe) localStorage.setItem('user', login);
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                loginOutput.textContent = `Вход выполнен в ${time} BST: ${login}`;
                loginForm.reset();
            }
        });

        // Форма заказа
        const orderForm = document.getElementById('orderForm');
        const orderOutput = document.getElementById('orderOutput');

        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                fullName: document.getElementById('fullName').value,
                address: document.getElementById('address').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('orderEmail').value,
                payment: document.querySelector('input[name="payment"]:checked')?.value,
                comment: document.getElementById('comment').value
            };
            const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
            orderOutput.textContent = `Заказ оформлен в ${time} BST: ${JSON.stringify(data)}`;
            orderForm.reset();
        });

        // Анкета пользователя
        const userForm = document.getElementById('userForm');
        const userOutput = document.getElementById('userOutput');

        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                photo: document.getElementById('photo').files[0]?.name || '',
                education: document.getElementById('education').value,
                skills: Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(s => s.value),
                about: document.getElementById('about').value
            };
            const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
            userOutput.textContent = `Анкета сохранена в ${time} BST: ${JSON.stringify(data)}`;
            userForm.reset();
        });

        // Многостраничная форма
        const multiStepForm = document.getElementById('multiStepForm');
        const steps = document.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.step');
        const multiStepOutput = document.getElementById('multiStepOutput');

        function nextStep(step) {
            steps.forEach(s => s.classList.remove('active'));
            progressSteps.forEach(s => s.classList.remove('active'));
            document.getElementById(`step${step}`).classList.add('active');
            progressSteps[step - 1].classList.add('active');
        }

        function prevStep(step) {
            steps.forEach(s => s.classList.remove('active'));
            progressSteps.forEach(s => s.classList.remove('active'));
            document.getElementById(`step${step}`).classList.add('active');
            progressSteps[step - 1].classList.add('active');
        }

        multiStepForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                name: document.getElementById('step1Name').value,
                email: document.getElementById('step2Email').value,
                phone: document.getElementById('step3Phone').value
            };
            const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
            multiStepOutput.textContent = `Форма завершена в ${time} BST: ${JSON.stringify(data)}`;
            multiStepForm.reset();
            nextStep(1);
        });