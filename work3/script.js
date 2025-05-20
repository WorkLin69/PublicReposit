     // 1. Обработчик для кнопки (click)
        const clickButton = document.getElementById('clickButton');
        const clickOutput = document.getElementById('clickOutput');
        clickButton.addEventListener('click', (event) => {
            clickOutput.innerHTML = `
                Тип события: ${event.type}<br>
                Целевой элемент: ${event.target.tagName}<br>
                Координаты клика: X=${event.clientX}, Y=${event.clientY}
            `;
        });

        // 2. Обработчик для ссылки (mouseover и отмена действия по умолчанию)
        const myLink = document.getElementById('myLink');
        const linkOutput = document.getElementById('linkOutput');
        myLink.addEventListener('mouseover', (event) => {
            linkOutput.innerHTML = `
                Тип события: ${event.type}<br>
                Элемент: ${event.target.tagName}<br>
                Всплывает: ${event.bubbles}
            `;
        });
        myLink.addEventListener('click', (event) => {
            event.preventDefault();
            linkOutput.innerHTML += '<br>Переход отменён!';
        });

        // 3. Обработчик для поля ввода (keypress)
        const keyInput = document.getElementById('keyInput');
        const keyOutput = document.getElementById('keyOutput');
        keyInput.addEventListener('keypress', (event) => {
            keyOutput.innerHTML = `
                Тип события: ${event.type}<br>
                Клавиша: ${event.key}<br>
                Код: ${event.code}
            `;
        });

        // 4. Остановка всплытия для вложенных элементов
        const parent = document.getElementById('parent');
        const child = document.getElementById('child');
        const nestedOutput = document.getElementById('nestedOutput');
        parent.addEventListener('click', () => {
            nestedOutput.innerHTML = 'Клик по родителю';
        });
        child.addEventListener('click', (event) => {
            event.stopPropagation();
            nestedOutput.innerHTML = 'Клик по кнопке (всплытие остановлено)';
        });

        // 5. Отображение координат мыши
        const mouseArea = document.getElementById('mouseArea');
        const mouseOutput = document.getElementById('mouseOutput');
        mouseArea.addEventListener('mousemove', (event) => {
            mouseOutput.innerHTML = `
                Тип события: ${event.type}<br>
                Координаты: X=${event.clientX}, Y=${event.clientY}
            `;
        });

        // 6. Отмена действия по умолчанию для формы
        const myForm = document.getElementById('myForm');
        const formOutput = document.getElementById('formOutput');
        myForm.addEventListener('submit', (event) => {
            event.preventDefault();
            formOutput.innerHTML = 'Отправка формы отменена!';
        });

   