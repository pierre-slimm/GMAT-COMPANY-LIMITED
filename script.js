document.addEventListener('DOMContentLoaded', function () {
  // Selectors
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('#nav-menu li a');
  const dropdownToggle = document.querySelector('.menu-item-has-children > .menu-link');
  const currentYearElement = document.getElementById("current-year");

  // Update current year
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Toggle mobile menu visibility
  function toggleMenu() {
    document.body.classList.toggle('nav-menu-open');
    navMenu.classList.toggle('show');
  }

  if (menuIcon && closeIcon && navMenu) {
    menuIcon.addEventListener('click', toggleMenu);
    closeIcon.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking a nav link (except dropdown parent)
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        if (!this.parentElement.classList.contains('menu-item-has-children')) {
          document.body.classList.remove('nav-menu-open');
          navMenu.classList.remove('show');
        }
      });
    });
  }

  // Submenu Toggle for Mobile & Desktop
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default navigation
      this.parentElement.classList.toggle('active'); // Toggle active class
      const subMenu = this.nextElementSibling;
      if (subMenu) {
        subMenu.classList.toggle('show');
      }
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

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitButton = form.querySelector('button[type="submit"]');
  const messageDiv = form.querySelector('.form-message');

  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Disable submit button while processing
      submitButton.disabled = true;
      messageDiv.innerHTML = '<p>Sending message...</p>';
      
      // Create FormData object
      const formData = new FormData(form);
      
      // Convert FormData to URL-encoded string
      const data = new URLSearchParams(formData).toString();
      
      // Make the AJAX request
      fetch('submit_form.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              messageDiv.innerHTML = '<p class="success">' + data.message + '</p>';
              form.reset(); // Clear the form
          } else {
              messageDiv.innerHTML = '<p class="error">' + data.message + '</p>';
          }
      })
      .catch(error => {
          messageDiv.innerHTML = '<p class="error">An error occurred. Please try again later.</p>';
          console.error('Error:', error);
      })
      .finally(() => {
          submitButton.disabled = false;
      });
  });
});