/* ===========================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   =========================================== */

// =============================================
// NAVBAR FUNCTIONALITY
// =============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Add/remove navbar shadow on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// =============================================
// SCROLL ANIMATIONS (Intersection Observer)
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill cards
            if (entry.target.classList.contains('skill-card')) {
                entry.target.classList.add('animate');
            }

            // Animate portfolio cards
            if (entry.target.classList.contains('portfolio-card')) {
                entry.target.classList.add('animate');
            }

            // Animate progress bars
            if (entry.target.classList.contains('progress')) {
                const percentage = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = percentage;
                }, 100);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
document.querySelectorAll('.portfolio-card').forEach(card => observer.observe(card));
document.querySelectorAll('.progress').forEach(progress => observer.observe(progress));

// =============================================
// CONTACT FORM VALIDATION & SUBMISSION
// =============================================

const contactForm = document.getElementById('contactForm');
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

const formErrors = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    subject: document.getElementById('subjectError'),
    message: document.getElementById('messageError')
};

const formMessage = document.getElementById('formMessage');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate individual field
function validateField(fieldName) {
    const field = formInputs[fieldName];
    const error = formErrors[fieldName];
    let isValid = true;
    let errorMessage = '';

    // Check if field is empty
    if (field.value.trim() === '') {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    // Check email format
    else if (fieldName === 'email' && !emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    // Check minimum length for message
    else if (fieldName === 'message' && field.value.trim().length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }

    // Update UI
    if (!isValid) {
        field.parentElement.classList.add('error');
        error.textContent = errorMessage;
    } else {
        field.parentElement.classList.remove('error');
        error.textContent = '';
    }

    return isValid;
}

// Real-time validation on input
Object.keys(formInputs).forEach(fieldName => {
    formInputs[fieldName].addEventListener('blur', () => validateField(fieldName));
    formInputs[fieldName].addEventListener('input', () => {
        if (formInputs[fieldName].parentElement.classList.contains('error')) {
            validateField(fieldName);
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    let allValid = true;
    Object.keys(formInputs).forEach(fieldName => {
        if (!validateField(fieldName)) {
            allValid = false;
        }
    });

    if (allValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalButtonText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate server delay
        setTimeout(() => {
            // Clear form
            contactForm.reset();
            Object.keys(formInputs).forEach(fieldName => {
                formInputs[fieldName].parentElement.classList.remove('error');
                formErrors[fieldName].textContent = '';
            });

            // Show success message
            formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
            formMessage.classList.remove('error');
            formMessage.classList.add('success');

            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.classList.remove('success');
                formMessage.textContent = '';
            }, 5000);
        }, 1500);
    }
});

// =============================================
// SMOOTH SCROLL BEHAVIOR
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            // Smooth scroll is handled by CSS, just ensure proper focus
            const target = document.querySelector(href);
            setTimeout(() => {
                target.focus({ preventScroll: true });
            }, 300);
        }
    });
});

// =============================================
// PARALLAX EFFECT (Optional Enhancement)
// =============================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;

            // Add subtle parallax to hero section
            const hero = document.querySelector('.hero');
            if (hero && scrollY < hero.offsetHeight) {
                hero.style.backgroundPosition = `0 ${scrollY * 0.5}px`;
            }

            ticking = false;
        });
        ticking = true;
    }
});

// =============================================
// COUNTER ANIMATION (Optional - for numbers)
// =============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// =============================================
// LAZY LOADING FOR IMAGES (Optional)
// =============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// =============================================
// PAGE LOAD ANIMATION
// =============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// =============================================
// DARK MODE TOGGLE (Optional Enhancement)
// =============================================

function initDarkMode() {
    // Check if user has a saved preference
    const darkMode = localStorage.getItem('darkMode') === 'enabled';
    
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode on page load
initDarkMode();

// =============================================
// KEYBOARD SHORTCUTS (Optional)
// =============================================

document.addEventListener('keydown', (e) => {
    // Press '/' to focus search (or contact form)
    if (e.key === '?' || e.key === '/') {
        const input = document.getElementById('name');
        input.focus();
    }

    // ESC to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// =============================================
// UTILITY FUNCTIONS
// =============================================

// Copy email to clipboard
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copied to clipboard!');
    });
}

// Download CV
document.querySelector('.btn-primary').addEventListener('click', (e) => {
    // Replace with actual CV link or download logic
    console.log('Download CV clicked - add your CV file link here');
});

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================

// Debounce function for scroll events
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

// Throttle function for frequent events
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

// =============================================
// ERROR HANDLING
// =============================================

window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
    // You can send error logs to a service here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// =============================================
// INITIALIZATION COMPLETE
// =============================================

console.log('Portfolio website loaded successfully!');
