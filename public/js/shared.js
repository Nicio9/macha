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
    // Snapshot all current CSS variable values BEFORE switching
    var cs = getComputedStyle(document.documentElement);
    var frozenVars = [
        '--primary','--secondary','--highlight','--badge',
        '--text','--text-light','--bg-light','--border','--link','--white',
        '--shadow','--shadow-hover','--dropdown-bg','--dropdown-link',
        '--warning-bg','--warning-text','--warning-border'
    ].map(function(v) { return v + ':' + cs.getPropertyValue(v).trim(); }).join(';');

    // Clone the entire body to freeze the current theme visually
    var clone = document.body.cloneNode(true);

    // Remove any nested overlays from the clone
    var existingOverlay = clone.querySelector('#theme-wipe-overlay');
    if (existingOverlay) existingOverlay.remove();

    // Inject a <style> that hard-freezes the old CSS vars onto every element in the clone
    var freezeStyle = document.createElement('style');
    freezeStyle.textContent = '* { ' + frozenVars + ' !important; transition: none !important; }';
    clone.insertBefore(freezeStyle, clone.firstChild);

    // Position clone to match current scroll
    clone.style.cssText = [
        'position:absolute',
        'top:' + (-window.scrollY) + 'px',
        'left:0',
        'width:' + document.documentElement.scrollWidth + 'px',
        'margin:0',
        'pointer-events:none'
    ].join(';');

    // Overlay: starts fully visible on the RIGHT side of the screen (inset from left = 0)
    // Wipes to the right (inset from left grows to 100%), revealing new theme from the left
    var overlay = document.createElement('div');
    overlay.id = 'theme-wipe-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.overflow = 'hidden';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '9999';
    overlay.style.clipPath = 'inset(0 0 0 0%)';

    overlay.appendChild(clone);
    document.body.appendChild(overlay);

    // Switch theme underneath immediately
    switchThemeFn();

    // Animate the wipe: clip grows from the left, pushing the old theme off to the right
    setTimeout(function() {
        overlay.style.transition = 'clip-path 0.65s cubic-bezier(0.4,0,0.2,1)';
        overlay.style.clipPath = 'inset(0 0 0 100%)';
    }, 20);

    setTimeout(function() {
        overlay.remove();
    }, 800);
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
