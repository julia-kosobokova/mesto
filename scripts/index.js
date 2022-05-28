const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const buttonCloseProfile = popupProfile.querySelector('.popup__close-button');

const popupElement = document.querySelector('.popup_element');
const buttonCloseElement = popupElement.querySelector('.popup__close-button');

const popupImage = document.querySelector('.popup_image');
const buttonCloseImage = popupImage.querySelector('.popup__close-button');

const inputProfileName = popupProfile.querySelector('.popup__input_type_name');
const inputProfileDescription = popupProfile.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const formProfile = popupProfile.querySelector('.popup__form');

const inputElementName = popupElement.querySelector('.popup__input_type_name');
const inputElementLink = popupElement.querySelector('.popup__input_type_link');
const formElement = popupElement.querySelector('.popup__form');

const elementTemplate = document.querySelector('#element-template').content;

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
function closePopup(popup) {
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


// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  nameProfile.textContent = inputProfileName.value;
  descriptionProfile.textContent = inputProfileDescription.value;

  closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);

// функция создания новой карточки
function createElement(caption, image) {
  const elementClone = elementTemplate.querySelector('.element').cloneNode(true);

  const buttonLike = elementClone.querySelector('.element__like');
  const buttonTrash = elementClone.querySelector('.element__trash');

  const imageElement = elementClone.querySelector('.element__image');
  const captionElement = elementClone.querySelector('.element__caption');

  captionElement.textContent = caption;
  imageElement.src = image;
  imageElement.alt = caption;

  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  buttonTrash.addEventListener('click', function () {
    elementClone.remove();
  });

  imageElement.addEventListener('click', function (evt) {
    openPopupImage(evt.target.src, evt.target.alt);
  });

  return elementClone;
}

const elements = document.querySelector('.elements__list');

// функция перебора массива
initialCards.forEach(function (card) {
  const element = createElement(card.name, card.link);
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
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  const element = createElement(inputElementName.value, inputElementLink.value);
  elements.prepend(element);

  closePopup(popupElement);
}

formElement.addEventListener('submit', handleElementFormSubmit);