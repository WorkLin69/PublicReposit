 // Форма с динамической проверкой
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const formOutput = document.getElementById('formOutput');

        [nameInput, emailInput, passwordInput].forEach(input => {
            input.addEventListener('input', () => {
                nameError.textContent = '';
                emailError.textContent = '';
                passwordError.textContent = '';
                if (nameInput.value.length < 2) nameError.textContent = 'Минимум 2 символа';
                if (!emailInput.value.includes('@')) emailError.textContent = 'Неверный email';
                if (passwordInput.value.length < 6) passwordError.textContent = 'Минимум 6 символов';
            });
        });

        function submitForm() {
            if (!nameError.textContent && !emailError.textContent && !passwordError.textContent) {
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
                formOutput.textContent = `Форма отправлена в ${time}: Имя: ${nameInput.value}, Email: ${emailInput.value}, Пароль: ${passwordInput.value}`;
                [nameInput, emailInput, passwordInput].forEach(input => input.value = '');
            } else {
                formOutput.textContent = 'Исправьте ошибки!';
            }
        }

        // Галерея изображений
        const thumbnails = document.querySelectorAll('.thumbnail');
        const largeImage = document.getElementById('largeImage');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                largeImage.src = thumb.src;
                largeImage.style.display = 'block';
            });
        });

        // Таймер обратного отсчета
        let timer = document.getElementById('timer');
        let timeLeft = 60; // 1 минута
        let timerId = null;

        function updateTimer() {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            if (timeLeft > 0) timeLeft--;
            else clearInterval(timerId);
        }

        function startTimer() {
            if (!timerId) timerId = setInterval(updateTimer, 1000);
        }

        function pauseTimer() {
            clearInterval(timerId);
            timerId = null;
        }

        function resetTimer() {
            pauseTimer();
            timeLeft = 60;
            updateTimer();
        }

        // Drag & Drop
        const draggable = document.getElementById('draggable');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        draggable.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);

        function startDragging(e) {
            initialX = e.clientX - currentX;
            initialY = e.clientY - currentY;
            isDragging = true;
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                draggable.style.left = currentX + 'px';
                draggable.style.top = currentY + 'px';
            }
        }

        function stopDragging() {
            isDragging = false;
        }

        // Инициализация позиций
        draggable.style.position = 'absolute';
        currentX = 0;
        currentY = 0;