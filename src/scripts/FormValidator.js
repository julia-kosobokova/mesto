// Валидация форм
export class FormValidator {
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

    toggleButtonState = () => {
        if (this._hasInvalidInput()) {
            this._disableSubmit();
        } else {
            this._enableSubmit();
        }
    };

    _setEventListeners = () => {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);

        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
            });
        });
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    // Блокировка кнопки submit
    _disableSubmit() {
        this._buttonElement.classList.add(this._options.inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    _enableSubmit() {
        this._buttonElement.classList.remove(this._options.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const fieldsetList = Array.from(this._formElement.querySelectorAll(this._options.fieldsetSelector));
        fieldsetList.forEach((fieldSet) => {
            this._setEventListeners(fieldSet);
        });
    }

    resetValidation() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}