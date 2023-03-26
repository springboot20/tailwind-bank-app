/**
 * FORM SCRIPT SCOPE
 */
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
let transactionsInHistory = [];
let balance = 0;

function getPreviousTransactionInHistory() {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  let currentUserTransactionsInHistory = JSON.parse(
    localStorage.getItem("users-accounts")
  )[ind]._transactionsInHistory;
  if (currentUserTransactionsInHistory) {
    transactionsInHistory = currentUserTransactionsInHistory;
  }
}

function getPreviousBalance() {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  let currentUserBalance = JSON.parse(localStorage.getItem("users-accounts"))[
    ind
  ]._balance;
  if (currentUserBalance) {
    balance = currentUserBalance;
  }
}

let sourcename = document.querySelector("select#source-name");
let amount = document.getElementById("amount");
let msg = document.getElementById("message");

const setTransactionsInHistory = () => {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

  let newTransactionsInHistory = {
    _id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
    time: new Date().toLocaleString(),
    sourceName: sourcename.value,
    message: msg.value,
    amount: Number(amount.value),
  };

  transactionsInHistory.push(newTransactionsInHistory);
  AllUserAccounts[ind]._transactionsInHistory = transactionsInHistory;
  localStorage.setItem("users-accounts", JSON.stringify(AllUserAccounts));
};

const setBalance = () => {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

  let transactionAmount = JSON.parse(localStorage.getItem("users-accounts"))[
    ind
  ]._balance;
  let newBalance = parseInt(transactionAmount) + parseInt(Number(amount.value));

  balance = newBalance;
  AllUserAccounts[ind]._balance += balance;
  localStorage.setItem("users-accounts", JSON.stringify(AllUserAccounts));

  console.log(transactionAmount);
  console.log(AllUserAccounts);
  console.log(newBalance, "At line 89 in vscode");
};

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  let fields = Array.from(document.querySelectorAll(".field"));
  if (sourcename.value.trim() === "" || amount.value.trim() === "") {
    fields.forEach((field) => {
      field.classList.add("error", "shake");
      field.classList.remove("valid");
    });
  } else {
    fields.forEach((field) => {
      field.classList.add("valid");
      field.classList.remove("error", "shake");
    });

    setTransactionsInHistory();
    setBalance();

    setTimeout(() => {
      window.location.href = document
        .querySelector("form")
        .getAttribute("action");
    }, 4500);
  }

  setTimeout(() => {
    fields.forEach((field) => {
      field.classList.remove("error", "shake");
    });
  }, 3000);
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  getPreviousBalance();
  getPreviousTransactionInHistory();
});
