//template
import showMenu from "./helper.js";

(() => {
	showMenu('show-icon', 'nav-menu-container', 'search-icon');
})();

function loadTransactionHistory() {
	return JSON.parse(localStorage.getItem('users-accounts'));
}





const formatNaira = new Intl.NumberFormat("en-NG", {
	currency: "NGN",
	style: "currency",
})
function setTransactionHistory() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let transactionHistory = JSON.parse(localStorage.getItem('users-accounts'));
	let output = ''
	let historyContainer = document.querySelector('.transactions-container')

	transactionHistory[ind]._transactionsHistory.forEach((history) => {
		output += `
		<div class="transaction-card flex justify-between text-center p-4 rounded-lg bg-white shadow-md border-2 border-slate-300">
			<div class="time-container">
				<p class="time font-semibold text-gray-500">${history.time}</p>
			</div>
			<p class="transaction-source font-bold "> Source : <span class="text-gray-500">${history.bankName}</span> </p>
			<div class="amount-container">
				<p class="amount-transfered text-red-600 font-semibold"> - ${formatNaira.format(Number(history.amount))}</p>
			</div>
		</div>
		`
	})

	historyContainer.innerHTML = output
	console.log(output)
	console.log(transactionHistory)
}
window.addEventListener('load', () => {
	setTransactionHistory();
	loadTransactionHistory();
	document.body.classList.add('loaded');
})
