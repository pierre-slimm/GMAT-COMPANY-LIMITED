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
