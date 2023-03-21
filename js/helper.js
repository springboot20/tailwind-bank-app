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
			menu.classList.add('open');
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
export default showMenu
export { addActive}
