//template
import showMenu from "./helper.js";

(() => {
	showMenu('show-icon', 'nav-menu-container', 'search-icon');
})();

let AllUserAccounts = [];
let transactionsInHistory = [];

function loadTransactionHistory() {
	let ind = JSON.parse(localStorage.getItem("user-index"));
	let currentsUserInHistory = JSON.parse(localStorage.getItem("users-accounts"))[ind]._transactionsInHistory;
	if (currentsUserInHistory) {
		transactionsInHistory = currentsUserInHistory;
	}
}

const formatNaira = new Intl.NumberFormat("en-NG", {
	currency: "NGN",
	style: "currency",
});

function setTransactionHistory() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let transactionHistory = JSON.parse(localStorage.getItem('users-accounts'));
	let historyContainer = document.querySelector('.transactionsOut-container');

	transactionHistory[ind]._transactionsHistory.forEach((history) => {

		let card = document.createElement('div');
		card.className = 'transaction-card flex justify-between text-center p-4 rounded-lg bg-white shadow-md mb-2 border-2 border-slate-300';

		let timeContainer = document.createElement('div');
		let amountContainer = document.createElement('div');

		let time = document.createElement('p');
		let source = document.createElement('p');
		let amount = document.createElement('p');
		let btn = document.createElement('button');
		let trashCan = document.createElement('span');

		btn.className = 'hover:text-red-500 text-xl transition-all';
		trashCan.className = 'fas fa-trash-alt';
		source.className = 'font-bold';
		time.className = 'font-semibold';
		amount.className = 'text-red-600 font-semibold'

		time.appendChild(document.createTextNode(`${history.time}`));
		source.innerHTML = `Source : <span class="text-gray-500"> ${history.bankName}</span>`
		amount.appendChild(document.createTextNode(`-${formatNaira.format(Number(history.amount))}`));
		btn.appendChild(trashCan);
		timeContainer.appendChild(time);
		amountContainer.appendChild(amount);

		card.appendChild(timeContainer);
		card.appendChild(source);
		card.appendChild(amountContainer);
		card.appendChild(btn);
		historyContainer.append(card);

		btn.addEventListener('click', () => {
			alert('clicked');
		});
	})

}

let historyInContainer = document.querySelector('.transactionsIn-container');
function setTransactionInHistory() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let transactionInHistory = JSON.parse(localStorage.getItem('users-accounts'));

	transactionInHistory[ind]._transactionsInHistory.forEach((history, index) => {
		let card = document.createElement('div');
		card.className = 'transaction-card flex justify-between text-center p-4 rounded-lg bg-white shadow-md mb-2 border-2 border-slate-300';

		let timeContainer = document.createElement('div');
		let amountContainer = document.createElement('div');

		let time = document.createElement('p');
		let source = document.createElement('p');
		let amount = document.createElement('p');
		let btn = document.createElement('button');
		let trashCan = document.createElement('span');

		btn.className = 'hover:text-red-500 text-xl transition-all';
		trashCan.className = 'fas fa-trash-alt';
		source.className = 'font-bold';
		time.className = 'font-semibold';
		amount.className = 'text-green-600 font-semibold'

		time.appendChild(document.createTextNode(`${history.time}`));
		source.innerHTML = `Source : <span class="text-gray-500"> ${history.sourceName}</span>`
		amount.appendChild(document.createTextNode(`+${formatNaira.format(Number(history.amount))}`));
		btn.appendChild(trashCan);
		timeContainer.appendChild(time);
		amountContainer.appendChild(amount);

		card.appendChild(timeContainer);
		card.appendChild(source);
		card.appendChild(amountContainer);
		card.appendChild(btn);
		historyInContainer.append(card);

		btn.addEventListener('click', () => {
			deleteTransaction(index);
		});
	});
}

function deleteTransaction(index) {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	AllUserAccounts = JSON.parse(localStorage.getItem('users-accounts'));

	AllUserAccounts[ind]._transactionsInHistory.splice(index, 1);
	localStorage.setItem('users-accounts', JSON.stringify(AllUserAccounts));
	historyInContainer.innerHTML = '';
}


addEventListener('load',() => {
	setTransactionHistory();
	setTransactionInHistory();
	loadTransactionHistory();
})

window.addEventListener('load', () => {
	document.body.classList.add('loaded');
})
