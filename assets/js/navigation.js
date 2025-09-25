/* ========================================
   NAVIGATION.JS - Gestion de la navigation
   Portfolio TI EPHEC - Mohamed El Mazani
   ======================================== */

// ========================================
// 1. NAVIGATION STATE
// ========================================
const NavigationState = {
    isMenuOpen: false,
    isScrolling: false,
    lastScrollPosition: 0,
    scrollDirection: null,
    touchStartY: 0,
    touchEndY: 0,
    currentSection: null,
    sections: [],
    navHeight: 70
};

// ========================================
// 2. INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});

function initNavigation() {
    console.log('🧭 Navigation initialized');
    
    // Core navigation features
    initMobileMenu();
    initSmoothScroll();
    initScrollSpy();
    initNavbarHideShow();
    initKeyboardNavigation();
    initTouchGestures();
    initBreadcrumbs();
    
    // Page transitions
    initPageTransitions();
    
    // Quick navigation
    initQuickNav();
}

// ========================================
// 3. MOBILE MENU
// ========================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (NavigationState.isMenuOpen) {
                closeMobileMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (NavigationState.isMenuOpen && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && NavigationState.isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Prevent scroll when menu is open
    function toggleMobileMenu() {
        NavigationState.isMenuOpen = !NavigationState.isMenuOpen;
        
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Animate menu items
        if (NavigationState.isMenuOpen) {
            animateMenuItems();
            // Lock body scroll
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
        
        // ARIA attributes
        hamburger.setAttribute('aria-expanded', NavigationState.isMenuOpen);
        navMenu.setAttribute('aria-hidden', !NavigationState.isMenuOpen);
    }
    
    function closeMobileMenu() {
        NavigationState.isMenuOpen = false;
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
        
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    function animateMenuItems() {
        const menuItems = navMenu.querySelectorAll('.nav-item');
        menuItems.forEach((item, index) => {
            item.style.animation = `fadeInUp 0.3s ease ${index * 0.05}s both`;
        });
    }
}

// ========================================
// 4. SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    // Handle all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
}

function handleSmoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const offset = NavigationState.navHeight;
        const targetPosition = targetElement.offsetTop - offset;
        
        // Custom smooth scroll
        smoothScrollTo(targetPosition, 800);
        
        // Update URL without page jump
        history.pushState(null, null, `#${targetId}`);
        
        // Close mobile menu if open
        if (NavigationState.isMenuOpen) {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                NavigationState.isMenuOpen = false;
            }
        }
    }
}

function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    
    NavigationState.isScrolling = true;
    
    function animation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (ease-in-out-cubic)
        const easeProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + (distance * easeProgress));
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            NavigationState.isScrolling = false;
        }
    }
    
    requestAnimationFrame(animation);
}

// ========================================
// 5. SCROLL SPY
// ========================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;
    
    NavigationState.sections = Array.from(sections).map(section => ({
        id: section.id,
        offsetTop: section.offsetTop,
        offsetBottom: section.offsetTop + section.offsetHeight
    }));
    
    // Update on scroll
    window.addEventListener('scroll', throttle(() => {
        if (!NavigationState.isScrolling) {
            updateActiveSection();
        }
    }, 100));
    
    // Update on resize
    window.addEventListener('resize', debounce(() => {
        updateSectionOffsets();
        updateActiveSection();
    }, 250));
    
    // Initial check
    updateActiveSection();
}

function updateSectionOffsets() {
    const sections = document.querySelectorAll('section[id]');
    NavigationState.sections = Array.from(sections).map(section => ({
        id: section.id,
        offsetTop: section.offsetTop,
        offsetBottom: section.offsetTop + section.offsetHeight
    }));
}

function updateActiveSection() {
    const scrollPosition = window.pageYOffset + NavigationState.navHeight + 100;
    
    for (const section of NavigationState.sections) {
        if (scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetBottom) {
            
            if (NavigationState.currentSection !== section.id) {
                NavigationState.currentSection = section.id;
                highlightNavLink(section.id);
            }
            break;
        }
    }
}

