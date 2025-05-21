  // Динамический конструктор форм
        const formBuilder = document.getElementById('formBuilder');
        let fields = [];

        function addField() {
            const type = document.getElementById('fieldType').value;
            const fieldDiv = document.createElement('div');
            fieldDiv.className = 'field';
            let input;

            if (type === 'text') {
                input = `<label>Текстовое поле: <input type="text" placeholder="Введите текст"></label>`;
            } else if (type === 'number') {
                input = `<label>Числовое поле: <input type="number" placeholder="Введите число"></label>`;
            } else if (type === 'select') {
                input = `<label>Выбор: <select><option>Опция 1</option><option>Опция 2</option></select></label>`;
            }

            fieldDiv.innerHTML = `${input} <button onclick="removeField(this)">Удалить</button>`;
            formBuilder.appendChild(fieldDiv);
            fields.push({ type, html: fieldDiv.innerHTML });
        }

        function removeField(btn) {
            const fieldDiv = btn.parentElement;
            const index = Array.from(formBuilder.children).indexOf(fieldDiv);
            fields.splice(index, 1);
            fieldDiv.remove();
        }

        function generateForm() {
            const formCode = document.getElementById('formCode');
            const html = `<form>${fields.map(f => f.html.replace(' <button onclick="removeField(this)">Удалить</button>', '')).join('')}<button type="submit">Отправить</button></form>`;
            formCode.value = html;
        }

        // Многошаговая форма регистрации
        const regForm = document.getElementById('regForm');
        const regSteps = document.querySelectorAll('.form-step');
        const regProgress = document.querySelectorAll('.step');
        const regOutput = document.getElementById('regOutput');

        function nextRegStep(step) {
            if (step === 2 && !document.getElementById('regName').value) {
                document.getElementById('regNameError').textContent = 'Введите имя';
                return;
            }
            if (step === 3 && !document.getElementById('regEmail').value) {
                document.getElementById('regEmailError').textContent = 'Введите email';
                return;
            }
            regSteps.forEach(s => s.classList.remove('active'));
            regProgress.forEach(s => s.classList.remove('active'));
            document.getElementById(`regStep${step}`).classList.add('active');
            regProgress[step - 1].classList.add('active');
        }

        function prevRegStep(step) {
            regSteps.forEach(s => s.classList.remove('active'));
            regProgress.forEach(s => s.classList.remove('active'));
            document.getElementById(`regStep${step}`).classList.add('active');
            regProgress[step - 1].classList.add('active');
        }

        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                notifications: document.getElementById('regNotifications').value
            };
            const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
            regOutput.textContent = `Регистрация завершена в ${time} BST: ${JSON.stringify(data)}`;
            regForm.reset();
            nextRegStep(1);
        });

        // Форма с динамической зависимостью полей
        const cityForm = document.getElementById('cityForm');
        const citySelect = document.getElementById('city');
        const cityOutput = document.getElementById('cityOutput');
        const cityCache = {};

        function loadCities() {
            const country = document.getElementById('country').value;
            if (!country) return;

            if (cityCache[country]) {
                updateCitySelect(cityCache[country]);
                return;
            }

            const cities = {
                russia: ['Москва', 'Санкт-Петербург', 'Новосибирск'],
                usa: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго']
            }[country] || [];

            cityCache[country] = cities;
            updateCitySelect(cities);
        }

        function updateCitySelect(cities) {
            citySelect.innerHTML = cities.map(city => `<option value="${city}">${city}</option>`).join('');
        }

        cityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                country: document.getElementById('country').value,
                city: document.getElementById('city').value
            };
            const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
            cityOutput.textContent = `Выбрано в ${time} BST: ${JSON.stringify(data)}`;
        });

        // Форма с превью изображения
        const avatarForm = document.getElementById('avatarForm');
        const avatarInput = document.getElementById('avatar');
        const preview = document.getElementById('preview');
        const avatarError = document.getElementById('avatarError');
        const avatarOutput = document.getElementById('avatarOutput');

        avatarInput.addEventListener('change', () => {
            const file = avatarInput.files[0];
            if (file) {
                if (!file.type.startsWith('image/')) {
                    avatarError.textContent = 'Файл должен быть изображением';
                    preview.src = '';
                    return;
                }
                if (file.size > 2 * 1024 * 1024) {
                    avatarError.textContent = 'Файл не должен превышать 2 МБ';
                    preview.src = '';
                    return;
                }
                avatarError.textContent = '';
                const reader = new FileReader();
                reader.onload = (e) => preview.src = e.target.result;
                reader.readAsDataURL(file);
            }
        });

        avatarForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const file = avatarInput.files[0];
            if (file && !avatarError.textContent) {
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                avatarOutput.textContent = `Изображение загружено в ${time} BST: ${file.name}`;
                avatarForm.reset();
                preview.src = '';
            }
        });