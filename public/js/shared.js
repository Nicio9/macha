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
                '<a href="/" class="logo">CS Division</a>' +
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
        var goingDark = !(html.getAttribute('data-theme') === 'dark');

        triggerThemeToggleShine(function() {
            isDark = goingDark;
            if (isDark) { html.setAttribute('data-theme', 'dark'); } else { html.removeAttribute('data-theme'); }
            setButtonLabel(isDark);
            localStorage.setItem('darkMode', isDark);
        });
    });
}

function triggerThemeToggleShine(switchThemeFn) {
    // Suppress all page transitions so the theme switch is instant
    var noTransition = document.createElement('style');
    noTransition.textContent = '*, *::before, *::after { transition: none !important; animation: none !important; }';
    document.head.appendChild(noTransition);

    var oldBg = getComputedStyle(document.body).backgroundColor;
    switchThemeFn();
    var newBg = getComputedStyle(document.body).backgroundColor;

    noTransition.remove();

    // Panel layout: [newBg | oldBg], each half = 100vw, total width = 200vw
    // Start: shifted left so oldBg half fills the viewport (translateX(-50%))
    // End:   shifted right so newBg half fills the viewport (translateX(0))
    // The hard boundary between them sweeps right-to-left across the screen
    var panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '0';
    panel.style.left = '0';
    panel.style.width = '200vw';
    panel.style.height = '100vh';
    panel.style.pointerEvents = 'none';
    panel.style.zIndex = '9999';
    panel.style.background = 'linear-gradient(to right,' + newBg + ' 50%,' + oldBg + ' 50%)';
    panel.style.transform = 'translateX(-50%)';
    panel.style.willChange = 'transform';

    document.body.appendChild(panel);

    // Force a reflow so the browser registers the starting transform
    panel.getBoundingClientRect();

    // Now animate to show the new colour
    panel.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
    panel.style.transform = 'translateX(0%)';

    setTimeout(function() { panel.remove(); }, 700);
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
    initCourseSearch();
    initStaffSearch();
    initNewsFilter();
});

// Search and Filter Functions
function initCourseSearch() {
    var courseSearchInput = document.getElementById('courseSearch');
    
    if (courseSearchInput) {
        courseSearchInput.addEventListener('keyup', function () {
            var filter = this.value.toLowerCase();
            var cards = document.querySelectorAll('.grid .card');
            var visibleCount = 0;
            
            cards.forEach(function(card) {
                var text = card.textContent.toLowerCase();
                if (text.includes(filter)) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show "no results" message if needed
            var noResultsMsg = document.getElementById('noCoursesResultsMsg');
            if (visibleCount === 0 && filter.length > 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'noCoursesResultsMsg';
                    noResultsMsg.style.cssText = 'padding: 40px 20px; text-align: center; color: var(--text-light);';
                    noResultsMsg.textContent = 'No courses found matching your search.';
                    var grid = document.querySelector('.grid');
                    if (grid) grid.parentNode.insertBefore(noResultsMsg, grid);
                }
                noResultsMsg.style.display = 'block';
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
    }
}

function initStaffSearch() {
    var staffSearchInput = document.getElementById('staffSearch');
    
    if (staffSearchInput) {
        staffSearchInput.addEventListener('keyup', function () {
            var filter = this.value.toLowerCase();
            var staffCards = document.querySelectorAll('.staff-card');
            var visibleCount = 0;
            
            staffCards.forEach(function(card) {
                var text = card.textContent.toLowerCase();
                if (text.includes(filter)) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show "no results" message if needed
            var noResultsMsg = document.getElementById('noResultsMsg');
            if (visibleCount === 0 && filter.length > 0) {
                if (!noResultsMsg) {
                    noResultsMsg = document.createElement('div');
                    noResultsMsg.id = 'noResultsMsg';
                    noResultsMsg.className = 'no-results';
                    noResultsMsg.textContent = 'No staff members found matching your search.';
                    var staffList = document.querySelector('.staff-list:last-of-type');
                    if (staffList) staffList.parentNode.insertBefore(noResultsMsg, staffList.nextSibling);
                }
                noResultsMsg.style.display = 'block';
            } else if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        });
    }
}

function initNewsFilter() {
    var filterButtons = document.querySelectorAll('#news-filter-buttons .filter-btn');
    var newsItems = document.querySelectorAll('.news-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function () {
                var category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(function(btn) { btn.classList.remove('active'); });
                this.classList.add('active');
                
                // Filter news items
                newsItems.forEach(function(item) {
                    if (category === 'all') {
                        item.style.display = 'block';
                    } else {
                        var itemCategory = item.querySelector('.news-category').textContent.trim();
                        item.style.display = itemCategory === category ? 'block' : 'none';
                    }
                });
            });
        });
    }
}
