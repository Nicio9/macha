// Shared navbar and dark mode functionality
// This script runs immediately in the <head> to prevent flash of content

(function() {
    // Apply dark mode immediately; default is dark when no preference is stored
    var stored = localStorage.getItem('darkMode');
    if (stored === null || stored === 'true') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

function getCurrentPage() {
    var path = window.location.pathname;
    if (path === '/' || path === '/index.html') return 'home';
    // Course detail pages live under /courses/ — map them all to 'courses'
    if (path.match(/^\/courses\//)) return 'courses';
    var match = path.match(/\/([^/]+)\.html$/);
    return match ? match[1] : 'home';
}

function renderHeader() {
    var currentPage = getCurrentPage();
    var isDark = localStorage.getItem('darkMode') !== 'false';
    var themeBtn = isDark ? '☀️' : '🌙';

    // Academics dropdown
    var academicsPages = ['programmes', 'courses', 'research'];
    var academicsActive = academicsPages.indexOf(currentPage) !== -1;
    var academicsDropdown =
        '<ul class="dropdown">' +
            '<li><a href="programmes.html"' + (currentPage === 'programmes' ? ' class="active"' : '') + '>Programmes</a></li>' +
            '<li><a href="courses.html"'    + (currentPage === 'courses'    ? ' class="active"' : '') + '>Courses</a></li>' +
            '<li><a href="research.html"'   + (currentPage === 'research'   ? ' class="active"' : '') + '>Research</a></li>' +
        '</ul>';
    var academicsBtn =
        '<li class="has-dropdown">' +
            '<a href="#" class="dropdown-toggle' + (academicsActive ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false">' +
                'Academics <span class="dropdown-arrow">▾</span>' +
            '</a>' +
            academicsDropdown +
        '</li>';

    // Latest dropdown
    var latestPages = ['events', 'news'];
    var latestActive = latestPages.indexOf(currentPage) !== -1;
    var latestDropdown =
        '<ul class="dropdown">' +
            '<li><a href="news.html"'   + (currentPage === 'news'   ? ' class="active"' : '') + '>News &amp; Announcements</a></li>' +
            '<li><a href="events.html"' + (currentPage === 'events' ? ' class="active"' : '') + '>Events &amp; Seminars</a></li>' +
        '</ul>';
    var latestBtn =
        '<li class="has-dropdown">' +
            '<a href="#" class="dropdown-toggle' + (latestActive ? ' active' : '') + '" aria-haspopup="true" aria-expanded="false">' +
                'Latest <span class="dropdown-arrow">▾</span>' +
            '</a>' +
            latestDropdown +
        '</li>';

    var navLinks =
        '<li><a href="./"' + (currentPage === 'home' ? ' class="active"' : '') + '>Home</a></li>' +
        academicsBtn +
        '<li><a href="staff.html"'   + (currentPage === 'staff'   ? ' class="active"' : '') + '>Staff</a></li>' +
        latestBtn +
        '<li><a href="contact.html"' + (currentPage === 'contact' ? ' class="active"' : '') + '>Contact</a></li>';

    var headerHTML =
        '<header>' +
            '<div class="header-wrapper">' +
                '<a href="./" class="logo">CS Division</a>' +
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
    var isDark = localStorage.getItem('darkMode') !== 'false';
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
    // Add class to suppress entry animations during the theme transition
    document.documentElement.classList.add('theme-transitioning');

    if (!document.startViewTransition) {
        switchThemeFn();
        // Remove class after a short delay (same duration as CSS transition fallback)
        setTimeout(function() {
            document.documentElement.classList.remove('theme-transitioning');
        }, 150);
        return;
    }
    var transition = document.startViewTransition(function() {
        switchThemeFn();
    });
    transition.finished.then(function() {
        // Small delay so the class outlasts any post-transition repaint
        setTimeout(function() {
            document.documentElement.classList.remove('theme-transitioning');
        }, 50);
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

    // Dropdown toggles: click on desktop opens/closes; on mobile toggle inline
    nav.addEventListener('click', function(e) {
        var toggle = e.target.closest('.dropdown-toggle');
        if (!toggle) return;
        e.preventDefault();
        var li = toggle.parentElement;
        var isOpen = li.classList.contains('open');
        // Close all other open dropdowns
        nav.querySelectorAll('.has-dropdown.open').forEach(function(el) {
            el.classList.remove('open');
            el.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            li.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target)) {
            nav.querySelectorAll('.has-dropdown.open').forEach(function(el) {
                el.classList.remove('open');
                el.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
            });
        }
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
    initFaqAccordion();
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
                        var categoryEl = item.querySelector('.news-category');
                        var itemCategory = categoryEl ? categoryEl.textContent.trim() : '';
                        item.style.display = itemCategory.toLowerCase() === category.toLowerCase() ? 'block' : 'none';
                    }
                });
            });
        });
    }
}

function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        // Collapse all by default, expand first one
        answer.style.display = 'none';
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');

        // Add indicator arrow
        question.style.display = 'flex';
        question.style.justifyContent = 'space-between';
        question.style.alignItems = 'center';
        var arrow = document.createElement('span');
        arrow.className = 'faq-arrow';
        arrow.textContent = '▶';
        arrow.style.cssText = 'font-size:0.75rem;transition:transform 0.25s ease;flex-shrink:0;margin-left:8px;';
        question.appendChild(arrow);

        function toggle() {
            var isOpen = answer.style.display !== 'none';
            answer.style.display = isOpen ? 'none' : 'block';
            question.setAttribute('aria-expanded', String(!isOpen));
            arrow.style.transform = isOpen ? '' : 'rotate(90deg)';
        }

        question.addEventListener('click', toggle);
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });
}
