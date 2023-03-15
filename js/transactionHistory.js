//template
import showMenu, { addActive } from "./helper.js";

(() => {
	showMenu('show-icon', 'nav-menu-container', 'search-icon');
	addActive('active', 'a');
})();

let AllUserAccounts = [];
let transactionInHistory = [];

function loadState() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let currentUserInHistory = JSON.parse(localStorage.getItem('users-accounts'))[ind]._transactionsInHistory;
	if (currentUserInHistory) {
		transactionInHistory = currentUserInHistory
	}
}


const formatNaira = new Intl.NumberFormat("en-NG", {
	currency: "NGN",
	style: "currency",
});

let historyContainer = document.querySelector('.transactionsOut-container');
function setTransactionHistory() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let transactionHistory = JSON.parse(localStorage.getItem('users-accounts'));

	transactionHistory[ind]._transactionsHistory.forEach((history) => {
		let card = document.createElement('div');
		card.className = 'transaction-card flex justify-between text-center p-4 rounded-lg bg-white shadow-md mb-2 border-2 border-slate-300';

		let timeContainer = document.createElement('div');
		let amountContainer = document.createElement('div');
		let sourceContainer = document.createElement('div');

		sourceContainer.className = 'flex flex-col text-left'
		let time = document.createElement('p');
		let source = document.createElement('p');
		let destination = document.createElement('p');
		let amount = document.createElement('p');

		source.className = 'font-bold';
		destination.className = 'font-bold';
		time.className = 'font-semibold';
		amount.className = 'text-red-600 font-semibold'

		time.appendChild(document.createTextNode(`${history.time}`));
		source.innerHTML = `Source : <span class="text-gray-500"> ${history.bankName}</span>`
		destination.innerHTML = `Destination :	<span class="text-gray-500" > ${history.accountName}</span> `
		amount.appendChild(document.createTextNode(`-${formatNaira.format(Number(history.amount))}`));
		timeContainer.appendChild(time);
		amountContainer.appendChild(amount);
		sourceContainer.appendChild(source)
		sourceContainer.appendChild(destination)

		card.appendChild(timeContainer);
		card.appendChild(sourceContainer);
		card.appendChild(amountContainer);
		historyContainer.append(card);

	})
}

let historyInContainer = document.querySelector('.transactionsIn-container');
function setTransactionInHistory() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let transactionInHistory = JSON.parse(localStorage.getItem('users-accounts'));

	transactionInHistory[ind]._transactionsInHistory.forEach((history) => {
		let card = document.createElement('div');
		card.className = 'transaction-card flex justify-between text-center p-4 rounded-lg bg-white shadow-md mb-2 border-2 border-slate-300';

		let timeContainer = document.createElement('div');
		let amountContainer = document.createElement('div');

		let time = document.createElement('p');
		let source = document.createElement('p');
		let amount = document.createElement('p');

		source.className = 'font-bold';
		time.className = 'font-semibold';
		amount.className = 'text-green-600 font-semibold'

		time.appendChild(document.createTextNode(`${history.time}`));
		source.innerHTML = `Source : <span class="text-gray-500"> ${history.sourceName}</span>`
		amount.appendChild(document.createTextNode(`+${formatNaira.format(Number(history.amount))}`));
		timeContainer.appendChild(time);
		amountContainer.appendChild(amount);

		card.appendChild(timeContainer);
		card.appendChild(source);
		card.appendChild(amountContainer);
		historyInContainer.appendChild(card);
	});
}

const clearbtn = document.getElementById('clear-btn');

function clearTransaction() {
	let emptyInHistory = [];
	let emptyHistory = [];

	let ind = JSON.parse(localStorage.getItem('user-index'));
	AllUserAccounts = JSON.parse(localStorage.getItem('users-accounts'));

	AllUserAccounts[ind]._transactionsHistory = emptyHistory;
	AllUserAccounts[ind]._transactionsInHistory = emptyInHistory;
	localStorage.setItem('users-accounts', JSON.stringify(AllUserAccounts));

	historyInContainer.innerHTML = '';
	historyContainer.innerHTML = '';
}
clearbtn.addEventListener('click', clearTransaction)

window.addEventListener('load', () => {
	setTransactionHistory();
	setTransactionInHistory();

	loadState();
	document.body.classList.add('loaded');
})
