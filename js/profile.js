import showMenu, { addActive} from "./helper.js";

(() => {
	showMenu('show-icon', 'nav-menu-container', 'search-icon', "fa-bars");
	addActive('active', 'a');
})();

(() => {
	let win = window;
	let doc = win.document;
	let ele = doc.documentElement;
	let storage = localStorage;

	let prefer_key = 'theme';
	let pref = storage.getItem(prefer_key);

	let dark = 'dark';
	let light = 'light';
	let toggle = doc.getElementById('checkbox');
	let mode = storage.getItem('theme');
	let modeText = doc.querySelector('.mode-txt');
	let moonIcon = doc.querySelector('.moon');
	let sunIcon = doc.querySelector('.sun');

	if (mode !== null && mode === dark) {
		toggle.setAttribute('checked', true);
		modeText.textContent = 'Dark mode'
	}

	let defaultTheme = light;
	let active = (defaultTheme === dark);

	let activateTheme = (theme) => {
		ele.classList.remove(dark, light);
		ele.classList.add(theme)

		active = (theme === dark);
	}

	if (pref === dark) activateTheme(dark);
	if (pref === light) activateTheme(light);

	if (!pref) {
		let preferTheme = (theme) => {
			return `(prefers-color-scheme: ${theme})`
		}

		if (win.matchMedia(preferTheme(dark)).matches) {
			activateTheme(dark)
		} else if (win.matchMedia(preferTheme(light)).matches) {
			activateTheme(light)
		} else {
			activateTheme(defaultTheme)
		}

		win.matchMedia(preferTheme(dark)).addEventListener("change", (event) => {
			if (event.matches) activateTheme(dark);
		})
		win.matchMedia(preferTheme(light)).addEventListener("change", (event) => {
			if (event.matches) activateTheme(light);
		})
	}

	if (toggle) {
		toggle.style.visibility = 'visible';

		toggle.addEventListener('change', () => {
			if (active) {
				activateTheme(light);
				modeText.textContent = 'Light mode'
				storage.setItem(prefer_key, light);
				moonIcon.style.opacity = '0'
				sunIcon.style.opacity = '1'
			} else {
				activateTheme(dark);
				modeText.textContent = 'Dark mode'
				storage.setItem(prefer_key, dark);
				moonIcon.style.opacity = '1'
				sunIcon.style.opacity = '0'
			}
		}, true)
	}
})();

const firstName = document.querySelector('.first');
const lastName = document.querySelector('.last');
const emailAddress = document.querySelector('.email');
const balance = document.querySelector('.balance');

const formatNaira = new Intl.NumberFormat("en-NG", {
	currency: "NGN",
	style: "currency",
})

function setprofile() {
	let ind = JSON.parse(localStorage.getItem('user-index'));
	let profile = JSON.parse(localStorage.getItem('users-accounts'));

	firstName.textContent = `${profile[ind].firstName}`;
	lastName.textContent = `${profile[ind].lastName}`;
	emailAddress.textContent = `${profile[ind].emailAddress}`;
	balance.textContent = formatNaira.format(`${Number(profile[ind]._balance)}`)

	console.log(ind, profile)
}


window.addEventListener('load', () => {
	setprofile();
	document.body.classList.add('loaded');
})
