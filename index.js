const body = document.querySelector("body");
const popUp = document.getElementById("popup");
const popUpImg = document.querySelector("#popup .popupimg");
const popImg = document.querySelectorAll(".slideimg");
const themeToggle = document.getElementById("themeToggle");
const themeMetaTag = document.querySelector('meta[name="theme-color"]');

let isDarkTheme = JSON.parse(localStorage.getItem("isDarkTheme")) || false;

// Define light and dark theme colors
const lightThemeColor = "#ffffff"; // Light theme
const darkThemeColor = "#040d1d"; // Dark theme

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
      img.src = "images/" + item + ".avif";

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
