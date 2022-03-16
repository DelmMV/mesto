
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupCloseBtnAdd = document.querySelector(".popup__btn-close_add");
const popupCloseBtnEdit = document.querySelector(".popup__btn-close_edit");
const popupCloseBtnPreview = document.querySelector(".popup__btn-close_preview");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__btn-edit");
const profileAddBtn = profile.querySelector(".profile__btn-add");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const popupTypeAdd = document.querySelector(".popup_type_add");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypePreview = document.querySelector(".popup_type_preview")
const popupInputName = popupTypeEdit.querySelector("#name");
const popupInputWho = popupTypeEdit.querySelector("#who");
const popupInputNames = popupTypeAdd.querySelector("#names");
const popupInputImage = popupTypeAdd.querySelector("#image-url");
const formElementEdit = popupTypeEdit.querySelector(".popup__form_edit");
const formElementAdd = popupTypeAdd.querySelector(".popup__form_add");
const cardsList = document.querySelector(".cards__list");

//rendering cards
function renderCards(cardsContent) {
  const cards = document.querySelector(".cards-template").content.firstElementChild.cloneNode(true);
  const cardsImage = cards.querySelector(".cards__image");
  const cardsLikeBtn = (event) => event.target.classList.toggle("cards__like-btn_active");

  function openPreview() {
    popupTypePreview.querySelector(".popup__preview-description").textContent = cardsContent.name;
    popupTypePreview.querySelector(".popup__preview-image").src = cardsContent.link;
    popupTypePreview.querySelector(".popup__preview-image").alt = cardsContent.link;
    popupTypePreview.classList.add("popup_opened");
  }
  cardsImage.addEventListener("click", openPreview);

  cards.querySelector(".cards__title").textContent = cardsContent.name;
  cardsImage.src = cardsContent.link;
  cardsImage.alt = cardsContent.name;
  setCardsActionListeners(cards);
  cards.querySelector(".cards__like-btn").addEventListener("click", cardsLikeBtn);
  cardsList.prepend(cards);
}

function removeCards(event) {
  const card = event.currentTarget.closest(".cards__element");
  card.remove();
}
function setCardsActionListeners(cards) {
  cards.querySelector(".cards__delete-btn").addEventListener("click", removeCards);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function addPopup() {
  popupTypeAdd.classList.add("popup_opened");
}

function editPopup() {
  popupTypeEdit.classList.add("popup_opened");
  popupInputName.value = profileTitle.textContent;
  popupInputWho.value = profileSubtitle.textContent;
}

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputWho.value;
  closePopup(popupTypeEdit);
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  renderCards({name: popupInputNames.value, link: popupInputImage.value});
  closePopup(popupTypeAdd);
  popupInputNames.value = '';
  popupInputImage.value = '';
}

initialCards.map(renderCards)
profileEditBtn.addEventListener("click", editPopup);
profileAddBtn.addEventListener("click", addPopup);
formElementEdit.addEventListener("submit", formSubmitHandlerEdit);
formElementAdd.addEventListener("submit", formSubmitHandlerAdd);
popupCloseBtnEdit.addEventListener("click", () => closePopup(popupTypeEdit));
popupCloseBtnAdd.addEventListener("click", () => closePopup(popupTypeAdd));
popupCloseBtnPreview.addEventListener("click", () => closePopup(popupTypePreview));
