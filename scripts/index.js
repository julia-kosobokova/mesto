const editButton=document.querySelector('.profile__edit-button');
const addButton=document.querySelector('.profile__add-button');
const popupProfile=document.querySelector('.popup_profile');
const popupElement=document.querySelector('.popup_element');
const closeButtonProfile=popupProfile.querySelector('.popup__close-button');
const closeButtonElement=popupElement.querySelector('.popup__close-button');

const nameProfileInput=popupProfile.querySelector('.popup__input_type_name');
const descriptionProfileInput=popupProfile.querySelector('.popup__input_type_description');
const nameProfile=document.querySelector('.profile__name');
const descriptionProfile=document.querySelector('.profile__description');
const profileForm = popupProfile.querySelector('.popup__form');

const nameElementInput=popupElement.querySelector('.popup__input_type_name');
const linkElementInput=popupElement.querySelector('.popup__input_type_link');
const elementForm = popupElement.querySelector('.popup__form');

//открытие popup
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

// Popup окна редактирования профиля
function openPopupProfile() {
  openPopup(popupProfile);
  nameProfileInput.value = nameProfile.textContent;
  descriptionProfileInput.value = descriptionProfile.textContent;
}

// Popup окна добавления карточки
function openPopupElement() {
  openPopup(popupElement);
  nameElementInput.value = '';
  linkElementInput.value = '';
}

editButton.addEventListener('click',()=>openPopupProfile());
addButton.addEventListener('click',()=>openPopupElement());

//закрытие popup
function closePopup (popup) {
  popup.classList.remove('popup_opened');
}

closeButtonProfile.addEventListener('click',()=>closePopup(popupProfile));
closeButtonElement.addEventListener('click',()=>closePopup(popupElement));

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function profileFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  nameProfile.textContent = nameProfileInput.value;
  descriptionProfile.textContent = descriptionProfileInput.value;

  closePopup(popupProfile);
}

profileForm.addEventListener('submit', profileFormSubmitHandler);

//Карточки
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// функция создания новой карточки
function createElement(caption, image) {
  const elementTemplate = document.querySelector('#element-template').content;
  
  const elementClone = elementTemplate.querySelector('.element').cloneNode(true);

  elementClone.querySelector('.element__caption').textContent = caption;
  elementClone.querySelector('.element__image').src = image;
  elementClone.addEventListener('click',function (evt){
    evt.target.classList.toggle('element__like_active');
  });

  elements.prepend(elementClone);
}

const elements = document.querySelector('.elements__list');

// функция перебора массива
initialCards.forEach(function (card) {
  createElement(card.name, card.link);
});

// Обработчик «отправки» формы добавления карточки, хотя пока
// она никуда отправляться не будет
function elementFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  createElement(nameElementInput.value, linkElementInput.value);

  closePopup(popupElement);
}

elementForm.addEventListener('submit', elementFormSubmitHandler);