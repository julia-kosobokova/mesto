import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, validation) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._validation = validation;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.popup__input');
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',
            (evt) => this._handleFormSubmit(evt, this._getInputValues()));
    }

    close() {
        super.close();
        this._validation.resetValidation();
    }
}