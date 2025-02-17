document.addEventListener('DOMContentLoaded', () => {
    // Animation for tagline words
    const taglineContainer = document.getElementById('taglineContainer');
    const words = ['Learn', 'Create', 'Innovate'];
    let currentWordIndex = 0;

    function animateTagline() {
        taglineContainer.innerHTML = '';
        
        const wordContainer = document.createElement('div');
        wordContainer.className = 'animated-word';
        wordContainer.style.opacity = '0';
        wordContainer.style.transform = 'translateY(20px)';
        
        [...words[currentWordIndex]].forEach((letter, index) => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.style.animationDelay = `${index * 0.1}s`;
            wordContainer.appendChild(letterSpan);
        });

        taglineContainer.appendChild(wordContainer);

        // Animate word in
        requestAnimationFrame(() => {
            wordContainer.style.transition = 'opacity 0.5s, transform 0.5s';
            wordContainer.style.opacity = '1';
            wordContainer.style.transform = 'translateY(0)';
        });

        // Schedule next word
        setTimeout(() => {
            wordContainer.style.opacity = '0';
            wordContainer.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                currentWordIndex = (currentWordIndex + 1) % words.length;
                animateTagline();
            }, 500);
        }, 2000);
    }

    // Start tagline animation
    setTimeout(animateTagline, 1000);

    // Intersection Observer for benefits list and poster image
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in animation for benefits
                if (entry.target.classList.contains('benefits-list')) {
                    entry.target.querySelectorAll('li').forEach((li, index) => {
                        li.style.animation = `fadeIn 0.5s forwards ${index * 0.2}s`;
                    });
                }
                // Add fade-in animation for poster image
                else if (entry.target.classList.contains('poster-image')) {
                    entry.target.style.animation = 'fadeIn 0.8s forwards';
                }
                
                // Unobserve after animation
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = [
        document.querySelector('.benefits-list'),
        document.querySelector('.poster-image')
    ];

    elementsToObserve.forEach(element => {
        if (element) {
            fadeInObserver.observe(element);
        }
    });

    // Police line text animation
    const lineText = document.querySelector('.line-text');
    if (lineText) {
        // Duplicate text for seamless scrolling
        lineText.innerHTML += lineText.innerHTML;
    }

    // Handle smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add resize handler for responsive adjustments
    window.addEventListener('resize', () => {
        // Update any necessary responsive elements
        const mainText = document.querySelector('.main-text');
        if (window.innerWidth <= 768) {
            mainText.style.fontSize = '60px';
        } else {
            mainText.style.fontSize = '110px';
        }
    });

    // Trigger initial resize check
    window.dispatchEvent(new Event('resize'));
});

// Observe teaser section
const teaserObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.teaser-text').forEach(text => {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            });
            teaserObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

const teaserContent = document.querySelector('.teaser-content');
if (teaserContent) {
    teaserObserver.observe(teaserContent);
}