function highlightNavLink(sectionId) {
    // Remove all active classes
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section link
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ========================================
// 6. NAVBAR HIDE/SHOW ON SCROLL
// ========================================
function initNavbarHideShow() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    const scrollDifference = currentScroll - NavigationState.lastScrollPosition;
    
    // Determine scroll direction
    if (scrollDifference > 0) {
        NavigationState.scrollDirection = 'down';
    } else if (scrollDifference < 0) {
        NavigationState.scrollDirection = 'up';
    }
    
    // Add/remove classes based on scroll
    if (currentScroll > 100) {
        navbar.classList.add('navbar-scrolled');
        
        if (NavigationState.scrollDirection === 'down' && currentScroll > 300) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
    } else {
        navbar.classList.remove('navbar-scrolled', 'navbar-hidden');
    }
    
    NavigationState.lastScrollPosition = currentScroll;
}

// ========================================
// 7. KEYBOARD NAVIGATION
// ========================================
function initKeyboardNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    let currentFocusIndex = -1;
    
    // Add tabindex for keyboard navigation
    navLinks.forEach((link, index) => {
        link.setAttribute('tabindex', '0');
        
        link.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    currentFocusIndex = (index + 1) % navLinks.length;
                    navLinks[currentFocusIndex].focus();
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    currentFocusIndex = index - 1 < 0 ? navLinks.length - 1 : index - 1;
                    navLinks[currentFocusIndex].focus();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    navLinks[0].focus();
                    currentFocusIndex = 0;
                    break;
                    
                case 'End':
                    e.preventDefault();
                    navLinks[navLinks.length - 1].focus();
                    currentFocusIndex = navLinks.length - 1;
                    break;
            }
        });
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Alt + H = Home
        if (e.altKey && e.key === 'h') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
        
        // Alt + C = CV
        if (e.altKey && e.key === 'c') {
            e.preventDefault();
            window.location.href = 'cv.html';
        }
        
        // Alt + P = Portfolio
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            window.location.href = 'portfolio-activites.html';
        }
        
        // Alt + M = Menu toggle (mobile)
        if (e.altKey && e.key === 'm') {
            e.preventDefault();
            const hamburger = document.getElementById('hamburger');
            if (hamburger) {
                hamburger.click();
            }
        }
    });
}

// ========================================
// 8. TOUCH GESTURES
// ========================================
function initTouchGestures() {
    // Swipe to open/close mobile menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        NavigationState.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        NavigationState.touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture(touchStartX, touchEndX);
    }, { passive: true });
}

function handleSwipeGesture(startX, endX) {
    const swipeThreshold = 100;
    const difference = startX - endX;
    
    // Only handle horizontal swipes
    const verticalDifference = Math.abs(NavigationState.touchStartY - NavigationState.touchEndY);
    if (verticalDifference > 50) return;
    
    if (Math.abs(difference) > swipeThreshold) {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (!hamburger || !navMenu) return;
        
        if (difference > 0 && NavigationState.isMenuOpen) {
            // Swipe left - close menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            NavigationState.isMenuOpen = false;
        } else if (difference < 0 && !NavigationState.isMenuOpen && startX < 50) {
            // Swipe right from edge - open menu
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            NavigationState.isMenuOpen = true;
        }
    }
}

// ========================================
// 9. BREADCRUMBS
// ========================================
function initBreadcrumbs() {
    const breadcrumbsContainer = document.getElementById('breadcrumbs');
    if (!breadcrumbsContainer) return;
    
    const currentPage = getCurrentPageInfo();
    const breadcrumbs = generateBreadcrumbs(currentPage);
    
    breadcrumbsContainer.innerHTML = breadcrumbs;
}

function getCurrentPageInfo() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    
    const pageMap = {
        'index': { name: 'Accueil', parent: null },
        'cv': { name: 'CV', parent: 'index' },
        'projet-pro': { name: 'Projet Professionnel', parent: 'index' },
        'portfolio-activites': { name: 'Portfolio d\'Activités', parent: 'index' },
        'auto-evaluation': { name: 'Auto-évaluation', parent: 'index' }
    };
    
    return pageMap[page] || pageMap['index'];
}

function generateBreadcrumbs(currentPage) {
    let breadcrumbs = '<nav aria-label="Breadcrumb" class="breadcrumb">';
    breadcrumbs += '<ol>';
    
    if (currentPage.parent) {
        breadcrumbs += `<li><a href="index.html">Accueil</a></li>`;
        breadcrumbs += '<li class="separator">›</li>';
    }
    
    breadcrumbs += `<li class="current">${currentPage.name}</li>`;
    breadcrumbs += '</ol></nav>';
    
    return breadcrumbs;
}

