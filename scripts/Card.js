export class Card {
    constructor(caption, image, templateSelector) {
        this._caption = caption;
        this._image = image;
        this._templateSelector = templateSelector;
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
    _handleTrashClick() {
        this._elementClone.remove();
    }

    // Обработчик клика на изображение карточки
    _handleImageClick() {
        openPopupImage(this._image, this._caption);
    }

    //Создание новой карточки
    generateCard() {
        this._elementClone = this._getTemplate();

        this._buttonLike = this._elementClone.querySelector('.element__like');
        this._buttonTrash = this._elementClone.querySelector('.element__trash');

        this._imageElement = this._elementClone.querySelector('.element__image');
        this._captionElement = this._elementClone.querySelector('.element__caption');

        this._captionElement.textContent = this._caption;
        this._imageElement.src = this._image;
        this._imageElement.alt = this._caption;

        this._buttonLike.addEventListener('click', () => this._handleLikeClick());
        this._buttonTrash.addEventListener('click', () => this._handleTrashClick());
        this._imageElement.addEventListener('click', () => this._handleImageClick());

        return this._elementClone;
    }
}