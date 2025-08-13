$(".nav-links .menus").click(function () {
    window.location.href = "/menu";
});

//cart page


function cartnav() {
    window.location.href = "/cartpage";
}



// hamburger-menu > icon and menus open and close
function toggleMenu() {
    const menu = document.querySelector(".hamburger-nav .menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    var currentPadding = $("#proteinbowl").css("padding-top");
    if (currentPadding === "80px") {
        $("#proteinbowl").css("padding-top", "20px");
    } else {
        $("#proteinbowl").css("padding-top", "80px");
    }
    var currentPadding1= $(".specificnav").css("padding-top");
    if (currentPadding1 === "90px" ){ 
        $(".specificnav").css("padding-top", "20px");
    } else {
        $(".specificnav").css("padding-top", "90px");
    }

    //hamburger-menu > icon and menus open and clos (other elements)

    $(document).click(function (event) {
        if (!$(event.target).closest('.hamburger-nav .menu-links,.hamburger-icon').length) {
            $(".hamburger-nav .menu-links").removeClass("open");
            $(".hamburger-icon").removeClass("open");

        }
    });
}

//loginpathway
$(".nav-links .btnpress").click(function () {
    $(".loginway").toggleClass("hidden1");
    var currentPadding = $("#proteinbowl").css("padding-top");
   var currentPadding1= $(".specificnav").css("padding-top");
    if (currentPadding === "80px" ){ 
        $("#proteinbowl").css("padding-top", "20px");
    } else {
        $("#proteinbowl").css("padding-top", "80px");
    }
    if (currentPadding1 === "90px" ){ 
        $(".specificnav").css("padding-top", "20px");
    } else {
        $(".specificnav").css("padding-top", "90px");
    }
});

$(".loginway .cnl").click(function () {
    $(".loginway").removeClass("hidden1");
    $("#proteinbowl").css("padding-top", "20px");
});

$(".loginway .lgn1").click(function () {
    $(".nav-links .loginpopup").addClass("hiddenpopup ")
    $(".overlaylog").css("display", "inline")
    $(".loginway").removeClass("hidden1");
});
$(".loginpopup .cnllogin").click(function () {
    $(".nav-links .loginpopup").removeClass("hiddenpopup");
    $(".overlaylog").css("display", "none");
    $(".loginway").removeClass("hidden1");
});
$(".bottompop .otpbtn").click(function () {
    $(".nav-links .loginpopup").removeClass("hiddenpopup");
    $(".overlaylog").css("display", "none");
    $(".loginway").removeClass("hidden1");
}
)




// cart pathway
$(document).ready(function () {
    $(".nav-links .btnpress1").click(function (e) {
        e.stopPropagation(); // Prevent click event from bubbling up to the document
        $('.cart').show();
        $(".nav-links .overlay").css("display", "block");
        $('body').css('overflow', 'hidden');
    });
    $(document).click(function (event) {
        if (!$(event.target).closest('.cart').length) {
            $('.cart').hide();
            $(".nav-links .overlay").css("display", "none");
            $('body').css('overflow', 'auto');

        }
    });

    $(".cbtnc").click(function (){
        window.location.href ="C:/Users/MS NAMBIRAJA/Documents/Projects/GreenBowl/public/menupage.html";
    })
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all content sections
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Animated counter for statistics (if any)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Hover effects for value cards
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
    });
});

// Founder image hover effect
const founderImage = document.querySelector('.founder-image img');
if (founderImage) {
    founderImage.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
        this.style.boxShadow = '0 30px 80px rgba(0,0,0,0.25)';
    });
    
    founderImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
    });
}

// Breadcrumb hover effects
document.querySelectorAll('.breadcrumb a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.background = 'rgba(39, 174, 96, 0.15)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.background = 'transparent';
    });
});

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Remove image loading animations - images will display normally

// Typing effect for hero title (optional)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect if hero title exists
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 500);
}

// Add floating animation to value icons
document.querySelectorAll('.value-icon').forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
});

// CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .value-icon {
        animation: float 3s ease-in-out infinite;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .slide-in-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: all 0.6s ease-out;
    }
    
    .slide-in-left.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .slide-in-right {
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.6s ease-out;
    }
    
    .slide-in-right.visible {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(style);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in class to sections
    document.querySelectorAll('.content-section').forEach((section, index) => {
        section.classList.add('fade-in');
        section.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add slide-in classes to founder content
    const founderImage = document.querySelector('.founder-image');
    const founderText = document.querySelector('.founder-text');
    
    if (founderImage) founderImage.classList.add('slide-in-left');
    if (founderText) founderText.classList.add('slide-in-right');
    
    // Trigger animations when elements come into view
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        animationObserver.observe(el);
    });
});

// Add ripple effect to buttons and interactive elements
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to value cards
document.querySelectorAll('.value-card').forEach(card => {
    card.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .value-card {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(39, 174, 96, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #27ae60, #2ecc71);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)';
});

// Performance optimization: Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(revealOnScroll, 16));




