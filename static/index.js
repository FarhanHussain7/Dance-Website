// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab functionality for Classes page
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // Gallery filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .class-card, .testimonial-card, .service-card, .team-card, .facility-card, .achievement-item, .pricing-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add hover effect to gallery items
    const galleryItemsHover = document.querySelectorAll('.gallery-item, .video-item');
    
    galleryItemsHover.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // CTA button hover effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(0, 255, 255, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 255, 255, 0.5)';
        });
    });
    
    // Mobile menu toggle (if needed in future)
    function createMobileMenu() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('div');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                display: block;
                font-size: 1.5rem;
                color: var(--primary-color);
                cursor: pointer;
                padding: 0.5rem;
            `;
            
            navbar.querySelector('ul').appendChild(toggle);
            
            toggle.addEventListener('click', function() {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }
    
    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
    
    // Add typing effect to intro section
    const introText = document.querySelector('#introSection div:first-child');
    if (introText) {
        const text = introText.innerText;
        introText.innerText = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                introText.innerText += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
    // Add particle animation dynamically
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
            left: ${Math.random() * 100}%;
            animation: float ${10 + Math.random() * 10}s infinite linear;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 20000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 2000);
    
    // Add parallax effect to intro section
    const introSection = document.getElementById('introSection');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = introSection.querySelector('div:first-child');
        const small = introSection.querySelector('.small');
        
        if (parallax && scrolled < introSection.offsetHeight) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            if (small) {
                small.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    });
    
    console.log('🚀 Farhan Dance Academy - Interactive features loaded successfully!');
});