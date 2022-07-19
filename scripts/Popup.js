export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }
    open() {
        console.log('Popup.open');
        this._popup.classList.add('popup_opened');
        this._escEventListener = (evt) => escPopup(evt);
  }
    
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._escEventListener);
        this._popup.removeEventListener('mousedown', this._closeOverlay);
          }
    
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
        this._close(this._popup);
            }
          }
    
    setEventListeners() {
        document.addEventListener('keydown', this._escEventListener);
        this._popup.addEventListener('mousedown', this._closeOverlay);
    }

    ///Закрытые popup кликом на overlay
    _closeOverlay(evt) {
        if (evt.target === evt.target.closest(this._popup)) {
            this._close(evt.target);
        }
    }
}