import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image');
        this._text = this._popup.querySelector('.popup__text');
    }

    // Функция открытия карточки
    open(link, caption) {
        super.open();
        this._image.src = link;
        this._image.alt = caption;
        this._text.textContent = caption;
    }
}