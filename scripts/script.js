let popup = document.querySelector('.popup');
let popupClose = popup.querySelector ('.popup__close')



popupClose.addEventListener('click', function() {
  popup.classList.remove('popup__open');
} )

