import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._submitButton = this._popup.querySelector(".popup__btn-save");
    this._oldValueSubmitButton = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setHandleFormSubmit(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }

  renderLoading = (isLoading, text) => {
    if (isLoading) {
      this._submitButton.textContent = text;
    } else {
      this._submitButton.textContent = this._oldValueSubmitButton;
    }
  }

}

