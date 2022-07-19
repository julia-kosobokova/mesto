import {
  initialCards
} from './cards.js';
import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';
import {
  Section
} from './Section.js';
import {
  Popup
} from './Popup.js';

const options = {
  formSelector: '.form',
  fieldsetSelector: '.popup__form-set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const popupContainerProfile = popupProfile.querySelector('.popup__container');
const buttonCloseProfile = popupProfile.querySelector('.popup__close-button');

const popupElement = document.querySelector('.popup_element');
const popupContainerElement = popupElement.querySelector('.popup__container');
const buttonCloseElement = popupElement.querySelector('.popup__close-button');
const buttonSaveElement = popupElement.querySelector('.popup__save-button')

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

const profileValidation = new FormValidator(options, formProfile);
const elementValidation = new FormValidator(options, formElement);
profileValidation.enableValidation();
elementValidation.enableValidation();

// let escEventListener;

/// Открытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  escEventListener = (evt) => escPopup(evt, popup);
  document.addEventListener('keydown', escEventListener);
  popup.addEventListener('mousedown', closeOverlay);
}

const instancePopupProfile=new Popup('.popup_profile');
const instancePopupElement=new Popup('.popup_element');
const instancePopupImage=new Popup('.popup_image');

// Popup окна редактирования профиля
function openPopupProfile() {
  inputProfileName.value = nameProfile.textContent;
  inputProfileDescription.value = descriptionProfile.textContent;
  profileValidation.resetValidation();
  instancePopupProfile.open(popupProfile);
}

// Popup окна добавления карточки
function openPopupElement() {
  instancePopupElement.open(popupElement);
  inputElementName.value = '';
  inputElementLink.value = '';
  elementValidation.resetValidation();
}

buttonEdit.addEventListener('click', () => openPopupProfile());
buttonAdd.addEventListener('click', () => openPopupElement());

///Закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escEventListener);
  popup.removeEventListener('mousedown', closeOverlay);
}

/// Закрытие popup нажатием на Esc
function escPopup(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

buttonCloseProfile.addEventListener('click', () => instancePopupProfile.close());
buttonCloseElement.addEventListener('click', () => instancePopupElement.close());
buttonCloseImage.addEventListener('click', () => instancePopupImage.close());

///Закрытые popup кликом на overlay
function closeOverlay(evt) {
 if (evt.target === evt.target.closest('.popup')) {
   closePopup(evt.target);
 }
}

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  nameProfile.textContent = inputProfileName.value;
  descriptionProfile.textContent = inputProfileDescription.value;

  closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);


const elements = document.querySelector('.elements__list');

function createCard(caption, image, templateSelector, openPopupImage) {
  const card = new Card(caption, image, templateSelector, openPopupImage);
  const element = card.generateCard();
  return element;
}

//Создание экземпляра класса Section для заполнения блока с карточками
const elementsSection = new Section({
  items: initialCards,
  renderer: (name, link) => createCard(name, link, '#element-template', openPopupImage)
}, '.elements__list');
elementsSection.generate();

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
  const element = createCard(inputElementName.value, inputElementLink.value, '#element-template', openPopupImage);
  elementsSection.addItem(element);
  closePopup(popupElement);
}

formElement.addEventListener('submit', handleElementFormSubmit);