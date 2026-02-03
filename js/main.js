// Main JavaScript for FORKO PUTOVANJA Website

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.getElementById('header');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            header.classList.remove('mobile-menu-active');
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Back to top button visibility
        const backToTopButton = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Reviews Sliders (per agency card)
    document.querySelectorAll('.review-card').forEach(function(card) {
        var slides = card.querySelectorAll('.review-slide');
        var dotsContainer = card.querySelector('.review-dots');
        var prevBtn = card.querySelector('.review-prev');
        var nextBtn = card.querySelector('.review-next');
        var current = 0;
        var autoInterval = null;

        // Generate dots
        slides.forEach(function(_, i) {
            var dot = document.createElement('span');
            dot.className = 'review-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', function() {
                showReviewSlide(i);
            });
            dotsContainer.appendChild(dot);
        });

        var dots = dotsContainer.querySelectorAll('.review-dot');

        function showReviewSlide(index) {
            slides.forEach(function(s) { s.classList.remove('active'); });
            dots.forEach(function(d) { d.classList.remove('active'); });
            current = index;
            slides[current].classList.add('active');
            dots[current].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                showReviewSlide((current + 1) % slides.length);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                showReviewSlide((current - 1 + slides.length) % slides.length);
            });
        }

        function startAutoPlay() {
            autoInterval = setInterval(function() {
                showReviewSlide((current + 1) % slides.length);
            }, 5000);
        }

        card.addEventListener('mouseenter', function() {
            clearInterval(autoInterval);
        });
        card.addEventListener('mouseleave', function() {
            startAutoPlay();
        });

        showReviewSlide(0);
        startAutoPlay();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(section);
    });
    
    // Add CSS for section animations
    const style = document.createElement('style');
    style.textContent = `
        section.in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .service-card, .testimonial-item, .contact-method {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .service-card.in-view, .testimonial-item.in-view, .contact-method.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        
        section h2 {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        section.in-view h2 {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Observe additional elements
    const additionalElements = document.querySelectorAll('.service-card, .testimonial-item, .contact-method, section h2');
    additionalElements.forEach((element, index) => {
        observer.observe(element);
        // Add staggered animation delay for contact methods
        if (element.classList.contains('contact-method')) {
            element.style.transitionDelay = `${index * 0.1}s`;
        }
    });
    
    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrolled < heroSection.offsetHeight) {
            const parallaxSpeed = 0.5;
            heroSection.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
        }
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-secondary, .btn-book');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn, .btn-primary, .btn-secondary, .btn-book {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
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
    
    // Benefits Slider (Mobile only)
    const benefitItems = document.querySelectorAll('.benefit-item');
    const benefitDots = document.querySelectorAll('.benefit-dot');
    const benefitsPrevBtn = document.querySelector('.benefits-prev-btn');
    const benefitsNextBtn = document.querySelector('.benefits-next-btn');
    let currentBenefitSlide = 0;
    let benefitsAutoPlayInterval;
    
    function isMobile() {
        return window.innerWidth <= 767.98;
    }
    
    function showBenefitSlide(index) {
        // Remove active class from all items and dots
        benefitItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
        
        benefitDots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }
    
    function nextBenefitSlide() {
        if (!isMobile()) return;
        
        currentBenefitSlide++;
        if (currentBenefitSlide >= benefitItems.length) {
            currentBenefitSlide = 0;
        }
        showBenefitSlide(currentBenefitSlide);
    }
    
    function prevBenefitSlide() {
        if (!isMobile()) return;
        
        currentBenefitSlide--;
        if (currentBenefitSlide < 0) {
            currentBenefitSlide = benefitItems.length - 1;
        }
        showBenefitSlide(currentBenefitSlide);
    }
    
    function startBenefitsAutoPlay() {
        if (!isMobile()) return;
        
        // Clear existing interval
        if (benefitsAutoPlayInterval) {
            clearInterval(benefitsAutoPlayInterval);
        }
        
        // Start auto-play (change slide every 4 seconds)
        benefitsAutoPlayInterval = setInterval(() => {
            nextBenefitSlide();
        }, 4000);
    }
    
    function stopBenefitsAutoPlay() {
        if (benefitsAutoPlayInterval) {
            clearInterval(benefitsAutoPlayInterval);
        }
    }
    
    // Initialize benefits slider on mobile
    function initBenefitsSlider() {
        if (isMobile() && benefitItems.length > 0) {
            // Show first slide
            showBenefitSlide(0);
            startBenefitsAutoPlay();
        } else {
            // On desktop, show all items
            benefitItems.forEach(item => {
                item.classList.add('active');
            });
            stopBenefitsAutoPlay();
        }
    }
    
    // Initialize on load
    initBenefitsSlider();
    
    // Re-initialize on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            initBenefitsSlider();
        }, 250);
    });
    
    // Next button click
    if (benefitsNextBtn) {
        benefitsNextBtn.addEventListener('click', function() {
            stopBenefitsAutoPlay();
            nextBenefitSlide();
            startBenefitsAutoPlay();
        });
    }
    
    // Previous button click
    if (benefitsPrevBtn) {
        benefitsPrevBtn.addEventListener('click', function() {
            stopBenefitsAutoPlay();
            prevBenefitSlide();
            startBenefitsAutoPlay();
        });
    }
    
    // Dot clicks
    benefitDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopBenefitsAutoPlay();
            currentBenefitSlide = index;
            showBenefitSlide(currentBenefitSlide);
            startBenefitsAutoPlay();
        });
    });
    
    // Pause auto-play on hover (optional)
    const benefitsWrapper = document.querySelector('.benefits-wrapper');
    if (benefitsWrapper) {
        benefitsWrapper.addEventListener('mouseenter', stopBenefitsAutoPlay);
        benefitsWrapper.addEventListener('mouseleave', function() {
            if (isMobile()) {
                startBenefitsAutoPlay();
            }
        });
    }
    
    // Days Until Counter
    const daysUntilElements = document.querySelectorAll('.days-until');
    
    function calculateDaysUntil(dateString) {
        const tripDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        tripDate.setHours(0, 0, 0, 0);
        
        const diffTime = tripDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) {
            return 'Putovanje je proĹĄlo';
        } else if (diffDays === 0) {
            return 'Danas!';
        } else if (diffDays === 1) {
            return 'Sutra';
        } else {
            return `Za ${diffDays} dana`;
        }
    }
    
    function updateDaysUntil() {
        daysUntilElements.forEach(element => {
            const dateString = element.getAttribute('data-date');
            if (dateString) {
                element.textContent = calculateDaysUntil(dateString);
            }
        });
    }
    
    // Initialize and update daily
    if (daysUntilElements.length > 0) {
        updateDaysUntil();
        // Update every hour
        setInterval(updateDaysUntil, 3600000);
    }
    
    // Gallery Auto-Rotation - Always show exactly 6 images
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imagesPerView = 6;
    let currentStartIndex = 0;
    let galleryAutoPlayInterval;
    
    if (galleryItems.length > 0) {
        // Function to show exactly 6 images, rotating through all
        function showGalleryImages() {
            galleryItems.forEach((item, i) => {
                // Check if this item should be visible (exactly 6 images starting from currentStartIndex)
                let shouldShow = false;
                
                for (let j = 0; j < imagesPerView; j++) {
                    let checkIndex = (currentStartIndex + j) % galleryItems.length;
                    if (i === checkIndex) {
                        shouldShow = true;
                        break;
                    }
                }
                
                if (shouldShow) {
                    item.style.display = 'block';
                    // Fade in
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                } else {
                    // Fade out
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        }
        
        function rotateGallery() {
            if (galleryItems.length > imagesPerView) {
                // Move to next set of images (rotate by 1)
                currentStartIndex = (currentStartIndex + 1) % galleryItems.length;
                showGalleryImages();
            }
        }
        
        function startGalleryAutoPlay() {
            if (galleryItems.length > imagesPerView) {
                galleryAutoPlayInterval = setInterval(() => {
                    rotateGallery();
                }, 4000); // Rotate every 4 seconds
            }
        }
        
        // Set initial opacity for all items
        galleryItems.forEach(item => {
            item.style.opacity = '1';
        });
        
        // Initialize - show first 6 images
        showGalleryImages();
        startGalleryAutoPlay();
        
        // Pause on hover
        const galleryWrapper = document.querySelector('.gallery-wrapper');
        if (galleryWrapper) {
            galleryWrapper.addEventListener('mouseenter', () => {
                if (galleryAutoPlayInterval) {
                    clearInterval(galleryAutoPlayInterval);
                }
            });
            galleryWrapper.addEventListener('mouseleave', () => {
                startGalleryAutoPlay();
            });
        }
    }

    // World Map - Visited Countries
    function initWorldMap() {
        const container = document.getElementById('world-map');
        if (!container || typeof d3 === 'undefined') return;

        const width = 960;
        const height = 500;

        // ISO 3166-1 numeric codes → [flag, Croatian name]
        const countryData = {
            // Europa (bez Bjelorusije i Irske)
            8: ['\u{1F1E6}\u{1F1F1}', 'Albanija'], 20: ['\u{1F1E6}\u{1F1E9}', 'Andora'],
            40: ['\u{1F1E6}\u{1F1F9}', 'Austrija'], 56: ['\u{1F1E7}\u{1F1EA}', 'Belgija'],
            70: ['\u{1F1E7}\u{1F1E6}', 'Bosna i Hercegovina'], 100: ['\u{1F1E7}\u{1F1EC}', 'Bugarska'],
            191: ['\u{1F1ED}\u{1F1F7}', 'Hrvatska'], 196: ['\u{1F1E8}\u{1F1FE}', 'Cipar'],
            203: ['\u{1F1E8}\u{1F1FF}', 'Češka'], 208: ['\u{1F1E9}\u{1F1F0}', 'Danska'],
            233: ['\u{1F1EA}\u{1F1EA}', 'Estonija'], 246: ['\u{1F1EB}\u{1F1EE}', 'Finska'],
            250: ['\u{1F1EB}\u{1F1F7}', 'Francuska'], 276: ['\u{1F1E9}\u{1F1EA}', 'Njemačka'],
            300: ['\u{1F1EC}\u{1F1F7}', 'Grčka'], 348: ['\u{1F1ED}\u{1F1FA}', 'Mađarska'],
            352: ['\u{1F1EE}\u{1F1F8}', 'Island'], 380: ['\u{1F1EE}\u{1F1F9}', 'Italija'],
            428: ['\u{1F1F1}\u{1F1FB}', 'Latvija'], 438: ['\u{1F1F1}\u{1F1EE}', 'Lihtenštajn'],
            440: ['\u{1F1F1}\u{1F1F9}', 'Litva'], 442: ['\u{1F1F1}\u{1F1FA}', 'Luksemburg'],
            470: ['\u{1F1F2}\u{1F1F9}', 'Malta'], 498: ['\u{1F1F2}\u{1F1E9}', 'Moldavija'],
            492: ['\u{1F1F2}\u{1F1E8}', 'Monako'], 499: ['\u{1F1F2}\u{1F1EA}', 'Crna Gora'],
            528: ['\u{1F1F3}\u{1F1F1}', 'Nizozemska'], 807: ['\u{1F1F2}\u{1F1F0}', 'Sjeverna Makedonija'],
            578: ['\u{1F1F3}\u{1F1F4}', 'Norveška'], 616: ['\u{1F1F5}\u{1F1F1}', 'Poljska'],
            620: ['\u{1F1F5}\u{1F1F9}', 'Portugal'], 642: ['\u{1F1F7}\u{1F1F4}', 'Rumunjska'],
            674: ['\u{1F1F8}\u{1F1F2}', 'San Marino'], 688: ['\u{1F1F7}\u{1F1F8}', 'Srbija'],
            703: ['\u{1F1F8}\u{1F1F0}', 'Slovačka'], 705: ['\u{1F1F8}\u{1F1EE}', 'Slovenija'],
            724: ['\u{1F1EA}\u{1F1F8}', 'Španjolska'], 752: ['\u{1F1F8}\u{1F1EA}', 'Švedska'],
            756: ['\u{1F1E8}\u{1F1ED}', 'Švicarska'], 792: ['\u{1F1F9}\u{1F1F7}', 'Turska'],
            804: ['\u{1F1FA}\u{1F1E6}', 'Ukrajina'], 826: ['\u{1F1EC}\u{1F1E7}', 'Ujedinjeno Kraljevstvo'],
            336: ['\u{1F1FB}\u{1F1E6}', 'Vatikan'], '-99': ['\u{1F1FD}\u{1F1F0}', 'Kosovo'],
            // Rusija, Azerbajdžan
            643: ['\u{1F1F7}\u{1F1FA}', 'Rusija'], 31: ['\u{1F1E6}\u{1F1FF}', 'Azerbajdžan'],
            // Bliski istok
            818: ['\u{1F1EA}\u{1F1EC}', 'Egipat'], 400: ['\u{1F1EF}\u{1F1F4}', 'Jordan'],
            784: ['\u{1F1E6}\u{1F1EA}', 'Ujedinjeni Arapski Emirati'], 634: ['\u{1F1F6}\u{1F1E6}', 'Katar'],
            // Azija
            462: ['\u{1F1F2}\u{1F1FB}', 'Maldivi'], 764: ['\u{1F1F9}\u{1F1ED}', 'Tajland'],
            116: ['\u{1F1F0}\u{1F1ED}', 'Kambodža'], 704: ['\u{1F1FB}\u{1F1F3}', 'Vijetnam'],
            392: ['\u{1F1EF}\u{1F1F5}', 'Japan'], 410: ['\u{1F1F0}\u{1F1F7}', 'Južna Koreja'],
            360: ['\u{1F1EE}\u{1F1E9}', 'Indonezija'], 144: ['\u{1F1F1}\u{1F1F0}', 'Šri Lanka'],
            608: ['\u{1F1F5}\u{1F1ED}', 'Filipini'],
            // Amerike
            840: ['\u{1F1FA}\u{1F1F8}', 'SAD'], 484: ['\u{1F1F2}\u{1F1FD}', 'Meksiko'],
            222: ['\u{1F1F8}\u{1F1FB}', 'Salvador'], 320: ['\u{1F1EC}\u{1F1F9}', 'Gvatemala'],
            340: ['\u{1F1ED}\u{1F1F3}', 'Honduras'], 188: ['\u{1F1E8}\u{1F1F7}', 'Kostarika']
        };

        const visitedCountries = new Set(Object.keys(countryData).map(Number));

        const svg = d3.select(container)
            .append('svg')
            .attr('viewBox', '0 0 ' + width + ' ' + height)
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .style('width', '100%')
            .style('height', 'auto');

        const projection = d3.geoNaturalEarth1()
            .scale(155)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // Draw sphere (ocean background)
        svg.append('path')
            .datum({ type: 'Sphere' })
            .attr('d', path)
            .attr('class', 'sphere');

        // Draw graticule (grid lines)
        var graticule = d3.geoGraticule();
        svg.append('path')
            .datum(graticule())
            .attr('d', path)
            .attr('class', 'graticule');

        // Create tooltip element
        var tooltip = document.createElement('div');
        tooltip.className = 'map-tooltip';
        document.body.appendChild(tooltip);

        // Fetch world map data and render countries
        fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
            .then(function(response) { return response.json(); })
            .then(function(world) {
                var countries = topojson.feature(world, world.objects.countries);

                svg.selectAll('.country')
                    .data(countries.features)
                    .enter()
                    .append('path')
                    .attr('d', path)
                    .attr('class', function(d) {
                        return visitedCountries.has(+d.id) ? 'country visited' : 'country';
                    })
                    .on('mouseover', function(event, d) {
                        var data = countryData[+d.id] || countryData[d.id];
                        if (data) {
                            tooltip.innerHTML = '<span class="flag">' + data[0] + '</span>' + data[1];
                            tooltip.classList.add('visible');
                        }
                    })
                    .on('mousemove', function(event) {
                        tooltip.style.left = (event.clientX + 15) + 'px';
                        tooltip.style.top = (event.clientY - 10) + 'px';
                    })
                    .on('mouseout', function() {
                        tooltip.classList.remove('visible');
                    });

                // Country borders
                svg.append('path')
                    .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
                    .attr('d', path)
                    .attr('class', 'country-border');
            });
    }

    initWorldMap();
});
