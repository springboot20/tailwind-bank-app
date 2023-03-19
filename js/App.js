import showMenu, { addActive, loadDetails } from "./helper.js"

/**
 *
 * @param {*} dropId
 * @param {*} dropBtn
 */

(() => {
  showMenu('show-icon', 'nav-menu-container', 'search-icon', 'fa-bars');
  addActive('active', 'a');
  loadDetails('user-email', 'user-name')
})()

addEventListener('load', () => {
  document.body.classList.add('loaded');
});

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

  if (mode !== null && mode === dark) {
    toggle.setAttribute('checked', true)
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
        activateTheme(light)
        storage.setItem(prefer_key, light)
      } else {
        activateTheme(dark)
        storage.setItem(prefer_key, dark)
      }
    }, true)
  }
})();

const amountInDollar = document.querySelector(".amount-in-dollar");
const amountInNaira = document.querySelector(".amount-in-naira");
const welcome = document.querySelector('.welcome-name')

const formatDollar = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const formatNaira = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  style: "currency",
});


function setBalance() {
  let ind = JSON.parse(localStorage.getItem('user-index'));
  let balance = JSON.parse(localStorage.getItem('users-accounts'));

  amountInNaira.textContent = formatNaira.format(`${Number(balance[ind]._balance)}`);
  amountInDollar.textContent = formatDollar.format(`${Number(balance[ind]._balance)}`);

  welcome.textContent = `${balance[ind].firstName} ${balance[ind].lastName}`
}

window.addEventListener('load', setBalance)