// ========================================
// 10. PAGE TRANSITIONS
// ========================================
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([href^="#"]):not([href^="http"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's the current page
            if (href === window.location.pathname.split('/').pop()) {
                return;
            }
            
            // Skip if it's a download link
            if (link.hasAttribute('download')) {
                return;
            }
            
            e.preventDefault();
            transitionToPage(href);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        transitionToPage(window.location.pathname, false);
    });
}

function transitionToPage(href, addToHistory = true) {
    const body = document.body;
    
    // Start transition
    body.classList.add('page-transition-out');
    
    setTimeout(() => {
        // Navigate to new page
        if (addToHistory) {
            window.location.href = href;
        } else {
            window.location.replace(href);
        }
    }, 300);
}

// ========================================
// 11. QUICK NAVIGATION
// ========================================
function initQuickNav() {
    // Create quick nav button
    const quickNavButton = document.createElement('button');
    quickNavButton.id = 'quick-nav-button';
    quickNavButton.className = 'quick-nav-button';
    quickNavButton.innerHTML = '⚡';
    quickNavButton.setAttribute('aria-label', 'Navigation rapide');
    quickNavButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(quickNavButton);
    
    // Show button after scrolling
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            quickNavButton.style.opacity = '1';
            quickNavButton.style.transform = 'scale(1)';
        } else {
            quickNavButton.style.opacity = '0';
            quickNavButton.style.transform = 'scale(0)';
        }
    });
    
    // Quick nav menu
    quickNavButton.addEventListener('click', showQuickNavMenu);
}

function showQuickNavMenu() {
    const existingMenu = document.getElementById('quick-nav-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const menu = document.createElement('div');
    menu.id = 'quick-nav-menu';
    menu.className = 'quick-nav-menu animate-scale-up';
    menu.innerHTML = `
        <a href="index.html" class="quick-nav-item">🏠 Accueil</a>
        <a href="cv.html" class="quick-nav-item">📄 CV</a>
        <a href="projet-pro.html" class="quick-nav-item">🎯 Projet Pro</a>
        <a href="portfolio-activites.html" class="quick-nav-item">💼 Portfolio</a>
        <a href="auto-evaluation.html" class="quick-nav-item">📊 Auto-évaluation</a>
        <button class="quick-nav-item" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">⬆️ Haut de page</button>
    `;
    
    menu.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 30px;
        background: white;
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-xl);
        padding: 10px;
        z-index: 999;
        display: flex;
        flex-direction: column;
        gap: 5px;
    `;
    
    // Style menu items
    const style = document.createElement('style');
    style.textContent = `
        .quick-nav-item {
            display: block;
            padding: 10px 15px;
            text-decoration: none;
            color: var(--dark);
            border: none;
            background: transparent;
            text-align: left;
            cursor: pointer;
            border-radius: var(--border-radius);
            transition: all 0.2s ease;
            white-space: nowrap;
            font-size: 14px;
            width: 100%;
        }
        
        .quick-nav-item:hover {
            background: var(--primary);
            color: var(--accent);
            transform: translateX(5px);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    setTimeout(() => {
        document.addEventListener('click', closeQuickNavMenu);
    }, 100);
}

function closeQuickNavMenu(e) {
    const menu = document.getElementById('quick-nav-menu');
    const button = document.getElementById('quick-nav-button');
    
    if (menu && !menu.contains(e.target) && !button.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', closeQuickNavMenu);
    }
}

// ========================================
// 12. UTILITY FUNCTIONS
// ========================================
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const later = () => {
            clearTimeout(timeout);
            func();
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// 13. ACCESSIBILITY FEATURES
// ========================================
function initAccessibilityFeatures() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Aller au contenu principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--accent);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.id = 'page-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
}

// Initialize accessibility features
initAccessibilityFeatures();

// ========================================
// 14. EXPORT FOR OTHER MODULES
// ========================================
window.Navigation = {
    smoothScrollTo,
    showQuickNavMenu,
    updateActiveSection,
    getCurrentPageInfo
};