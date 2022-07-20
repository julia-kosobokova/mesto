export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._buttonClose=this._popup.querySelector('.popup__close-button');
    }

    open() {
        console.log('Popup.open');
        this._popup.classList.add('popup_opened');
        this._escEventListener = (evt) => this._handleEscClose(evt);
        this.setEventListeners();
    }
    
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escEventListener);
        this._popup.removeEventListener('mousedown', this._closeOverlay);
    }
    
    setEventListeners() {
        document.addEventListener('keydown', this._escEventListener.bind(this));
        this._popup.addEventListener('mousedown', this._closeOverlay.bind(this));
        this._buttonClose.addEventListener('click', () => this.close());
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