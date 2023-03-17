import showMenu, { addActive, loadDetails } from "./helper.js"

/**
 *
 * @param {*} dropId
 * @param {*} dropBtn
 */

(() => {
  showMenu('show-icon', 'nav-menu-container', 'search-icon', 'fa-bars');
  addActive('active', 'a');
  loadDetails('user-email', 'user-name')
})()

addEventListener('load', () => {
  document.body.classList.add('loaded');
})
const toggleBtn = document.querySelector(`#checkbox`);
let currentTheme = localStorage.getItem('theme');

const dark = () => {
  document.documentElement.setAttribute('class', 'dark')
  localStorage.setItem('theme', 'dark')
}

const light = () => {
  document.documentElement.setAttribute('class', 'light')
  localStorage.setItem('theme', 'null')
}

if (currentTheme === 'dark') {
  dark();
} else {
  light();
}

toggleBtn.addEventListener('change', () => {
  currentTheme = localStorage.getItem('theme')
  currentTheme !== 'dark' ? dark() : light()
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
