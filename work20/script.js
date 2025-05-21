  // Форма регистрации
        const regForm = document.getElementById('regForm');
        const regResult = document.getElementById('regResult');

        regForm.addEventListener('input', () => {
            const password = document.getElementById('regPassword').value;
            const strength = document.getElementById('passwordStrength');
            if (password.length < 6) strength.textContent = 'Слабый';
            else if (/[A-Z].*[0-9]|[0-9].*[A-Z]/.test(password)) strength.textContent = 'Средний';
            else strength.textContent = 'Сильный';
        });

        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirm = document.getElementById('regConfirm').value;
            const nameError = document.getElementById('regNameError');
            const emailError = document.getElementById('regEmailError');
            const passwordError = document.getElementById('regPasswordError');
            const confirmError = document.getElementById('regConfirmError');

            let isValid = true;
            if (!name.match(/[A-Za-zА-Яа-яЁё\s]{2,}/)) {
                nameError.textContent = 'Имя должно содержать 2+ букв';
                isValid = false;
            } else nameError.textContent = '';
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(email)) {
                emailError.textContent = 'Неверный email';
                isValid = false;
            } else emailError.textContent = '';
            if (password.length < 6) {
                passwordError.textContent = 'Пароль минимум 6 символов';
                isValid = false;
            } else passwordError.textContent = '';
            if (password !== confirm) {
                confirmError.textContent = 'Пароли не совпадают';
                isValid = false;
            } else confirmError.textContent = '';

            if (isValid) {
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                regResult.textContent = `Регистрация успешна в ${time} BST: ${email}`;
                regForm.reset();
            }
        });

        // Форма заказа
        const orderForm = document.getElementById('orderForm');
        const orderResult = document.getElementById('orderResult');

        orderForm.addEventListener('input', () => {
            const quantity = document.getElementById('orderQuantity').value;
            const promo = document.getElementById('orderPromo').value;
            const email = document.getElementById('orderEmail').value;
            const quantityError = document.getElementById('orderQuantityError');
            const promoError = document.getElementById('orderPromoError');
            const emailError = document.getElementById('orderEmailError');

            if (quantity < 1 || quantity > 10) quantityError.textContent = 'От 1 до 10';
            else quantityError.textContent = '';
            if (promo && !/^(SUMMER2023)$/.test(promo)) promoError.textContent = 'Неверный промокод';
            else promoError.textContent = '';
            if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(email)) emailError.textContent = 'Неверный email';
            else emailError.textContent = '';
        });

        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const quantity = document.getElementById('orderQuantity').value;
            const promo = document.getElementById('orderPromo').value;
            const email = document.getElementById('orderEmail').value;
            if (quantity >= 1 && quantity <= 10 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(email)) {
                const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
                orderResult.textContent = `Заказ оформлен в ${time} BST: ${quantity} ед., ${email}${promo ? `, промокод: ${promo}` : ''}`;
                orderForm.reset();
            }
        });

        // Многошаговая форма
        const multiForm = document.getElementById('multiForm');
        const multiSteps = document.querySelectorAll('.form-step');
        const multiProgress = document.querySelectorAll('.step');
        const multiResult = document.getElementById('multiResult');
        let multiData = {};

        function nextMultiStep(step) {
            const name = document.getElementById('multiName').value;
            const address = document.getElementById('multiAddress').value;
            const payment = document.getElementById('multiPayment').value;
            const nameError = document.getElementById('multiNameError');
            const addressError = document.getElementById('multiAddressError');
            const paymentError = document.getElementById('multiPaymentError');

            if (step === 2 && !name.match(/[A-Za-zА-Яа-яЁё\s]{2,}/)) {
                nameError.textContent = 'Имя должно содержать 2+ букв';
                return;
            } else nameError.textContent = '';
            if (step === 3 && !address) {
                addressError.textContent = 'Введите адрес';
                return;
            } else addressError.textContent = '';
            if (step === 3 && !payment) {
                paymentError.textContent = 'Выберите способ оплаты';
                return;
            } else paymentError.textContent = '';

            multiData = { ...multiData, name, address, payment };
            multiSteps.forEach(s => s.classList.remove('active'));
            multiProgress.forEach(s => s.classList.remove('active'));
            document.getElementById(`multiStep${step}`).classList.add('active');
            multiProgress[step - 1].classList.add('active');
        }

        function prevMultiStep(step) {
            multiSteps.forEach(s => s.classList.remove('active'));
            multiProgress.forEach(s => s.classList.remove('active'));
            document.getElementById(`multiStep${step}`).classList.add('active');
            multiProgress[step - 1].classList.add('active');
        }

        multiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const time = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/London' });
            multiResult.textContent = `Форма завершена в ${time} BST: ${JSON.stringify(multiData)}`;
            multiForm.reset();
            multiData = {};
            nextMultiStep(1);
        });

        // Кастомный валидатор
        function validateINN() {
            const inn = document.getElementById('innInput').value;
            const regex = /^((\d{10})|(\d{12}))$/;
            const result = document.getElementById('innResult');
            if (!regex.test(inn)) {
                result.textContent = 'Невалиден (10 или 12 цифр)';
                result.className = 'result error';
                return;
            }
            const digits = inn.split('').map(Number);
            let checksum = 0;
            if (inn.length === 10) {
                for (let i = 0; i < 9; i++) checksum += digits[i] * (i + 1);
                checksum %= 11 % 10;
                if (checksum !== digits[9]) {
                    result.textContent = 'Неверная контрольная сумма';
                    result.className = 'result error';
                    return;
                }
            } else {
                for (let i = 0; i < 10; i++) checksum += digits[i] * (i + 1);
                checksum %= 11 % 10;
                if (checksum !== digits[10]) {
                    for (let i = 0; i < 11; i++) checksum += digits[i] * (i + 3);
                    checksum %= 11 % 10;
                    if (checksum !== digits[11]) {
                        result.textContent = 'Неверная контрольная сумма';
                        result.className = 'result error';
                        return;
                    }
                }
            }
            result.textContent = 'Валиден';
            result.className = 'result';
        }

        function validateSnils() {
            const snils = document.getElementById('snilsInput').value;
            const regex = /^\d{3}-\d{3}-\d{3} \d{2}$/;
            const result = document.getElementById('snilsResult');
            if (!regex.test(snils)) {
                result.textContent = 'Невалиден (формат: 123-456-789 01)';
                result.className = 'result error';
                return;
            }
            const digits = snils.replace(/[- ]/g, '').split('').map(Number);
            let checksum = 0;
            for (let i = 0; i < 9; i++) checksum += digits[i] * (9 - i);
            const check = digits.slice(9).join('');
            if (checksum < 100) {
                if (checksum !== Number(check)) {
                    result.textContent = 'Неверная контрольная сумма';
                    result.className = 'result error';
                    return;
                }
            } else if (checksum === 100 || checksum === 101) {
                if (check !== '00') {
                    result.textContent = 'Неверная контрольная сумма';
                    result.className = 'result error';
                    return;
                }
            } else {
                checksum %= 101;
                if (checksum === 100) checksum = 0;
                if (checksum !== Number(check)) {
                    result.textContent = 'Неверная контрольная сумма';
                    result.className = 'result error';
                    return;
                }
            }
            result.textContent = 'Валиден';
            result.className = 'result';
        }

        function validateBIK() {
            const bik = document.getElementById('bikInput').value;
            const regex = /^\d{9}$/;
            const result = document.getElementById('bikResult');
            if (!regex.test(bik)) {
                result.textContent = 'Невалиден (9 цифр)';
                result.className = 'result error';
                return;
            }
            result.textContent = 'Валиден';
            result.className = 'result';
        }