/**
 * FORM SCRIPT SCOPE
*/
import showMenu from "./helper.js"

(() => {
	showMenu('show-icon', 'nav-menu-container', 'search-icon');
})();

let AllUserAccounts = [];
let transactionsInHistory = [];
let balance = 0;

function getPreviousTransactionInHistory() {
	let ind = JSON.parse(localStorage.getItem("user-index"));
	let currentUserTransactionsInHistory = JSON.parse(localStorage.getItem("users-accounts"))[ind]._transactionsHistory;
	if (currentUserTransactionsInHistory) {
		transactionsInHistory = currentUserTransactionsInHistory;
	}
}

function getPreviousBalance() {
	let ind = JSON.parse(localStorage.getItem("user-index"));
	let currentUserBalance = JSON.parse(localStorage.getItem("users-accounts"))[ind]
		._balance;
	if (currentUserBalance) {
		balance = currentUserBalance;
	}
}

let sourcename = document.querySelector('select#source-name');
let amount = document.getElementById('amount');
let msg = document.getElementById('message');

const setTransactionsInHistory = () => {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	AllUserAccounts = JSON.parse(localStorage.getItem('users-accounts'));

	let newTransactionsInHistory = {
		time: new Date().toLocaleString(),
		sourceName: sourcename.value,
		message: msg.value,
		amount: Number(amount.value)
	};

	transactionsInHistory.push(newTransactionsInHistory);
	AllUserAccounts[ind]._transactionsInHistory = transactionsInHistory
	localStorage.setItem("users-accounts", JSON.stringify(AllUserAccounts));
}

const setBalance = () => {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	AllUserAccounts = JSON.parse(localStorage.getItem('users-accounts'));

	let transactionAmount = JSON.parse(localStorage.getItem('users-accounts'))[ind]._balance;
	let newBalance = parseInt(transactionAmount) + parseInt(Number(amount.value))

	balance = newBalance;
	AllUserAccounts[ind]._balance += balance;
	localStorage.setItem('users-accounts', JSON.stringify(AllUserAccounts));

	console.log(transactionAmount);
	console.log(AllUserAccounts);
	console.log(newBalance, 'At line 89 in vscode');
}

document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();

	setTransactionsInHistory();
	setBalance();

	setTimeout(() => {
		window.location.href = document.querySelector('form').getAttribute('action');
	}, 2500)
})

window.addEventListener('load', () => {
	document.body.classList.add('loaded');
	getPreviousBalance();
	getPreviousTransactionInHistory();
})
