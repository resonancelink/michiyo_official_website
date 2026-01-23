
// ===================================
// Cursor Sparkle Effect
// ===================================
class CursorSparkle {
    constructor() {
        this.sparkleColor = '#C5A059'; // Gold color
        this.sparkleSize = 20;
        this.sparkleLifetime = 800; // ms
        this.sparkles = [];
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.createSparkle(e.clientX, e.clientY);
        });
    }

    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('cursor-sparkle');

        // Randomize position slightly
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;

        sparkle.style.left = `${x + offsetX}px`;
        sparkle.style.top = `${y + offsetY}px`;
        sparkle.style.width = `${this.sparkleSize}px`;
        sparkle.style.height = `${this.sparkleSize}px`;

        // Star SVG
        sparkle.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
        `;

        document.body.appendChild(sparkle);

        // Animate
        sparkle.style.animation = `sparkleOn ${this.sparkleLifetime}ms forwards`;

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

    titles.forEach(title => {
        title.classList.add('horizontal-scroll-text');
    });

    window.addEventListener('scroll', () => {
        titles.forEach(title => {
            const rect = title.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Check if element is roughly in view
            if (rect.top < viewportHeight && rect.bottom > 0) {
                // Calculate scroll progress relative to viewport
                // Center of viewport is 0 displacement?
                // Or start from left (-x) and move to center (0) then right (+x)?
                // "Left to right flow"

                // Value from 0 to 1 as it crosses viewport
                const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);

                // Map progress to X translation
                // Start -50px, End +50px
                const moveRange = 100;
                const translateX = (progress - 0.5) * moveRange;

                // Apply transform
                // Use translate3d for performance
                // Add a base offset if we want it to 'flow' constantly
                title.style.transform = `translateX(${translateX}px)`;
            }
        });
    });
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    new CursorSparkle();
    initTitleScrollEffect();
});
