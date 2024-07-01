document.addEventListener('DOMContentLoaded', (event) => {
    Telegram.WebApp.ready();

    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);
            loadContent(target);
            setActiveMenuItem(e.target);
        });
    });

    function loadContent(target) {
        const content = document.getElementById('content');
        fetch(`content/${target}.html`)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
            });
    }

    function setActiveMenuItem(activeItem) {
        menuItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    loadContent('home'); // Load home content by default
    setActiveMenuItem(document.querySelector('.menu-item[href="#home"]'));
});