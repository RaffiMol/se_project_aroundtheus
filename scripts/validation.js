// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  // const { inputErrorClass } = options;
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  // const { inputErrorClass } = options;
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "blank";
  errorMessageEl.classList.remove(errorClass);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disable = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disable = false;
  }
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function setEventListener(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(".modal__button");
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListener(formEl, options);
    //look for all inputs inside form
    //loop through all inputs to see if all are valid
    //if input is invalid
    //get validation method
    //add error class to input
    //display error message
    //disable button
    //if all inputs are valid
    //enable button
    //reset error messages
  });
}

const config = {
  formSelector: ".js-modal-form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
