export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }

  open() {
    this._popup.classList.add("popup_opened");
}
  close() {
    this._popup.classList.remove("popup_opened");
  }

}
