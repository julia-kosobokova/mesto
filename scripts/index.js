const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popupElement.querySelector('body .popup__close-button');

function openPopup() {
    popupElement.classList.add('popup_opened');

    const nameInput = document.querySelector('.popup__input_type_name');
    const descriptionInput = document.querySelector('.popup__input_type_description');
    const nameElement = document.querySelector('.profile__name');
    const descriptionElement = document.querySelector('.profile__description');

    nameInput.value = nameElement.innerText;
    descriptionInput.value = descriptionElement.innerText;
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

const formElement = document.querySelector('.popup__form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    const nameInput = document.querySelector('.popup__input_type_name');
    const descriptionInput = document.querySelector('.popup__input_type_description');
    const nameElement = document.querySelector('.profile__name');
    const descriptionElement = document.querySelector('.profile__description');

    nameElement.innerText = nameInput.value;
    descriptionElement.innerText = descriptionInput.value;

    popupElement.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);