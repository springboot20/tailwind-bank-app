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
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null
const darkSwitch = () => {
  if (currentTheme) {
    if (toggleBtn.checked && currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', currentTheme)
    }
  }
  if (toggleBtn.checked) {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('theme', 'light')
  }
}
toggleBtn.addEventListener('change', darkSwitch, false)


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
