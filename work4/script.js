     // Динамическая галерея
        const gallery = document.getElementById('gallery');
        const imageData = [
            { src: 'img/picture1.jpg', caption: 'Изображение 1' },
            { src: 'img/picture2.jpg', caption: 'Изображение 2' },
            { src: 'img/picture3.jpg', caption: 'Изображение 3' },
            { src: 'img/picture1.jpg', caption: 'Изображение 4' }
        ];

        imageData.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `
                <img src="" data-src="${item.src}" class="lazy" loading="lazy" alt="${item.caption}">
                <div class="caption">${item.caption}</div>
            `;
            gallery.appendChild(div);
        });

        // Ленивая загрузка
        const images = document.querySelectorAll('.lazy');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

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
            currentSlide = (currentSlide + 1) % slideData.length;
            updateSlide();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slideData.length) % slideData.length;
            updateSlide();
        }

        
        setInterval(nextSlide, 2000);

        // Обработка переходов
        sliderImages.addEventListener('transitionend', () => {
            if (currentSlide === slideData.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slideData.length - 1;
            updateSlide();
        });