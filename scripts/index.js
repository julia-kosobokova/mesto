const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const popupContainerProfile = popupProfile.querySelector('.popup__container');
const buttonCloseProfile = popupProfile.querySelector('.popup__close-button');

const popupElement = document.querySelector('.popup_element');
const popupContainerElement = popupElement.querySelector('.popup__container');
const buttonCloseElement = popupElement.querySelector('.popup__close-button');

const popupImage = document.querySelector('.popup_image');
const popupContainerImage = popupImage.querySelector('.popup__container');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

const inputProfileName = popupProfile.querySelector('.popup__input_type_name');
const inputProfileDescription = popupProfile.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const formProfile = popupProfile.querySelector('.popup__form');

const inputElementName = popupElement.querySelector('.popup__input_type_name');
const inputElementLink = popupElement.querySelector('.popup__input_type_link');
const formElement = popupElement.querySelector('.popup__form');

const elementTemplate = document
  .querySelector('#element-template')
  .content;

const image = popupImage.querySelector('.popup__image');
const text = popupImage.querySelector('.popup__text');

let escEventListener;

// Открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  escEventListener = (evt) => escPopup(evt, popup);
  document.addEventListener('keydown', escEventListener);
}

// Popup окна редактирования профиля
function openPopupProfile() {
  inputProfileName.value = nameProfile.textContent;
  inputProfileDescription.value = descriptionProfile.textContent;
  const event = new Event("input");
  inputProfileName.dispatchEvent(event);
  inputProfileDescription.dispatchEvent(event);
  openPopup(popupProfile);
}

// Popup окна добавления карточки
function openPopupElement() {
  openPopup(popupElement);
  inputElementName.value = '';
  inputElementLink.value = '';
}

buttonEdit.addEventListener('click', () => openPopupProfile());
buttonAdd.addEventListener('click', () => openPopupElement());

//Закрытие popup
function closePopup(popup, evt) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escEventListener);
}

// Закрытие popup нажатием на Esc
function escPopup(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

buttonCloseProfile.addEventListener('click', () => closePopup(popupProfile));
buttonCloseElement.addEventListener('click', () => closePopup(popupElement));
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));

//Закрытые popup кликом на overlay
popupProfile.addEventListener('click', () => closePopup(popupProfile));
popupElement.addEventListener('click', () => closePopup(popupElement));
popupImage.addEventListener('click', () => closePopup(popupImage));

popupContainerProfile.addEventListener('click', (evt) => evt.stopPropagation());
popupContainerElement.addEventListener('click', (evt) => evt.stopPropagation());
popupContainerImage.addEventListener('click', (evt) => evt.stopPropagation());

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  nameProfile.textContent = inputProfileName.value;
  descriptionProfile.textContent = inputProfileDescription.value;

  closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);


class Card {
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

const elements = document.querySelector('.elements__list');

// функция перебора массива
initialCards.forEach(function (cardAttributes) {
  const card = new Card(cardAttributes.name, cardAttributes.link, '#element-template');
  const element = card.generateCard();
  elements.prepend(element);
});

// Функция открытия карточки
function openPopupImage(link, caption) {
  openPopup(popupImage);
  image.src = link;
  image.alt = caption;
  text.textContent = caption;
}

// Обработчик «отправки» формы добавления карточки, хотя пока
// она никуда отправляться не будет
function handleElementFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const card = new Card(inputElementName.value, inputElementLink.value, '#element-template');
  const element = card.generateCard();

  elements.prepend(element);

  closePopup(popupElement);
}

formElement.addEventListener('submit', handleElementFormSubmit);