import showMenu, { addActive, loadDetails, darkSwitch } from "./helper.js"

/**
 *
 * @param {*} dropId
 * @param {*} dropBtn
 */

(() => {
  showMenu('show-icon', 'nav-menu-container', 'search-icon','fa-bars');
  addActive('active', 'a');
  darkSwitch('.toggle-switch input[type="checkbox"]')
  loadDetails('user-email', 'user-name')
})()

addEventListener('load', () => {
  document.body.classList.add('loaded');
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
