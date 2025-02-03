export default class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];

    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    // const { inputErrorClass } = options;
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    console.log(this._errorClass);
    console.log(this._inputErrorClass);
    console.log("say something");
  } //Done

  _hideInputError(inputElement) {
    // const { inputErrorClass } = options;
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  } //Done

  //   _toggleButtonState(inputElement) {
  //     let foundInvalid = false;
  //     const submitButton = this._form.querySelector(submitButtonSelector);
  //     if (!inputElement.validity.valid) {
  //       foundInvalid = true;
  //     }

  //     if (foundInvalid) {
  //       submitButton.classList.add(inactiveButtonClass);
  //       submitButton.disable = true;
  //     } else {
  //       submitButton.classList.remove(inactiveButtonClass);
  //       submitButton.disable = false;
  //     }
  //   }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  // _hasInvalidInput() {
  //   return this._inputList((inputElement) => {
  //     return !inputElement.validity.valid;
  //   });
  // }

  // toggleButtonState() {
  //   let foundInvalid = false;
  //   if (!inputElement.validity.valid) {
  //     foundInvalid = true;
  //   }
  //   if (foundInvalid) {
  //     this._disableButton();
  //   } else {
  //     this._enableButton();
  //   }
  // }

  toggleButtonState() {
    if (this._hasInvalidInput(this._input)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
      // console.log(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners(inputElement) {
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

const settings = {
  formSelector: ".js-modal-form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
