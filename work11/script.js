// Интерактивная галерея
        const gallery = document.getElementById('gallery');
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modalImage');
        let currentIndex = 0;
        const images = gallery.getElementsByTagName('img');

        gallery.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                currentIndex = Array.from(images).indexOf(event.target);
                modalImage.src = images[currentIndex].src;
                modal.style.display = 'flex';
            }
        });

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            modalImage.src = images[currentIndex].src;
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            modalImage.src = images[currentIndex].src;
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        // Drag-and-Drop
        const draggables = document.querySelectorAll('.draggable');
        const dropZones = document.querySelectorAll('.drop-zone');

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.id);
            });
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('over');
            });
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('over');
            });
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('over');
                const id = e.dataTransfer.getData('text');
                const draggable = document.getElementById(id);
                zone.appendChild(draggable);
                draggable.style.position = 'static';
            });
        });

        // Кастомное контекстное меню
        const contextMenu = document.getElementById('contextMenu');
        const element1 = document.getElementById('element1');
        const element2 = document.getElementById('element2');

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            contextMenu.style.display = 'block';
            contextMenu.style.left = e.pageX + 'px';
            contextMenu.style.top = e.pageY + 'px';

            if (e.target === element1) {
                contextMenu.innerHTML = `
                    <div onclick="alert('Действие 1 для Элемента 1')">Действие 1</div>
                    <div onclick="alert('Действие 2 для Элемента 1')">Действие 2</div>
                `;
            } else if (e.target === element2) {
                contextMenu.innerHTML = `
                    <div onclick="alert('Действие 1 для Элемента 2')">Действие 1</div>
                    <div onclick="alert('Действие 2 для Элемента 2')">Действие 2</div>
                `;
            } else {
                contextMenu.style.display = 'none';
            }
        });

        document.addEventListener('click', () => {
            contextMenu.style.display = 'none';
        });

        // Валидация формы
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const formOutput = document.getElementById('formOutput');

        username.addEventListener('input', () => {
            username.classList.remove('invalid');
            usernameError.textContent = '';
            if (username.value.length < 3) {
                username.classList.add('invalid');
                usernameError.textContent = 'Минимум 3 символа';
            }
        });

        email.addEventListener('input', () => {
            email.classList.remove('invalid');
            emailError.textContent = '';
            if (!email.value.includes('@')) {
                email.classList.add('invalid');
                emailError.textContent = 'Введите корректный email';
            }
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