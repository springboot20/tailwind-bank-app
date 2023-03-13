import showMenu from "./helper.js"

/**
 *
 * @param {*} dropId
 * @param {*} dropBtn
 */

(() => {
  showMenu('show-icon', 'nav-menu-container', 'search-icon')
})()

const navLinks = document.querySelectorAll(".nav-item a.nav-link");
function linkAction() {
  navLinks.forEach((n) => n.classList.remove("active-link"));
  this.classList.add("active-link");

  const navMenu = document.querySelector(`.nav-menu-container`);
  navMenu.classList.remove("show");
}
navLinks.forEach((m) => m.addEventListener("click", linkAction));

addEventListener('load', () => {
  document.body.classList.add('loaded')
})



const amountInDollar = document.querySelector(".amount-in-dollar");
const amountInNaira = document.querySelector(".amount-in-naira");
const welcome = document.querySelector('.welcome-name')

const formatDollar = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const formatNaira = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  style: "currency",
});


function setBalance() {
  let ind = JSON.parse(localStorage.getItem('user-index'));
  let balance = JSON.parse(localStorage.getItem('users-accounts'));

  amountInNaira.textContent = formatNaira.format(`${Number(balance[ind]._balance)}`);
  amountInDollar.textContent = formatDollar.format(`${Number(balance[ind]._balance)}`);

  welcome.textContent = `${balance[ind].firstName} ${balance[ind].lastName}`
}

window.addEventListener('load', setBalance)
