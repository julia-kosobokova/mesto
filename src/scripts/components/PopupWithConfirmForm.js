import { Popup } from "./Popup";

export class PopupWithConfirmForm extends Popup {
    constructor(popupSelector, handleConfirmation) {
        super(popupSelector);

        this._handleConfirmation = handleConfirmation;
        this._form = this._popup.querySelector('.popup__form');
        this._confirmButton = this._form.querySelector('.popup__save-button');
    }

    _getAttributes() {
        return {
            handleRemoveElement: this._handleRemoveElement, 
            cardId: this._cardId,
        };
    }

    setHandleRemoveElement(handleRemoveElement) {
        this._handleRemoveElement = handleRemoveElement;
    }

    setCardId(cardId) {
        this._cardId = cardId;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',
            (evt) => {
                evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
            }
        );
        this._confirmButton.addEventListener('click', () => {
            this._handleConfirmation(this._getAttributes());
        });
    }
}