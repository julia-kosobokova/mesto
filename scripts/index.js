const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupProfile = document.querySelector('.popup_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close-button');

const popupElement = document.querySelector('.popup_element');
const closeButtonElement = popupElement.querySelector('.popup__close-button');

const popupImage = document.querySelector('.popup_image');
const closeButtonImage = popupImage.querySelector('.popup__close-button');

const nameProfileInput = popupProfile.querySelector('.popup__input_type_name');
const descriptionProfileInput = popupProfile.querySelector('.popup__input_type_description');
const nameProfile = document.querySelector('.profile__name');
const descriptionProfile = document.querySelector('.profile__description');
const profileForm = popupProfile.querySelector('.popup__form');

const nameElementInput = popupElement.querySelector('.popup__input_type_name');
const linkElementInput = popupElement.querySelector('.popup__input_type_link');
const elementForm = popupElement.querySelector('.popup__form');

// Открытие popup
function openPopup(popup) {
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

editButton.addEventListener('click', () => openPopupProfile());
addButton.addEventListener('click', () => openPopupElement());

//Закрытие popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

closeButtonProfile.addEventListener('click', () => closePopup(popupProfile));
closeButtonElement.addEventListener('click', () => closePopup(popupElement));
closeButtonImage.addEventListener('click', () => closePopup(popupImage));

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  nameProfile.textContent = nameProfileInput.value;
  descriptionProfile.textContent = descriptionProfileInput.value;

  closePopup(popupProfile);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

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

  const likeButton = elementClone.querySelector('.element__like');
  const trashButton = elementClone.querySelector('.element__trash');

  const imageElement = elementClone.querySelector('.element__image');
  const captionElement = elementClone.querySelector('.element__caption');

  captionElement.textContent = caption;
  imageElement.src = image;
  imageElement.alt = caption;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  trashButton.addEventListener('click', function () {
    elementClone.remove();
  });

  imageElement.addEventListener('click', function (evt) {
    openPopupImage(evt.target.src, evt.target.alt);
  });

  elements.prepend(elementClone);
}

const elements = document.querySelector('.elements__list');

// функция перебора массива
initialCards.forEach(function (card) {
  createElement(card.name, card.link);
});

// Функция открытия карточки
function openPopupImage(link, caption) {
  const image = popupImage.querySelector('.popup__image');
  const text = popupImage.querySelector('.popup__text');

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

  createElement(nameElementInput.value, linkElementInput.value);

  closePopup(popupElement);
}

elementForm.addEventListener('submit', handleElementFormSubmit);