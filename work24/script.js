   // Часы на Canvas
        const clockCanvas = document.getElementById('clockCanvas');
        const clockCtx = clockCanvas.getContext('2d');
        const radius = clockCanvas.width / 2;

        function drawClock() {
            clockCtx.clearRect(0, 0, clockCanvas.width, clockCanvas.height);
            clockCtx.translate(radius, radius);

            // Циферблат
            clockCtx.beginPath();
            clockCtx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
            clockCtx.fillStyle = '#fff';
            clockCtx.fill();
            clockCtx.strokeStyle = '#8E2DE2';
            clockCtx.lineWidth = 4;
            clockCtx.stroke();

            // Цифры
            clockCtx.font = '16px Arial';
            clockCtx.textAlign = 'center';
            clockCtx.textBaseline = 'middle';
            for (let num = 1; num <= 12; num++) {
                const angle = (num * Math.PI) / 6;
                const x = radius * 0.8 * Math.sin(angle);
                const y = -radius * 0.8 * Math.cos(angle);
                clockCtx.fillStyle = '#333';
                clockCtx.fillText(num.toString(), x, y);
            }

            // Время
            const now = new Date();
            const hours = now.getHours() % 12;
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            // Часовая стрелка
            clockCtx.beginPath();
            clockCtx.moveTo(0, 0);
            const hourAngle = (hours * Math.PI) / 6 + (minutes * Math.PI) / 360;
            clockCtx.lineTo(radius * 0.5 * Math.sin(hourAngle), -radius * 0.5 * Math.cos(hourAngle));
            clockCtx.strokeStyle = '#333';
            clockCtx.lineWidth = 8;
            clockCtx.stroke();

            // Минутная стрелка
            clockCtx.beginPath();
            clockCtx.moveTo(0, 0);
            const minuteAngle = (minutes * Math.PI) / 30 + (seconds * Math.PI) / 1800;
            clockCtx.lineTo(radius * 0.7 * Math.sin(minuteAngle), -radius * 0.7 * Math.cos(minuteAngle));
            clockCtx.strokeStyle = '#666';
            clockCtx.lineWidth = 4;
            clockCtx.stroke();

            // Секундная стрелка
            clockCtx.beginPath();
            clockCtx.moveTo(0, 0);
            const secondAngle = (seconds * Math.PI) / 30;
            clockCtx.lineTo(radius * 0.85 * Math.sin(secondAngle), -radius * 0.85 * Math.cos(secondAngle));
            clockCtx.strokeStyle = '#D32F2F';
            clockCtx.lineWidth = 2;
            clockCtx.stroke();

            clockCtx.translate(-radius, -radius);
            requestAnimationFrame(drawClock);
        }

        requestAnimationFrame(drawClock);

        // Мини-игра "Поймай объект"
        const gameCanvas = document.getElementById('gameCanvas');
        const gameCtx = gameCanvas.getContext('2d');
        let score = 0;
        let timeLeft = 30;
        let level = 1;
        let target = null;
        let gameInterval;

        function startGame() {
            score = 0;
            timeLeft = 30;
            level = 1;
            document.getElementById('score').textContent = score;
            document.getElementById('timeLeft').textContent = timeLeft;
            document.getElementById('level').textContent = level;
            spawnTarget();
            gameInterval = setInterval(gameLoop, 1000);
        }

        function spawnTarget() {
            const size = 30 - level * 5;
            target = {
                x: Math.random() * (gameCanvas.width - size),
                y: Math.random() * (gameCanvas.height - size),
                size: size > 10 ? size : 10
            };
        }

        function gameLoop() {
            timeLeft--;
            document.getElementById('timeLeft').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(gameInterval);
                alert(`Игра окончена! Очки: ${score}`);
                return;
            }
            if (score >= level * 10) level++;
            document.getElementById('level').textContent = level;

            gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
            gameCtx.beginPath();
            gameCtx.arc(target.x + target.size / 2, target.y + target.size / 2, target.size / 2, 0, 2 * Math.PI);
            gameCtx.fillStyle = '#8E2DE2';
            gameCtx.fill();
        }

        gameCanvas.addEventListener('click', (e) => {
            const rect = gameCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const dx = x - (target.x + target.size / 2);
            const dy = y - (target.y + target.size / 2);
            if (Math.sqrt(dx * dx + dy * dy) <= target.size / 2) {
                score += level;
                document.getElementById('score').textContent = score;
                spawnTarget();
            }
        });

        // Графический редактор
        const editorCanvas = document.getElementById('editorCanvas');
        const editorCtx = editorCanvas.getContext('2d');
        let isDrawing = false;
        let startX, startY;

        editorCanvas.addEventListener('mousedown', (e) => {
            const rect = editorCanvas.getBoundingClientRect();
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            isDrawing = true;
        });

        editorCanvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const rect = editorCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const tool = document.getElementById('tool').value;
            const color = document.getElementById('brushColor').value;
            const size = document.getElementById('brushSize').value;

            editorCtx.strokeStyle = color;
            editorCtx.lineWidth = size;

            editorCtx.beginPath();
            if (tool === 'line') {
                editorCtx.moveTo(startX, startY);
                editorCtx.lineTo(x, y);
                editorCtx.stroke();
            } else if (tool === 'rect') {
                editorCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
                editorCtx.strokeRect(startX, startY, x - startX, y - startY);
            } else if (tool === 'circle') {
                const radius = Math.sqrt((x - startX) ** 2 + (y - startY) ** 2);
                editorCtx.clearRect(0, 0, editorCanvas.width, editorCanvas.height);
                editorCtx.beginPath();
                editorCtx.arc(startX, startY, radius, 0, 2 * Math.PI);
                editorCtx.stroke();
            }
        });

        editorCanvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        function saveDrawing() {
            const link = document.createElement('a');
            link.href = editorCanvas.toDataURL('image/png');
            link.download = 'drawing.png';
            link.click();
        }

        // Диаграмма данных
        const chartCanvas = document.getElementById('chartCanvas');
        const chartCtx = chartCanvas.getContext('2d');
        const data = [50, 100, 150, 80, 120];
        const labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май'];
        const colors = ['#8E2DE2', '#4A00E0', '#A349F5', '#6A00FF', '#D32F2F'];

        function drawChart() {
            const barWidth = 50;
            const maxValue = Math.max(...data);
            chartCtx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

            // Оси
            chartCtx.beginPath();
            chartCtx.moveTo(50, 250);
            chartCtx.lineTo(350, 250);
            chartCtx.moveTo(50, 50);
            chartCtx.lineTo(50, 250);
            chartCtx.strokeStyle = '#333';
            chartCtx.stroke();

            // Столбцы
            data.forEach((value, i) => {
                const height = (value / maxValue) * 200;
                const x = 70 + i * 60;
                chartCtx.fillStyle = colors[i];
                chartCtx.fillRect(x, 250 - height, barWidth, height);

                // Подписи
                chartCtx.fillStyle = '#333';
                chartCtx.font = '12px Arial';
                chartCtx.textAlign = 'center';
                chartCtx.fillText(labels[i], x + barWidth / 2, 270);
                chartCtx.fillText(value, x + barWidth / 2, 250 - height - 10);
            });

            // Легенда
            chartCtx.font = '14px Arial';
            chartCtx.fillStyle = '#333';
            chartCtx.fillText('Продажи по месяцам', 200, 30);
        }

        chartCanvas.addEventListener('mousemove', (e) => {
            const rect = chartCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            drawChart();

            data.forEach((value, i) => {
                const height = (value / Math.max(...data)) * 200;
                const barX = 70 + i * 60;
                if (x >= barX && x <= barX + 50 && y >= 250 - height && y <= 250) {
                    chartCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                    chartCtx.fillRect(barX, 250 - height, 50, height);
                }
            });
        });

        drawChart();