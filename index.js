const body = document.querySelector("body");
const popUp = document.getElementById("popup");
const popUpImg = document.querySelector("#popup .popupimg");
const popImg = document.querySelectorAll(".slideimg");
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
    themeMetaTag.setAttribute("content", lightThemeColor); // Dark theme
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

// OpenPopup

function openPopUp(imageSrc) {
  popUp.style.display = "block";
  popUpImg.src = imageSrc;
  body.style.overflow = "hidden";
  console.log("openPopUp clicked");
}
function closePopUp() {
  popUp.style.display = "none";
  body.style.overflow = "auto";
}
popImg.forEach(function (item) {
  item.addEventListener("click", () => openPopUp(item.src));
});

// __________________________________
// navigation Popup effect

const navPop = document.querySelector(".nav-pop");
const Logo = document.querySelector(".Logo");
function navtoggle() {
  navPop.classList.toggle("activenav");
  Logo.classList.toggle("Logo-cross");
  body.classList.toggle("body-hidden");
}
// ________________________________

const navItem = navPop.querySelectorAll("li a");
console.log(navItem.length);
function addBlue(e) {
  console.log("started");
  for (let i = 0; i < navItem.length; i++) {
    if (navItem[i] === e.target) {
      navItem[i].classList.add("activeNavItem");
    } else {
      navItem[i].classList.remove("activeNavItem");
    }
  }
}
navPop.addEventListener("click", addBlue);

// slide effect for quotes
const quote = document.querySelectorAll(".animated-Quote");

var currentIndex = 0;
function showSlide(index) {
  quote.forEach(function (card) {
    card.classList.remove("active2");
  });
  quote[index].classList.add("active2");
}

function nextCard() {
  currentIndex++;
  if (currentIndex >= quote.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
}
showSlide(0);

setInterval(nextCard, 6000);
// ________________________________
//rotate slide effect on profile photo

// creating img element in profile div
const photo = document.querySelector(".photo");
fetch("Profile-photo.json")
  .then((response) => response.json())
  .then((data) => {
    console.log("fetch request start");
    data.forEach((item) => {
      const img = document.createElement("img");
      img.classList.add("animatePhoto");
      img.src = "images/" + item + ".jpg";

      photo.appendChild(img);
    });

    // showing profilePhoto

    const profilePhoto = document.querySelectorAll(".animatePhoto");
    var currentPhoto = 0;
    function showProfilePhoto(index) {
      profilePhoto.forEach((item) => {
        item.classList.remove("active");
      });
      profilePhoto[index].classList.add("active");
    }
    function nextProfilePhoto() {
      currentPhoto++;
      if (currentPhoto >= profilePhoto.length) {
        currentPhoto = 0;
      }
      console.log("photo added");
      showProfilePhoto(currentPhoto);
    }
    showProfilePhoto(0);
    setInterval(nextProfilePhoto, 5000);
  });
// function for zikre Qalb
const zikrQalb = document.getElementById("zikrqalb");
function zikrqalb() {
  console.log("Click");
  zikrQalb.classList.toggle("active");
}

// _________________scrolltotop______

// "scroll to top" which appear after scrollY higher then 800

const scrollTotop = document.querySelector(".scrolltotop");
window.addEventListener("scroll", () => {
  if (scrollY > 800) {
    scrollTotop.style.display = "block";
  } else {
    scrollTotop.style.display = "none";
  }
});
function scrollToTop() {
  window.scroll(0, 0);
}
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
