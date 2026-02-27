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
    // Take a screenshot of the current page by capturing computed bg
    // We'll fake the "old right side" with a shrinking overlay.
    var oldBg = getComputedStyle(document.body).backgroundColor;

    // Switch the theme immediately — left side of the screen now shows new theme live
    switchThemeFn();

    // A shrinking overlay that covers the RIGHT portion of the screen with the old theme color.
    // It starts at full width and shrinks leftward, revealing the new theme underneath.
    // A 1px right-edge line acts as the visible "blind" divider.
    var overlay = document.createElement('div');
    overlay.style.cssText = [
        'position:fixed', 'top:0', 'right:0',
        'width:100%', 'height:100%',
        'pointer-events:none', 'z-index:9999',
        'background:' + oldBg,
        'border-left:1px solid rgba(128,128,128,0.4)',
        'transition:width 0.6s cubic-bezier(0.4,0,0.2,1)'
    ].join(';');

    document.body.appendChild(overlay);

    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            overlay.style.width = '0%';
        });
    });

    setTimeout(function() {
        overlay.remove();
    }, 750);
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
