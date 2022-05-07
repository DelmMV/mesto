import "./index.css";
import {validationArray, initialCards} from "../utils/data.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
    profileEditBtn,
    profileAddBtn,
    profileTitle,
    profileSubtitle,
    popupInputName,
    popupInputDescription,
    formElementEdit,
    formElementAdd,
    cardsList,
    formTypePreviewSelector,
    formElementEditSelector,
    formElementAddSelector,
} from "../utils/constants.js"



const validationAddCard = new FormValidator(validationArray, formElementAdd)
const validationEditCard = new FormValidator(validationArray, formElementEdit)
validationEditCard.enableValidation();
validationAddCard.enableValidation();


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
cardListItem.renderItems(initialCards);


const popupWithImage = new PopupWithImage(formTypePreviewSelector)
popupWithImage.setEventListeners();

const popupElementAdd = new PopupWithForm(formElementAddSelector, handleAddFormSubmit)
popupElementAdd.setEventListeners();

const popupElementEdit = new PopupWithForm(formElementEditSelector, handleEditFormSubmit)
popupElementEdit.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileSubtitle);

function handleEditFormSubmit(data) {
  console.log(data)
  userInfo.setUserInfo(data["name"], data["description"]);
  popupElementEdit.close();
}

function handleAddFormSubmit(data) {
  cardListItem.addItem(generate({
  name: data["names-input"],
  link: data["image-url"]
  }))
  popupElementAdd.close()
}

profileAddBtn.addEventListener('click', () => {
  validationAddCard.resetErrors();
  popupElementAdd.open();
});

profileEditBtn.addEventListener('click', () => {
  validationEditCard.resetErrors();
  const userData = userInfo.getUserInfo();
  popupInputName.value = userData.name.textContent;
  popupInputDescription.value = userData.subtitle.textContent;
  validationEditCard.toggleButtonStateOff();
  popupElementEdit.open();
});
