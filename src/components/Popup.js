export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = document.querySelector(selectorPopup);
    this._popupCloseBtn = this._selectorPopup.querySelector(".popup__btn-close");
  }

  open() {
    this._selectorPopup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
}

  close = () => {
    this._selectorPopup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleMouseClick = (evt) => {
    if (evt.target.classList.contains('popup')) {
        this.close();
      }
    }
  setEventListeners() {
    this._popupCloseBtn.addEventListener('click', this.close);
    this._selectorPopup.addEventListener('mousedown', (evt) => this._handleMouseClick(evt));
  }
}
