// Contact Page JavaScript - Modern & Enhanced

$(document).ready(function() {
    // Initialize the page
    initializeContactPage();
    
    // Form handling
    handleContactForm();
    
    // Navigation and menu functionality
    initializeNavigation();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Mobile-specific optimizations
    initializeMobileOptimizations();
});

// Initialize contact page
function initializeContactPage() {
    // Add loading animation to page elements
    $('.contact-container').addClass('loading');
    
    // Remove loading class after page loads
    setTimeout(() => {
        $('.contact-container').removeClass('loading');
        animatePageElements();
    }, 500);
}

// Animate page elements on load
function animatePageElements() {
    // Stagger animation for contact info items
    $('.find-location').each(function(index) {
        $(this).css({
            'animation-delay': `${0.2 + (index * 0.1)}s`,
            'animation-fill-mode': 'both'
        });
    });
    
    // Animate form elements
    $('.form-group').each(function(index) {
        $(this).css({
            'animation-delay': `${0.3 + (index * 0.1)}s`,
            'animation-fill-mode': 'both'
        });
    });
}

// Handle contact form
function handleContactForm() {
    const $form = $('#contactForm');
    const $submitBtn = $('#submitBtn');
    const $btnText = $submitBtn.find('.btn-text');
    const $btnLoading = $submitBtn.find('.btn-loading');
    
    // Real-time validation
    $form.find('input, textarea').on('blur', function() {
        validateField($(this));
    });
    
    // Mobile-friendly input handling
    $form.find('input, textarea').on('input', function() {
        // Clear error on input
        const $field = $(this);
        if ($field.hasClass('error')) {
            clearFieldError($field);
        }
    });
    
    // Form submission
    $form.on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Submit form function
    function submitForm() {
        // Show loading state
        $btnText.hide();
        $btnLoading.show();
        $submitBtn.prop('disabled', true).addClass('loading');
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success simulation
            showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            
            // Reset form
            $form[0].reset();
            clearAllErrors();
            
            // Reset button state
            $btnText.show();
            $btnLoading.hide();
            $submitBtn.prop('disabled', false).removeClass('loading');
            
            // Add success animation
            $submitBtn.addClass('success-animation');
            setTimeout(() => {
                $submitBtn.removeClass('success-animation');
            }, 600);
            
        }, 2000);
    }
}

