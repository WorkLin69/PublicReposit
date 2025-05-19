function changeBackgroundGradient() {
            document.body.style.background = "linear-gradient(135deg, rgb(255, 102, 178), rgb(149, 0, 255), rgb(235, 230, 233), rgb(149, 0, 255), rgb(255, 102, 178))";
            document.body.style.animation = "educateGradient 5s ease infinite";
            // Перезапуск анимации
            document.body.style.animation = "none";
            setTimeout(() => {
                document.body.style.animation = "educateGradient 5s ease infinite";
            }, 0);
        }