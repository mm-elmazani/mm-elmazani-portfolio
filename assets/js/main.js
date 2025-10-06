/* ========================================
   MAIN.JS - JavaScript principal
   Portfolio TI EPHEC - Mohamed El Mazani
   ======================================== */

// ========================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// ========================================
const config = {
    animationDuration: 600,
    scrollOffset: 100,
    observerThreshold: 0.1,
    storageKeys: {
        theme: 'portfolio_theme',
        activities: 'portfolio_activities'
    }
};

// State management
const state = {
    isLoading: true,
    isAdminMode: false,
    currentPage: 'home',
    scrollPosition: 0,
    isMobile: window.innerWidth < 768
};

// ========================================
// 2. INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('🚀 Portfolio initialized');
    
    // Core initializations
    detectDevice();
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeLazyLoading();
    
    // Page-specific initializations
    initializePageSpecific();
    
    // Remove loading state
    setTimeout(() => {
        state.isLoading = false;
        document.body.classList.add('loaded');
    }, 500);
}

// ========================================
// 3. DEVICE DETECTION
// ========================================
function detectDevice() {
    const checkDevice = () => {
        state.isMobile = window.innerWidth < 768;
        document.body.classList.toggle('is-mobile', state.isMobile);
        document.body.classList.toggle('is-desktop', !state.isMobile);
    };
    
    checkDevice();
    window.addEventListener('resize', debounce(checkDevice, 250));
}

// ========================================
// 4. NAVIGATION EFFECTS
// ========================================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // Scroll effects on navbar
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show on scroll (mobile only)
        if (state.isMobile) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
        }
        
        lastScroll = currentScroll;
    }, 100));
    
    // Active link highlighting
    highlightActiveNavLink();
}

function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ========================================
// 5. SCROLL ANIMATIONS
// ========================================
function initializeScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: config.observerThreshold,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Stagger animations for child elements
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('in-view');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
        '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    );
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Parallax effect
    initializeParallax();
}

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, 10));
}

// ========================================
// 6. ANIMATIONS
// ========================================
function initializeAnimations() {
    // Add animation classes to elements on page load
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-fade-in');
        }, index * 100);
    });
    
    // Typing animation
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach(el => {
        typeWriter(el);
    });
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        animateCounter(counter);
    });
}

function typeWriter(element) {
    const text = element.dataset.text || element.textContent;
    const speed = parseInt(element.dataset.speed) || 100;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function animateCounter(counter) {
    const target = parseInt(counter.dataset.target) || parseInt(counter.textContent);
    const duration = parseInt(counter.dataset.duration) || 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    // Start animation when element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(counter);
}

// ========================================
// 7. LAZY LOADING
// ========================================
function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// 8. ADMIN MODE (Hidden Feature) - UPDATE : supprimé
// ========================================


// ========================================
// 9. PAGE-SPECIFIC FUNCTIONS
// ========================================
function initializePageSpecific() {
    const page = document.body.dataset.page || detectCurrentPage();
    
    switch(page) {
        case 'home':
            initializeHomePage();
            break;
        case 'cv':
            initializeCVPage();
            break;
        case 'portfolio':
            initializePortfolioPage();
            break;
        case 'project':
            initializeProjectPage();
            break;
        case 'evaluation':
            initializeEvaluationPage();
            break;
    }
}

function detectCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('cv')) return 'cv';
    if (path.includes('portfolio')) return 'portfolio';
    if (path.includes('projet')) return 'project';
    if (path.includes('evaluation')) return 'evaluation';
    return 'home';
}

function initializeHomePage() {
    // Smooth scroll for hero CTA
    const ctaButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', smoothScrollToSection);
    });
    
    // Animate hero shapes
    animateHeroShapes();
}

function animateHeroShapes() {
    const shapes = document.querySelectorAll('.hero-shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
}

function initializeCVPage() {
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-fade-in-left');
    });
    
    // Skill bars animation
    animateSkillBars();
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.skill || '0';
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

function initializePortfolioPage() {
    // This will be handled by activities.js
    console.log('Portfolio page initialized');
}

function initializeProjectPage() {
    // Project timeline or roadmap animations
    console.log('Project page initialized');
}

function initializeEvaluationPage() {
    // Evaluation charts or progress indicators
    console.log('Evaluation page initialized');
}

// ========================================
// 10. UTILITY FUNCTIONS
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function smoothScrollToSection(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - config.scrollOffset;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ========================================
// 11. FORM HANDLING
// ========================================
function initializeForms() {
    const forms = document.querySelectorAll('form[data-ajax]');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="loading-spinner"></span> Envoi...';
    }
    
    try {
        // Simulate form submission (replace with actual API call)
        await simulateFormSubmission(formData);
        
        // Show success message
        showNotification('Message envoyé avec succès!', 'success');
        form.reset();
    } catch (error) {
        // Show error message
        showNotification('Erreur lors de l\'envoi. Veuillez réessayer.', 'error');
    } finally {
        // Reset button state
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Envoyer';
        }
    }
}

function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Form data:', Object.fromEntries(formData));
            resolve();
        }, 1500);
    });
}

// ========================================
// 12. NOTIFICATIONS
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} animate-slide-top`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 250px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('animate-fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========================================
// 13. PERFORMANCE MONITORING
// ========================================
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
            
            // Send to analytics if needed
            if (perfData.loadEventEnd - perfData.fetchStart > 3000) {
                console.warn('⚠️ Page load time exceeds 3 seconds');
            }
        });
    }
}

// ========================================
// 14. ERROR HANDLING
// ========================================
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Could send to error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ========================================
// 15. EXPORT FUNCTIONS (for other modules)
// ========================================
window.portfolioUtils = {
    debounce,
    throttle,
    showNotification,
    smoothScrollToSection,
    animateCounter,
    typeWriter
};

// Initialize performance monitoring
monitorPerformance();