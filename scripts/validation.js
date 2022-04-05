
const showInputError = (formPopupElement, inputElement,  errorMessage, {...rest}) => {
  const errorElement = formPopupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(rest.inputErrorClass)
  errorElement.textContent = errorMessage;
}

const hideInputError = (formPopupElement, inputElement, {...rest}) => {
  const errorElement = formPopupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(rest.inputErrorClass)
  errorElement.textContent = '';
}

const checkInputValidity = (formPopupElement, inputElement, {...rest}) => {
  if(!inputElement.validity.valid) {
    showInputError(formPopupElement, inputElement, inputElement.validationMessage, rest)
  } else {
    hideInputError(formPopupElement, inputElement, rest)
  }
};

const setEventListeners = (formPopupElement, {inputSelector, submitButtonSelector, inactiveButtonClass, ...rest}) => {
  const inputList = Array.from(formPopupElement.querySelectorAll(inputSelector))
  const buttonElement = formPopupElement.querySelector(submitButtonSelector)
  toggleButtonState(inputList, buttonElement, inactiveButtonClass)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formPopupElement, inputElement, rest)
      toggleButtonState(inputList, buttonElement, inactiveButtonClass)
    })

  });
}

const hasInvalidInputs = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState =  (inputList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidInputs(inputList)) {
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute("disabled", "disabled");
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formPopupElement) => {
    formPopupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formPopupElement, rest)
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_type_inactive',
  inputErrorClass: 'popup__input_type_error',
});
