export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._popupCloseBtn = this._popup.querySelector(".popup__btn-close");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
}

  close = () => {
    this._popup.classList.remove("popup_opened");
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
    this._popup.addEventListener('mousedown', (evt) => this._handleMouseClick(evt));
  }
}
