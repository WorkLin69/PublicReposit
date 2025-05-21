// Динамическая таблица
        const table = document.querySelector('#dynamicTable tbody');

        function addRow() {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td contenteditable="true">Новое название</td>
                <td contenteditable="true">Новое значение</td>
            `;
            table.appendChild(row);
        }

        function removeRow() {
            if (table.rows.length > 0) {
                table.removeChild(table.lastElementChild);
            }
        }

        // Дерево каталогов
        const tree = document.getElementById('tree');

        tree.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI' && e.target.querySelector('ul')) {
                e.target.classList.toggle('collapsed');
                e.target.classList.toggle('expanded');
            }
        });

        function addNode() {
            const selected = document.querySelector('.tree li:hover');
            if (selected) {
                let ul = selected.querySelector('ul');
                if (!ul) {
                    ul = document.createElement('ul');
                    selected.appendChild(ul);
                }
                const li = document.createElement('li');
                li.textContent = `Новый узел ${Math.random().toString(36).substr(2, 5)}`;
                ul.appendChild(li);
            }
        }

        function removeNode() {
            const selected = document.querySelector('.tree li:hover');
            if (selected && selected.parentElement.tagName === 'UL' && selected.parentElement.children.length > 1) {
                selected.parentElement.removeChild(selected);
            }
        }

        // Сортировка списка
        const sortableList = document.getElementById('sortableList');

        function sortAlphabetically() {
            const items = Array.from(sortableList.children);
            items.sort((a, b) => a.textContent.localeCompare(b.textContent));
            sortableList.innerHTML = '';
            items.forEach(item => sortableList.appendChild(item));
        }

        function sortReverse() {
            const items = Array.from(sortableList.children);
            items.sort((a, b) => b.textContent.localeCompare(a.textContent));
            sortableList.innerHTML = '';
            items.forEach(item => sortableList.appendChild(item));
        }

        function shuffle() {
            const items = Array.from(sortableList.children);
            for (let i = items.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [items[i], items[j]] = [items[j], items[i]];
            }
            sortableList.innerHTML = '';
            items.forEach(item => sortableList.appendChild(item));
        }

        // Конструктор блоков
        const blockContainer = document.getElementById('blockContainer');
        let draggedItem = null;

        function addTextBlock() {
            const block = document.createElement('div');
            block.className = 'block';
            block.textContent = `Текст ${blockContainer.children.length + 1} (добавлен ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' })} BST)`;
            block.draggable = true;
            block.addEventListener('dragstart', dragStart);
            block.addEventListener('dragover', dragOver);
            block.addEventListener('drop', drop);
            block.addEventListener('dragend', dragEnd);
            blockContainer.appendChild(block);
        }

        function addImageBlock() {
            const block = document.createElement('div');
            block.className = 'block';
            const img = document.createElement('img');
            img.src = `https://via.placeholder.com/100?text=Изображение ${blockContainer.children.length + 1}`;
            block.appendChild(img);
            block.draggable = true;
            block.addEventListener('dragstart', dragStart);
            block.addEventListener('dragover', dragOver);
            block.addEventListener('drop', drop);
            block.addEventListener('dragend', dragEnd);
            blockContainer.appendChild(block);
        }

        function dragStart(e) {
            draggedItem = e.target;
            e.dataTransfer.setData('text/plain', '');
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function drop(e) {
            e.preventDefault();
            if (draggedItem !== e.target) {
                const blocks = Array.from(blockContainer.children);
                const fromIndex = blocks.indexOf(draggedItem);
                const toIndex = blocks.indexOf(e.target);
                if (fromIndex > -1 && toIndex > -1) {
                    blockContainer.insertBefore(draggedItem, e.target);
                }
            }
        }

        function dragEnd() {
            draggedItem = null;
        }