// Toggle Mobile Menu
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');

menuIcon.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
document.getElementById("current-year").textContent = new Date().getFullYear();