const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const nameElement = document.querySelector('.profile__name');
const descriptionElement = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');

function openPopup() {
    popupElement.classList.add('popup_opened');

    nameInput.value = nameElement.textContent;
    descriptionInput.value = descriptionElement.textContent;
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
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);