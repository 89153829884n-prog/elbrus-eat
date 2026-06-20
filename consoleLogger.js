// consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const data = event.detail;
        
        console.clear();
        console.log('%c===== ДАННЫЕ ФОРМЫ ОБРАТНОЙ СВЯЗИ =====', 'font-weight: bold; color: #2ECC71; font-size: 14px;');
        console.log('%c👤 Имя:', 'font-weight: bold;', data.name);
        console.log('%c📧 Email:', 'font-weight: bold;', data.email);
        console.log('%c🏷️ Тема:', 'font-weight: bold;', data.subject);
        console.log('%c💬 Сообщение:', 'font-weight: bold;', data.message);
        console.log('%c🕐 Время отправки:', 'font-weight: bold;', data.timestamp);
        console.log('%c=========================================', 'font-weight: bold; color: #2ECC71; font-size: 14px;');
    });
});
