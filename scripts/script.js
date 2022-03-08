let popup = document.querySelector(".popup");
let popupCloseBtn = popup.querySelector(".popup__btn-close");
let profile = document.querySelector(".profile");
let profileEditBtn = profile.querySelector(".profile__btn-edit");

let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");

let formElement = document.querySelector(".popup__form");
let PopupInputName = popup.querySelector("#name");
let PopupInputWho = popup.querySelector("#who");

// Close popup
function closePopup() {
  popup.classList.remove("popup_opened");
}
popupCloseBtn.addEventListener("click", closePopup);

// Edit popup
function editPopup() {
  popup.classList.add("popup_opened");

  PopupInputName.value = profileTitle.textContent;
  PopupInputWho.value = profileSubtitle.textContent;
}
profileEditBtn.addEventListener("click", editPopup);

// Save Popup Profile
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileTitle.textContent = PopupInputName.value;
  profileSubtitle.textContent = PopupInputWho.value;

  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
