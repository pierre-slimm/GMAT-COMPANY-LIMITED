document.addEventListener('DOMContentLoaded', function () {
  // Toggle Mobile Menu
  const menuIcon = document.querySelector('.menu-icon');
  const navUl = document.querySelector('#nav-menu'); // Ensure your <ul> has id="nav-menu"
  const navLinks = document.querySelectorAll('nav ul li a');
  const currentYearElement = document.getElementById("current-year");

  // Update current year
  if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
  }

  // Toggle mobile menu visibility
  if (menuIcon && navUl) {
      menuIcon.addEventListener('click', function () {
          navUl.classList.toggle('show');
      });
  }

  // Handle active class on nav links
  if (navLinks.length > 0) {
      navLinks.forEach(function (link) {
          link.addEventListener('click', function () {
              // Remove active class from all links
              navLinks.forEach(function (lnk) {
                  lnk.classList.remove('active');
              });
              // Add active class to clicked link
              this.classList.add('active');

              // Close the mobile menu after selection (optional)
              if (navUl.classList.contains('show')) {
                  navUl.classList.remove('show');
              }
          });
      });
  }
});
// script.js

document.addEventListener('DOMContentLoaded', function () {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('h2');

    // Click Event
    question.addEventListener('click', () => {
      // Toggle the active class
      item.classList.toggle('active');

      // Optionally, close other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    });

    // Keyboard Accessibility (Enter and Space keys)
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('active');

        // Optionally, close other open FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
      }
    });
  });
});
let slides = document.querySelectorAll('.slide');
let index = 0;

function nextSlide() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function startSlideshow(){
  setInterval(nextSlide, 3000); // Change slide every 3000 milliseconds
}

window.onload = function() {
  startSlideshow();
}