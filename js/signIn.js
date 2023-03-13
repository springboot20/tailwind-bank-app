
/**
 * SIGN UP SCOPE*
 */
let AllUserAccounts = [];

function getUserPrevAccount() {
	if (localStorage.getItem("users-accounts")) {
		AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));
	}
}

addEventListener("load", () => {
	getUserPrevAccount();
});

const sEmail = document.getElementById("sign-email");
const sPassword = document.getElementById("sign-password");
const sEField = document.querySelector(".sign-email");
const sPField = document.querySelector(".sign-password");
const formContainer = document.querySelector(".main-container");
const signForm = document.getElementById('sign-form');


function generateMessage(message, className, iconType) {
	const div = document.createElement("div");
	div.className = `alert alert-${className}`;
	div.appendChild(document.createTextNode(`${message}`));

	const icon = document.createElement("i");
	icon.className = `fas fa-${iconType}`;
	div.appendChild(icon);

	const container = document.querySelector("#main-container");
	container.insertBefore(div, formContainer);

	setTimeout(() => {
		document.querySelector(".alert").remove();
	}, 1600);
}

const signIn = (event) => {
	event.preventDefault();

	let emailValue = sEmail.value;
	let passwordValue = sPassword.value;

	let _isFound = false;
	AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

	for (let ind = 0; ind < AllUserAccounts.length; ind++) {
		let eExist = AllUserAccounts[ind].emailAddress === emailValue;
		let pExist = AllUserAccounts[ind].password === passwordValue;

		if (eExist && pExist) {
			_isFound = true;
			localStorage.setItem("user-index", JSON.stringify(ind));
			console.log(localStorage.getItem("user-index"));
		}
	}

	if (_isFound === false) {
		sEField.classList.add("shake", "error");
		sPField.classList.add("shake", "error");
	} else {
		setTimeout(() => {
			location.href = signForm.getAttribute("action");
			sEmail.value = '';
			sPassword.value = '';
		}, 2000);

		sEField.classList.add("valid");
		sPField.classList.add("valid");

		sEField.classList.remove("error");
		sPField.classList.remove("error");
	}

	setTimeout(() => {
		sEField.classList.remove("shake", "error");
		sPField.classList.remove("shake", "error");

		sEField.classList.remove("valid");
		sPField.classList.remove("valid");
	}, 2500)
};


signForm.addEventListener("submit", (event) => {
	console.log(AllUserAccounts);
	signIn(event);
});
