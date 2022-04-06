
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
const namesAddInputError = popupTypeAdd.querySelector('.names-input-error');
const imageAddInputError = popupTypeAdd.querySelector('.image-url-error');
const nameEditInputError = popupTypeEdit.querySelector('.name-input-error');
const whoEditInputError = popupTypeEdit.querySelector('.who-input-error');
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector(".cards-template").content;
const popupPreviewDescription = popupTypePreview.querySelector(".popup__preview-description");
const popupPreviewImage = popupTypePreview.querySelector(".popup__preview-image");
const popupBtnEdit = document.querySelector('.popup__btn-save_type_edit');
const popupBtnAdd = document.querySelector('.popup__btn-save_type_add');


const handleLikeButton = (event) => event.target.classList.toggle("card__like-btn_active");

function renderCards(cardsContent) {
  const cards = cardTemplate.querySelector(".card").cloneNode(true);

  cards.querySelector(".card__title").textContent = cardsContent.name;
  cards.querySelector(".card__image").src = cardsContent.link;
  cards.querySelector(".card__image").alt = cardsContent.name;
  setActionListeners(cards);
  return cards;
}

function createCard(data) {
  const cards = renderCards(data)
  cardsList.prepend(cards);
}

function openPreview(cards) {
  popupPreviewDescription.textContent = cards.querySelector(".card__title").textContent;
  popupPreviewImage.src = cards.querySelector(".card__image").src;
  popupPreviewImage.alt = cards.querySelector(".card__title").textContent;
  openPopup(popupTypePreview)
}

function setActionListeners(cards) {
  cards.querySelector(".card__delete-btn").addEventListener("click", removeCards);
  cards.querySelector(".card__like-btn").addEventListener("click", handleLikeButton);
  cards.querySelector(".card__image").addEventListener("click", () => openPreview(cards));
}

function removeCards(event) {
  const card = event.currentTarget.closest(".card");
  card.remove();
}

function resetPopupAddForm() {
  popupInputNames.classList.remove('popup__input_type_error')
  popupInputImage.classList.remove('popup__input_type_error')
  namesAddInputError.textContent = '';
  imageAddInputError.textContent = '';
  formElementAdd.reset();

}

function resetPopupEditForm() {
  popupBtnAdd.classList.add('popup__btn-save_type_inactive');
  popupBtnAdd.disabled = true;
  popupInputName.classList.remove('popup__input_type_error')
  popupInputDescription.classList.remove('popup__input_type_error')
  nameEditInputError.textContent = '';
  whoEditInputError.textContent = '';
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleKeyEsc)
  document.removeEventListener('click', handleMouseClick)
  resetPopupAddForm()
  resetPopupEditForm()
}

function disabledPopupBtn() {
  popupBtnEdit.disabled = false;
  popupBtnEdit.classList.remove('popup__btn-save_type_inactive');
}

function openPopup(popup) {
  document.addEventListener('click', handleMouseClick);
  document.addEventListener('keydown', handleKeyEsc);
  popup.classList.add("popup_opened");
}

function editPopup() {
  disabledPopupBtn()
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  openPopup(popupTypeEdit)
}


function handlerFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopup(popupTypeEdit);
}

function handlerFormSubmitAdd(evt) {
  evt.preventDefault();
  createCard({name: popupInputNames.value, link: popupInputImage.value});
  closePopup(popupTypeAdd);
  formElementAdd.reset();
}

function handleKeyEsc(evt) {
  const popup = document.querySelector('.popup_opened')
  if(evt.key === 'Escape') {
    closePopup(popup)
  }
}

function handleMouseClick() {
  const popup = document.querySelector('.popup_opened')
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__btn-close')) {
      closePopup(popup)
    }
  })
}

initialCards.forEach(createCard);

profileEditBtn.addEventListener("click", editPopup);
profileAddBtn.addEventListener("click", () => openPopup(popupTypeAdd));
formElementEdit.addEventListener("submit", handlerFormSubmitEdit);
formElementAdd.addEventListener("submit", handlerFormSubmitAdd);
popupCloseBtnEdit.addEventListener("click", () => closePopup(popupTypeEdit));
popupCloseBtnAdd.addEventListener("click", () => closePopup(popupTypeAdd));
popupCloseBtnPreview.addEventListener("click", () => closePopup(popupTypePreview));

