// Navigation Menu Toggle
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector('.menu-toggle');
  
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
  
  // Close menu when clicking on a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

// Smooth Scroll Function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Update Date Function
function updateDate() {
  const dateElement = document.querySelector('.date-text');
  if (dateElement) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
  }
}

// Initialize Chart
function initChart() {
  const chartCanvas = document.getElementById('impactChart');
  if (!chartCanvas) return;
  
  const ctx = chartCanvas.getContext('2d');
  
  // Gradient for the chart line
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(0, 210, 211, 0.5)');
  gradient.addColorStop(1, 'rgba(0, 210, 211, 0)');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2010', '2020', '2025', '2030', '2035', '2040', '2045', '2050'],
      datasets: [{
        data: [100, 150, 200, 300, 400, 500, 650, 850],
        borderColor: '#00d2d3',
        borderWidth: 3,
        fill: true,
        backgroundColor: gradient,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#888', display: false }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#888', maxTicksLimit: 5 }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 10
        }
      }
    }
  });
}

// Initialize Services Slider
function initServicesSlider() {
  const swiper = new Swiper('.servicesSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

// Navbar Scroll Effect
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 18, 22, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
  } else {
    navbar.style.background = '#0f1216';
    navbar.style.backdropFilter = 'none';
  }
}

// Intersection Observer for Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const animatedElements = document.querySelectorAll('.glass-card, .service-card, .why-card, .goal-item, .success-card, .capability-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add CSS for animation class
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// Close menu when clicking outside on mobile
document.addEventListener('click', (event) => {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.querySelector('.menu-toggle');
  const isClickInsideNav = navLinks.contains(event.target) || menuToggle.contains(event.target);
  
  if (window.innerWidth <= 900 && navLinks.classList.contains('active') && !isClickInsideNav) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.querySelector('.menu-toggle');
  
  // Reset menu on larger screens
  if (window.innerWidth > 900) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  }
});

