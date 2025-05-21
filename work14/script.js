// Текстовый редактор
        const editor = document.getElementById('editor');
        let history = [];

        function formatText(command) {
            history.push(editor.innerHTML); // Сохраняем текущее состояние
            if (command === 'bold') {
                document.execCommand('bold', false, null) || wrapSelection('<strong>', '</strong>');
            } else if (command === 'italic') {
                document.execCommand('italic', false, null) || wrapSelection('<em>', '</em>');
            }
        }

        function createLink() {
            const url = prompt('Введите URL:');
            if (url) {
                history.push(editor.innerHTML);
                document.execCommand('createLink', false, url) || wrapSelection(`<a href="${url}">`, '</a>');
            }
        }

        function wrapSelection(startTag, endTag) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                const content = range.extractContents();
                const wrapper = document.createElement('div');
                wrapper.innerHTML = startTag + content.textContent + endTag;
                range.insertNode(wrapper);
                history.push(editor.innerHTML); // Сохраняем после изменения
            }
        }

        function undo() {
            if (history.length > 0) {
                editor.innerHTML = history.pop(); // Возвращаем предыдущее состояние
            } else {
                alert('Нет действий для отмены');
            }
        }

        // Выделение таблицы
        const table = document.getElementById('dataTable');
        let selectedRows = [];
        let selectedCells = [];

        table.addEventListener('click', (e) => {
            if (e.target.tagName === 'TD') {
                const row = e.target.parentElement;
                const cell = e.target;
                if (e.shiftKey) {
                    row.classList.toggle('selected');
                    if (selectedRows.includes(row)) {
                        selectedRows = selectedRows.filter(r => r !== row);
                    } else {
                        selectedRows.push(row);
                    }
                } else {
                    cell.classList.toggle('selected');
                    if (selectedCells.includes(cell)) {
                        selectedCells = selectedCells.filter(c => c !== cell);
                    } else {
                        selectedCells.push(cell);
                    }
                }
            }
        });

        function copySelected() {
            let text = '';
            if (selectedRows.length > 0) {
                selectedRows.forEach(row => {
                    Array.from(row.cells).forEach(cell => text += cell.textContent + '\t');
                    text += '\n';
                });
            } else if (selectedCells.length > 0) {
                selectedCells.forEach(cell => text += cell.textContent + '\n');
            }
            if (text) {
                navigator.clipboard.writeText(text).then(() => {
                    const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                    alert(`Данные скопированы в ${time} BST`);
                });
            }
        }

        function deleteSelected() {
            selectedRows.forEach(row => row.parentElement.removeChild(row));
            selectedCells.forEach(cell => cell.textContent = '');
            selectedRows = [];
            selectedCells = [];
        }

        // Поиск по странице
        let matches = [];
        let currentMatchIndex = -1;

        function searchText() {
            const searchInput = document.getElementById('searchInput').value;
            const content = document.getElementById('content');
            matches = [];
            currentMatchIndex = -1;
            content.innerHTML = content.textContent.replace(new RegExp(`\\b\\w+\\b`, 'gi'), word => {
                if (word.toLowerCase().includes(searchInput.toLowerCase()) && searchInput) {
                    matches.push(word);
                    return `<span class="highlight">${word}</span>`;
                }
                return word;
            });
        }

        function nextMatch() {
            if (matches.length > 0) {
                currentMatchIndex = (currentMatchIndex + 1) % matches.length;
                updateHighlight();
            }
        }

        function prevMatch() {
            if (matches.length > 0) {
                currentMatchIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
                updateHighlight();
            }
        }

        function updateHighlight() {
            const highlights = document.querySelectorAll('.highlight');
            highlights.forEach((highlight, index) => {
                highlight.style.background = index === currentMatchIndex ? 'orange' : 'yellow';
            });
        }

        // Кастомное контекстное меню
        const contextMenu = document.getElementById('contextMenu');
        let selectedText = '';

        document.addEventListener('contextmenu', (e) => {
            const text = window.getSelection().toString();
            if (text) {
                e.preventDefault();
                selectedText = text;
                contextMenu.style.display = 'block';
                contextMenu.style.left = e.pageX + 'px';
                contextMenu.style.top = e.pageY + 'px';
                contextMenu.innerHTML = `
                    <div onclick="copyText()">Копировать</div>
                    <div onclick="pasteText()">Вставить</div>
                    <div onclick="searchGoogle()">Искать в Google</div>
                `;
            }
        });

        document.addEventListener('click', () => {
            contextMenu.style.display = 'none';
        });

        function copyText() {
            navigator.clipboard.writeText(selectedText).then(() => {
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                alert(`Текст скопирован в ${time} BST`);
            });
        }

        function pasteText() {
            navigator.clipboard.readText().then(text => {
                if (document.activeElement === editor) {
                    const range = window.getSelection().getRangeAt(0);
                    range.deleteContents();
                    range.insertNode(document.createTextNode(text));
                }
            }).catch(err => alert('Ошибка вставки'));
        }

        function searchGoogle() {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedText)}`, '_blank');
        }