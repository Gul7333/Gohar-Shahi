const body = document.querySelector("body");
const themeToggle = document.getElementById("themeToggle");


const themeMetaTag = document.querySelector('meta[name="theme-color"]');

let isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme")) || false;

// Define light and dark theme colors
const lightThemeColor = "#ffffff"; // Light theme
const darkThemeColor = "#333333"; // Dark theme
const aud = new Audio('./toggle.mp3')

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
// js for showing team Members in footer
// first i fetch team.json file which contains name and photo url of team
// member
const team = document.querySelector(".team");
//accessing template div in footer
const teamMemberBox = document.getElementById("team-member-box");

fetch("Team.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((array) => {
      const teamImg = teamMemberBox.content.cloneNode(true);
      var img = teamImg.querySelector(".image-box img");
      img.src = array[1];
      var title = teamImg.querySelector(".image-title");
      title.innerHTML = `<a href="https://www.facebook.com/riazul.jannah" >${array[0]}</a>`;
      team.appendChild(teamImg);
    });
  });
