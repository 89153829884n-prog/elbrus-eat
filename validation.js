// validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Получаем все поля
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const agreementCheckbox = document.getElementById('agreement');

    // Контейнеры для ошибок
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const agreementError = document.getElementById('agreementError');

    // Функция скрытия ошибки
    function hideError(errorElement) {
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
    }

    // Функция показа ошибки
    function showError(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    // Функция сброса всех ошибок
    function resetAllErrors() {
        hideError(nameError);
        hideError(emailError);
        hideError(subjectError);
        hideError(agreementError);
        
        // Убираем красную обводку
        document.querySelectorAll('.input, .select select, .textarea').forEach(el => {
            el.classList.remove('is-danger');
        });
    }

    // Сброс ошибки при вводе в поле
    nameInput.addEventListener('input', function() {
        this.classList.remove('is-danger');
        hideError(nameError);
    });

    emailInput.addEventListener('input', function() {
        this.classList.remove('is-danger');
        hideError(emailError);
    });

    subjectSelect.addEventListener('change', function() {
        this.classList.remove('is-danger');
        hideError(subjectError);
    });

    agreementCheckbox.addEventListener('change', function() {
        hideError(agreementError);
    });

    // Валидация формы при отправке
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        resetAllErrors();

        let isValid = true;

        // 1. Валидация имени (не пустое, минимум 2 буквы)
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            showError(nameError, 'Поле "Имя" обязательно для заполнения');
            nameInput.classList.add('is-danger');
            isValid = false;
        } else if (nameValue.length < 2) {
            showError(nameError, 'Имя должно содержать минимум 2 буквы');
            nameInput.classList.add('is-danger');
            isValid = false;
        }

        // 2. Валидация email
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            showError(emailError, 'Поле "Email" обязательно для заполнения');
            emailInput.classList.add('is-danger');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(emailError, 'Введите корректный email (например, name@domain.ru)');
            emailInput.classList.add('is-danger');
            isValid = false;
        }

        // 3. Валидация темы
        const subjectValue = subjectSelect.value;
        if (subjectValue === '') {
            showError(subjectError, 'Выберите тему сообщения');
            subjectSelect.classList.add('is-danger');
            isValid = false;
        }

        // 4. Валидация чекбокса согласия
        if (!agreementCheckbox.checked) {
            showError(agreementError, 'Необходимо дать согласие на обработку данных');
            isValid = false;
        }

        // Если форма валидна
        if (isValid) {
            // Собираем данные
            const formData = {
                name: nameValue,
                email: emailValue,
                subject: subjectSelect.options[subjectSelect.selectedIndex].text,
                message: messageInput.value.trim() || '(не заполнено)',
                timestamp: new Date().toLocaleString('ru-RU')
            };

            // Отправляем кастомное событие с данными
            const validEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(validEvent);

            // Показываем уведомление пользователю
            alert('✅ Форма успешно отправлена! Данные выведены в консоль.');
            
            // Опционально: очищаем форму
            // form.reset();
        }
    });
});
