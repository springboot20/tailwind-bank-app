//template
/**
 *
 * @param {*} openId
 * @param {*} menuId
 * @returns
 */
const showMenu = (openId, menuId, searchId, barId) => {
	const menu = document.querySelector(`.${menuId}`)
	const openBtn = document.querySelector(`.${openId}`)
	const searchBtn = document.querySelector(`.${searchId}`)
	const menuBtn = document.querySelector(`.${barId}`)

	if (openBtn && menu) {
		openBtn.addEventListener("click", () => {
			menu.classList.toggle("open");
		})
		searchBtn.addEventListener('click', () => {
			menu.classList.toggle('open')
		})
		menuBtn.addEventListener('click', () => {
			menu.classList.toggle('open');
		})
	}
}

let AllUsersAccounts = [];


function addActive(linkId, ele) {
	const activePage = window.location.pathname
	const links = document.querySelectorAll(`.nav-item ${ele}`);

	links.forEach(link => {
		if (link.href.includes(`${activePage}`)) {
			link.classList.add(`${linkId}`)
		}
	});

	console.log(activePage)
}

function loadDetails(emailId, nameId) {
	const userEmail = document.querySelector(`.${emailId}`);
	const userName = document.querySelector(`.${nameId}`);

	let ind = JSON.parse(localStorage.getItem('user-index'));
	AllUsersAccounts = JSON.parse(localStorage.getItem('users-accounts'));

	let email = AllUsersAccounts[ind].emailAddress;
	let firstName = AllUsersAccounts[ind].firstName;
	let lastName = AllUsersAccounts[ind].lastName;

	userEmail.innerHTML = `${email}`;
	userName.innerHTML = `${firstName} ${lastName}`;
}

export default showMenu
export { addActive, loadDetails }
