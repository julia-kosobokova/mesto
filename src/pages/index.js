import '../pages/index.css';
import {initialCards} from '../scripts/cards.js';
import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';

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

const popupCard = document.querySelector('.popup_element');

const inputProfileName = popupProfile.querySelector('.popup__input_type_name');
const inputProfileDescription = popupProfile.querySelector('.popup__input_type_description');

const formProfile = popupProfile.querySelector('.popup__form');

//const inputElementName = popupCard.querySelector('.popup__input_type_name');
//const inputElementLink = popupCard.querySelector('.popup__input_type_link');
const formCard = popupCard.querySelector('.popup__form');

const profileValidation = new FormValidator(options, formProfile);
const cardValidation = new FormValidator(options, formCard);
profileValidation.enableValidation();
cardValidation.enableValidation();

const instancePopupProfile = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
const instancePopupCard = new PopupWithForm('.popup_element', handleCardFormSubmit);
const instancePopupImage = new PopupWithImage('.popup_image');
instancePopupProfile.setEventListeners();
instancePopupCard.setEventListeners();
instancePopupImage.setEventListeners();

const instanceUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// Popup окна редактирования профиля
function openPopupProfile() {
  const userInfo = instanceUserInfo.getUserInfo();
  inputProfileName.value = userInfo.name;
  inputProfileDescription.value = userInfo.description;
  profileValidation.resetValidation();
  instancePopupProfile.open();
}

// Popup окна добавления карточки
function openPopupCard() {
  instancePopupCard.open();
  cardValidation.resetValidation();
}

buttonEdit.addEventListener('click', () => openPopupProfile());
buttonAdd.addEventListener('click', () => openPopupCard());

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt, inputValues) {
  instanceUserInfo.setUserInfo(inputValues);
  instancePopupProfile.close();
}

function createCard(caption, image) {
  const card = new Card(caption, image, '#element-template', openPopupImage);
  const element = card.generateCard();
  return element;
}

//Создание экземпляра класса Section для заполнения блока с карточками
const cardsSection = new Section({
  items: initialCards,
  renderer: (name, link) => createCard(name, link)
}, '.elements__list');
cardsSection.generate();

// Функция открытия карточки
function openPopupImage(link, caption) {
  instancePopupImage.open(link, caption);
}

// Обработчик «отправки» формы добавления карточки, хотя пока
// она никуда отправляться не будет
function handleCardFormSubmit(evt, inputValues) {
  const card = createCard(inputValues.name, inputValues.link);
  cardsSection.addItem(card);
  instancePopupCard.close();
}