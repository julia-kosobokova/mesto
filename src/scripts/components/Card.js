export class Card {
    constructor({caption, image, likes, isMine}, templateSelector, handleCardClick, handleTrashClick) {
        this._caption = caption;
        this._image = image;
        this._likes= likes;
        this._isMine = isMine;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        // вернём DOM-элемент карточки
        return cardElement;
    }

    // Обработчик клика на лайк
    _handleLikeClick() {
        this._buttonLike.classList.toggle('element__like_active');
    }

    // Обработчик клика на корзину
   // _handleTrashClick() {

        // this._elementClone.remove();
        // this._elementClone = null;
    //}

    //Создание новой карточки
    generateCard() {
        this._elementClone = this._getTemplate();

        this._buttonLike = this._elementClone.querySelector('.element__like');
        
        this._buttonTrash = this._elementClone.querySelector('.element__trash');
        if (this._isMine) {
            this._buttonTrash.classList.add('element__trash_visible');
        } else {
            this._buttonTrash.classList.remove('element__trash_visible');
        }

        this._imageElement = this._elementClone.querySelector('.element__image');
        this._captionElement = this._elementClone.querySelector('.element__caption');
        this._countLike = this._elementClone.querySelector('.element__like-count');

        this._captionElement.textContent = this._caption;
        this._imageElement.src = this._image;
        this._imageElement.alt = this._caption;
        this._countLike.textContent = this._likes.length;

        this._buttonLike.addEventListener('click', () => this._handleLikeClick());
        this._buttonTrash.addEventListener('click', () => this._handleTrashClick());
        this._imageElement.addEventListener('click', () => this._handleCardClick(this._image, this._caption));

        return this._elementClone;
    }
}