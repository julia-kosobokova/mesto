// Валидация форм
const showInputError = (formElement, inputElement, errorMessage, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(options.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, options) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(options.inputErrorClass);
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, options) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, options);
    } else {
      hideInputError(formElement, inputElement, options);
    }
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  const toggleButtonState = (inputList, buttonElement, options) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(options.inactiveButtonClass);
      buttonElement.disabled=true;
    } else {
      buttonElement.classList.remove (options.inactiveButtonClass);
      buttonElement.disabled=false;
    }
  }; 
  
  const setEventListeners = (formElement,options) => {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement=formElement.querySelector(options.submitButtonSelector);
    toggleButtonState(inputList,buttonElement,options);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputList,buttonElement, options);
      });
    });
  };
  
  const enableValidation = (options) => {
    const formList = Array.from(document.querySelectorAll(options.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      
    const fieldsetList=Array.from(formElement.querySelectorAll(options.fieldsetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet,options);
      });   
    });
  };
  
  // Включение валидации вызовом enableValidation
  // Все настройки передаются при вызове
  enableValidation({
    formSelector: '.form',
    fieldsetSelector: '.popup__form-set',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  }); 