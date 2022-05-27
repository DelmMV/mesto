import "./index.css";
import {validationArray} from "../utils/data.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import {
    profileEditBtn,
    profileAddBtn,
    profileBtn,
    profileTitle,
    profileSubtitle,
    profileAvatar,
    popupInputName,
    popupInputDescription,
    formElementEdit,
    formElementAdd,
    formElementProfile,
    cardsList,
    formTypePreviewSelector,
    formElementEditSelector,
    formElementAddSelector,
    formElementProfileSelector,
    formElementDeleteSelector,
  profileTitleSelector,
  profileSubtitleSelector,
  profileAvatarSelector,
} from "../utils/constants.js";
import Api from "../components/Api";


let userId;

const validationAddCard = new FormValidator(validationArray, formElementAdd)
const validationEditCard = new FormValidator(validationArray, formElementEdit)
const validationProfileCard = new FormValidator(validationArray, formElementProfile)
validationEditCard.enableValidation();
validationAddCard.enableValidation();
validationProfileCard.enableValidation();


function renderCard(card) {
  const cardElement = generateCard(card);
  cardListItem.addItem(cardElement);``
}


const generateCard = (data) => {
  const cardItem = new Card({
    name: data.name,
    link: data.link,
    likes: data.likes,
    _id: data._id,
    userId: userId,
    ownerId: data.owner._id,
    },
  '.cards-template',
    () => {
        popupWithImage.open(data.name, data.link)
  },
    () => {
      api
        .addLike(data._id)
        .then((res) => {
          cardItem.setCountLike(res);
          cardItem.addLike();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    () => {
      api
        .removeLike(data._id)
        .then((res) => {
          cardItem.setCountLike(res);
          cardItem.removeLike();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    () => {
      popupElementDelete.setHandleFormSubmit(() => {
          popupElementDelete.renderLoading(true, 'Удаляется...');
                api.removeCard(data._id)
          .then(() => {
            popupElementDelete.close()
          }).then(() => cardItem.removeCard())
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            popupElementDelete.renderLoading(false);
          });
      });
      popupElementDelete.open();
    }
  )
  return cardItem.createCard()
}

const cardListItem = new Section({
  item: [],
  renderer: renderCard,
}, cardsList);

cardListItem.renderItems();

const popupWithImage = new PopupWithImage(formTypePreviewSelector)
popupWithImage.setEventListeners();

const popupElementAdd = new PopupWithForm(formElementAddSelector, handleAddFormSubmit)
popupElementAdd.setEventListeners();

const popupElementEdit = new PopupWithForm(formElementEditSelector, handleEditFormSubmit)
popupElementEdit.setEventListeners();

const popupElementProfile = new PopupWithForm(formElementProfileSelector, handleProfileFormSubmit)
popupElementProfile.setEventListeners();

const popupElementDelete = new PopupWithSubmit(formElementDeleteSelector)
popupElementDelete.setEventListeners();


const userInfo = new UserInfo(profileTitle, profileSubtitle, profileAvatar);

function handleEditFormSubmit(data) {
  popupElementEdit.renderLoading(true, "Сохранение...");
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupElementEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        popupElementEdit.renderLoading(false);
    });
}

function handleAddFormSubmit(data) {
  popupElementAdd.renderLoading(true, "Сохранение...");
  api
    .addCard(data["names-input"], data["image-url"])
    .then((res) => {
      renderCard(res);
      popupElementAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupElementAdd.renderLoading(false);
    });
}

function handleProfileFormSubmit(data) {
  popupElementProfile.renderLoading(true, "Сохранение...");
  api
    .updateAvatar(data)
    .then((res)=> {
      userInfo.setUserAvatar(res);
      popupElementProfile.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupElementProfile.renderLoading(false);
  });
}

profileBtn.addEventListener('click', () => {
  validationProfileCard.resetErrors();
  const userData = userInfo.getUserInfo();
  popupElementProfile.setInputValues(userData);
  validationProfileCard.toggleButtonStateOff();
  popupElementProfile.open();
})

profileAddBtn.addEventListener('click', () => {
  validationAddCard.resetErrors();
  popupElementAdd.open();
});

profileEditBtn.addEventListener('click', () => {
  validationEditCard.resetErrors();
  const userData = userInfo.getUserInfo();
  popupElementEdit.setInputValues(userData)
  validationEditCard.toggleButtonStateOff();
  popupElementEdit.open();
});

const api = new Api({
  link: "nomoreparties.co/v1/cohort-41/",
  headers: {
      authorization: "a3c4c669-5a31-4540-bf35-d0918cf22e48",
    "content-type": "application/json",
  }
});


api.getInitialAll()
  .then(([cardsArray, userData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData)
    cardsArray.reverse().map((card) => {
      return renderCard(card)
    })
  }).catch((err) => console.log(err))




