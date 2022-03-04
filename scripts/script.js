// popup open/close
let popup = document.querySelector('.popup');
let popupClose = popup.querySelector ('.popup__btn_close');
let profile = document.querySelector ('.profile');
let profileEditBtn = profile.querySelector('.profile__btn_edit')

let nameP = profile.querySelector('.profile__title');
let whoP = profile.querySelector('.profile__subtitle');

let formElement = document.querySelector('.popup__form');
let nameInput = popup.querySelector('#name');
let nameWho = popup.querySelector('#who');

// Like active button
let likeBtn = document.querySelectorAll('.cards__like-btn');
likeBtn.forEach(function(like) {
  like.addEventListener('click', function() {
    like.classList.toggle('cards__like-btn_active')
  });
});

// Close popup
function closeP() {
  popup.classList.remove('popup_open');

  nameInput.value = nameP.textContent;
  nameWho.value = whoP.textContent;

}
popupClose.addEventListener('click', closeP)

// Edit popup
function editP() {
  popup.classList.add('popup_open')

  nameInput.value = nameP.textContent;
  nameWho.value = whoP.textContent;
}
profileEditBtn.addEventListener('click', editP)

// Save Popup Profile
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameP.textContent = nameInput.value;
  whoP.textContent = nameWho.value;

  closeP()
};

formElement.addEventListener('submit', formSubmitHandler);
