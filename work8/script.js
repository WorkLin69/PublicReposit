  // Таймер с изменением DOM
        const startTimerBtn = document.getElementById('startTimerBtn');
        const timerOutput = document.getElementById('timerOutput');
        let seconds = 0;
        let timerId = null;

        startTimerBtn.addEventListener('click', () => {
            if (!timerId) {
                timerId = setInterval(() => {
                    seconds++;
                    timerOutput.textContent = seconds;
                }, 1000);
            }
        });

        // Определение размеров экрана и адаптация стилей
        const screenWidthDisplay = document.getElementById('screenWidth');
        const adaptiveBlock = document.getElementById('adaptiveBlock');

        function updateStyles() {
            const screenWidth = window.screen.width;
            screenWidthDisplay.textContent = screenWidth;
            if (screenWidth < 600) {
                adaptiveBlock.style.backgroundColor = '#ffcccc';
            } else {
                adaptiveBlock.style.backgroundColor = '#e0e0e0';
            }
        }

        updateStyles();
        window.addEventListener('resize', updateStyles);

        // История посещений
        const addHistoryBtn = document.getElementById('addHistoryBtn');
        const goBackBtn = document.getElementById('goBackBtn');
        const pageContent = document.getElementById('pageContent');
        let pageCounter = 0;

        addHistoryBtn.addEventListener('click', () => {
            pageCounter++;
            const newState = { page: pageCounter };
            const newTitle = `Страница ${pageCounter}`;
            const newUrl = `page${pageCounter}`;
            history.pushState(newState, newTitle, newUrl);
            pageContent.textContent = `Содержимое страницы ${pageCounter} (добавлено в ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' })})`;
        });

        goBackBtn.addEventListener('click', () => {
            history.back();
        });

        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.page) {
                pageContent.textContent = `Содержимое страницы ${event.state.page}`;
            } else {
                pageContent.textContent = 'Начальная страница';
            }
        });