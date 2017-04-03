'use strict';
var storedPassword = "c6ba9115ef009d382426814ea9abc560";
var password = document.querySelector(".password");
var submitBtn = document.querySelector(".submit");
var passwordError = document.querySelector(".form__password-error");
var captcha = document.querySelector(".captcha-overlay");
var captchaInput = document.querySelector(".captcha__input");
var captchaBtnYes = document.querySelector(".captcha__btn--submit");
var captchaBtnCansel = document.querySelector(".captcha__btn--cansel");
var salt = "justRandomSalt";
var attempt = 0;
var newPasswordValue;
var passwordValueSalt;
var hash;

function validate() {
  var errorNode = this.parentNode.parentNode.querySelector(".form__error");
  var span = document.createElement("span");

  this.classList.remove("invalid");
  if (errorNode) {
    errorNode.parentNode.removeChild(errorNode);
  }

  if (!this.validity.valid) {
    this.classList.add("form__input-invalid");
    this.parentNode.parentNode.appendChild(span);
    span.classList.add("form__error");
    span.innerHTML = this.getAttribute(
      this.validity.valueMissing ? "data-error" : "data-pattern-error");
  }
};

var form = document.querySelector("form");
var inputs = form.querySelectorAll("input");

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("blur", validate);
  inputs[i].addEventListener("invalid", validate);
};

form.addEventListener("invalid", function(event) {
  event.preventDefault();
}, true);

submitBtn.addEventListener("click", function() {
  attempt += 1;
  if (attempt === 5) {
    document.querySelector(".captcha__input").focus();
    submitBtn.disabled = true;
    captcha.style.opacity = "1";
    captcha.style.visibility = "visible";
    captchaInput.focus();
  }
});

captchaBtnYes.addEventListener("click", function() {
  submitBtn.removeAttribute("disabled");
  captcha.style.visibility = "hidden";
  captcha.style.opacity = "0";
  attempt = 0;
});

captchaBtnCansel.addEventListener("click", function() {
  submitBtn.removeAttribute("disabled");
  captcha.style.visibility = "hidden";
  captcha.style.opacity = "0";
  attempt = 4;
});

document.querySelector("form").addEventListener("submit", function(event) {
  localStorage.name = document.querySelector(".login").value;
  passwordValueSalt = password.value + salt;
  hash = hex_md5(passwordValueSalt);
  newPasswordValue = hash;
  if (this.checkValidity() && (newPasswordValue === storedPassword)) {
    // alert("Successful submission");
    window.location.href = "success.html";
    event.preventDefault();
  } else {
    passwordError.innerHTML = "Неправильный пароль";
    event.preventDefault();
  }
});
