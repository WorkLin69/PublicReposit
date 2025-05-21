   // Валидатор форм
        function validateEmail() {
            const email = document.getElementById('emailInput').value;
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/u;
            const result = document.getElementById('emailResult');
            result.textContent = regex.test(email) ? 'Валиден' : 'Невалиден';
            result.className = 'result' + (regex.test(email) ? '' : ' error');
        }

        function validatePhone() {
            const phone = document.getElementById('phoneInput').value;
            const regex = /^\+\d{1,3}\d{9,14}$/;
            const result = document.getElementById('phoneResult');
            result.textContent = regex.test(phone) ? 'Валиден' : 'Невалиден (формат: +1234567890)';
            result.className = 'result' + (regex.test(phone) ? '' : ' error');
        }

        function validateURL() {
            const url = document.getElementById('urlInput').value;
            const regex = /^(https?:\/\/)([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
            const result = document.getElementById('urlResult');
            result.textContent = regex.test(url) ? 'Валиден' : 'Невалиден (формат: https://example.com)';
            result.className = 'result' + (regex.test(url) ? '' : ' error');
        }

        function validateIP() {
            const ip = document.getElementById('ipInput').value;
            const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
            const result = document.getElementById('ipResult');
            if (regex.test(ip)) {
                const octets = ip.split('.').map(Number);
                result.textContent = octets.every(o => o >= 0 && o <= 255) ? 'Валиден' : 'Невалиден (0-255)';
            } else {
                result.textContent = 'Невалиден (формат: 192.168.1.1)';
            }
            result.className = 'result' + (regex.test(ip) && octets.every(o => o >= 0 && o <= 255) ? '' : ' error');
        }

        // Парсер логов
        function parseLogs() {
            const logText = document.getElementById('logInput').value;
            const dateTimeRegex = /(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/g;
            const levelRegex = /\b(ERROR|WARN|INFO)\b/g;
            const messageRegex = /(?<=ERROR|WARN|INFO).*/g;

            const dates = [...logText.matchAll(dateTimeRegex)].map(m => m[0]);
            const levels = [...logText.matchAll(levelRegex)].map(m => m[0]);
            const messages = [...logText.matchAll(messageRegex)].map(m => m[0].trim());

            const result = document.getElementById('logResult');
            result.textContent = `Даты: ${dates.join(', ')}\nУровни: ${levels.join(', ')}\nСообщения: ${messages.join(', ')}`;
        }

        // Текстовый процессор
        function processText() {
            const text = document.getElementById('textInput').value;
            const cleanText = text.replace(/<[^>]+>/g, '');
            const hashtags = [...text.matchAll(/#\w+/g)].map(m => m[0]);
            const singleSpaceText = cleanText.replace(/\s{2,}/g, ' ');

            const result = document.getElementById('textResult');
            result.textContent = `Без тегов: ${cleanText}\nХештеги: ${hashtags.join(', ')}\nОдно пробел: ${singleSpaceText}`;
        }

        // Генератор регулярных выражений
        function testRegex() {
            const pattern = document.getElementById('regexPattern').value;
            const flags = document.getElementById('regexFlags').value;
            const testText = document.getElementById('testText').value;
            const regex = new RegExp(pattern, flags);
            const matches = [...testText.matchAll(regex)].map(m => m[0]);

            const result = document.getElementById('regexMatches');
            result.textContent = matches.length > 0 ? `Совпадения: ${matches.join(', ')}` : 'Совпадений не найдено';
        }