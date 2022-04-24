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
const namesAddInputError = popupTypeAdd.querySelector('.names-input-error');
const imageAddInputError = popupTypeAdd.querySelector('.image-url-error');
const nameEditInputError = popupTypeEdit.querySelector('.name-input-error');
const whoEditInputError = popupTypeEdit.querySelector('.who-input-error');
const cardsList = document.querySelector(".cards__list");
export const popupPreviewDescription = popupTypePreview.querySelector(".popup__preview-description");
export const popupPreviewImage = popupTypePreview.querySelector(".popup__preview-image");
const popupBtnEdit = document.querySelector('.popup__btn-save_type_edit');
const popupBtnAdd = document.querySelector('.popup__btn-save_type_add');

const validationArray = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_type_inactive',
  inputErrorClass: 'popup__input_type_error',
};

const formList = Array.from(document.querySelectorAll(validationArray.formSelector))

formList.forEach((formElement) => {
  const formValid = new FormValidator(validationArray, formElement);
  formValid.enableValidation()
});

function renderCard(cardContent, template) {
  const card = new Card(cardContent, template);
  const element = card.createCard();
  cardsList.prepend(element);
}

initialCards.forEach(function (card) {
  renderCard(card, '.cards-template')
})

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

function editPopup() {
  enabledPopupBtn();
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  openPopup(popupTypeEdit);
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

function enabledPopupBtn() {
  popupBtnEdit.disabled = false;
  popupBtnEdit.classList.remove('popup__btn-save_type_inactive');
}

function resetPopupAddForm() {
  popupBtnAdd.classList.add('popup__btn-save_type_inactive');
  popupBtnAdd.disabled = true;
  popupInputNames.classList.remove('popup__input_type_error')
  popupInputImage.classList.remove('popup__input_type_error')
  namesAddInputError.textContent = '';
  imageAddInputError.textContent = '';
  formElementAdd.reset();
}

function resetPopupEditForm() {
  popupInputName.classList.remove('popup__input_type_error')
  popupInputDescription.classList.remove('popup__input_type_error')
  nameEditInputError.textContent = '';
  whoEditInputError.textContent = '';
}

profileEditBtn.addEventListener("click", () => {
  resetPopupEditForm();
  editPopup();
});

profileAddBtn.addEventListener("click", () => {
  resetPopupAddForm();
  openPopup(popupTypeAdd);
});

formElementEdit.addEventListener("submit", handleFormSubmitEdit);
formElementAdd.addEventListener("submit", handleFormSubmitAdd);
popupCloseBtnEdit.addEventListener("click", () => closePopup(popupTypeEdit));
popupCloseBtnAdd.addEventListener("click", () => closePopup(popupTypeAdd));
