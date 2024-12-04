document.addEventListener('DOMContentLoaded', function() {
    //accordeon
    const accordionHeaders = document.querySelectorAll('.accordion_header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const circle = header.firstChild;
            console.log(circle)
            console.log(content);
            // Закрываем все другие секции
            document.querySelectorAll('.accordion_content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.firstChild.classList.remove('cross_rotate');
                }
                console.log(item);
            });

            // Переключаем max-height для текущей секции
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Скрыть
                
                circle.classList.remove('cross_rotate')
            } else {
                content.style.maxHeight = content.scrollHeight + 'px'; // Показать
                circle.classList.add('cross_rotate')
            }
        });
    });
});