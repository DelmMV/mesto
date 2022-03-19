
const popupCloseBtnAdd = document.querySelector(".popup__btn-close_type_add");
const popupCloseBtnEdit = document.querySelector(".popup__btn-close_type_edit");
const popupCloseBtnPreview = document.querySelector(".popup__btn-close_type_preview");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__btn-edit");
const profileAddBtn = profile.querySelector(".profile__btn-add");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const popupTypeAdd = document.querySelector(".popup__state_type_add");
const popupTypeEdit = document.querySelector(".popup__state_type_edit");
const popupTypePreview = document.querySelector(".popup__state_type_preview")
const popupInputName = popupTypeEdit.querySelector("#name");
const popupInputWho = popupTypeEdit.querySelector("#who");
const popupInputNames = popupTypeAdd.querySelector("#names");
const popupInputImage = popupTypeAdd.querySelector("#image-url");
const formElementEdit = popupTypeEdit.querySelector(".popup__form_type_edit");
const formElementAdd = popupTypeAdd.querySelector(".popup__form_type_add");
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector(".cards-template").content;
const popupPreviewDescription = popupTypePreview.querySelector(".popup__preview-description");
const popupPreviewImage = popupTypePreview.querySelector(".popup__preview-image");

const cardsLikeBtn = (event) => event.target.classList.toggle("cards__like-btn_active");

function renderCards(cardsContent) {
  const cards = cardTemplate.querySelector(".cards__element").cloneNode(true);

  cards.querySelector(".cards__title").textContent = cardsContent.name;
  cards.querySelector(".cards__image").src = cardsContent.link;
  cards.querySelector(".cards__image").alt = cardsContent.name;
  setActionListeners(cards);
  cardsList.prepend(cards);
}
function render() {
  initialCards.forEach(renderCards);
}

render();

function openPreview(cards) {
  popupPreviewDescription.textContent = cards.querySelector(".cards__title").textContent;
  popupPreviewImage.src = cards.querySelector(".cards__image").src;
  popupPreviewImage.alt = cards.querySelector(".cards__title").textContent;
  openPopup(popupTypePreview)
}

function setActionListeners(cards) {
  cards.querySelector(".cards__delete-btn").addEventListener("click", removeCards);
  cards.querySelector(".cards__like-btn").addEventListener("click", cardsLikeBtn);
  cards.querySelector(".cards__image").addEventListener("click", () => openPreview(cards));
}

function removeCards(event) {
  const card = event.currentTarget.closest(".cards__element");
  card.remove();
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function editPopup() {
  openPopup(popupTypeEdit)
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

profileEditBtn.addEventListener("click", editPopup);
profileAddBtn.addEventListener("click", () => openPopup(popupTypeAdd));
formElementEdit.addEventListener("submit", formSubmitHandlerEdit);
formElementAdd.addEventListener("submit", formSubmitHandlerAdd);
popupCloseBtnEdit.addEventListener("click", () => closePopup(popupTypeEdit));
popupCloseBtnAdd.addEventListener("click", () => closePopup(popupTypeAdd));
popupCloseBtnPreview.addEventListener("click", () => closePopup(popupTypePreview));

