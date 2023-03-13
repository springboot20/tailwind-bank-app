//template
import showMenu from "./helper.js";

(() => {
	showMenu('show-icon', 'nav-menu-container', 'search-icon');
})();

function loadTransactionHistory() {
	return JSON.parse(localStorage.getItem('users-accounts'));
}






function setTransactionHistory() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let transactionHistory = JSON.parse(localStorage.getItem('users-accounts'));

	console.log(transactionHistory)
}
window.addEventListener('load', () => {
	setTransactionHistory();

	document.body.classList.add('loaded');
})
