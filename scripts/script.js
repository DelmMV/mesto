
const popupCloseBtnAdd = document.querySelector(".popup__btn-close_type_add");
const popupCloseBtnEdit = document.querySelector(".popup__btn-close_type_edit");
const popupCloseBtnPreview = document.querySelector(".popup__btn-close_type_preview");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__btn-edit");
const profileAddBtn = profile.querySelector(".profile__btn-add");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const popupTypeAdd = document.querySelector(".popup_type_add");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypePreview = document.querySelector(".popup_type_preview")
const popupInputName = popupTypeEdit.querySelector(".popup__input_type_name");
const popupInputDescription = popupTypeEdit.querySelector(".popup__input_type_description");
const popupInputNames = popupTypeAdd.querySelector(".popup__input_type_names");
const popupInputImage = popupTypeAdd.querySelector(".popup__input_type_image-url");
const formElementEdit = popupTypeEdit.querySelector(".popup__form_type_edit");
const formElementAdd = popupTypeAdd.querySelector(".popup__form_type_add");
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector(".cards-template").content;
const popupPreviewDescription = popupTypePreview.querySelector(".popup__preview-description");
const popupPreviewImage = popupTypePreview.querySelector(".popup__preview-image");

const cardsLikeBtn = (event) => event.target.classList.toggle("cards__like-btn_active");

function renderCards(cardsContent) {
  const renderCards = cardTemplate.querySelector(".cards__element").cloneNode(true);

  renderCards.querySelector(".cards__title").textContent = cardsContent.name;
  renderCards.querySelector(".cards__image").src = cardsContent.link;
  renderCards.querySelector(".cards__image").alt = cardsContent.name;
  setActionListeners(renderCards);
  cardsList.prepend(renderCards);
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
  popupInputDescription.value = profileSubtitle.textContent;
}

function createCard(cardsContent) {
  const createCard = cardTemplate.querySelector(".cards__element").cloneNode(true);

  createCard.querySelector(".cards__title").textContent = cardsContent.name;
  createCard.querySelector(".cards__image").src = cardsContent.link;
  createCard.querySelector(".cards__image").alt = cardsContent.name;
  setActionListeners(createCard)
  cardsList.prepend(createCard);
}

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopup(popupTypeEdit);
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  createCard({name: popupInputNames.value, link: popupInputImage.value});
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

