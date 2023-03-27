//template
import showMenu, { addActive } from "./helper.js";

(() => {
  showMenu("show-icon", "navigation", "search-icon", "fa-bars");
  addActive("active", "a");
})();

(() => {
  let win = window;
  let doc = win.document;
  let ele = doc.documentElement;
  let storage = localStorage;

  let prefer_key = "theme";
  let pref = storage.getItem(prefer_key);

  let dark = "dark";
  let light = "light";
  let toggle = doc.getElementById("checkbox");
  let mode = storage.getItem("theme");
  let modeText = doc.querySelector(".mode-txt");
  let moonIcon = doc.querySelector(".moon");
  let sunIcon = doc.querySelector(".sun");

  if (mode !== null && mode === dark) {
    toggle.setAttribute("checked", true);
    modeText.textContent = "Dark mode";

    moonIcon.style.opacity = "1";
    sunIcon.style.opacity = "0";
  }

  let defaultTheme = light;
  let active = defaultTheme === dark;

  let activateTheme = (theme) => {
    ele.classList.remove(dark, light);
    ele.classList.add(theme);

    active = theme === dark;
  };

  if (pref === dark) activateTheme(dark);
  if (pref === light) activateTheme(light);

  if (!pref) {
    let preferTheme = (theme) => {
      return `(prefers-color-scheme: ${theme})`;
    };

    if (win.matchMedia(preferTheme(dark)).matches) {
      activateTheme(dark);
    } else if (win.matchMedia(preferTheme(light)).matches) {
      activateTheme(light);
    } else {
      activateTheme(defaultTheme);
    }

    win.matchMedia(preferTheme(dark)).addEventListener("change", (event) => {
      if (event.matches) activateTheme(dark);
    });
    win.matchMedia(preferTheme(light)).addEventListener("change", (event) => {
      if (event.matches) activateTheme(light);
    });
  }

  if (toggle) {
    toggle.style.visibility = "visible";

    toggle.addEventListener(
      "change",
      () => {
        if (active) {
          activateTheme(light);
          modeText.textContent = "Light mode";
          storage.setItem(prefer_key, light);
          moonIcon.style.opacity = "0";
          sunIcon.style.opacity = "1";
        } else {
          activateTheme(dark);
          modeText.textContent = "Dark mode";
          storage.setItem(prefer_key, dark);
          moonIcon.style.opacity = "1";
          sunIcon.style.opacity = "0";
        }
      },
      true
    );
  }
})();

let AllUserAccounts = [];
let transactionInHistory = [];

function loadState() {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  let currentUserInHistory = JSON.parse(localStorage.getItem("users-accounts"))[
    ind
  ]._transactionsInHistory;
  if (currentUserInHistory) {
    transactionInHistory = currentUserInHistory;
  }
}

const formatNaira = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  style: "currency",
});

let historyContainer = document.querySelector(".transactionsOut-container");
function setTransactionHistory() {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

  AllUserAccounts[ind]._transactionsHistory.forEach((history) => {
    let card = document.createElement("div");
    card.className =
      "transaction-card flex justify-between gap-6 p-[0.75rem] rounded-lg bg-white shadow-md mb-2 border-2 border-slate-300";

    let timeContainer = document.createElement("div");
    let amountContainer = document.createElement("div");
    let sourceContainer = document.createElement("div");

    sourceContainer.className = "flex flex-col text-left";
    let time = document.createElement("p");
    let source = document.createElement("p");
    let destination = document.createElement("p");
    let amount = document.createElement("p");

    source.className = "font-bold";
    destination.className = "font-bold";
    time.className = "font-semibold";
    amount.className = "text-red-600 font-semibold";

    time.appendChild(document.createTextNode(`${history.time}`));
    source.innerHTML = `Source : <span class="text-gray-500"> ${history.bankName}</span>`;
    destination.innerHTML = `Destination :	<span class="text-gray-500" > ${history.accountName}</span> `;
    amount.appendChild(
      document.createTextNode(`-${formatNaira.format(Number(history.amount))}`)
    );
    timeContainer.appendChild(time);
    amountContainer.appendChild(amount);
    sourceContainer.appendChild(source);
    sourceContainer.appendChild(destination);

    card.appendChild(timeContainer);
    card.appendChild(sourceContainer);
    card.appendChild(amountContainer);
    historyContainer.append(card);
  });
}

let historyInContainer = document.querySelector(".transactionsIn-container");
function setTransactionInHistory() {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

  AllUserAccounts[ind]._transactionsInHistory.forEach((history) => {
    let card = document.createElement("div");
    card.className =
      "transaction-card flex justify-between gap-6 p-[0.75rem] rounded-lg bg-white shadow-md mb-2 border-2 border-slate-300";

    let timeContainer = document.createElement("div");
    let amountContainer = document.createElement("div");

    let time = document.createElement("p");
    let source = document.createElement("p");
    let amount = document.createElement("p");

    source.className = "font-bold";
    time.className = "font-semibold";
    amount.className = "text-green-600 font-semibold";

    time.appendChild(document.createTextNode(`${history.time}`));
    source.innerHTML = `Source : <span class="text-gray-500"> ${history.sourceName}</span>`;
    amount.appendChild(
      document.createTextNode(`+${formatNaira.format(Number(history.amount))}`)
    );
    timeContainer.appendChild(time);
    amountContainer.appendChild(amount);

    card.appendChild(timeContainer);
    card.appendChild(source);
    card.appendChild(amountContainer);
    historyInContainer.appendChild(card);
  });
}

const clearbtn = document.getElementById("clear-btn");

function clearTransaction() {
  let emptyInHistory = [];
  let emptyHistory = [];

  let ind = JSON.parse(localStorage.getItem("user-index"));
  AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

  AllUserAccounts[ind]._transactionsHistory = emptyHistory;
  AllUserAccounts[ind]._transactionsInHistory = emptyInHistory;
  localStorage.setItem("users-accounts", JSON.stringify(AllUserAccounts));

  historyInContainer.innerHTML = "";
  historyContainer.innerHTML = "";
}
clearbtn.addEventListener("click", clearTransaction);

window.addEventListener("load", () => {
  setTransactionHistory();
  setTransactionInHistory();

  loadState();
  document.body.classList.add("loaded");
});
