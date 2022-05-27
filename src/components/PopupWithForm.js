import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector('.popup__form');
    this._inputArray = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector(".popup__btn-save");
    this._oldValueSubmitButton = this._submitButton.textContent;
  }

    renderLoading = (isLoading, text) => {
    if (isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._oldValueSubmitButton;
    }
  }


  _getInputValues() {
    const arrValues = {};
    this._inputArray.forEach((input) => {
      arrValues[input.name] = input.value;
    });
    return arrValues;
  }

  setInputValues(data) {
    this._inputArray.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues())
    });
  }

  close() {
    super.close();
    this._formElement.reset()
  }
}
