document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Slight delay for outline for a smooth follow effect
            setTimeout(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 50);
        });

        // Cursor hover effects on buttons/interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .addon');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(124, 106, 82, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    // Intersection Observer for Slide Animations
    const slides = document.querySelectorAll('.slide');
    const observerOptions = {
        root: null, // observe relative to viewport
        threshold: 0.2 // Trigger when 20% of the slide is visible
    };

    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                const header = document.querySelector('.fixed-header');
                if (header) {
                    if (entry.target.classList.contains('dark-theme')) {
                        header.style.color = 'var(--white)';
                    } else {
                        header.style.color = 'var(--black)';
                    }
                }
            }
        });
    }, { threshold: 0.15 });

    slides.forEach(slide => {
        slideObserver.observe(slide);
    });

    // Progress Bar Update
    const progressBar = document.getElementById('progressBar') || document.querySelector('.progress-bar');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalScroll = window.scrollY;
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (totalScroll / windowHeight) * 100;
            
            progressBar.style.width = `${scrollPercent}%`;
        });
    }
});
