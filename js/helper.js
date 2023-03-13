//template
/**
 *
 * @param {*} openId
 * @param {*} menuId
 * @returns
 */
const showMenu = (openId, menuId, searchId) => {
	const menu = document.querySelector(`.${menuId}`)
	const openBtn = document.querySelector(`.${openId}`)
	const searchBtn = document.querySelector(`.${searchId}`)

	if (openBtn && menu) {
		openBtn.addEventListener("click", () => {
			menu.classList.toggle("open");
		})
		searchBtn.addEventListener('click', () => {
			menu.classList.toggle('open')
		})
	}
}

export default showMenu
