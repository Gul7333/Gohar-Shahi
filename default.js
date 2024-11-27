const body = document.querySelector("body");

// navigation Popup effect

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
