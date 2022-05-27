
export class Card {
  constructor(data, cardSelector, handleOpenPreview, handleLikeClickAdd, handleLikeClickRemove, handleRemoveCard) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleOpenPreview = handleOpenPreview;
    this._cardSelector = cardSelector;
    this._handleLikeClickAdd = handleLikeClickAdd;
    this._handleLikeClickRemove = handleLikeClickRemove;
    this._handleRemoveCard = handleRemoveCard;
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
    this._cardLikeBtn = this._card.querySelector('.card__like-btn');
    this._cardLikeCount = this._card.querySelector('.cards__like-count');
    this._cardDeleteBtn = this._card.querySelector(".card__delete-btn")
    this._popupDeleteBtn = document.querySelector('.popup__btn-close_type_delete')
    this._cardImage = this._card.querySelector('.card__image')
    this._cardTitle = this._card.querySelector(".card__title")
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._cardLikeCount.textContent = String(this._likes.length);
    this._isLiked();
    this._isOwner();
    this._setActionListeners();
    return this._card;
  }

  _isOwner() {
    if (this._userId !== this._ownerId) {
      this._removeIconTrash(this._cardDeleteBtn);
    }
  }

  _isLiked() {
    this._likes.find((user) => {
      if (user._id === this._userId) {
        this.addLike();
       }
    });
  }

  addLike() {
    this._cardLikeBtn.classList.add("card__like-btn_active");
  }

  removeLike() {
    this._cardLikeBtn.classList.remove("card__like-btn_active");
  }

  setCountLike(data) {
    this._cardLikeCount.textContent = String(data.likes.length);
  }

  _removeIconTrash(element) {
    element.remove();
    element = null;
  }
  removeCards() {
    this._card.remove();
    this._card = null;
  }

  _setActionListeners() {
    this._cardDeleteBtn.addEventListener("click", () => {
      this._handleRemoveCard()
    });
    this._cardLikeBtn.addEventListener("click", () => {
      if (this._cardLikeBtn.classList.contains("card__like-btn_active")) {
        this._handleLikeClickRemove();
      } else {
        this._handleLikeClickAdd();
      }
    });
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPreview(this._name, this._link)
    });
  }
}



