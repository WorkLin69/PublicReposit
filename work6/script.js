    // Управление полноэкранным режимом
        const fullScreenBtn = document.getElementById('fullScreenBtn');
        const exitFullScreenBtn = document.getElementById('exitFullScreenBtn');

        fullScreenBtn.addEventListener('click', () => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        });

        exitFullScreenBtn.addEventListener('click', () => {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        });

        // Детектор браузера
        const browserOutput = document.getElementById('browserOutput');
        const userAgent = navigator.userAgent;
        let browserName = 'Неизвестно';
        let browserVersion = 'Неизвестно';
        let isMobile = /Mobi|Android|iPhone/i.test(userAgent);

        if (userAgent.indexOf('Chrome') > -1) {
            browserName = 'Chrome';
            browserVersion = userAgent.match(/Chrome\/([\d.]+)/)[1];
        } else if (userAgent.indexOf('Firefox') > -1) {
            browserName = 'Firefox';
            browserVersion = userAgent.match(/Firefox\/([\d.]+)/)[1];
        } else if (userAgent.indexOf('Safari') > -1) {
            browserName = 'Safari';
            browserVersion = userAgent.match(/Version\/([\d.]+)/)[1];
        } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
            browserName = 'Internet Explorer';
            browserVersion = userAgent.match(/(?:MSIE |rv:)(\d+\.\d+)/)[1];
        }

        browserOutput.textContent = `Браузер: ${browserName}, Версия: ${browserVersion}, Устройство: ${isMobile ? 'Мобильное' : 'Десктоп'}`;
        if (browserName === 'Internet Explorer' || parseInt(browserVersion) < 50) {
            alert('Ваш браузер устарел! Обновите его для лучшей работы.');
        }

        // Навигационное меню
        const navList = document.getElementById('navList');
        const backBtn = document.getElementById('backBtn');
        const currentURL = document.getElementById('currentURL');
        let history = [];

        navList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const url = event.target.getAttribute('data-url');
                history.push(window.location.hash);
                window.location.hash = url;
                currentURL.textContent = url;
            }
        });

        backBtn.addEventListener('click', () => {
            if (history.length > 0) {
                window.location.hash = history.pop();
                currentURL.textContent = window.location.hash || '#';
            }
        });

        window.addEventListener('hashchange', () => {
            currentURL.textContent = window.location.hash || '#';
        });

        // Адаптивный интерфейс
        const layoutInfo = document.getElementById('layoutInfo');
        const screenWidth = document.getElementById('screenWidth');
        const orientation = document.getElementById('orientation');

        function updateLayout() {
            const width = window.innerWidth;
            screenWidth.textContent = width;
            orientation.textContent = window.innerHeight > window.innerWidth ? 'Портрет' : 'Альбом';
            layoutInfo.parentElement.className = width > 600 ? 'container desktop-layout' : 'container mobile-layout';
            if (width <= 600 && window.innerHeight > window.innerWidth) {
                alert('Ориентация изменена на портрет!');
            }
        }

        window.addEventListener('resize', updateLayout);
        window.addEventListener('orientationchange', updateLayout);
        updateLayout();