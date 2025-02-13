document.addEventListener('DOMContentLoaded', function () {
  // Toggle Mobile Menu
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('#nav-menu li a');
  const currentYearElement = document.getElementById("current-year");

  // Update current year
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Toggle mobile menu visibility
  function toggleMenu() {
    document.body.classList.toggle('nav-menu-open'); // Apply class to body
    navMenu.classList.toggle('show');
  }

  if (menuIcon && navMenu) {
    menuIcon.addEventListener('click', toggleMenu);
  }

  if (closeIcon) {
    closeIcon.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking a nav link
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        navLinks.forEach(lnk => lnk.classList.remove('active')); // Remove active class
        this.classList.add('active'); // Add active class to clicked link

        // Close menu after selection
        document.body.classList.remove('nav-menu-open');
        navMenu.classList.remove('show');
      });
    });
  }

  // FAQ Toggle
  const faqItems = document.querySelectorAll('.faq-item');

  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const question = item.querySelector('h2');
      if (question) {
        question.addEventListener('click', () => {
          item.classList.toggle('active');
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
        });

        // Keyboard Accessibility
        question.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.classList.toggle('active');
            faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                otherItem.classList.remove('active');
              }
            });
          }
        });
      }
    });
  }

  // Slideshow
  let slides = document.querySelectorAll('.slide');
  let index = 0;

  function nextSlide() {
    if (slides.length > 0) {
      slides[index].classList.remove('active');
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }
  }

  function startSlideshow() {
    if (slides.length > 0) {
      setInterval(nextSlide, 3000);
    }
  }

  startSlideshow();
});
