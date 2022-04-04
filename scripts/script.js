
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
  const cards = cardTemplate.querySelector(".cards__element").cloneNode(true);

  cards.querySelector(".cards__title").textContent = cardsContent.name;
  cards.querySelector(".cards__image").src = cardsContent.link;
  cards.querySelector(".cards__image").alt = cardsContent.name;
  setActionListeners(cards);
  return cards;
}

initialCards.forEach(createCard);

function createCard(data) {
  const cards = renderCards(data)
  cardsList.prepend(cards);
}


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
  handleMouseClick(popup)
  document.addEventListener('keydown', handleKeyEsc);
}

function editPopup() {
  openPopup(popupTypeEdit)
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
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

function handleKeyEsc(evt) {
  const popup = document.querySelector('.popup_opened')
  if(evt.key === 'Escape') {
    closePopup(popup)
  }
}

function handleMouseClick (popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
}

profileEditBtn.addEventListener("click", editPopup);
profileAddBtn.addEventListener("click", () => openPopup(popupTypeAdd));
formElementEdit.addEventListener("submit", formSubmitHandlerEdit);
formElementAdd.addEventListener("submit", formSubmitHandlerAdd);
popupCloseBtnEdit.addEventListener("click", () => closePopup(popupTypeEdit));
popupCloseBtnAdd.addEventListener("click", () => closePopup(popupTypeAdd));
popupCloseBtnPreview.addEventListener("click", () => closePopup(popupTypePreview));

