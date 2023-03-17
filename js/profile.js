import showMenu, { addActive, loadDetails } from "./helper.js";

(() => {
	showMenu('show-icon', 'nav-menu-container', 'search-icon', "fa-bars");
	addActive('active', 'a');
	loadDetails('user-email', 'user-name');
})();

const toggleBtn = document.querySelector(`#checkbox`);
let currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

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
}
toggleBtn.addEventListener('change', () => {
	currentTheme = localStorage.getItem('theme')
	currentTheme !== 'dark' ? dark() : light()
})

const firstName = document.querySelector('.first');
const lastName = document.querySelector('.last');
const emailAddress = document.querySelector('.email');
const balance = document.querySelector('.balance');

const formatNaira = new Intl.NumberFormat("en-NG", {
	currency: "NGN",
	style: "currency",
})

function setprofile() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let profile = JSON.parse(localStorage.getItem('users-accounts'));

	firstName.textContent = `${profile[ind].firstName}`;
	lastName.textContent = `${profile[ind].lastName}`;
	emailAddress.textContent = `${profile[ind].emailAddress}`;
	balance.textContent = formatNaira.format(`${Number(profile[ind]._balance)}`)

	console.log(ind, profile)
}


window.addEventListener('load', () => {
	setprofile();
	document.body.classList.add('loaded');
})
