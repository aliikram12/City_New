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