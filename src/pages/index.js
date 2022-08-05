import '../pages/index.css';
import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import {Api} from '../scripts/components/Api.js';

const options = {
  formSelector: '.form',
  fieldsetSelector: '.popup__form-set',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: '2e553a64-7c1d-4473-abd0-835bab4139ba',
    'Content-Type': 'application/json'
  }
}); 

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');

const popupCard = document.querySelector('.popup_element');

const inputProfileName = popupProfile.querySelector('.popup__input_type_name');
const inputProfileDescription = popupProfile.querySelector('.popup__input_type_description');

const formProfile = popupProfile.querySelector('.popup__form');

const formCard = popupCard.querySelector('.popup__form');

const profileValidation = new FormValidator(options, formProfile);
const cardValidation = new FormValidator(options, formCard);
profileValidation.enableValidation();
cardValidation.enableValidation();

const instancePopupProfile = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
const instancePopupCard = new PopupWithForm('.popup_element', handleCardFormSubmit);
const instancePopupConfirm = new PopupWithForm('.popup_confirm', handleConfirmFormSubmit);
const instancePopupImage = new PopupWithImage('.popup_image');
instancePopupProfile.setEventListeners();
instancePopupCard.setEventListeners();
instancePopupImage.setEventListeners();

const instanceUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

api.getUserInfo()
  .then((res) => {
    instanceUserInfo.setUserInfo({name: res.name, description: res.about, avatar:res.avatar})
  })
  .catch((err) => {
    console.log(err);
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
function handleProfileFormSubmit(inputValues) {
  api.saveUserInfo(inputValues)
  .then((res) => {
    instanceUserInfo.setUserInfo(inputValues);
    instancePopupProfile.close();
  })
  .catch((err) => {
    console.log(err);
  });
}

function createCard(caption, image, likes) {
  const card = new Card(caption, image, likes, '#element-template', openPopupImage, openPopupConfirm);
  const element = card.generateCard();
  return element;
}

//Создание экземпляра класса Section для заполнения блока с карточками
const cardsSection = new Section('.elements__list');

api.getInitialCards()
  .then((initialCards) => {
      initialCards.forEach((card)=>{
      handleCardFormSubmit(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Функция открытия карточки
function openPopupImage(link, caption) {
  instancePopupImage.open(link, caption);
}

// Функция открытия окна подтверждения удаления карточки
function openPopupConfirm() {
  instancePopupConfirm.open()
}


// Обработчик «отправки» формы добавления карточки, хотя пока
// она никуда отправляться не будет
function handleCardFormSubmit(inputValues) {
    api.saveNewCard(inputValues)
    .then((res) => {
      const card = createCard(inputValues.name, inputValues.link, inputValues.likes);
      cardsSection.addItem(card);
      instancePopupCard.close();
    })
    .catch((err) => {
      console.log(err);
    });  
}

function handleConfirmFormSubmit() {
  
}