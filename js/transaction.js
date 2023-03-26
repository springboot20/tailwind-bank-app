import showMenu, { addActive } from "./helper.js";

(() => {
  showMenu("show-icon", "navigation", "search-icon", "fa-bars");
})();

addEventListener("load", () => {
  addActive("active", "a");
  document.body.classList.add("loaded");
});

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
let transactionHistory = [];
let balance = 0;

function getPreviousTransactionHistoryState() {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  let currentUserTransactionHistory = JSON.parse(
    localStorage.getItem("users-accounts")
  )[ind]._transactionsHistory;
  if (currentUserTransactionHistory) {
    transactionHistory = currentUserTransactionHistory;
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

addEventListener("load", () => {
  getPreviousTransactionHistoryState();
  getPreviousBalance();
});

const select = document.querySelector("select#bank-name");
const accountnumber = document.getElementById("account-number");
const accountname = document.getElementById("account-name");
const amount = document.getElementById("amount");

let error = document.querySelector(".error-notification-message");
let success = document.querySelector(".notification-message");

const transferForm = document.getElementById("transaction-form");

const setTransactionHistory = () => {
  let bankname = select.value;
  console.log(bankname);

  let newTransactionsHistory = {
    bankName: bankname,
    accountName: accountname.value,
    accountNumber: accountnumber.value,
    amount: Number(amount.value),
    time: new Date().toLocaleString(),
  };

  let ind = JSON.parse(localStorage.getItem("user-index"));
  AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

  transactionHistory.push(newTransactionsHistory);
  AllUserAccounts[ind]._transactionsHistory = transactionHistory;
  localStorage.setItem("users-accounts", JSON.stringify(AllUserAccounts));
};

const setBalance = () => {
  let ind = JSON.parse(localStorage.getItem("user-index"));
  AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));

  let prevBalance = JSON.parse(localStorage.getItem("users-accounts"))[ind]
    ._balance;

  if (parseInt(prevBalance) < parseInt(Number(amount.value))) {
    alert("Insufficient balance");
  } else {
    let newBalance = parseInt(prevBalance) - parseInt(Number(amount.value));
    balance = newBalance;
    AllUserAccounts[ind]._balance = balance;

    setTimeout(() => {
      window.location.href = transferForm.getAttribute("action");
    }, 5000);
  }

  localStorage.setItem("users-accounts", JSON.stringify(AllUserAccounts));

  console.log(prevBalance);
  console.log(AllUserAccounts);
};

transferForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let fields = Array.from(document.querySelectorAll(".field"));
  if (
    select.value === "" ||
    accountnumber.value === "" ||
    accountname.value === "" ||
    amount.value === ""
  ) {
    fields.forEach((field) => {
      field.classList.add("error", "shake");
      field.classList.remove("valid");
    });
  } else {
    fields.forEach((field) => {
      field.classList.add("valid");
      field.classList.remove("error", "shake");
    });

    setTransactionHistory();
    setBalance();
    console.log(AllUserAccounts);
  }

  setTimeout(() => {
    fields.forEach((field) => {
      field.classList.remove("error", "shake");
    });
  }, 2000);
});
