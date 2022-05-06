import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupPreviewImage = this._selectorPopup.querySelector(".popup__preview-image");
    this._popupPreviewDescription = this._selectorPopup.querySelector('.popup__preview-description')
  }
  open(name, link) {
    super.open();

    this._popupPreviewImage.src = link;
    this._popupPreviewImage.alt = name;
    this._popupPreviewDescription.textContent = name;
  }

}
