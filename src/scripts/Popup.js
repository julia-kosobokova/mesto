export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close-button');
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._escEventListener);
        this._popup.removeEventListener('mousedown', this._overlayEventListener);
        this._buttonClose.removeEventListener('click', this._closeEventListener);
    }

    setEventListeners() {
        this._escEventListener = this._handleEscClose.bind(this);
        document.addEventListener('keydown', this._escEventListener);

        this._overlayEventListener = this._closeOverlay.bind(this);
        this._popup.addEventListener('mousedown', this._overlayEventListener);

        this._closeEventListener = this.close.bind(this);
        this._buttonClose.addEventListener('click', this._closeEventListener);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeOverlay(evt) {
        if (evt.target === this._popup) {
            this.close(evt.target);
        }
    }
}