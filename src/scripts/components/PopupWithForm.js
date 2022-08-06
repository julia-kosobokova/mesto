import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._saveButton = this._form.querySelector('.popup__save-button');
        this._saveButtonOriginalText = this._saveButton.textContent;
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',
            (evt) => {
                this._handleFormSubmit(this._getInputValues());
                evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
            }
        );
    }

    close() {
        super.close();
        this._form.reset();       
    }

    replaceSaveButtonText(text) {
        this._saveButton.textContent=text;
    }

    restoreSaveButtonText() {
        this._saveButton.textContent=this._saveButtonOriginalText;
    }
}