/*
============================================
HANDS BY HAYLEE - INTERACTIVE JAVASCRIPT
============================================
Gen Z Nail Salon - Dark Gold Luxury Edition
Version: 2.0 (Complete Redesign)
Last Updated: 2026-01-03

FEATURES:
1. Smooth hamburger menu
2. Parallax scrolling (mobile-optimized)
3. Gallery lightbox modal
4. Tab switching (service selector)
5. Form validation
6. Smooth scroll to sections
7. Fade-in animations on scroll
8. Contact method toggle
9. Mobile-first interactions

Design Philosophy:
- Buttery smooth 60fps animations
- Touch-friendly for mobile
- Performance optimized
- Accessibility compliant
============================================
*/

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    animations: {
        scrollOffset: 80,           // Offset for fixed nav
        parallaxIntensity: 0.5,     // Parallax effect strength
        fadeInThreshold: 0.15,      // When to trigger fade-ins
        debounceDelay: 10          // Scroll event optimization
    },

    business: {
        hours: '9 AM - 7 PM',
        location: 'Fresno, CA',
        email: 'handsbyhaylee@example.com',
        instagram: '@handsbyhaylee'
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    menuOpen: false,
    currentTab: 'lengths',
    currentGalleryIndex: 0,
    scrollY: 0,

    init() {
        this.loadFromStorage();
        console.log('App state initialized');
    },

    loadFromStorage() {
        // Load any saved preferences from sessionStorage
        const savedTab = sessionStorage.getItem('selectedTab');
        if (savedTab) this.currentTab = savedTab;
    },

    saveToStorage() {
        sessionStorage.setItem('selectedTab', this.currentTab);
    }
};

// ============================================
// NAVIGATION - Hamburger Menu
// ============================================
const Navigation = {
    nav: null,
    hamburger: null,
    menu: null,
    overlay: null,
    navLinks: null,

    init() {
        this.nav = document.querySelector('.main-nav');
        this.hamburger = document.querySelector('[data-menu-toggle]');
        this.menu = document.querySelector('[data-nav-menu]');
        this.overlay = document.querySelector('[data-menu-overlay]');
        this.navLinks = document.querySelectorAll('.nav-link');

        if (!this.hamburger || !this.menu) {
            console.warn('Navigation elements not found');
            return;
        }

        this.bindEvents();
        console.log('Navigation initialized');
    },

    bindEvents() {
        // Hamburger toggle
        this.hamburger.addEventListener('click', () => this.toggle());

        // Close on overlay click
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        // Close on nav link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.close();
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && AppState.menuOpen) {
                this.close();
            }
        });

        // Sticky nav on scroll
        window.addEventListener('scroll', () => this.handleScroll());
    },

    toggle() {
        if (AppState.menuOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        this.menu.classList.add('active');
        if (this.overlay) this.overlay.classList.add('active');
        this.hamburger.classList.add('active');
        this.hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        AppState.menuOpen = true;
    },

    close() {
        this.menu.classList.remove('active');
        if (this.overlay) this.overlay.classList.remove('active');
        this.hamburger.classList.remove('active');
        this.hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        AppState.menuOpen = false;
    },

    handleScroll() {
        const scrolled = window.scrollY > 50;
        if (scrolled) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }
};

