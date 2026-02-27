// Shared navbar and dark mode functionality
// This script runs immediately in the <head> to prevent flash of content

(function() {
    // Apply dark mode immediately
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

function getCurrentPage() {
    var path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    var match = path.match(/\/([^/]+)\.html$/);
    return match ? match[1] : 'home';
}

function renderHeader() {
    var currentPage = getCurrentPage();
    var isDark = localStorage.getItem('darkMode') === 'true';
    var themeBtn = isDark ? '☀️' : '🌙';
    
    var navItems = [
        { href: '/', label: 'Home', page: 'home' },
        { href: '/programmes.html', label: 'Programmes', page: 'programmes' },
        { href: '/courses.html', label: 'Courses', page: 'courses' },
        { href: '/staff.html', label: 'Staff', page: 'staff' },
        { href: '/research.html', label: 'Research', page: 'research' },
        { href: '/contact.html', label: 'Contact', page: 'contact' },
    ];
    
    var navLinks = '';
    for (var i = 0; i < navItems.length; i++) {
        var item = navItems[i];
        var activeClass = currentPage === item.page ? ' class="active"' : '';
        navLinks += '<li><a href="' + item.href + '"' + activeClass + '>' + item.label + '</a></li>';
    }
    
    var headerHTML = 
        '<header>' +
            '<div class="header-wrapper">' +
                '<div class="logo">CS Division</div>' +
                '<div class="header-right">' +
                    '<button class="hamburger" id="hamburger" aria-label="Toggle menu">' +
                        '<span></span>' +
                        '<span></span>' +
                        '<span></span>' +
                    '</button>' +
                    '<nav aria-label="Main navigation" id="main-nav">' +
                        '<ul>' +
                            navLinks +
                            '<li><button class="theme-toggle-btn" id="theme-toggle-btn">' + themeBtn + '</button></li>' +
                        '</ul>' +
                    '</nav>' +
                '</div>' +
            '</div>' +
        '</header>';
    
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function initDarkModeBtn() {
    var html = document.documentElement;
    var btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    function setButtonLabel(isDark) {
        btn.textContent = isDark ? '☀️' : '🌙';
        btn.classList.toggle('dark', isDark);
    }
    var isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) { html.setAttribute('data-theme', 'dark'); }
    setButtonLabel(isDark);
    btn.addEventListener('click', function () {
        isDark = !(html.getAttribute('data-theme') === 'dark');
        if (isDark) { html.setAttribute('data-theme', 'dark'); } else { html.removeAttribute('data-theme'); }
        setButtonLabel(isDark);
        localStorage.setItem('darkMode', isDark);
    });
}

function initHamburger() {
    var hamburger = document.getElementById('hamburger');
    var nav = document.getElementById('main-nav');
    if (!hamburger || !nav) return;
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.querySelector('ul').classList.toggle('show');
    });
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    renderHeader();
    initDarkModeBtn();
    initHamburger();
});
