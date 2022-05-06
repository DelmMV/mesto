
export class Card {
  constructor({data, handleOpenPreview}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleOpenPreview = handleOpenPreview;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  createCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector('.card__image')

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._card.querySelector(".card__title").textContent = this._name;
    this._setActionListeners();
    return this._card;
  }

  _removeCards() {
    this._card.remove();
    this._card = null;
  }

  _handleLikeButton() {
    this._card.querySelector('.card__like-btn').classList.toggle("card__like-btn_active");
  }

  _setActionListeners() {
    this._card.querySelector(".card__delete-btn").addEventListener("click", () => {
      this._removeCards();
    });
    this._card.querySelector(".card__like-btn").addEventListener("click", () => {
      this._handleLikeButton()
    });
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPreview(this._name, this._link)
    });
  }
}