// Form validation
function validateForm() {
    let isValid = true;
    const fields = ['name', 'email', 'subject', 'message'];
    
    fields.forEach(field => {
        const $field = $(`#${field}`);
        if (!validateField($field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField($field) {
    const value = $field.val().trim();
    const fieldName = $field.attr('name');
    const $errorElement = $(`#${fieldName}-error`);
    
    // Clear previous error
    clearFieldError($field);
    
    // Validation rules
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'Name is required';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            }
            break;
            
        case 'email':
            if (!value) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'subject':
            if (!value) {
                errorMessage = 'Subject is required';
                isValid = false;
            } else if (value.length < 5) {
                errorMessage = 'Subject must be at least 5 characters long';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError($field, errorMessage);
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError($field, message) {
    const fieldName = $field.attr('name');
    const $errorElement = $(`#${fieldName}-error`);
    
    $field.addClass('error');
    $errorElement.text(message).show();
    
    // Shake animation for error
    $field.addClass('shake');
    setTimeout(() => {
        $field.removeClass('shake');
    }, 500);
    
    // Scroll to error on mobile
    if (window.innerWidth <= 768) {
        $field[0].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Clear field error
function clearFieldError($field) {
    const fieldName = $field.attr('name');
    const $errorElement = $(`#${fieldName}-error`);
    
    $field.removeClass('error');
    $errorElement.text('').hide();
}

// Clear all errors
function clearAllErrors() {
    $('.form-group input, .form-group textarea').removeClass('error');
    $('.error-message').text('').hide();
}

// Show message (success/error)
function showMessage(message, type = 'info') {
    const $container = $('#messageContainer');
    const $content = $container.find('.message-content');
    const $text = $container.find('.message-text');
    const $icon = $container.find('.message-icon');
    
    // Set message content
    $text.text(message);
    
    // Set icon and styling based on type
    $container.removeClass('success error info').addClass(type);
    
    switch (type) {
        case 'success':
            $icon.html('<i class="bi bi-check-circle-fill"></i>');
            break;
        case 'error':
            $icon.html('<i class="bi bi-exclamation-circle-fill"></i>');
            break;
        default:
            $icon.html('<i class="bi bi-info-circle-fill"></i>');
    }
    
    // Show message with animation
    $container.fadeIn(300);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideMessage();
    }, 5000);
}

// Hide message
function hideMessage() {
    $('#messageContainer').fadeOut(300);
}

// Initialize navigation
function initializeNavigation() {
    // Menu navigation
    $(".nav-links .menus").click(function() {
        window.location.href = "/menu";
    });
    
    // Cart navigation
    $(".nav-links .btnpress1").click(function(e) {
        e.stopPropagation();
        $('.cart').show();
        $(".nav-links .overlay").css("display", "block");
        $('body').css('overflow', 'hidden');
    });
    
    // Close cart on outside click
    $(document).click(function(event) {
        if (!$(event.target).closest('.cart').length) {
            $('.cart').hide();
            $(".nav-links .overlay").css("display", "none");
            $('body').css('overflow', 'auto');
        }
    });
    
    // Hamburger menu toggle
    window.toggleMenu = function() {
        const menu = document.querySelector(".hamburger-nav .menu-links");
        const icon = document.querySelector(".hamburger-icon");
        
        menu.classList.toggle("open");
        icon.classList.toggle("open");
        
        // Adjust padding for different sections
        adjustPadding("#proteinbowl", 80, 20);
        adjustPadding(".specificnav", 90, 20);
    };
    
    // Login pathway
    $(".nav-links .btnpress").click(function() {
        $(".loginway").toggleClass("hidden1");
        adjustPadding("#proteinbowl", 80, 20);
        adjustPadding(".specificnav", 90, 20);
    });
    
    // Login popup handling
    $(".loginway .lgn1").click(function() {
        $(".nav-links .loginpopup").addClass("hiddenpopup");
        $(".overlaylog").css("display", "inline");
        $(".loginway").removeClass("hidden1");
    });
    
    $(".loginpopup .cnllogin, .bottompop .otpbtn").click(function() {
        $(".nav-links .loginpopup").removeClass("hiddenpopup");
        $(".overlaylog").css("display", "none");
        $(".loginway").removeClass("hidden1");
    });
    
    // Close loginway
    $(".loginway .cnl").click(function() {
        $(".loginway").removeClass("hidden1");
        $("#proteinbowl").css("padding-top", "20px");
    });
    
    // Document click handlers
    $(document).click(function(event) {
        // Close hamburger menu
        if (!$(event.target).closest('.hamburger-nav .menu-links,.hamburger-icon').length) {
            $(".hamburger-nav .menu-links").removeClass("open");
            $(".hamburger-icon").removeClass("open");
        }
    });
}

// Helper function to adjust padding
function adjustPadding(selector, currentPadding, newPadding) {
    const $element = $(selector);
    const currentPaddingValue = $element.css("padding-top");
    
    if (currentPaddingValue === currentPadding + "px") {
        $element.css("padding-top", newPadding + "px");
    } else {
        $element.css("padding-top", currentPadding + "px");
    }
}

// Add scroll animations
function addScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    $('.find-location, .form-group').each(function() {
        observer.observe(this);
    });
}

// Initialize mobile optimizations
function initializeMobileOptimizations() {
    // Set viewport meta tag for mobile
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        document.head.appendChild(viewport);
    }
    
    // Prevent zoom on input focus (iOS)
    $('input, textarea').on('focus', function() {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layouts
            $(window).trigger('resize');
        }, 500);
    });
    
    // Improve touch targets for mobile
    if ('ontouchstart' in window) {
        $('.contact-link, .locbtn, .sendbtn').css('cursor', 'pointer');
        
        // Add touch feedback
        $('.contact-link, .locbtn, .sendbtn').on('touchstart', function() {
            $(this).addClass('touch-active');
        }).on('touchend touchcancel', function() {
            $(this).removeClass('touch-active');
        });
    }
}

// Enhanced hover effects
$(document).ready(function() {
    // Contact info hover effects
    $('.find-location').hover(
        function() {
            if (!('ontouchstart' in window)) {
                $(this).find('.locbtn').addClass('pulse');
            }
        },
        function() {
            $(this).find('.locbtn').removeClass('pulse');
        }
    );
    
    // Form input focus effects
    $('.contact-form input, .contact-form textarea').focus(function() {
        $(this).parent().addClass('focused');
    }).blur(function() {
        $(this).parent().removeClass('focused');
    });
    
    // Message close button
    $('.message-close').click(function() {
        hideMessage();
    });
    
    // Contact links hover effect
    $('.contact-link').hover(
        function() {
            if (!('ontouchstart' in window)) {
                $(this).addClass('link-hover');
            }
        },
        function() {
            $(this).removeClass('link-hover');
        }
    );
    
    // Mobile swipe gestures for message dismissal
    let startX = 0;
    let startY = 0;
    
    $('#messageContainer').on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
        startY = e.originalEvent.touches[0].clientY;
    });
    
    $('#messageContainer').on('touchmove', function(e) {
        if (!startX || !startY) return;
        
        const diffX = startX - e.originalEvent.touches[0].clientX;
        const diffY = startY - e.originalEvent.touches[0].clientY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            hideMessage();
            startX = 0;
            startY = 0;
        }
    });
});

