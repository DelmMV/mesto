import "./index.css";
import {validationArray, initialCards} from "../utils/data.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";



const profile = document.querySelector(".profile");
const profileEditBtn = profile.querySelector(".profile__btn-edit");
const profileAddBtn = profile.querySelector(".profile__btn-add");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const popupTypeAdd = document.querySelector(".popup_type_add");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupInputName = popupTypeEdit.querySelector(".popup__input_type_name");
const popupInputDescription = popupTypeEdit.querySelector(".popup__input_type_description");
const popupInputNames = popupTypeAdd.querySelector(".popup__input_type_names");
const popupInputImage = popupTypeAdd.querySelector(".popup__input_type_image-url");
const formElementEdit = popupTypeEdit.querySelector(".popup__form_type_edit");
const formElementAdd = popupTypeAdd.querySelector(".popup__form_type_add");

const cardsList = ".cards__list"
const formTypePreviewSelector = ".popup_type_preview";
const formElementEditSelector = ".popup_type_edit";
const formElementAddSelector = ".popup_type_add";



const validationAddCard = new FormValidator(validationArray, formElementAdd)
const validationEditCard = new FormValidator(validationArray, formElementEdit)

const generate = (item) => {
  const cardItem = new Card({
    data: item,
    handleOpenPreview: () => {
      popupWithImage.open(item.name, item.link)
    },
  },'.cards-template')
  const card = cardItem.createCard()
  return card
}

const cardListItem = new Section({
  item: initialCards,
  renderer: (item) => {
    cardListItem.addItem(generate(item));
  },
}, cardsList);
cardListItem.insertCard(initialCards);


const popupWithImage = new PopupWithImage(formTypePreviewSelector)
popupWithImage.setEventListeners();

const popupElementAdd = new PopupWithForm(formElementAddSelector, handleAddFormSubmit)
popupElementAdd.setEventListeners();

const popupElementEdit = new PopupWithForm(formElementEditSelector, handleEditFormSubmit)
popupElementEdit.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileSubtitle);

function handleEditFormSubmit(data) {
  userInfo.setUserInfo(popupInputName, popupInputDescription);
  popupElementEdit.close();
}

function handleAddFormSubmit() {
  cardListItem.addItem(generate({
  name: popupInputNames.value,
  link: popupInputImage.value
  }))
  popupElementAdd.close()
}

profileAddBtn.addEventListener('click', () => {
  validationAddCard.resetErrors();
  validationAddCard.enableValidation();
  popupElementAdd.open();
});

profileEditBtn.addEventListener('click', () => {
  validationEditCard.resetErrors();
  validationEditCard.enableValidation();
  const userData = userInfo.getUserInfo();
  popupInputName.value = userData.name.textContent;
  popupInputDescription.value = userData.subtitle.textContent;
  validationEditCard.toggleButtonStateOff();
  popupElementEdit.open();
});
