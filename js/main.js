document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const ageVerificationModal = document.getElementById('ageVerificationModal');
    const restrictedModal = document.getElementById('restrictedModal');
    const ageYesBtn = document.getElementById('ageYes');
    const ageNoBtn = document.getElementById('ageNo');

    function showModal(modal) {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    function hideModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Check if age verification is needed
    function isAgeVerified() {
        return sessionStorage.getItem('ageVerified') === 'true';
    }

    // Set age verification status
    function setAgeVerified() {
        sessionStorage.setItem('ageVerified', 'true');
    }

    // Show age verification modal only if not verified in this session
    if (ageVerificationModal && !isAgeVerified()) {
        showModal(ageVerificationModal);
    }

    // Age verification buttons
    if (ageYesBtn) {
        ageYesBtn.addEventListener('click', function() {
            setAgeVerified();
            hideModal(ageVerificationModal);
        });
    }

    if (ageNoBtn) {
        ageNoBtn.addEventListener('click', function() {
            hideModal(ageVerificationModal);
            if (restrictedModal) {
                showModal(restrictedModal);
                setTimeout(() => {
                    window.location.href = 'https://www.google.com';
                }, 3000);
            }
        });
    }

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                const modal = this.closest('.modal');
                if (modal === ageVerificationModal && !isAgeVerified()) {
                    return; // Prevent closing age verification modal if not verified
                }
                hideModal(modal);
            }
        });
    });

    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });

    // Animation functions
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Handle scroll animations
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.stat-card h3');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                if (!element.classList.contains('animated')) {
                    const value = parseInt(element.innerText.replace(/\D/g, ''));
                    animateValue(element, 0, value, 2000);
                    element.classList.add('animated');
                }
            }
        });
    }

    // Scroll event listener for animations
    window.addEventListener('scroll', handleScrollAnimations);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Пропускаем пустые ссылки

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.85) {
                const animation = element.dataset.animate;
                const delay = element.dataset.delay;
                
                element.classList.add('animate', animation);
                if (delay) {
                    element.classList.add(delay);
                }
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    
    // Games Filter
    const filterButtons = document.querySelectorAll('.filter-button');
    const gamesGrid = document.querySelector('.games-grid');
    const gameCards = document.querySelectorAll('.game-card');
    
    if (filterButtons.length && gamesGrid && gameCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Add transition class
                gamesGrid.classList.add('filtering');
                
                setTimeout(() => {
                    // Filter games
                    gameCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = '';
                            setTimeout(() => card.classList.add('show'), 50);
                        } else if (card.classList.contains(filter)) {
                            card.style.display = '';
                            setTimeout(() => card.classList.add('show'), 50);
                        } else {
                            card.classList.remove('show');
                            setTimeout(() => card.style.display = 'none', 300);
                        }
                    });
                    
                    // Remove transition class
                    setTimeout(() => gamesGrid.classList.remove('filtering'), 300);
                }, 10);
            });
        });
    }
    
    // Game cards hover effect
    document.querySelectorAll('.game-card').forEach(card => {
        const overlay = card.querySelector('.game-overlay');
        if (overlay) {
            card.addEventListener('mouseenter', () => {
                overlay.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                overlay.style.opacity = '0';
            });
        }
    });

    // Power-up buttons
    document.querySelectorAll('.power-up-card button').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.disabled = true;
            this.textContent = 'Activated!';
            
            setTimeout(() => {
                this.disabled = false;
                this.textContent = originalText;
            }, 2000);
        });
    });
});

// Функция для перенаправления на другой сайт
function redirectToGoogle() {
    window.location.href = 'https://www.google.com';
}

// Вспомогательные функции для анимаций
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Анимация чисел при скролле
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.stat-card h3');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            if (!element.classList.contains('animated')) {
                const value = parseInt(element.innerText.replace(/\D/g, ''));
                animateValue(element, 0, value, 2000);
                element.classList.add('animated');
            }
        }
    });
}

// Обработчик скролла для анимаций
window.addEventListener('scroll', handleScrollAnimations); 