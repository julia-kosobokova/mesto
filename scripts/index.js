const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');

const popupNewPlace = document.querySelector('.popup_new-place');
console.log(popupNewPlace);
const addButton = document.querySelector('.profile__add-button');

function openPopup() {
  popupElement.classList.add('popup_opened');

  nameInput.value = nameElement.textContent;
  descriptionInput.value = descriptionElement.textContent;
}

function openNewPlacePopup() {
  popupNewPlace.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  nameElement.textContent = nameInput.value;
  descriptionElement.textContent = descriptionInput.value;

  closePopup();
}

editButton.addEventListener('click', openPopup);
addButton.addEventListener('click', openNewPlacePopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

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

function createElement(caption, image) {
  const elementTemplate = document.querySelector('#element-template').content;
  
  const elementClone = elementTemplate.querySelector('.element').cloneNode(true);

  elementClone.querySelector('.element__caption').textContent = caption;
  elementClone.querySelector('.element__image').src = image;

  elements.append(elementClone);
}

const elements = document.querySelector('.elements__list');

// функция перебора массива
initialCards.forEach(function (card) {
  createElement(card.name, card.link);
});