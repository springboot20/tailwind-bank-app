let AllUserAccounts = [];

function getUserPrevAccount() {
  if (localStorage.getItem("users-accounts")) {
    AllUserAccounts = JSON.parse(localStorage.getItem("users-accounts"));
  }
}

addEventListener("load", () => {
  getUserPrevAccount();
});

const form = document.querySelector("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const passWord = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const signButton = form.querySelector("button");

const fField = document.querySelector(".firstname");
const lField = document.querySelector(".lastname");
const eField = document.querySelector(".email");
const pField = document.querySelector(".password");
const cField = document.querySelector(".confirm-password");

const signUp = (event) => {
  event.preventDefault();

  firstname.value == ""
    ? fField.classList.add("shake", "error")
    : checkUsernameHandler(firstname, fField);
  lastname.value == ""
    ? lField.classList.add("shake", "error")
    : checkUsernameHandler(lastname, lField);
  email.value == ""
    ? eField.classList.add("shake", "error")
    : checkEmailHandler(email, eField);
  passWord.value == ""
    ? pField.classList.add("shake", "error")
    : checkPasswordHandler(passWord, pField);
  confirmPassword.value == ""
    ? cField.classList.add("shake", "error")
    : confirmHandler(confirmPassword, passWord, cField);

  let newUserAccount = {
    firstName: firstname.value,
    lastName: lastname.value,
    emailAddress: email.value,
    password: passWord.value,
    confirmPass: confirmPassword.value,
    _transactionsInHistory: [],
    _transactionsHistory: [],
    _balance: 0,
    time: new Date().toLocaleString(),
  };

  setTimeout(() => {
    fField.classList.remove("shake");
    lField.classList.remove("shake");
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    cField.classList.remove("shake");
  }, 600);

  if (
    !fField.classList.contains("error") &&
    !lField.classList.contains("error") &&
    !eField.classList.contains("error") &&
    !pField.classList.contains("error") &&
    !cField.classList.contains("error")
  ) {
    AllUserAccounts.push(newUserAccount);
    location.href = form.getAttribute("action");

    const span = document.createElement("span");
    span.className = "loader";
    signButton.textContent = `Signing Up..........`;
    signButton.disabled = true;
    signButton.append(span);
    localStorage.setItem("users-accounts", JSON.stringify(AllUserAccounts));
  }

  console.log(AllUserAccounts);

  firstname.addEventListener("keyup", () => {
    checkUsernameHandler(firstname, fField);
  });
  lastname.addEventListener("keyup", () => {
    checkUsernameHandler(lastname, lField);
  });
  email.addEventListener("keyup", () => {
    checkEmailHandler(email, eField);
  });
  passWord.addEventListener("keyup", () => {
    checkPasswordHandler(passWord, pField);
  });
  confirmPassword.addEventListener("keyup", () => {
    confirmHandler(confirmPassword, passWord, cField);
  });
};

form.addEventListener("submit", (event) => {
  signUp(event);
});

/**
 *
 * @param {*} usernameInput
 * @param {*} userField
 */
const checkUsernameHandler = (usernameInput, userField) => {
  if (usernameInput.value.length < 7) {
    userField.classList.add("error");
    userField.classList.remove("valid");

    let errorTxt = userField.querySelector(".error-txt");
    usernameInput.value != ""
      ? (errorTxt.textContent = "name input should not less than 7")
      : (errorTxt.textContent = "name input cannot be blanked");
  } else {
    userField.classList.remove("error");
    userField.classList.add("valid");
  }
};

/**
 *
 * @param {*} emailInput
 * @param {*} emailField
 */
const checkEmailHandler = (emailInput, emailField) => {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailInput.value.match(pattern)) {
    emailField.classList.add("error");
    emailField.classList.remove("valid");

    let errorTxt = emailField.querySelector(".error-txt");
    email.value != ""
      ? (errorTxt.textContent = "Enter a valid email address")
      : (errorTxt.textContent = "Email cannot be blanked");
  } else {
    emailField.classList.remove("error");
    emailField.classList.add("valid");
  }
};

/**
 *
 * @param {*} passwordInput
 * @param {*} passField
 */
const checkPasswordHandler = (passwordInput, passField) => {
  let pattern =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\_\@]+)(?=.*[a-zA-Z]).{8,16}$/;
  if (!passwordInput.value.match(pattern)) {
    passField.classList.add("error");
    passField.classList.remove("valid");

    let errorTxt = passField.querySelector(".error-txt");
    passwordInput.value != ""
      ? (errorTxt.textContent =
          "Password can only contains digits, special characters e.g (-,_,@) ,lower and upper case and should not less than 8")
      : (errorTxt.textContent = "Password cannot be blanked");
  } else {
    passField.classList.remove("error");
    passField.classList.add("valid");
  }
};

/**
 *
 * @param {*} confirmInput
 * @param {*} passwordInput
 * @param {*} conField
 */
const confirmHandler = (confirmInput, passwordInput, conField) => {
  if (confirmInput.value !== passwordInput.value) {
    conField.classList.add("error");
    conField.classList.remove("valid");

    let errorTxt = conField.querySelector(".error-txt");
    confirmInput.value !== passwordInput.value
      ? (errorTxt.textContent =
          "Confirm password must be the same with password")
      : (errorTxt.textContent = "Confirm password cannot be blanked");
  } else {
    conField.classList.remove("error");
    conField.classList.add("valid");
  }
};
