
const showInputError = (formPopupElement, inputElement,  errorMessage, config) => {
  const errorElement = formPopupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage;
}

const hideInputError = (formPopupElement, inputElement, config) => {
  const errorElement = formPopupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.textContent = '';
}

const checkInputValidity = (formPopupElement, inputElement, config) => {
  if(!inputElement.validity.valid) {
    showInputError(formPopupElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formPopupElement, inputElement, config)
  }
};

const setEventListeners = (formPopupElement, config) => {
  const inputList = Array.from(formPopupElement.querySelectorAll(config.inputSelector))
  const buttonElement = formPopupElement.querySelector(config.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, config)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formPopupElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  });
}

const hasInvalidInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState =  (inputList, buttonElement, config) => {
  if(hasInvalidInputs(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formPopupElement) => {
    formPopupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formPopupElement, config)
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_type_inactive',
  inputErrorClass: 'popup__input_type_error',
});
