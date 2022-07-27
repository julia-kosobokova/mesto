export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._buttonClose = this._popup.querySelector('.popup__close-button');
        this._escEventListener = this._handleEscClose.bind(this);
        this._overlayEventListener = this._closeOverlay.bind(this);
        this._closeEventListener = this.close.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._escEventListener);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escEventListener);
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', this._overlayEventListener);
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