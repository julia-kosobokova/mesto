import {initialCards} from './cards.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';

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

const popupElement = document.querySelector('.popup_element');

const inputProfileName = popupProfile.querySelector('.popup__input_type_name');
const inputProfileDescription = popupProfile.querySelector('.popup__input_type_description');

const formProfile = popupProfile.querySelector('.popup__form');

const inputElementName = popupElement.querySelector('.popup__input_type_name');
const inputElementLink = popupElement.querySelector('.popup__input_type_link');
const formElement = popupElement.querySelector('.popup__form');

const profileValidation = new FormValidator(options, formProfile);
const elementValidation = new FormValidator(options, formElement);
profileValidation.enableValidation();
elementValidation.enableValidation();

const instancePopupProfile=new PopupWithForm('.popup_profile',handleProfileFormSubmit,profileValidation);
const instancePopupElement=new PopupWithForm('.popup_element',handleElementFormSubmit,elementValidation);
const instancePopupImage=new PopupWithImage('.popup_image');
const instanceUserInfo=new UserInfo({nameSelector:'.profile__name',descriptionSelector:'.profile__description'});

// Popup окна редактирования профиля
function openPopupProfile() {
  const userInfo=instanceUserInfo.getUserInfo();
  inputProfileName.value = userInfo.name;
  inputProfileDescription.value = userInfo.description;
  profileValidation.resetValidation();
  instancePopupProfile.open();
}

// Popup окна добавления карточки
function openPopupElement() {
  instancePopupElement.open();
  inputElementName.value = '';
  inputElementLink.value = '';
  elementValidation.resetValidation();
}

buttonEdit.addEventListener('click', () => openPopupProfile());
buttonAdd.addEventListener('click', () => openPopupElement());

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt,inputValues) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const userInfo={};
  userInfo.name = inputValues.name;
  userInfo.description = inputValues.description;
  instanceUserInfo.setUserInfo(userInfo);

  instancePopupProfile.close();
}

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
  instancePopupImage.open(link, caption);
}

// Обработчик «отправки» формы добавления карточки, хотя пока
// она никуда отправляться не будет
function handleElementFormSubmit(evt,inputValues) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const element = createCard(inputValues.name, inputValues.link, '#element-template', openPopupImage);
  elementsSection.addItem(element);
  instancePopupElement.close();
}