// Utility functions
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

// Resize handler with mobile optimizations
$(window).on('resize', debounce(function() {
    const width = $(window).width();
    
    // Recalculate any dynamic layouts if needed
    if (width < 768) {
        $('.contact-container').addClass('mobile-layout');
        
        // Adjust form layout for mobile
        if (width < 480) {
            $('.contact-form').addClass('compact-layout');
        } else {
            $('.contact-form').removeClass('compact-layout');
        }
    } else {
        $('.contact-container').removeClass('mobile-layout');
        $('.contact-form').removeClass('compact-layout');
    }
    
    // Handle orientation changes
    if (width < 768 && window.innerHeight < window.innerWidth) {
        // Landscape mode on mobile
        $('body').addClass('landscape-mobile');
    } else {
        $('body').removeClass('landscape-mobile');
    }
}, 250));

// Keyboard navigation support
$(document).on('keydown', function(e) {
    // Close message on Escape key
    if (e.key === 'Escape') {
        hideMessage();
    }
    
    // Submit form on Ctrl+Enter
    if (e.ctrlKey && e.key === 'Enter') {
        $('#contactForm').submit();
    }
    
    // Mobile keyboard handling
    if (window.innerWidth <= 768) {
        // Handle virtual keyboard
        if (e.key === 'Enter' && $(e.target).is('input, textarea')) {
            e.preventDefault();
            $(e.target).blur();
        }
    }
});

// Add CSS classes for animations and mobile optimizations
const style = document.createElement('style');
style.textContent = `
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .pulse {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .focused {
        transform: scale(1.02);
    }
    
    .link-hover {
        color: var(--primary-color) !important;
        text-decoration: underline;
    }
    
    .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: none;
    }
    
    .message-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .message-content {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 8px;
        color: white;
    }
    
    .message-container.success .message-content {
        background: var(--gradient-primary);
    }
    
    .message-container.error .message-content {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
    }
    
    .message-container.info .message-content {
        background: linear-gradient(135deg, #3498db, #2980b9);
    }
    
    .message-icon {
        margin-right: 0.75rem;
        font-size: 1.2rem;
    }
    
    .message-text {
        flex: 1;
        font-weight: 500;
    }
    
    .message-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .message-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .mobile-layout .contact-container {
        grid-template-columns: 1fr;
    }
    
    .compact-layout .form-group {
        margin-bottom: 0.8rem;
    }
    
    .compact-layout input,
    .compact-layout textarea {
        padding: 0.7rem 0.8rem;
    }
    
    .touch-active {
        transform: scale(0.95);
        opacity: 0.8;
    }
    
    .landscape-mobile .contact-container {
        padding: 0.5rem;
        gap: 1rem;
    }
    
    .landscape-mobile .touch-container,
    .landscape-mobile .find-container {
        padding: 1rem;
    }
    
    /* Mobile-specific improvements */
    @media (max-width: 768px) {
        .message-container {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .contact-form input:focus,
        .contact-form textarea:focus {
            transform: none;
        }
        
        .sendbtn:hover {
            transform: none;
        }
        
        .locbtn:hover {
            transform: none;
        }
    }
    
    /* Prevent text selection on buttons */
    .sendbtn,
    .locbtn,
    .contact-link {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    
    /* Improve tap highlights */
    .sendbtn,
    .locbtn,
    .contact-link {
        -webkit-tap-highlight-color: rgba(57, 153, 24, 0.2);
        tap-highlight-color: rgba(57, 153, 24, 0.2);
    }
`;

document.head.appendChild(style);



