    let isGradient = true; // Начальное состояние: градиент

    function toggleBackground() {
        if (isGradient) {
                // Переключаем на альтернативный градиент {}
            {
            document.body.style.background = "linear-gradient(135deg, rgb(110, 92, 178), rgb(50, 0, 205), rgb(180, 120, 200), rgb(130, 0, 140), rgb(110, 92, 178))";
            document.body.style.backgroundSize = "500% 500%";
            document.body.style.animation = "educateGradient 5s ease infinite";
                // Перезапуск анимации
            document.body.style.animation = "none";
            setTimeout(() => {
                 document.body.style.animation = "educateGradient 5s ease infinite";
            }, 0);
        }
        } else {
                // Возвращаем основной градиент
            document.body.style.background = "linear-gradient(135deg, rgb(255, 102, 178), rgb(149, 0, 255), rgb(235, 230, 233), rgb(149, 0, 255), rgb(255, 102, 178))";
            document.body.style.backgroundSize = "500% 500%";
            document.body.style.animation = "educateGradient 5s ease infinite";
                // Перезапуск анимации
            document.body.style.animation = "none";
            setTimeout(() => {
                document.body.style.animation = "educateGradient 5s ease infinite";
            }, 0);
        }
        isGradient = !isGradient; // Меняем состояние
    }

const textInput = document.getElementById('textInput');
const textLength = document.getElementById('textLength');
    textInput.addEventListener('input', () => {
        textLength.textContent = textInput.value.length;
    });