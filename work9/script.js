   // Навигационное меню: добавление класса active
        const navMenu = document.getElementById('navMenu');
        const menuItems = navMenu.getElementsByTagName('li');
        for (let item of menuItems) {
            if (item.querySelector('ul')) {
                item.classList.add('active');
            }
        }

        // Хлебные крошки
        function showBreadcrumbs() {
            const target = document.getElementById('targetElement');
            const breadcrumbs = document.getElementById('breadcrumbs');
            let path = [];
            let current = target;

            while (current && current !== document) {
                path.push(current.tagName.toLowerCase());
                current = current.parentElement;
            }

            breadcrumbs.textContent = path.reverse().join(' > ') + ` (по состоянию на ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' })} BST)`;
        }

        // Сортировка списка
        function sortList() {
            const list = document.getElementById('sortList');
            const items = Array.from(list.getElementsByTagName('li'));
            items.sort((a, b) => a.textContent.localeCompare(b.textContent));
            list.innerHTML = '';
            items.forEach(item => list.appendChild(item));
        }

        // Построение DOM-дерева
        function buildDomTree() {
            const target = document.getElementById('treeTarget');
            const domTree = document.getElementById('domTree');

            function createTree(element) {
                const ul = document.createElement('ul');
                const li = document.createElement('li');
                li.textContent = element.tagName.toLowerCase();
                ul.appendChild(li);

                for (let child of element.children) {
                    const childTree = createTree(child);
                    ul.appendChild(childTree);
                }

                return ul;
            }

            domTree.innerHTML = '';
            domTree.appendChild(createTree(target));
        }