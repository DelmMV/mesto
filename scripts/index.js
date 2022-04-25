import {Card} from "./Card.js";
import {initialCards} from "./initialCards.js";
import {FormValidator} from "./FormValidator.js";

const popupCloseBtnAdd = document.querySelector(".popup__btn-close_type_add");
const popupCloseBtnEdit = document.querySelector(".popup__btn-close_type_edit");
const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__btn-edit");
const profileAddBtn = profile.querySelector(".profile__btn-add");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const popupTypeAdd = document.querySelector(".popup_type_add");
const popupTypeEdit = document.querySelector(".popup_type_edit");
export const popupTypePreview = document.querySelector(".popup_type_preview");
const popupInputName = popupTypeEdit.querySelector(".popup__input_type_name");
const popupInputDescription = popupTypeEdit.querySelector(".popup__input_type_description");
const popupInputNames = popupTypeAdd.querySelector(".popup__input_type_names");
const popupInputImage = popupTypeAdd.querySelector(".popup__input_type_image-url");
const formElementEdit = popupTypeEdit.querySelector(".popup__form_type_edit");
const formElementAdd = popupTypeAdd.querySelector(".popup__form_type_add");
const cardsList = document.querySelector(".cards__list");
export const popupPreviewDescription = popupTypePreview.querySelector(".popup__preview-description");
export const popupPreviewImage = popupTypePreview.querySelector(".popup__preview-image");

const validationArray = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_type_inactive',
  inputErrorClass: 'popup__input_type_error',
};

const validationAddCard = new FormValidator(validationArray, formElementAdd)
const validationEditCard = new FormValidator(validationArray, formElementEdit)

validationAddCard.enableValidation()
validationEditCard.enableValidation()

function renderCard(template) {
  const card = new Card(template);
  const element = card.createCard();
  cardsList.prepend(element);
}

initialCards.forEach(renderCard);

export function openPopup(popup) {
  document.addEventListener('click', handleMouseClick);
  document.addEventListener('keydown', handleKeyEsc);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', handleKeyEsc);
  document.removeEventListener('click', handleMouseClick);
}

function openPopupEdit() {
  validationEditCard.resetErrors();
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  validationEditCard.toggleButtonStateOff();
  openPopup(popupTypeEdit);
}

function openPopupAdd() {
  validationAddCard.resetErrors()
  openPopup(popupTypeAdd);
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopup(popupTypeEdit);
}

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  renderCard({name: popupInputNames.value, link: popupInputImage.value}, '.cards-template');
  closePopup(popupTypeAdd);
  formElementAdd.reset();
}

function handleKeyEsc(evt) {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
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

profileEditBtn.addEventListener("click", () => {
  openPopupEdit();
});

profileAddBtn.addEventListener("click", () => {
  openPopupAdd()
});

formElementEdit.addEventListener("submit", handleFormSubmitEdit);
formElementAdd.addEventListener("submit", handleFormSubmitAdd);
popupCloseBtnEdit.addEventListener("click", () => closePopup(popupTypeEdit));
popupCloseBtnAdd.addEventListener("click", () => closePopup(popupTypeAdd));