// ============================================
// SMOOTH SCROLLING
// ============================================
const SmoothScroll = {
    init() {
        const scrollLinks = document.querySelectorAll('[data-scroll-target]');

        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-scroll-target');
                this.scrollToSection(targetId);
            });
        });

        console.log(`Smooth scroll initialized for ${scrollLinks.length} links`);
    },

    scrollToSection(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const offset = CONFIG.animations.scrollOffset;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

// ============================================
// PARALLAX SCROLLING (Mobile Optimized)
// ============================================
const Parallax = {
    layers: [],
    scrollHint: null,
    isScrolling: false,

    init() {
        // Get all parallax layers
        this.layers = Array.from(document.querySelectorAll('[data-parallax-layer]'));
        this.scrollHint = document.querySelector('[data-scroll-hint]');

        if (this.layers.length === 0) {
            console.warn('No parallax layers found');
            return;
        }

        // Use requestAnimationFrame for smooth 60fps
        window.addEventListener('scroll', () => {
            if (!this.isScrolling) {
                window.requestAnimationFrame(() => {
                    this.update();
                    this.isScrolling = false;
                });
                this.isScrolling = true;
            }
        });

        console.log(`Parallax initialized for ${this.layers.length} layers`);
    },

    update() {
        const scrollY = window.pageYOffset;
        AppState.scrollY = scrollY;

        // Update parallax layers
        this.layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-parallax-layer')) || 0;
            const yPos = -(scrollY * speed * CONFIG.animations.parallaxIntensity);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Hide scroll hint after scrolling
        if (this.scrollHint) {
            if (scrollY > 100) {
                this.scrollHint.style.opacity = '0';
                this.scrollHint.style.pointerEvents = 'none';
            } else {
                this.scrollHint.style.opacity = '1';
                this.scrollHint.style.pointerEvents = 'auto';
            }
        }
    }
};

// ============================================
// FADE-IN ANIMATIONS (On Scroll)
// ============================================
const FadeInAnimations = {
    observer: null,

    init() {
        const elements = document.querySelectorAll('[data-fade-in]');

        if (elements.length === 0) {
            console.warn('No fade-in elements found');
            return;
        }

        const observerOptions = {
            threshold: CONFIG.animations.fadeInThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation
                    // this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => this.observer.observe(el));

        console.log(`Fade-in observer initialized for ${elements.length} elements`);
    }
};

// ============================================
// GALLERY MODAL / LIGHTBOX
// ============================================
const GalleryModal = {
    modal: null,
    modalImage: null,
    modalCaption: null,
    closeBtn: null,
    prevBtn: null,
    nextBtn: null,
    images: [],
    currentIndex: 0,

    init() {
        this.createModal();
        this.bindGalleryItems();
        console.log('Gallery modal initialized');
    },

    createModal() {
        const modalHTML = `
            <div class="gallery-modal" id="galleryModal" role="dialog" aria-modal="true">
                <div class="modal-backdrop" data-modal-close></div>
                <div class="modal-content-wrapper">
                    <button class="modal-close" data-modal-close aria-label="Close gallery">&times;</button>
                    <button class="modal-nav modal-prev" data-modal-prev aria-label="Previous image">‹</button>
                    <button class="modal-nav modal-next" data-modal-next aria-label="Next image">›</button>
                    <div class="modal-image-container">
                        <img src="" alt="" class="modal-image" id="modalImage">
                    </div>
                    <p class="modal-counter"><span id="modalCounter">1 / 1</span></p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.injectModalStyles();

        // Cache elements
        this.modal = document.getElementById('galleryModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalCounter = document.getElementById('modalCounter');
        this.closeBtn = this.modal.querySelector('[data-modal-close]');
        this.prevBtn = this.modal.querySelector('[data-modal-prev]');
        this.nextBtn = this.modal.querySelector('[data-modal-next]');

        this.bindModalEvents();
    },

    injectModalStyles() {
        const styles = `
            .gallery-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .gallery-modal.active { display: flex; align-items: center; justify-content: center; }
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(10, 10, 10, 0.95);
                backdrop-filter: blur(12px);
            }
            .modal-content-wrapper {
                position: relative;
                width: 100%;
                max-width: 90%;
                max-height: 90vh;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;
            }
            .modal-image-container {
                max-width: 100%;
                max-height: 80vh;
            }
            .modal-image {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 16px;
                box-shadow: 0 20px 80px rgba(212, 175, 55, 0.3);
                animation: zoomIn 0.3s ease;
            }
            .modal-close, .modal-nav {
                position: absolute;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid var(--color-gold-primary);
                color: var(--color-gold-primary);
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(8px);
            }
            .modal-close {
                top: 20px;
                right: 20px;
                width: 48px;
                height: 48px;
                font-size: 32px;
                z-index: 2;
            }
            .modal-nav {
                width: 56px;
                height: 56px;
                font-size: 40px;
                font-weight: bold;
            }
            .modal-prev { left: 20px; }
            .modal-next { right: 20px; }
            .modal-close:hover, .modal-nav:hover {
                background: var(--color-gold-primary);
                color: #0a0a0a;
                transform: scale(1.1);
                box-shadow: 0 0 24px rgba(212, 175, 55, 0.6);
            }
            .modal-counter {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                color: var(--color-gold-primary);
                font-size: 14px;
                background: rgba(10, 10, 10, 0.8);
                padding: 8px 16px;
                border-radius: 20px;
                border: 1px solid rgba(212, 175, 55, 0.3);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes zoomIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            @media (max-width: 768px) {
                .modal-close { width: 44px; height: 44px; top: 10px; right: 10px; }
                .modal-nav { width: 48px; height: 48px; font-size: 32px; }
                .modal-prev { left: 10px; }
                .modal-next { right: 10px; }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    },

    bindGalleryItems() {
        const galleryItems = document.querySelectorAll('[data-gallery-item]');

        this.images = Array.from(galleryItems).map((item, index) => {
            const img = item.querySelector('img');

            // Make clickable
            item.addEventListener('click', () => this.open(index));

            // Keyboard support
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.open(index);
                }
            });

            return {
                src: img.src,
                alt: img.alt || `Gallery image ${index + 1}`
            };
        });

        console.log(`Gallery: ${this.images.length} images bound`);
    },

    bindModalEvents() {
        // Close button
        this.modal.querySelectorAll('[data-modal-close]').forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // Navigation
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape': this.close(); break;
                case 'ArrowLeft': this.prev(); break;
                case 'ArrowRight': this.next(); break;
            }
        });

        // Touch swipe
        let touchStartX = 0;
        this.modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        this.modal.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) this.next();
            if (touchEndX > touchStartX + 50) this.prev();
        });
    },

    open(index) {
        this.currentIndex = index;
        this.showImage(index);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    },

    showImage(index) {
        if (index < 0 || index >= this.images.length) return;

        const img = this.images[index];
        this.modalImage.src = img.src;
        this.modalImage.alt = img.alt;
        this.modalCounter.textContent = `${index + 1} / ${this.images.length}`;
        this.currentIndex = index;
    },

    prev() {
        const newIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.showImage(newIndex);
    },

    next() {
        const newIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
        this.showImage(newIndex);
    }
};

