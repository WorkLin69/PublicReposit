     // Динамическая галерея
        const gallery = document.getElementById('gallery');
        const imageData = [
            { src: 'img/picture1.jpg', caption: 'Изображение 1' },
            { src: 'img/picture2.jpg', caption: 'Изображение 2' },
            { src: 'img/picture3.jpg', caption: 'Изображение 3' },
            { src: 'img/picture1.jpg', caption: 'Изображение 4' }
        ];

        imageData.forEach(item => { // Перебираем массив изображений для каждого элемента массива imageData
            const div = document.createElement('div'); //Создаём контейнер для элемента галереи
            div.className = 'gallery-item'; // Добавляем класс к контейнеру
            div.innerHTML = `
                <img src="" data-src="${item.src}" class="lazy" loading="lazy" alt="${item.caption}">
                <div class="caption">${item.caption}</div>
            `;
            gallery.appendChild(div); // Готовый <div class="gallery-item"> добавляется в контейнер gallery.
        });

        // Ленивая загрузка
        const images = document.querySelectorAll('.lazy'); // Инициализация элементов для ленивой загрузки
        const observer = new IntersectionObserver((entries, observer) => { // Современный API браузеров отслеживающий видимость области
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' }); // Создаёт "буферную зону" вокруг вьюпорта

        images.forEach(img => observer.observe(img));

        // Кнопка с состояниями
        const stateButton = document.getElementById('stateButton');
        stateButton.addEventListener('click', () => {
            stateButton.textContent = 'Нажата!';
            setTimeout(() => {
                stateButton.textContent = 'Нажми меня';
            }, 1000);
        });

        // Слайдер
        const sliderImages = document.getElementById('sliderImages');
        const slideData = [
            'img/picture1.jpg',
            'img/picture2.jpg',
            'img/picture3.jpg'
        ];
        let currentSlide = 0;

        slideData.forEach(src => {
            const img = document.createElement('img');
            img.className = 'slider-image';
            img.src = src; // Прямое указание пути к файлу
            sliderImages.appendChild(img);
        });

        function updateSlide() {
            sliderImages.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideData.length; //Увеличивает индекс на 1 и за счет этого слайд перелистывается
            updateSlide();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideData.length) % slideData.length; //Уменьшает индекс на 1 и за счет этого слайд перелистывается
            updateSlide();
        }

        
        setInterval(nextSlide, 2000); //автопрокруутка

        // Обработка переходов
        sliderImages.addEventListener('transitionend', () => { //ransitionend: Срабатывает после завершения CSS-анимации Сбрасывает индекс при выходе за границы
            if (currentSlide === slideData.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slideData.length - 1;
            updateSlide();
        });