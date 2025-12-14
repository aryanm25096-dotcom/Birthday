
/* ========================================
   🌸 Birthday Scrapbook - JavaScript
   ======================================== */

// ========================================
// DOM Ready Handler
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initFloatingElements();
    initNavigation();
    initEnvelopes();
    initFadeAnimations();
    initTypewriterEffects();
    initFinaleConfetti();
});

// ========================================
// Floating Hearts, Sparkles & Petals
// ========================================
function initFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    const elements = ['❤️', '💕', '✨', '💖', '🌸', '💗', '⭐'];

    function createFloatingElement() {
        const element = document.createElement('span');
        const type = elements[Math.floor(Math.random() * elements.length)];

        element.textContent = type;
        element.className = 'heart';
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = (8 + Math.random() * 6) + 's';
        element.style.fontSize = (16 + Math.random() * 16) + 'px';
        element.style.opacity = 0.4 + Math.random() * 0.4;

        container.appendChild(element);

        // Remove after animation completes
        setTimeout(() => {
            element.remove();
        }, 14000);
    }

    // Create initial batch
    for (let i = 0; i < 15; i++) {
        setTimeout(createFloatingElement, i * 300);
    }

    // Continue creating elements
    setInterval(createFloatingElement, 800);
}

// ========================================
// Navigation Dots
// ========================================
function initNavigation() {
    const dots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');

    // Update active dot on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                dots.forEach(dot => {
                    dot.classList.toggle('active', dot.dataset.section === id);
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));

    // Click to navigate
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const section = document.getElementById(dot.dataset.section);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ========================================
// Envelope Interactions
// ========================================
function initEnvelopes() {
    const envelopes = document.querySelectorAll('.envelope');
    const overlay = document.querySelector('.letter-overlay');
    const letterText = document.querySelector('.letter-text');
    const closeBtn = document.querySelector('.letter-close');

    const letters = {
        1: `Dear Birthday Girl,

From the moment I met you, I knew there was something special about you. Your smile lights up every room, and your laughter is the most beautiful melody.

On this special day, I want you to know how much you mean to everyone around you. You make this world a better place just by being in it.

With all my love 💕`,

        2: `Hey Superstar! 🌟

Remember all those late-night talks? The silly jokes? The moments that made us laugh until we cried?

Every memory with you is a treasure I hold close to my heart. Here's to making a million more!

You're not just a year older, you're a year more wonderful!

Love you always! ❤️`,

        3: `To the most amazing person,

They say some people come into our lives and leave footprints on our hearts. You haven't just left footprints—you've built a whole garden there.

Thank you for being YOU. Never change.

Wishing you endless happiness! 🌸`,

        4: `My Dearest Friend,

As you step into this new chapter, remember that you are:
• Brave beyond measure
• Kind beyond words  
• Loved beyond reason

The world is lucky to have you, and I'm luckier still to know you.

Happy Birthday, beautiful! 🎂✨`
    };

    envelopes.forEach(envelope => {
        envelope.addEventListener('click', () => {
            const letterNum = envelope.dataset.letter;
            const letterContent = letters[letterNum];

            envelope.classList.add('open');

            setTimeout(() => {
                letterText.textContent = '';
                overlay.classList.add('active');
                typewriterEffect(letterText, letterContent);
            }, 600);
        });
    });

    // Close overlay
    function closeLetter() {
        overlay.classList.remove('active');
        document.querySelectorAll('.envelope.open').forEach(env => {
            env.classList.remove('open');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLetter);
    }

    overlay?.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeLetter();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLetter();
        }
    });
}

// ========================================
// Typewriter Effect
// ========================================
function typewriterEffect(element, text, speed = 30) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

function initTypewriterEffects() {
    const specialMessage = document.querySelector('.message-body');

    if (specialMessage) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !specialMessage.dataset.typed) {
                    specialMessage.dataset.typed = 'true';
                    const originalText = specialMessage.textContent;
                    typewriterEffect(specialMessage, originalText, 40);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(specialMessage);
    }
}

// ========================================
// Fade In Animations on Scroll
// ========================================
function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
}

// ========================================
// Confetti Animation
// ========================================
function initFinaleConfetti() {
    const finaleSection = document.getElementById('finale');
    const confettiContainer = document.querySelector('.confetti-container');

    if (!finaleSection || !confettiContainer) return;

    let confettiTriggered = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !confettiTriggered) {
                confettiTriggered = true;
                createConfetti();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(finaleSection);
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#F6C1CC', '#C94A4A', '#FFD700', '#FF69B4', '#87CEEB', '#98D8C8', '#F7DC6F'];
    const shapes = ['square', 'circle'];

    for (let i = 0; i < 150; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];

            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = shape === 'circle' ? '50%' : '0';
            confetti.style.width = (8 + Math.random() * 8) + 'px';
            confetti.style.height = (8 + Math.random() * 8) + 'px';
            confetti.style.animationDuration = (3 + Math.random() * 3) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';

            confettiContainer.appendChild(confetti);

            // Remove after animation
            setTimeout(() => confetti.remove(), 6000);
        }, i * 30);
    }
}

// ========================================
// Smooth Scroll for Internal Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========================================
// Add Sparkles to Cake Section
// ========================================
function addCakeSparkles() {
    const sparkleContainer = document.querySelector('.cake-sparkles');
    if (!sparkleContainer) return;

    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('span');
        sparkle.className = 'cake-sparkle';
        sparkle.textContent = '✨';
        sparkleContainer.appendChild(sparkle);
    }
}

// Initialize cake sparkles
document.addEventListener('DOMContentLoaded', addCakeSparkles);
