import { PopupWithForm } from "./PopupWithForm";

export class PopupWithConfirmForm extends PopupWithForm {
    _getInputValues() {
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
}