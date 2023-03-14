import showMenu from "./helper.js";

(() => {
	showMenu("show-icon", "nav-menu-container", "search-icon");
})();

const navLinks = document.querySelectorAll(".nav-item a.nav-link");
function linkAction() {
	navLinks.forEach((n) => n.classList.remove("active-link"));
	this.classList.add("active-link");

	const navMenu = document.querySelector(`.nav-menu-container`);
	navMenu.classList.remove("show");
}
navLinks.forEach((m) => m.addEventListener("click", linkAction));

addEventListener("load", () => {
	document.body.classList.add("loaded");
});

let AllUserAccounts = [];
let transactionHistory = [];
let balance = 0;

function getPreviousTransactionHistoryState() {
	let ind = JSON.parse(localStorage.getItem("user-index"));
	let currentUserTransactionHistory = JSON.parse(localStorage.getItem("users-accounts"))[ind]._transactionsHistory;
	if (currentUserTransactionHistory) {
		transactionHistory = currentUserTransactionHistory;
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

addEventListener("load", () => {
	getPreviousTransactionHistoryState();
	getPreviousBalance();
});

const select = document.querySelector("select#bank-name");
const accountnumber = document.getElementById("account-number");
const accountname = document.getElementById("account-name");
const amount = document.getElementById("amount");

const transferForm = document.getElementById("transaction-form");

const setTransactionHistory = () => {
	let bankname = select.value;
	console.log(bankname);

	let newTransactionsHistory = {
		bankName: bankname,
		accountName: accountname.value,
		accountNumber: accountnumber.value,
		amount: Number(amount.value),
		time: new Date().toLocaleString()
	};

	let ind = JSON.parse(localStorage.getItem("user-index"));
	AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

	transactionHistory.push(newTransactionsHistory);
	AllUserAccounts[ind]._transactionsHistory = transactionHistory;
	localStorage.setItem("users-accounts", JSON.stringify(AllUserAccounts));
};

const setBalance = () => {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	AllUserAccounts = JSON.parse(localStorage.getItem('users-accounts'));

	let prevBalance = JSON.parse(localStorage.getItem('users-accounts'))[ind]._balance;

	if (parseInt(prevBalance) < parseInt(Number(amount.value))) {
		alert('insufficient balance')
	} else {
		let newBalance = parseInt(prevBalance) - parseInt(Number(amount.value));
		balance = newBalance;
		AllUserAccounts[ind]._balance = balance;
		console.log(newBalance, 'At line 86 in vscode');

		setTimeout(() => {
			window.location.href = transferForm.getAttribute('action');
		}, 2500)
	}

	localStorage.setItem('users-accounts', JSON.stringify(AllUserAccounts));

	console.log(prevBalance);
	console.log(AllUserAccounts);
}

transferForm.addEventListener("submit", (event) => {
	event.preventDefault();

	let fields = Array.from(document.querySelectorAll('.field'));
	if (select.value === "" || accountnumber.value === "" || accountname.value === "" || amount.value === "") {
		fields.forEach((field) => {
			field.classList.add('error', 'shake');
			field.classList.remove('valid');
		})
	} else {

		fields.forEach((field) => {
			field.classList.add('valid');
			field.classList.remove('error', 'shake');
		});
		
		setTransactionHistory();
		setBalance();
		console.log(AllUserAccounts);
	}

	setTimeout(() => {
		fields.forEach((field) => {
			field.classList.remove('error', 'shake');
		})
	}, 2000)
});
