 // Менеджер ссылок
        const linkInput = document.getElementById('linkInput');
        const linksList = document.getElementById('linksList');

        function addLink() {
            const url = linkInput.value.trim();
            if (url && url.startsWith('http')) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = url;
                a.textContent = url;
                if (!url.startsWith(window.location.origin)) a.classList.add('external');
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Изменить';
                editBtn.onclick = () => {
                    const newUrl = prompt('Введите новый URL:', url);
                    if (newUrl && newUrl.startsWith('http')) {
                        a.href = newUrl;
                        a.textContent = newUrl;
                        if (!newUrl.startsWith(window.location.origin)) a.classList.add('external');
                        else a.classList.remove('external');
                    }
                };
                li.appendChild(a);
                li.appendChild(editBtn);
                linksList.appendChild(li);
                linkInput.value = '';
            }
        }

        function openAllLinks() {
            const links = linksList.getElementsByTagName('a');
            for (let link of links) {
                window.open(link.href, '_blank');
            }
            const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
            alert(`Все ссылки открыты в ${time} BST`);
        }

        // Анализатор страницы
        const analysisOutput = document.getElementById('analysisOutput');

        function analyzePage() {
            const links = document.getElementsByTagName('a').length;
            const images = document.getElementsByTagName('img').length;
            const title = document.title;
            const body = document.body.getBoundingClientRect();
            const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
            analysisOutput.textContent = `Анализ на ${time} BST: Ссылок: ${links}, Изображений: ${images}, Заголовок: ${title}, Размеры body: ${Math.round(body.width)}x${Math.round(body.height)}px`;
        }

        // Генератор оглавления
        const tableOfContents = document.getElementById('tableOfContents');

        function generateTOC() {
            const headings = document.querySelectorAll('h2, h3');
            const toc = document.createElement('ul');
            headings.forEach(heading => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${heading.id}`;
                a.textContent = heading.textContent;
                li.appendChild(a);
                toc.appendChild(li);
            });
            tableOfContents.innerHTML = '';
            tableOfContents.appendChild(toc);
        }

        generateTOC();

        // Модификатор страницы
        let fontSize = 16;
        let isNightMode = false;

        function changeBackground() {
            document.body.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        }

        function increaseFont() {
            fontSize += 2;
            document.body.style.fontSize = `${fontSize}px`;
        }

        function decreaseFont() {
            if (fontSize > 10) {
                fontSize -= 2;
                document.body.style.fontSize = `${fontSize}px`;
            }
        }

        function toggleMode() {
            isNightMode = !isNightMode;
            document.body.classList.toggle('night-mode');
        }
    