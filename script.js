/*
============================================
HANDS BY HAYLEE - INTERACTIVE JAVASCRIPT
============================================
Luxury Nail Salon Booking System
Version: 1.0
Last Updated: 2026-01-03

FEATURES INCLUDED:
1. Mobile Navigation Toggle
2. Smooth Scrolling
3. Gallery Lightbox/Modal
4. Selection State Management
5. Booking Modals & Forms
6. Form Validation
7. Scroll Animations
8. Booking Data Management
9. Accessibility Features
10. Touch-Friendly Interactions

EASY CUSTOMIZATION:
- All configurable settings are in the CONFIG object below
- Update API endpoints when backend is ready
- Modify business hours, time slots, etc.
============================================
*/

// ============================================
// CONFIGURATION OBJECT - Easy to customize!
// ============================================
const CONFIG = {
    // Business hours (for appointment booking)
    businessHours: {
        monday: { start: '09:00', end: '19:00', closed: false },
        tuesday: { start: '09:00', end: '19:00', closed: false },
        wednesday: { start: '09:00', end: '19:00', closed: false },
        thursday: { start: '09:00', end: '19:00', closed: false },
        friday: { start: '09:00', end: '19:00', closed: false },
        saturday: { start: '10:00', end: '18:00', closed: false },
        sunday: { start: '10:00', end: '18:00', closed: false } // By appointment only
    },

    // Time slot intervals (in minutes)
    timeSlotInterval: 60, // 60 minutes = 1 hour appointments

    // Maximum days in advance to book
    maxAdvanceBookingDays: 60,

    // Minimum hours in advance to book
    minAdvanceNoticeHours: 24,

    // Animation settings
    animations: {
        scrollOffset: 80, // Offset for fixed header when smooth scrolling
        fadeInThreshold: 0.15, // How much of element must be visible to trigger fade-in
        debounceDelay: 100 // Milliseconds to debounce scroll events
    },

    // API endpoints (placeholder - update when backend is ready)
    api: {
        bookAppointment: '/api/bookings/in-person',
        orderShippedSet: '/api/orders/shipped',
        checkAvailability: '/api/availability'
    },

    // Storage keys for sessionStorage
    storageKeys: {
        selectedLength: 'hbh_selected_length',
        selectedTier: 'hbh_selected_tier',
        designType: 'hbh_design_type',
        bookingType: 'hbh_booking_type',
        bookingData: 'hbh_booking_data'
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================
const AppState = {
    // User selections
    selectedLength: null,
    selectedTier: null,
    designType: null, // 'premade' or 'custom'
    bookingType: null, // 'in-person' or 'shipped'

    // UI state
    mobileMenuOpen: false,
    currentModal: null,
    currentGalleryIndex: 0,

    // Gallery images (for lightbox navigation)
    galleryImages: [],

    // Initialize state from sessionStorage
    init() {
        this.loadFromStorage();
    },

    // Load saved selections from sessionStorage
    loadFromStorage() {
        const keys = CONFIG.storageKeys;
        this.selectedLength = sessionStorage.getItem(keys.selectedLength);
        this.selectedTier = sessionStorage.getItem(keys.selectedTier);
        this.designType = sessionStorage.getItem(keys.designType);
        this.bookingType = sessionStorage.getItem(keys.bookingType);

        console.log('Loaded state from storage:', this);
    },

    // Save state to sessionStorage
    saveToStorage() {
        const keys = CONFIG.storageKeys;
        if (this.selectedLength) sessionStorage.setItem(keys.selectedLength, this.selectedLength);
        if (this.selectedTier) sessionStorage.setItem(keys.selectedTier, this.selectedTier);
        if (this.designType) sessionStorage.setItem(keys.designType, this.designType);
        if (this.bookingType) sessionStorage.setItem(keys.bookingType, this.bookingType);

        console.log('Saved state to storage:', this);
    },

    // Clear all selections
    clearSelections() {
        const keys = CONFIG.storageKeys;
        Object.values(keys).forEach(key => sessionStorage.removeItem(key));

        this.selectedLength = null;
        this.selectedTier = null;
        this.designType = null;
        this.bookingType = null;

        console.log('Cleared all selections');
    },

    // Get complete booking data object
    getBookingData() {
        return {
            nailLength: this.selectedLength,
            tier: this.selectedTier,
            designType: this.designType,
            bookingType: this.bookingType,
            timestamp: new Date().toISOString()
        };
    }
};

// ============================================
// MOBILE NAVIGATION
// ============================================
const MobileNav = {
    toggle: null,
    menu: null,
    overlay: null,
    navLinks: null,
    body: document.body,

    init() {
        this.toggle = document.querySelector('.mobile-menu-toggle');
        this.menu = document.querySelector('.nav-menu');
        this.overlay = document.querySelector('.mobile-menu-overlay');
        this.navLinks = document.querySelectorAll('.nav-menu a');

        if (!this.toggle || !this.menu) {
            console.warn('Mobile nav elements not found');
            return;
        }

        this.bindEvents();
        console.log('Mobile nav initialized');
    },

    bindEvents() {
        // Toggle button click
        this.toggle.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking overlay
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.closeMenu());
        }

        // Close menu when clicking outside (on overlay area)
        document.addEventListener('click', (e) => {
            if (AppState.mobileMenuOpen &&
                !this.menu.contains(e.target) &&
                !this.toggle.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && AppState.mobileMenuOpen) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        if (AppState.mobileMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    },

    openMenu() {
        this.menu.classList.add('active');
        if (this.overlay) {
            this.overlay.classList.add('active');
        }
        this.toggle.setAttribute('aria-expanded', 'true');
        this.body.style.overflow = 'hidden'; // Prevent body scroll
        AppState.mobileMenuOpen = true;

        console.log('Mobile menu opened');
    },

    closeMenu() {
        this.menu.classList.remove('active');
        if (this.overlay) {
            this.overlay.classList.remove('active');
        }
        this.toggle.setAttribute('aria-expanded', 'false');
        this.body.style.overflow = ''; // Restore body scroll
        AppState.mobileMenuOpen = false;

        console.log('Mobile menu closed');
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
        const targetSection = document.getElementById(targetId);

        if (!targetSection) {
            console.warn(`Section with id "${targetId}" not found`);
            return;
        }

        // Calculate position with offset for fixed header
        const headerOffset = CONFIG.animations.scrollOffset;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (AppState.mobileMenuOpen) {
            MobileNav.closeMenu();
        }

        console.log(`Scrolled to section: ${targetId}`);
    }
};

// ============================================
// STICKY NAVIGATION (on scroll)
// ============================================
const StickyNav = {
    nav: null,
    scrollThreshold: 100,

    init() {
        this.nav = document.querySelector('.main-nav');

        if (!this.nav) {
            console.warn('Nav element not found');
            return;
        }

        window.addEventListener('scroll', this.debounce(() => this.handleScroll(), CONFIG.animations.debounceDelay));

        console.log('Sticky nav initialized');
    },

    handleScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    },

    // Debounce function to optimize scroll performance
    debounce(func, wait) {
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
};

// ============================================
// SELECTION TRACKING (Length & Tier)
// ============================================
const SelectionTracker = {
    init() {
        this.bindLengthSelection();
        this.bindTierSelection();
        this.restoreSelections();

        console.log('Selection tracker initialized');
    },

    // Nail length selection
    bindLengthSelection() {
        const lengthCards = document.querySelectorAll('.service-card[data-length]');

        lengthCards.forEach(card => {
            card.addEventListener('click', () => {
                const length = card.getAttribute('data-length');
                this.selectLength(length, card);
            });

            // Keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const length = card.getAttribute('data-length');
                    this.selectLength(length, card);
                }
            });
        });
    },

    selectLength(length, cardElement) {
        // Remove previous selection
        document.querySelectorAll('.service-card[data-length]').forEach(card => {
            card.classList.remove('selected');
            // Remove any existing checkmark
            const existingCheck = card.querySelector('.selection-checkmark');
            if (existingCheck) {
                existingCheck.remove();
            }
        });

        // Add selection to clicked card
        cardElement.classList.add('selected');

        // Update state
        AppState.selectedLength = length;
        AppState.saveToStorage();

        console.log(`Selected length: ${length}`);

        // Show visual feedback
        this.showSelectionFeedback(cardElement, 'Length selected!');
    },

    // Tier selection
    bindTierSelection() {
        const tierButtons = document.querySelectorAll('[data-tier-select]');

        tierButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent card click
                const tier = button.getAttribute('data-tier-select');
                const card = button.closest('.tier-card');
                this.selectTier(tier, card);
            });
        });
    },

    selectTier(tier, cardElement) {
        // Remove previous selection
        document.querySelectorAll('.tier-card').forEach(card => {
            card.classList.remove('selected');
            // Remove any existing checkmark
            const existingCheck = card.querySelector('.selection-checkmark');
            if (existingCheck) {
                existingCheck.remove();
            }
        });

        // Add selection to clicked card
        cardElement.classList.add('selected');

        // Update state
        AppState.selectedTier = tier;
        AppState.saveToStorage();

        console.log(`Selected tier: ${tier}`);

        // Show visual feedback
        this.showSelectionFeedback(cardElement, `Tier ${tier} selected!`);
    },

    // Restore selections on page load
    restoreSelections() {
        if (AppState.selectedLength) {
            const lengthCard = document.querySelector(`.service-card[data-length="${AppState.selectedLength}"]`);
            if (lengthCard) {
                lengthCard.classList.add('selected');
                this.showSelectionFeedback(lengthCard, 'Length selected!');
            }
        }

        if (AppState.selectedTier) {
            const tierCard = document.querySelector(`.tier-card[data-tier="${AppState.selectedTier}"]`);
            if (tierCard) {
                tierCard.classList.add('selected');
                this.showSelectionFeedback(tierCard, `Tier ${AppState.selectedTier} selected!`);
            }
        }
    },

    // Visual feedback for selections
    showSelectionFeedback(element, message) {
        // Create checkmark indicator
        const existingCheck = element.querySelector('.selection-checkmark');
        if (existingCheck) {
            existingCheck.remove();
        }

        const checkmark = document.createElement('div');
        checkmark.className = 'selection-checkmark';
        checkmark.textContent = '\u2713 ' + message;

        element.style.position = 'relative';
        element.appendChild(checkmark);
    }
};

