const formPopup = document.querySelector('.popup__form');
const formPopupInput = formPopup.querySelector('.popup__input');
const formPopupError = formPopup.querySelector(`.${formPopupInput.id}-error`);

const showInputError = (formPopupElement, inputElement,  errorMessage) => {
  const errorElement = formPopupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error')
  errorElement.textContent = errorMessage;
}

const hideInputError = (formPopupElement, inputElement) => {
  const errorElement = formPopupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error')
  errorElement.textContent = '';
}

const checkInputValidity = (formPopupElement, inputElement) => {
  if(!inputElement.validity.valid) {
    showInputError(formPopupElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formPopupElement, inputElement)
  }
};

const setEventListeners = (formPopupElement) => {
  const inputList = Array.from(formPopupElement.querySelectorAll('.popup__input'))
  const buttonElement = formPopupElement.querySelector('.popup__btn-save')
  toggleButtonState(inputList, buttonElement)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formPopupElement, inputElement)
      toggleButtonState(inputList, buttonElement)
    })
  });
}

const hasInvalidInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState =  (inputList, buttonElement) => {
  if(hasInvalidInputs(inputList)) {
    buttonElement.classList.add('popup__btn-save_type_inactive');
  } else {
    buttonElement.classList.remove('popup__btn-save_type_inactive');
  }
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'))
  formList.forEach((formPopupElement) => {
    formPopupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formPopupElement)
  });
}

enableValidation(formPopup, formPopupInput, formPopupError);
