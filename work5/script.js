// Форма с валидацией
        const form = document.getElementById('myForm');
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const age = document.getElementById('age');
        const formOutput = document.getElementById('formOutput');

        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // Проверка
            let ok = true;
            document.getElementById('usernameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('ageError').textContent = '';

            if (username.value.length < 3) {
                document.getElementById('usernameError').textContent = 'Минимум 3 символа';
                ok = false;
            }
            if (email.value.indexOf('@') === -1) {
                document.getElementById('emailError').textContent = 'Неверный email';
                ok = false;
            }
            let ageNum = Number(age.value);
            if (ageNum < 18 || ageNum > 120) {
                document.getElementById('ageError').textContent = 'От 18 до 120';
                ok = false;
            }

            // Отправка при успехе
            if (ok) {
                let time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/' });
                formOutput.textContent = `Отправлено в ${time}: Имя: ${username.value}, Email: ${email.value}, Возраст: ${ageNum}`;
                form.reset();
            }
        });

        // Tab в форме
        form.addEventListener('keydown', function(event) {
            if (event.key === 'Tab') {
                event.preventDefault();
                let inputs = form.getElementsByTagName('input');
                let current = document.activeElement;
                let index = Array.from(inputs).indexOf(current);
                let next = (index + 1) % inputs.length;
                inputs[next].focus();
            }
        });

        // Drag-and-Drop
        const dropZone = document.getElementById('dropZone');
        const fileOutput = document.getElementById('fileOutput');

        dropZone.addEventListener('dragover', function(event) {
            event.preventDefault();
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', function() {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', function(event) {
            event.preventDefault();
            dropZone.classList.remove('dragover');
            let files = event.dataTransfer.files;
            let text = 'Файлы:<br>';
            let total = 0;
            for (let file of files) {
                text += `${file.name} (${file.size} байт)<br>`;
                total += file.size;
            }
            text += `Всего: ${total} байт`;
            fileOutput.innerHTML = text;
        });

        // Текстовое поле
        const textField = document.getElementById('textField');
        const textOutput = document.getElementById('textOutput');

        textField.addEventListener('input', function(event) {
            let value = event.target.value;
            value = value.replace(/[0-9]/g, ''); // Удаляем цифры
            if (value.length > 0) {
                value = value[0].toUpperCase() + value.slice(1).toLowerCase();
            }
            event.target.value = value;
            textOutput.textContent = `Текст: ${value}`;
        });

  