// ============================================
// TAB SWITCHING (Service Selector)
// ============================================
const TabSwitcher = {
    tabs: [],
    panels: [],

    init() {
        this.tabs = Array.from(document.querySelectorAll('[data-tab]'));
        this.panels = Array.from(document.querySelectorAll('[data-tab-panel]'));

        if (this.tabs.length === 0) {
            console.warn('No tabs found');
            return;
        }

        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });

        // Initialize first tab
        if (this.tabs[0]) {
            const firstTab = this.tabs[0].getAttribute('data-tab');
            this.switchTab(firstTab);
        }

        console.log(`Tab switcher initialized for ${this.tabs.length} tabs`);
    },

    switchTab(tabName) {
        // Update active tab
        this.tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabName) {
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
            } else {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            }
        });

        // Update active panel
        this.panels.forEach(panel => {
            if (panel.getAttribute('data-tab-panel') === tabName) {
                panel.classList.add('active');
                panel.setAttribute('aria-hidden', 'false');
            } else {
                panel.classList.remove('active');
                panel.setAttribute('aria-hidden', 'true');
            }
        });

        // Save to state
        AppState.currentTab = tabName;
        AppState.saveToStorage();
    }
};

// ============================================
// CONTACT METHOD TOGGLE
// ============================================
const ContactToggle = {
    init() {
        // Look for radio buttons within contact-method-toggle
        const toggleContainer = document.querySelector('.contact-method-toggle');
        const contactInput = document.getElementById('booking-contact');

        if (!toggleContainer || !contactInput) {
            console.warn('Contact toggle elements not found');
            return;
        }

        const radioButtons = toggleContainer.querySelectorAll('input[type="radio"]');

        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    this.switchMethod(radio.value, contactInput);
                }
            });
        });

        // Initialize with current selection
        const checkedRadio = toggleContainer.querySelector('input[type="radio"]:checked');
        if (checkedRadio) {
            this.switchMethod(checkedRadio.value, contactInput);
        }

        console.log('Contact toggle initialized');
    },

    switchMethod(method, input) {
        // Update input placeholder and type based on selected contact method
        const placeholders = {
            email: 'your.email@example.com',
            phone: '(555) 123-4567',
            instagram: '@yourusername'
        };

        const types = {
            email: 'email',
            phone: 'tel',
            instagram: 'text'
        };

        input.placeholder = placeholders[method] || 'Your contact info';
        input.type = types[method] || 'text';
    }
};

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================
const FormHandler = {
    form: null,

    init() {
        this.form = document.querySelector('[data-booking-form]');

        if (!this.form) {
            console.warn('Booking form not found');
            return;
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        console.log('Form handler initialized');
    },

    handleSubmit(e) {
        e.preventDefault();

        if (!this.validate()) {
            return;
        }

        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        console.log('Form submission:', data);

        // Show success message
        this.showSuccess();

        // Reset form
        this.form.reset();
    },

    validate() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            this.showError('Please fill in all required fields');
        }

        return isValid;
    },

    showSuccess() {
        // Create success message
        const message = document.createElement('div');
        message.className = 'form-message success';
        message.textContent = 'Thanks! We\'ll get back to you ASAP 💅';
        message.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-gold);
            color: #0a0a0a;
            padding: 16px 32px;
            border-radius: 50px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.4);
            animation: slideDown 0.3s ease;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    },

    showError(msg) {
        const message = document.createElement('div');
        message.className = 'form-message error';
        message.textContent = msg;
        message.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4444;
            color: white;
            padding: 16px 32px;
            border-radius: 50px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 8px 32px rgba(255, 68, 68, 0.4);
            animation: slideDown 0.3s ease;
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            message.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
};

// ============================================
// INITIALIZE ALL MODULES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== HANDS BY HAYLEE - INITIALIZING ===');

    // Initialize state
    AppState.init();

    // Initialize all modules
    Navigation.init();
    SmoothScroll.init();
    Parallax.init();
    FadeInAnimations.init();
    GalleryModal.init();
    TabSwitcher.init();
    ContactToggle.init();
    FormHandler.init();

    console.log('=== ALL SYSTEMS READY ===');
    console.log('Gen Z nail salon website ready to slay 💅✨');
});

// ============================================
// UTILITY: Add slide animation styles
// ============================================
(function injectAnimationStyles() {
    const styles = `
        @keyframes slideDown {
            from { transform: translate(-50%, -100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translate(-50%, 0); opacity: 1; }
            to { transform: translate(-50%, -100%); opacity: 0; }
        }
    `;
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
})();
