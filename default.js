const body = document.querySelector("body");
const themeToggle = document.getElementById("themeToggle");
const themeMetaTag = document.querySelector('meta[name="theme-color"]');
const triggerElement = document.getElementById('triggerElement');
const navbar = document.getElementById('navbar');




let isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme")) || false;



// observer.observe(triggerElement)
const triggerPosition = 100
console.log(triggerPosition,"to offset")
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY ;

  if (scrollPosition >= triggerPosition) {
    navbar.style.display = 'flex';
  } else {
    navbar.style.display = 'none';
  }

});

// Define light and dark theme colors
const lightThemeColor = "#ffffff"; // Light theme
const darkThemeColor = "#040d1d"; // Dark theme
const aud = new Audio('/toggle.mp3')

function toggleTheme() {
  aud.play()
  if (isDarkTheme) {
    // Switch to light theme
    themeMetaTag.setAttribute("content", lightThemeColor); // Light theme
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
    localStorage.setItem("isDarkTheme", "false");
  } else {
    // Switch to dark theme
    themeMetaTag.setAttribute("content", darkThemeColor); // Dark theme
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
    themeToggle.textContent = "🌙";
    localStorage.setItem("isDarkTheme", "true");
  }
  isDarkTheme = !isDarkTheme;
}

function setTheme() {
  if (isDarkTheme) {
    themeMetaTag.setAttribute("content", darkThemeColor); // Light theme
    // Switch to light theme
    body.classList.add("dark-theme");
    themeToggle.textContent = "🌙";
  } else {
    themeMetaTag.setAttribute("content", darkThemeColor); // Dark theme
    // Switch to dark theme
    body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
  }
}

setTheme();

// Add click event listener to toggle button
themeToggle.addEventListener("click", () => {
  toggleTheme();
});









const navPop = document.querySelector(".nav-pop");
const Logo = document.querySelector(".Logo");
function navtoggle() {
  navPop.classList.toggle("activenav");
  Logo.classList.toggle("Logo-cross");
  body.classList.toggle("body-hidden");
}
// __________________________________
// const navItem = navPop.querySelectorAll("li a")
// console.log(navItem)
// let activeLink = sessionStorage.getItem("activeLink") 
// if (activeLink) {
//   navItem[activeLink].classList.add("activeNavItem")
// }
// __________________________________
