import {popupPreviewImage, popupPreviewDescription, openPopup, popupTypePreview} from './index.js'

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.card__image').src = this._link;
    this._card.querySelector('.card__image').alt = this._name;
    this._card.querySelector(".card__title").textContent = this._name;
    this._setActionListeners();
    return this._card
  }

  _removeCards() {
    this._card.remove();
    this._card = null;
  }

  _handleLikeButton () {
    this._card.querySelector('.card__like-btn').classList.toggle("card__like-btn_active");
  }

  _openPreview() {
    popupPreviewDescription.textContent = this._name;
    popupPreviewImage.src = this._link;
    popupPreviewImage.alt = this._name;
    openPopup(popupTypePreview)
  }

  _setActionListeners() {
    this._card.querySelector(".card__delete-btn").addEventListener("click", ()=> {
      this._removeCards();
    });
    this._card.querySelector(".card__like-btn").addEventListener("click", () => {
      this._handleLikeButton()
    });
    this._card.querySelector(".card__image").addEventListener("click", () => {
      this._openPreview()
    });
  }
}



