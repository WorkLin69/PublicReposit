 // Форматирование текста
        function formatText() {
            const input = document.getElementById('formatInput').value;
            const quotes = input.replace(/[«»]/g, '"');
            const lineBreaks = quotes.replace(/\n/g, '<br>');
            const creditCard = lineBreaks.replace(/\b(\d{4})(\d{4})(\d{4})(\d{4})\b/g, '$1 $2 $3 $4');
            document.getElementById('formatResult').innerHTML = creditCard;
        }

        // Анализатор текста
        function analyzeText() {
            const text = document.getElementById('analyzeInput').value;
            const wordCount = text.split(/\s+/).filter(word => word).length;
            const emails = [...text.matchAll(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+/g)].map(m => m[0]);
            const phones = [...text.matchAll(/\+?\d{10,14}/g)].map(m => m[0]);
            const longWords = [...new Set(text.match(/\b\w{5,}\b/g) || [])];

            document.getElementById('analyzeResult').textContent = 
                `Слов: ${wordCount}\nEmails: ${emails.join(', ') || 'Нет'}\nТелефоны: ${phones.join(', ') || 'Нет'}\nСлова длиннее 4: ${longWords.join(', ') || 'Нет'}`;
        }

        // Валидатор форм
        function validateEmail() {
            const email = document.getElementById('validateEmailInput').value;
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/u;
            const result = document.getElementById('validateEmailResult');
            result.textContent = regex.test(email) ? 'Валиден' : 'Невалиден';
            result.className = 'result' + (regex.test(email) ? '' : ' error');
        }

        function validatePassport() {
            const passport = document.getElementById('passportInput').value;
            const regex = /^\d{2}[A-Z]{2}\d{6}$/;
            const result = document.getElementById('passportResult');
            result.textContent = regex.test(passport) ? 'Валиден' : 'Невалиден (формат: 12AB123456)';
            result.className = 'result' + (regex.test(passport) ? '' : ' error');
        }

        function validateSnils() {
            const snils = document.getElementById('snilsInput').value;
            const regex = /^\d{3}-\d{3}-\d{3} \d{2}$/;
            const result = document.getElementById('snilsResult');
            result.textContent = regex.test(snils) ? 'Валиден' : 'Невалиден (формат: 123-456-789 01)';
            result.className = 'result' + (regex.test(snils) ? '' : ' error');
        }

        // Транслятор Markdown → HTML
        function convertMarkdown() {
            let text = document.getElementById('markdownInput').value;
            text = text.replace(/^######\s(.+)$/gm, '<h6>$1</h6>')
                       .replace(/^#####\s(.+)$/gm, '<h5>$1</h5>')
                       .replace(/^####\s(.+)$/gm, '<h4>$1</h4>')
                       .replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
                       .replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
                       .replace(/^#\s(.+)$/gm, '<h1>$1</h1>')
                       .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                       .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
            document.getElementById('markdownResult').innerHTML = text;
        }