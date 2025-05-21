  // Редактируемый список
        const editableList = document.getElementById('editableList');
        editableList.addEventListener('dblclick', (event) => {
            if (event.target.tagName === 'LI') {
                const newText = prompt('Введите новый текст:', event.target.textContent);
                if (newText) event.target.textContent = newText;
            }
        });

        function addItem() {
            const li = document.createElement('li');
            li.textContent = `Новый элемент ${editableList.children.length + 1}`;
            editableList.appendChild(li);
        }

        function removeItem() {
            if (editableList.lastElementChild) {
                editableList.removeChild(editableList.lastElementChild);
            }
        }

        // Переключатель тем
        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
        }

        // Валидация формы
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const formOutput = document.getElementById('formOutput');

        [username, email].forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
                if (input.id === 'username' && input.value.length < 3) {
                    input.classList.add('invalid');
                }
                if (input.id === 'email' && !input.value.includes('@')) {
                    input.classList.add('invalid');
                }
            });
        });

        function submitForm() {
            if (!username.classList.contains('invalid') && !email.classList.contains('invalid')) {
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                formOutput.textContent = `Форма отправлена в ${time}: Имя: ${username.value}, Email: ${email.value}`;
                username.value = '';
                email.value = '';
            } else {
                formOutput.textContent = 'Исправьте ошибки!';
            }
        }

        // Галерея изображений
        const thumbnails = document.querySelectorAll('.thumbnail');
        const mainImage = document.getElementById('mainImage');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.setAttribute('src', thumb.src.replace('100', '400'));
            });
        });