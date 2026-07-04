// Modern Interactive JavaScript for Aman Kumar's Academic Website

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ============================================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }

    // ============================================
    // 2. SMOOTH SCROLLING FOR IN-PAGE ANCHOR LINKS
    // ============================================
    // Only apply to anchors that start with # and are on the same page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            // Only prevent default and smooth scroll if target exists on current page
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 3. ACTIVE NAVIGATION HIGHLIGHTING (Multi-page)
    // ============================================
    // Highlight the current page in navigation based on URL
    function highlightCurrentPage() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');

            // Match current page or default to index.html for root
            if (linkHref === currentPage ||
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === '/' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // Highlight on page load
    highlightCurrentPage();

    // ============================================
    // 4. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow on scroll
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // ============================================
    // 5. BACK TO TOP BUTTON
    // ============================================
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 6. SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apple-style staggered reveal: siblings cascade in sequence
                const siblings = entry.target.parentElement.children;
                const index = Array.from(siblings).indexOf(entry.target);
                entry.target.style.transitionDelay = `${Math.min(index, 6) * 0.08}s`;
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(`
        .interest-card,
        .project-card,
        .fact-card,
        .publication-item,
        .applied-project,
        .teaching-item,
        .supervision-item,
        .award-item,
        .conference-item,
        .contact-item,
        .education-item,
        .news-item
    `);

    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(34px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });

    // Add animate-in class effect
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        @media (prefers-reduced-motion: reduce) {
            .animate-in { transition: none !important; }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // 8. DROPDOWN MENU FOR MOBILE
    // ============================================
    const dropdownToggles = document.querySelectorAll('.nav-dropdown > .nav-link');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;

                if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
                    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    });

    // ============================================
    // 9. LAZY LOADING FOR IMAGES
    // ============================================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ============================================
    // 10. PARALLAX EFFECT FOR HERO SECTION
    // ============================================
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const heroContent = hero.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                    heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
                }
            }
        });
    }

    // ============================================
    // 11. COUNTER ANIMATION FOR STATS
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.floor(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // Observe stat elements
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-count'));
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });

    const statElements = document.querySelectorAll('[data-count]');
    statElements.forEach(el => statObserver.observe(el));

    // ============================================
    // 12. COPY TO CLIPBOARD FOR EMAIL
    // ============================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('dblclick', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');

            navigator.clipboard.writeText(email).then(() => {
                // Show tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Email copied!';
                tooltip.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: #527bbd;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                `;

                document.body.appendChild(tooltip);

                setTimeout(() => {
                    tooltip.style.animation = 'slideOutRight 0.3s ease-out';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            });
        });
    });

    // Add slide animations for clipboard tooltip
    const clipboardStyle = document.createElement('style');
    clipboardStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(clipboardStyle);

    // ============================================
    // 13. PROJECT CARDS INTERACTION
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.animation = 'pulse 0.3s ease-out';
                }, index * 50);
            });
        });

        card.addEventListener('mouseleave', function() {
            const techTags = this.querySelectorAll('.tech-tag');
            techTags.forEach(tag => {
                tag.style.animation = 'none';
            });
        });
    });

    // ============================================
    // 14. RESEARCH INTERESTS CARDS FLIP (Optional)
    // ============================================
    const interestCards = document.querySelectorAll('.interest-card');

    interestCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = this.style.transform === 'rotateY(10deg)' ? 'rotateY(0deg)' : 'rotateY(10deg)';
        });
    });

    // ============================================
    // 15. PERFORMANCE: DEBOUNCE SCROLL EVENTS
    // ============================================
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

    // Apply debounce to scroll-heavy functions (removed highlightNav for multi-page)

    // ============================================
    // 16. PRINT FUNCTIONALITY
    // ============================================
    const printButtons = document.querySelectorAll('[data-print]');

    printButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.print();
        });
    });

    // ============================================
    // 17. ACCESSIBILITY: KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Press 'T' to scroll to top
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // Press 'Esc' to close mobile menu
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });

    // ============================================
    // 18. CONSOLE EASTER EGG
    // ============================================
    console.log('%c👋 Hello, curious developer!', 'color: #b8502e; font-size: 20px; font-weight: bold;');
    console.log('%cThis website was built for Aman Kumar', 'color: #736c62; font-size: 14px;');
    console.log('%cResearcher in Visual Analytics & Interactive Machine Learning', 'color: #736c62; font-size: 14px;');
    console.log('%cUniversity of Zürich, Switzerland', 'color: #736c62; font-size: 14px;');
    console.log('%c\nInterested in collaboration? Contact: amank.xai@gmail.com', 'color: #c99a3d; font-size: 14px; font-weight: bold;');
});

// ============================================
// 20. SERVICE WORKER FOR PWA (Optional)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}
