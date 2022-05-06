import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup,  handleFormSubmit) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._selectorPopup.querySelector('.popup__form');
    this._inputArray = this._selectorPopup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const arrValues= {};
    this._inputArray.forEach((input) => {
      arrValues[input.name] = input.value;
    });
    return arrValues;
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
