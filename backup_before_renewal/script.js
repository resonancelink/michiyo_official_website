// ===================================
// ナビゲーション
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ハンバーガーメニューの開閉
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ナビゲーションリンククリック時にメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// スクロール時のナビゲーション背景変更
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.04)';
    } else {
        navbar.style.background = 'rgba(250, 248, 245, 0.95)';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===================================
// スムーススクロール
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// フォーム送信
// ===================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        console.log('フォームデータ:', formData);

        alert('メッセージを受け取りました。\n\nありがとうございます。\nお返事まで少しお待ちください。');

        contactForm.reset();
    });
}

// ===================================
// スクロールアニメーション
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// フェードインアニメーション対象の要素
const fadeElements = document.querySelectorAll('.book-item, .course-item, .message-item');
fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===================================
// 画像プレースホルダー
// ===================================
function setupImagePlaceholders() {
    // About画像
    const aboutImage = document.querySelector('.image-frame');
    if (aboutImage) {
        aboutImage.style.background = 'linear-gradient(135deg, #D4E6D4, #F5F1E8)';
    }

    // Book画像
    const bookImages = document.querySelectorAll('.book-image');
    const bookGradients = [
        'linear-gradient(135deg, #D4E6D4, #B8CDB8)',
        'linear-gradient(135deg, #F5F1E8, #D4E6D4)',
        'linear-gradient(135deg, #B8CDB8, #8B9D83)',
        'linear-gradient(135deg, #FAF8F5, #F5F1E8)',
        'linear-gradient(135deg, #D4E6D4, #FAF8F5)',
        'linear-gradient(135deg, #B8CDB8, #D4E6D4)'
    ];

    bookImages.forEach((img, index) => {
        img.style.background = bookGradients[index % bookGradients.length];
    });
}

// ===================================
// パララックス効果（軽め）
// ===================================
function initParallax() {
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
    }
}

// ===================================
// Cursor Sparkle Effect
// ===================================
class CursorSparkle {
    constructor() {
        this.sparkleColor = 'rgba(255, 233, 160, 0.9)'; // Light Gold
        this.sparkleSizeBase = 8; // Slightly larger to make star shape visible
        this.sparkleLifetime = 800; // ms
        this.lastCreateTime = 0;
        this.createInterval = 16; // Balance performance
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - this.lastCreateTime > this.createInterval) {
                this.createSparkle(e.clientX, e.clientY);
                if (Math.random() > 0.6) {
                    this.createSparkle(e.clientX, e.clientY);
                }
                this.lastCreateTime = now;
            }
        });
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('cursor-sparkle');

        // Randomize position
        const inputOffset = 16;
        const offsetX = (Math.random() - 0.5) * inputOffset;
        const offsetY = (Math.random() - 0.5) * inputOffset;

        // Size variations
        const size = this.sparkleSizeBase + Math.random() * 8;

        sparkle.style.left = `${x + offsetX}px`;
        sparkle.style.top = `${y + offsetY}px`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        // Star Shape (5-point)
        sparkle.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        sparkle.style.background = this.sparkleColor;

        // Animate using the keyframe defined in effects.css
        sparkle.style.animation = `sparkleOn ${this.sparkleLifetime}ms forwards`;

        document.body.appendChild(sparkle);

        // Remove after animation
        setTimeout(() => {
            sparkle.remove();
        }, this.sparkleLifetime);
    }
}

// ===================================
// Title Horizontal Scroll Effect
// ===================================
function initTitleScrollEffect() {
    const titles = document.querySelectorAll('.section-title');

    // Add necessary CSS class via JS just in case
    titles.forEach(title => {
        title.classList.add('horizontal-scroll-text');
        title.style.willChange = 'transform';
        title.style.display = 'inline-block'; // Required for transform
        title.style.transition = 'transform 0.1s linear'; // Smooth update
    });

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            titles.forEach(title => {
                const rect = title.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // Check if element is in view (with some buffer)
                if (rect.top < viewportHeight + 100 && rect.bottom > -100) {
                    // Calculate scroll progress (0 when entering bottom, 1 when leaving top)
                    // We want it to move from left (-30px) to right (+30px) as it scrolls up

                    const progress = 1 - ((rect.top + rect.height / 2) / viewportHeight);
                    const moveRange = 60; // Total movement in pixels
                    let translateX = (progress - 0.5) * moveRange;

                    // Limit translation
                    translateX = Math.max(-100, Math.min(100, translateX));

                    title.style.transform = `translateX(${translateX}px)`;
                }
            });
        });
    });
}

// ===================================
// 初期化
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    setupImagePlaceholders();
    initParallax();
    new CursorSparkle();
    initTitleScrollEffect();

    console.log('MICHIYO Official Website Loaded (v2)');
});