// ============================================
// GALLERY LIGHTBOX / MODAL
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

    // Create modal structure dynamically
    createModal() {
        const modalHTML = `
            <div class="gallery-modal" id="galleryModal" role="dialog" aria-modal="true" aria-labelledby="modalCaption">
                <div class="modal-backdrop"></div>
                <div class="modal-content-wrapper">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                    <button class="modal-prev" aria-label="Previous image">‹</button>
                    <button class="modal-next" aria-label="Next image">›</button>
                    <div class="modal-image-container">
                        <img src="" alt="" class="modal-image" id="modalImage">
                    </div>
                    <p class="modal-caption" id="modalCaption"></p>
                    <div class="modal-counter">
                        <span id="modalCounter">1 / 1</span>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Add styles
        this.injectModalStyles();

        // Cache elements
        this.modal = document.getElementById('galleryModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalCaption = document.getElementById('modalCaption');
        this.modalCounter = document.getElementById('modalCounter');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.prevBtn = this.modal.querySelector('.modal-prev');
        this.nextBtn = this.modal.querySelector('.modal-next');
        this.backdrop = this.modal.querySelector('.modal-backdrop');

        this.bindModalEvents();
    },

    // Inject modal styles
    injectModalStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .gallery-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                animation: fadeIn 0.3s ease-in-out;
            }

            .gallery-modal.active {
                display: block;
            }

            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                backdrop-filter: blur(10px);
            }

            .modal-content-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: 20px;
            }

            .modal-image-container {
                max-width: 90%;
                max-height: 80vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .modal-image {
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(255, 0, 175, 0.3);
                animation: zoomIn 0.3s ease-in-out;
            }

            .modal-caption {
                color: white;
                font-size: 18px;
                margin-top: 20px;
                text-align: center;
                max-width: 600px;
            }

            .modal-counter {
                color: rgba(255, 255, 255, 0.8);
                font-size: 14px;
                margin-top: 10px;
            }

            .modal-close,
            .modal-prev,
            .modal-next {
                position: absolute;
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 32px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.25s ease;
                backdrop-filter: blur(10px);
            }

            .modal-close {
                top: 20px;
                right: 20px;
                font-size: 40px;
            }

            .modal-prev {
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
            }

            .modal-next {
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }

            .modal-close:hover,
            .modal-prev:hover,
            .modal-next:hover {
                background: #ff00af;
                transform: scale(1.1);
            }

            .modal-next:hover {
                transform: translateY(-50%) scale(1.1);
            }

            .modal-prev:hover {
                transform: translateY(-50%) scale(1.1);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes checkmarkFadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes zoomIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @media (max-width: 768px) {
                .modal-close,
                .modal-prev,
                .modal-next {
                    width: 44px;
                    height: 44px;
                    font-size: 24px;
                }

                .modal-close {
                    top: 10px;
                    right: 10px;
                }

                .modal-prev {
                    left: 10px;
                }

                .modal-next {
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    },

    // Bind click events to gallery items
    bindGalleryItems() {
        const galleryItems = document.querySelectorAll('[data-gallery-item]');

        this.images = Array.from(galleryItems).map((item, index) => {
            const img = item.querySelector('.gallery-image');
            const button = item.querySelector('[data-modal-trigger]');

            // Make gallery item keyboard accessible
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `View nail design ${index + 1}`);

            // Click on gallery item
            item.addEventListener('click', () => this.openModal(index));

            // Keyboard navigation for gallery item
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openModal(index);
                }
            });

            // Click on "View Details" button
            if (button) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openModal(index);
                });
            }

            return {
                src: img.src,
                alt: img.alt || `Design ${index + 1}`
            };
        });

        console.log(`Bound ${this.images.length} gallery items`);
    },

    // Bind modal control events
    bindModalEvents() {
        // Close button
        this.closeBtn.addEventListener('click', () => this.closeModal());

        // Backdrop click
        this.backdrop.addEventListener('click', () => this.closeModal());

        // Previous/Next buttons
        this.prevBtn.addEventListener('click', () => this.showPrevious());
        this.nextBtn.addEventListener('click', () => this.showNext());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;

            switch(e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        });

        // Touch swipe support (mobile)
        let touchStartX = 0;
        let touchEndX = 0;

        this.modal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.modal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });

        this.handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                this.showNext(); // Swipe left
            }
            if (touchEndX > touchStartX + 50) {
                this.showPrevious(); // Swipe right
            }
        };
    },

    openModal(index) {
        this.currentIndex = index;
        this.showImage(index);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        AppState.currentModal = 'gallery';

        // Focus management for accessibility
        this.closeBtn.focus();

        // Trap focus within modal
        this.trapFocus();

        console.log(`Opened gallery modal at index ${index}`);
    },

    // Trap focus within the modal for accessibility
    trapFocus() {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        this.modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    },

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        AppState.currentModal = null;

        console.log('Closed gallery modal');
    },

    showImage(index) {
        if (index < 0 || index >= this.images.length) return;

        const imageData = this.images[index];
        this.modalImage.src = imageData.src;
        this.modalImage.alt = imageData.alt;
        this.modalCaption.textContent = imageData.alt;
        this.modalCounter.textContent = `${index + 1} / ${this.images.length}`;
        this.currentIndex = index;
    },

    showPrevious() {
        const newIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.showImage(newIndex);
    },

    showNext() {
        const newIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
        this.showImage(newIndex);
    }
};

// ============================================
// BOOKING MODALS
// ============================================
const BookingModals = {
    init() {
        this.createInPersonModal();
        this.createShippedModal();
        this.createSuccessModal();
        this.bindBookingButtons();

        console.log('Booking modals initialized');
    },

    // Create in-person appointment modal
    createInPersonModal() {
        const modalHTML = `
            <div class="booking-modal" id="inPersonModal" role="dialog" aria-modal="true" aria-labelledby="inPersonTitle">
                <div class="modal-backdrop"></div>
                <div class="modal-content-wrapper">
                    <div class="modal-content">
                        <button class="modal-close" aria-label="Close modal">&times;</button>
                        <h2 id="inPersonTitle" class="modal-title">Book In-Person Appointment</h2>

                        <div class="booking-summary" id="inPersonSummary"></div>

                        <form id="inPersonForm" class="booking-form">
                            <div class="form-group">
                                <label for="inPersonName">Full Name *</label>
                                <input type="text" id="inPersonName" name="name" required>
                            </div>

                            <div class="form-group">
                                <label for="inPersonEmail">Email Address *</label>
                                <input type="email" id="inPersonEmail" name="email" required>
                            </div>

                            <div class="form-group">
                                <label for="inPersonPhone">Phone Number *</label>
                                <input type="tel" id="inPersonPhone" name="phone" required
                                       placeholder="(555) 000-0000">
                            </div>

                            <div class="form-group">
                                <label for="appointmentDate">Preferred Date *</label>
                                <input type="date" id="appointmentDate" name="date" required>
                            </div>

                            <div class="form-group">
                                <label for="appointmentTime">Preferred Time *</label>
                                <select id="appointmentTime" name="time" required>
                                    <option value="">Select a time</option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="inPersonNotes">Additional Notes (Optional)</label>
                                <textarea id="inPersonNotes" name="notes" rows="4"
                                          placeholder="Any special requests, design ideas, or questions..."></textarea>
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-large">
                                    Confirm Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.injectBookingModalStyles();
        this.bindInPersonForm();
    },

    // Create shipped sets order modal
    createShippedModal() {
        const modalHTML = `
            <div class="booking-modal" id="shippedModal" role="dialog" aria-modal="true" aria-labelledby="shippedTitle">
                <div class="modal-backdrop"></div>
                <div class="modal-content-wrapper">
                    <div class="modal-content">
                        <button class="modal-close" aria-label="Close modal">&times;</button>
                        <h2 id="shippedTitle" class="modal-title">Order Shipped Nail Sets</h2>

                        <div class="booking-summary" id="shippedSummary"></div>

                        <form id="shippedForm" class="booking-form">
                            <div class="form-group">
                                <label for="shippedName">Full Name *</label>
                                <input type="text" id="shippedName" name="name" required>
                            </div>

                            <div class="form-group">
                                <label for="shippedEmail">Email Address *</label>
                                <input type="email" id="shippedEmail" name="email" required>
                            </div>

                            <div class="form-group">
                                <label for="shippedPhone">Phone Number *</label>
                                <input type="tel" id="shippedPhone" name="phone" required
                                       placeholder="(555) 000-0000">
                            </div>

                            <div class="form-group">
                                <label for="shippingAddress">Street Address *</label>
                                <input type="text" id="shippingAddress" name="address" required>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="shippingCity">City *</label>
                                    <input type="text" id="shippingCity" name="city" required>
                                </div>

                                <div class="form-group">
                                    <label for="shippingState">State *</label>
                                    <input type="text" id="shippingState" name="state" required>
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label for="shippingZip">ZIP Code *</label>
                                    <input type="text" id="shippingZip" name="zip" required>
                                </div>

                                <div class="form-group">
                                    <label for="shippingCountry">Country *</label>
                                    <input type="text" id="shippingCountry" name="country" value="USA" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="nailSizes">Nail Sizes (Optional)</label>
                                <textarea id="nailSizes" name="sizes" rows="3"
                                          placeholder="Please measure your nails and provide sizes for each finger (Thumb, Index, Middle, Ring, Pinky)"></textarea>
                                <small>We'll contact you for sizing if not provided</small>
                            </div>

                            <div class="form-group">
                                <label for="shippedNotes">Additional Notes (Optional)</label>
                                <textarea id="shippedNotes" name="notes" rows="4"
                                          placeholder="Design preferences, rush order, gift message, etc..."></textarea>
                            </div>

                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-large">
                                    Place Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.bindShippedForm();
    },

    // Create success modal
    createSuccessModal() {
        const modalHTML = `
            <div class="booking-modal success-modal" id="successModal" role="dialog" aria-modal="true">
                <div class="modal-backdrop"></div>
                <div class="modal-content-wrapper">
                    <div class="modal-content success-content">
                        <button class="modal-close" aria-label="Close modal">&times;</button>
                        <div class="success-icon">✓</div>
                        <h2 class="modal-title">Success!</h2>
                        <p class="success-message" id="successMessage"></p>
                        <div class="success-details" id="successDetails"></div>
                        <button class="btn btn-primary btn-large" onclick="BookingModals.closeAllModals()">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    // Inject booking modal styles
    injectBookingModalStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .booking-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                overflow-y: auto;
                animation: fadeIn 0.3s ease-in-out;
            }

            .booking-modal.active {
                display: block;
            }

            .booking-modal .modal-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(8px);
            }

            .booking-modal .modal-content-wrapper {
                position: relative;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .booking-modal .modal-content {
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                width: 100%;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease-in-out;
            }

            .booking-modal .modal-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: transparent;
                border: none;
                font-size: 32px;
                color: #666;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.25s ease;
            }

            .booking-modal .modal-close:hover {
                background: #f0f0f0;
                color: #ff00af;
            }

            .modal-title {
                font-size: 28px;
                color: #2C2E32;
                margin-bottom: 24px;
                text-align: center;
            }

            .booking-summary {
                background: #ffe6f0;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 24px;
            }

            .booking-summary h3 {
                font-size: 16px;
                color: #2C2E32;
                margin-bottom: 12px;
            }

            .booking-summary p {
                margin: 8px 0;
                color: #5a5c60;
            }

            .booking-form {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .form-group label {
                font-weight: 600;
                color: #2C2E32;
                font-size: 14px;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                padding: 12px 16px;
                border: 2px solid #e8e8e8;
                border-radius: 8px;
                font-size: 16px;
                font-family: inherit;
                transition: border-color 0.25s ease;
            }

            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #ff00af;
            }

            .form-group small {
                color: #8a8c90;
                font-size: 12px;
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
            }

            .form-actions {
                margin-top: 16px;
                text-align: center;
            }

            .success-content {
                text-align: center;
            }

            .success-icon {
                width: 80px;
                height: 80px;
                background: #ff00af;
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 48px;
                margin: 0 auto 24px;
                animation: scaleIn 0.5s ease-in-out;
            }

            .success-message {
                font-size: 18px;
                color: #5a5c60;
                margin-bottom: 24px;
            }

            .success-details {
                background: #ffe6f0;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 24px;
                text-align: left;
            }

            .success-details p {
                margin: 8px 0;
                color: #5a5c60;
            }

            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes scaleIn {
                from {
                    transform: scale(0);
                }
                to {
                    transform: scale(1);
                }
            }

            @media (max-width: 768px) {
                .booking-modal .modal-content {
                    padding: 24px;
                }

                .form-row {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    },

    // Bind booking button clicks
    bindBookingButtons() {
        const bookingButtons = document.querySelectorAll('[data-booking-type]');

        bookingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const type = button.getAttribute('data-booking-type');

                // Save booking type to state
                AppState.bookingType = type;
                AppState.saveToStorage();

                if (type === 'in-person') {
                    this.openInPersonModal();
                } else if (type === 'shipped') {
                    this.openShippedModal();
                }
            });
        });
    },

    // Open in-person modal
    openInPersonModal() {
        const modal = document.getElementById('inPersonModal');
        const summary = document.getElementById('inPersonSummary');

        // Populate summary
        summary.innerHTML = this.getBookingSummary();

        // Populate time slots
        this.populateTimeSlots();

        // Set minimum date (today + min advance notice)
        const dateInput = document.getElementById('appointmentDate');
        const minDate = new Date();
        minDate.setHours(minDate.getHours() + CONFIG.minAdvanceNoticeHours);
        dateInput.min = minDate.toISOString().split('T')[0];

        // Set maximum date
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + CONFIG.maxAdvanceBookingDays);
        dateInput.max = maxDate.toISOString().split('T')[0];

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Bind close events
        this.bindModalClose(modal);

        console.log('Opened in-person booking modal');
    },

    // Open shipped sets modal
    openShippedModal() {
        const modal = document.getElementById('shippedModal');
        const summary = document.getElementById('shippedSummary');

        // Populate summary
        summary.innerHTML = this.getBookingSummary();

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Bind close events
        this.bindModalClose(modal);

        console.log('Opened shipped sets modal');
    },

    // Generate booking summary HTML
    getBookingSummary() {
        const data = AppState.getBookingData();

        let html = '<h3>Your Selections:</h3>';

        if (data.nailLength) {
            html += `<p><strong>Nail Length:</strong> ${data.nailLength.charAt(0).toUpperCase() + data.nailLength.slice(1)}</p>`;
        } else {
            html += `<p><strong>Nail Length:</strong> Not selected yet</p>`;
        }

        if (data.tier) {
            html += `<p><strong>Design Tier:</strong> Tier ${data.tier}</p>`;
        } else {
            html += `<p><strong>Design Tier:</strong> Not selected yet</p>`;
        }

        if (data.designType) {
            html += `<p><strong>Design Type:</strong> ${data.designType === 'premade' ? 'Pre-Made Design' : 'Custom Design'}</p>`;
        }

        if (!data.nailLength || !data.tier) {
            html += `<p style="color: #ff00af; margin-top: 12px;">
                <small>Tip: Select a nail length and tier before booking for the best experience!</small>
            </p>`;
        }

        return html;
    },

    // Populate time slots based on business hours
    populateTimeSlots() {
        const timeSelect = document.getElementById('appointmentTime');
        const dateInput = document.getElementById('appointmentDate');

        const updateTimeSlots = () => {
            const selectedDate = new Date(dateInput.value + 'T00:00:00');
            const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

            // Clear existing options
            timeSelect.innerHTML = '<option value="">Select a time</option>';

            // Get business hours for selected day
            const hours = CONFIG.businessHours[dayName];

            if (hours.closed) {
                timeSelect.innerHTML = '<option value="">Closed on this day</option>';
                timeSelect.disabled = true;
                return;
            }

            timeSelect.disabled = false;

            // Generate time slots
            const [startHour, startMin] = hours.start.split(':').map(Number);
            const [endHour, endMin] = hours.end.split(':').map(Number);

            let currentTime = startHour * 60 + startMin;
            const endTime = endHour * 60 + endMin;

            while (currentTime < endTime) {
                const hour = Math.floor(currentTime / 60);
                const min = currentTime % 60;

                const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                const ampm = hour < 12 ? 'AM' : 'PM';
                const timeString = `${hour12}:${min.toString().padStart(2, '0')} ${ampm}`;
                const timeValue = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;

                const option = document.createElement('option');
                option.value = timeValue;
                option.textContent = timeString;
                timeSelect.appendChild(option);

                currentTime += CONFIG.timeSlotInterval;
            }
        };

        dateInput.addEventListener('change', updateTimeSlots);
    },

    // Bind form submission for in-person
    bindInPersonForm() {
        const form = document.getElementById('inPersonForm');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.validateForm(form)) {
                return;
            }

            const formData = new FormData(form);
            const bookingData = {
                ...AppState.getBookingData(),
                customerInfo: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    appointmentDate: formData.get('date'),
                    appointmentTime: formData.get('time'),
                    notes: formData.get('notes')
                }
            };

            this.submitBooking(bookingData, 'in-person');
        });
    },

    // Bind form submission for shipped
    bindShippedForm() {
        const form = document.getElementById('shippedForm');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!this.validateForm(form)) {
                return;
            }

            const formData = new FormData(form);
            const bookingData = {
                ...AppState.getBookingData(),
                customerInfo: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    shippingAddress: {
                        street: formData.get('address'),
                        city: formData.get('city'),
                        state: formData.get('state'),
                        zip: formData.get('zip'),
                        country: formData.get('country')
                    },
                    nailSizes: formData.get('sizes'),
                    notes: formData.get('notes')
                }
            };

            this.submitBooking(bookingData, 'shipped');
        });
    },

    // Validate form
    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            // Remove any existing error message for this field
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }

            if (!field.value.trim()) {
                field.style.borderColor = '#ff0000';
                isValid = false;

                // Add error message
                const error = document.createElement('small');
                error.className = 'error-message';
                error.style.color = '#ff0000';
                error.style.display = 'block';
                error.style.marginTop = '4px';
                error.textContent = 'This field is required';
                field.parentNode.appendChild(error);
            } else {
                field.style.borderColor = '#e8e8e8';
            }
        });

        // Email validation
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                emailField.style.borderColor = '#ff0000';
                isValid = false;

                // Add email-specific error message
                const existingError = emailField.parentNode.querySelector('.error-message');
                if (!existingError) {
                    const error = document.createElement('small');
                    error.className = 'error-message';
                    error.style.color = '#ff0000';
                    error.style.display = 'block';
                    error.style.marginTop = '4px';
                    error.textContent = 'Please enter a valid email address';
                    emailField.parentNode.appendChild(error);
                }
            }
        }

        if (!isValid) {
            // Focus on first invalid field
            const firstInvalid = form.querySelector('[style*="border-color: rgb(255, 0, 0)"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }

        return isValid;
    },

    // Submit booking (placeholder for API integration)
    async submitBooking(bookingData, type) {
        console.log('=== BOOKING SUBMISSION ===');
        console.log('Type:', type);
        console.log('Data:', bookingData);
        console.log('=========================');

        // Show loading state
        const submitBtn = document.querySelector(`#${type === 'in-person' ? 'inPersonForm' : 'shippedForm'} button[type="submit"]`);
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // TODO: Replace with actual API call when backend is ready
        /*
        try {
            const response = await fetch(CONFIG.api[type === 'in-person' ? 'bookAppointment' : 'orderShippedSet'], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            if (!response.ok) {
                throw new Error('Booking failed');
            }

            const result = await response.json();
            this.showSuccess(result, type);
        } catch (error) {
            console.error('Booking error:', error);
            alert('Sorry, there was an error processing your booking. Please try again or contact us directly.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
        */

        // For now, show success
        this.showSuccess(bookingData, type);

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    },

    // Show success modal
    showSuccess(bookingData, type) {
        const modal = document.getElementById('successModal');
        const message = document.getElementById('successMessage');
        const details = document.getElementById('successDetails');

        if (type === 'in-person') {
            message.textContent = 'Your appointment request has been received! We\'ll contact you shortly to confirm your booking.';

            details.innerHTML = `
                <h3>Appointment Details:</h3>
                <p><strong>Name:</strong> ${bookingData.customerInfo.name}</p>
                <p><strong>Date:</strong> ${bookingData.customerInfo.appointmentDate}</p>
                <p><strong>Time:</strong> ${bookingData.customerInfo.appointmentTime}</p>
                <p><strong>Email:</strong> ${bookingData.customerInfo.email}</p>
                <p style="margin-top: 16px; font-style: italic;">
                    We'll send a confirmation email to ${bookingData.customerInfo.email} within 24 hours.
                </p>
            `;
        } else {
            message.textContent = 'Your order has been received! We\'ll start creating your custom nail sets and contact you for sizing confirmation.';

            details.innerHTML = `
                <h3>Order Details:</h3>
                <p><strong>Name:</strong> ${bookingData.customerInfo.name}</p>
                <p><strong>Email:</strong> ${bookingData.customerInfo.email}</p>
                <p><strong>Shipping to:</strong> ${bookingData.customerInfo.shippingAddress.city}, ${bookingData.customerInfo.shippingAddress.state}</p>
                <p style="margin-top: 16px; font-style: italic;">
                    Your order will ship within 5-7 business days. You'll receive tracking information at ${bookingData.customerInfo.email}.
                </p>
            `;
        }

        // Close current modal
        this.closeAllModals();

        // Show success modal
        modal.classList.add('active');
        this.bindModalClose(modal);

        // Clear selections after successful booking
        // AppState.clearSelections(); // Uncomment if you want to clear after booking
    },

    // Bind modal close events
    bindModalClose(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const backdrop = modal.querySelector('.modal-backdrop');

        const closeHandler = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.onclick = closeHandler;
        backdrop.onclick = closeHandler;

        // ESC key
        const escHandler = (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeHandler();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    },

    // Close all modals
    closeAllModals() {
        document.querySelectorAll('.booking-modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
};

// ============================================
// SCROLL ANIMATIONS (Fade in on scroll)
// ============================================
const ScrollAnimations = {
    observers: [],

    init() {
        this.createAnimationStyles();
        this.observeElements();

        console.log('Scroll animations initialized');
    },

    // Create CSS for animations
    createAnimationStyles() {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .fade-in-section {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            }

            .fade-in-section.is-visible {
                opacity: 1;
                transform: translateY(0);
            }

            /* Stagger animation for grid items */
            .service-card,
            .tier-card,
            .gallery-item,
            .booking-option-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.4s ease-out, transform 0.4s ease-out;
            }

            .service-card.is-visible,
            .tier-card.is-visible,
            .gallery-item.is-visible,
            .booking-option-card.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(styleSheet);
    },

    // Observe elements for scroll animations
    observeElements() {
        // Add fade-in class to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => section.classList.add('fade-in-section'));

        // Create intersection observer
        const observerOptions = {
            threshold: CONFIG.animations.fadeInThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        // Observe sections
        sections.forEach(section => observer.observe(section));

        // Observe cards with stagger effect
        const cards = document.querySelectorAll('.service-card, .tier-card, .gallery-item, .booking-option-card');

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100); // Stagger by 100ms
                }
            });
        }, observerOptions);

        cards.forEach(card => cardObserver.observe(card));

        this.observers.push(observer, cardObserver);
    }
};

