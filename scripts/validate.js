// Валидация форм
class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._options.errorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._options.inputErrorClass);
    errorElement.classList.remove(this._options.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmit(buttonElement, this._options);
    } else {
      this._enableSubmit(buttonElement, this._options);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);

    this._formElement.addEventListener('open', () => {
      this._disableSubmit(buttonElement);
    });

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  // Блокировка кнопки submit
  _disableSubmit(buttonElement) {
    buttonElement.classList.add(this._options.inactiveButtonClass);
    buttonElement.disabled = true;
  };

  _enableSubmit(buttonElement) {
    buttonElement.classList.remove(this._options.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(this._formElement.querySelectorAll(this._options.fieldsetSelector));
    fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(fieldSet, this._options);
    });
  }
}

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(options, formElement);
    validator.enableValidation();
  });
};

// Включение валидации вызовом enableValidation
// Все настройки передаются при вызове
enableValidation({
  formSelector: '.form',
  fieldsetSelector: '.popup__form-set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});