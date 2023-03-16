/**
 * FORM SCRIPT SCOPE
*/
import showMenu, { addActive, loadDetails } from "./helper.js"

(() => {
	showMenu('show-icon', 'nav-menu-container', 'search-icon', 'fa-bars');
	addActive('active', 'a');
	loadDetails('user-email', 'user-name');
})();

let AllUserAccounts = [];
let transactionsInHistory = [];
let balance = 0;

function getPreviousTransactionInHistory() {
	let ind = JSON.parse(localStorage.getItem("user-index"));
	let currentUserTransactionsInHistory = JSON.parse(localStorage.getItem("users-accounts"))[ind]._transactionsInHistory;
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
		_id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
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

let success = document.querySelector('.notification-message');
document.querySelector('form').addEventListener('submit', (event) => {
	event.preventDefault();

	let fields = Array.from(document.querySelectorAll('.field'));
	if (sourcename.value === "" || amount.value === "") {
		fields.forEach((field) => {
			field.classList.add('error', 'shake');
			field.classList.remove('valid');
		})
	} else {
		fields.forEach((field) => {
			field.classList.add('valid');
			field.classList.remove('error', 'shake');
		});

		setTransactionsInHistory();
		setBalance();
		success.classList.add('active')

		setTimeout(() => {
			window.location.href = document.querySelector('form').getAttribute('action');
			success.classList.remove('active');
		}, 1000)
	}

	setTimeout(() => {
		fields.forEach((field) => {
			field.classList.remove('error', 'shake');
		})
	}, 2000)
})

window.addEventListener('load', () => {
	document.body.classList.add('loaded');
	getPreviousBalance();
	getPreviousTransactionInHistory();
})


//how to generate prime numbers using loop
