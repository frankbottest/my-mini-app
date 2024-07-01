document.addEventListener('DOMContentLoaded', (event) => {
    Telegram.WebApp.ready();

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('href').substring(1);
            loadContent(target);
            setActiveMenuItem(item);
        });

        // Обработчик для вложенных элементов
        item.querySelectorAll('*').forEach(child => {
            child.addEventListener('click', (e) => {
                e.preventDefault();
                const target = item.getAttribute('href').substring(1);
                loadContent(target);
                setActiveMenuItem(item);
            });
        });
    });

    function loadContent(target) {
        const content = document.getElementById('content');
        fetch(`content/${target}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                content.innerHTML = '<p>Ошибка загрузки контента. Пожалуйста, попробуйте позже.</p>';
            });
    }

    function setActiveMenuItem(activeItem) {
        menuItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    loadContent('home'); // Load home content by default
    setActiveMenuItem(document.querySelector('.menu-item[href="#home"]'));
});
