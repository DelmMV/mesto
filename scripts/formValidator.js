
export class FormValidator {
  constructor(list, formSelector) {
    this._formSelector = formSelector;
    this._list = list;
    this._inputSelector = list.inputSelector;
    this._submitButtonSelector = list.submitButtonSelector;
    this._inactiveButtonClass = list.inactiveButtonClass
    this._inputErrorClass = list.inputErrorClass;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
  }
  _showInputError = (inputElement, errorMessage) => {
    this._errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass)
    this._errorElement.textContent = errorMessage;
  }

  _hideInputError = (inputElement) => {
    this._errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass)
    this._errorElement.textContent = '';
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  };

  _setEventListeners = () => {
    this._checkButtonValidation();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._checkButtonValidation();
      })

    });
  }

  _hasInvalidInputs = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _checkButtonValidation = () => {
    if(this._hasInvalidInputs(this._inputList)) {
      this.toggleButtonStateOn();
    } else {
      this.toggleButtonStateOff();
    }
  }


  toggleButtonStateOn = () => {
    this._buttonElement.setAttribute("disabled", "true");
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  toggleButtonStateOff = () => {
    this._buttonElement.removeAttribute("disabled");
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  enableValidation = () => {
    this._checkButtonValidation()
    this._setEventListeners()
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._checkButtonValidation();
      });
    });
  }


  resetErrors = () => {
    this._formSelector.reset()
    this._inputList.forEach((valid) => {
      this._hideInputError(valid);
    });
    this._checkButtonValidation()
  }
}