// ============================================
// SCROLL INDICATOR ANIMATION (Hero section)
// ============================================
const ScrollIndicator = {
    init() {
        const indicator = document.querySelector('.scroll-indicator');

        if (!indicator) return;

        // Hide indicator when user scrolls
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            } else {
                indicator.style.opacity = '1';
                indicator.style.pointerEvents = 'auto';
            }
        });

        console.log('Scroll indicator initialized');
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
    MobileNav.init();
    SmoothScroll.init();
    StickyNav.init();
    SelectionTracker.init();
    GalleryModal.init();
    BookingModals.init();
    ScrollAnimations.init();
    ScrollIndicator.init();

    console.log('=== ALL SYSTEMS READY ===');
    console.log('Developer Tips:');
    console.log('1. Check browser console for detailed logs');
    console.log('2. User selections are saved in sessionStorage');
    console.log('3. Update CONFIG object at top of file for customization');
    console.log('4. Replace API endpoints when backend is ready');
    console.log('5. All booking data is logged to console for testing');
});

// ============================================
// HELPER FUNCTIONS FOR FUTURE API INTEGRATION
// ============================================

/**
 * Check availability for a specific date/time
 * TODO: Connect to real availability API
 *
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @returns {Promise<boolean>} - Whether the slot is available
 */
async function checkAvailability(date, time) {
    console.log(`Checking availability for ${date} at ${time}`);

    // TODO: Replace with actual API call
    /*
    try {
        const response = await fetch(`${CONFIG.api.checkAvailability}?date=${date}&time=${time}`);
        const data = await response.json();
        return data.available;
    } catch (error) {
        console.error('Error checking availability:', error);
        return false;
    }
    */

    // For now, return true (all slots available)
    return true;
}

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @returns {string} - Formatted phone number
 */
function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
}

/**
 * Validate email address
 * @param {string} email - Email address
 * @returns {boolean} - Whether email is valid
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============================================
// EXPORT FOR TESTING (if using modules)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AppState,
        MobileNav,
        SmoothScroll,
        SelectionTracker,
        GalleryModal,
        BookingModals,
        checkAvailability,
        formatPhoneNumber,
        isValidEmail
    };
}
