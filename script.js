document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .benefit-card, .testimonial-card');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        // Initial setup for those elements without base classes already handling initial opacity
        if(!el.classList.contains('slide-in-left') && !el.classList.contains('slide-in-right')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        revealOnScroll.observe(el);
    });

    // Override class definition for the generic animated items
    const style = document.createElement('style');
    style.innerHTML = `
        .benefit-card.is-visible, .testimonial-card.is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 4. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Form submission (simulated)
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = leadForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending Request...';
            btn.style.opacity = '0.8';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerText = 'Strategy Session Booked! ✓';
                btn.style.backgroundColor = 'var(--clr-accent)';
                btn.style.backgroundImage = 'none';
                leadForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.backgroundImage = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 6. Interactive accept button animation in hero
    const callBtn = document.querySelector('.call-btn.accept');
    if(callBtn) {
        callBtn.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'scale(0.9)';
            
            const callerState = document.querySelector('.card-header span');
            if(callerState) callerState.innerText = 'Call Connected';
            
            const pulseDot = document.querySelector('.pulse-dot');
            if(pulseDot) {
                pulseDot.style.animation = 'none';
                pulseDot.style.backgroundColor = '#ff4d4d'; // Switch to red to indicate connected call/recording
            }

            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});