// Handle scroll events
window.addEventListener('scroll', handleNavbarScroll);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  updateDate();
  initChart();
  initServicesSlider();
  initScrollAnimations();
  
  // Add click event to all "Explore Our Vision" buttons
  const ctaButtons = document.querySelectorAll('.cta-button, .round-arrow');
  ctaButtons.forEach(button => {
    button.addEventListener('click', () => scrollToSection('vision'));
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    });
  }
});





  (function() {
    // ----- CONFIGURATION -----
    const partners = [
      { name: 'MULTI ASPECTS', url: 'https://nafeth.com', img: 'logo2.png' },
      { name: 'TAQAAN TECH',       url: 'https://techpartner1.com', img: 'logo7.png' },
      { name: '@ Xpert Software',      url: 'https://cloudsolutions.com', img: 'logo3.png' },
      { name: 'INFERNO ONLINE',      url: 'https://networkpartner.com', img: 'logo6.png' },
      { name: 'MALOON Finance',       url: 'https://maloon.com', img: 'logo1.png' },
      { name: 'BOUD',          url: 'https://tasman.tech', img: 'logo5.png' },
      { name: 'Nafith',               url: 'https://nafith.com', img: 'logo4.png' }
    ];

    const visibleCount = 4;          // number of logos shown at once
    const autoSlideInterval = 5000;   // 5 seconds

    // ----- SETUP -----
    const track = document.querySelector('.carousel-track');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let currentIndex = visibleCount;   // start at first real slide after clones
    let slideWidth = 0;                // will be recalculated on resize
    let transitionEnabled = true;

    // Build slides: create clones and real slides
    function buildSlides() {
      // Create real slides
      const realSlides = partners.map((p, idx) => {
        const slide = document.createElement('div');
        slide.className = 'partner-slide';
        slide.dataset.index = idx;   // store real index
        slide.innerHTML = `
          <a href="${p.url}" target="_blank" rel="noopener noreferrer">
            <img src="${p.img}" alt="${p.name}" loading="lazy"
                 onerror="this.onerror=null; this.src='https://via.placeholder.com/100x100?text=Logo';">
            <span>${p.name}</span>
          </a>
        `;
        return slide;
      });

      // Clone first `visibleCount` slides for the end (to allow seamless forward scrolling)
      const clonesBefore = [];
      for (let i = visibleCount; i > 0; i--) {
        const clone = realSlides[realSlides.length - i].cloneNode(true);
        clone.classList.add('clone');
        clonesBefore.push(clone);
      }

      // Clone last `visibleCount` slides for the beginning (to allow seamless backward scrolling)
      const clonesAfter = [];
      for (let i = 0; i < visibleCount; i++) {
        const clone = realSlides[i].cloneNode(true);
        clone.classList.add('clone');
        clonesAfter.push(clone);
      }

      // Assemble track: clonesBefore + realSlides + clonesAfter
      track.innerHTML = '';  // clear
      clonesBefore.forEach(c => track.appendChild(c));
      realSlides.forEach(s => track.appendChild(s));
      clonesAfter.forEach(c => track.appendChild(c));

      // Create navigation dots (based on real slides count)
      dotsContainer.innerHTML = '';
      partners.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.dataset.index = idx;
        dot.addEventListener('click', () => goToRealIndex(idx));
        dotsContainer.appendChild(dot);
      });
    }

    // Update active dot
    function updateDots() {
      const realIndex = getRealIndex(currentIndex);
      document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === realIndex);
      });
    }

    // Convert absolute slide index to real partner index (0-based)
    function getRealIndex(absIndex) {
      const totalReal = partners.length;
      const offset = visibleCount;  // clones before
      const realIndex = (absIndex - offset + totalReal) % totalReal;
      return realIndex;
    }

    // Move to a specific absolute index (with or without transition)
    function goToAbsoluteIndex(index, smooth = true) {
      if (!smooth) transitionEnabled = false;
      currentIndex = index;
      const translateX = -currentIndex * (slideWidth + 20); // 20px gap
      track.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
      track.style.transform = `translateX(${translateX}px)`;

      // Update dots immediately (they reflect real partner)
      updateDots();

      // If we jumped out of bounds, reset to corresponding real slide without transition
      const totalSlides = track.children.length;
      const realSlidesCount = partners.length;
      const firstRealIndex = visibleCount;
      const lastRealIndex = firstRealIndex + realSlidesCount - 1;

      if (currentIndex < firstRealIndex || currentIndex > lastRealIndex) {
        // Loop back to the other side
        let newIndex;
        if (currentIndex < firstRealIndex) {
          newIndex = currentIndex + realSlidesCount;
        } else {
          newIndex = currentIndex - realSlidesCount;
        }
        // Perform jump without transition
        setTimeout(() => {
          transitionEnabled = false;
          goToAbsoluteIndex(newIndex, false);
        }, 500); // after transition ends
      }
    }

    // Go to a real partner index (0-based)
    function goToRealIndex(realIndex, smooth = true) {
      const absIndex = realIndex + visibleCount;
      goToAbsoluteIndex(absIndex, smooth);
    }

    // Next slide
    function nextSlide() {
      goToAbsoluteIndex(currentIndex + 1);
    }

    // Previous slide
    function prevSlide() {
      goToAbsoluteIndex(currentIndex - 1);
    }

    // Recalculate slide width based on container size
    function updateSlideWidth() {
      const wrapper = document.querySelector('.carousel-track-wrapper');
      const wrapperWidth = wrapper.getBoundingClientRect().width;
      const gap = 20;  // matches .carousel-track gap
      const gapsTotal = gap * (visibleCount - 1);
      slideWidth = (wrapperWidth - gapsTotal) / visibleCount;

      // Set each slide's width to match calculation (already handled by flex-basis, but we need to ensure consistent)
      document.querySelectorAll('.partner-slide').forEach(slide => {
        slide.style.flexBasis = `${slideWidth}px`;
      });

      // Reposition without animation
      goToAbsoluteIndex(currentIndex, false);
    }

    // Initialize
    buildSlides();

    // Set up event listeners
    prevBtn.addEventListener('click', () => {
      nextSlide();  // because of infinite loop direction, but we want previous: actually call prevSlide
    });
    // Correction: we have next and prev buttons, so:
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto slide
    let autoTimer = setInterval(nextSlide, autoSlideInterval);

    // Pause on hover (optional, good UX)
    const container = document.querySelector('.carousel-container');
    container.addEventListener('mouseenter', () => clearInterval(autoTimer));
    container.addEventListener('mouseleave', () => {
      autoTimer = setInterval(nextSlide, autoSlideInterval);
    });

    // Handle resize
    window.addEventListener('resize', () => {
      updateSlideWidth();
    });

    // Initial width calculation and positioning
    setTimeout(() => {
      updateSlideWidth();
    }, 100);

    // Ensure transition is re‑enabled after a jump without transition
    track.addEventListener('transitionend', () => {
      transitionEnabled = true;
    });
  })();