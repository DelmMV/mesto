const formPopupElement = document.querySelector('.popup__form[name=popup_form_add]');
const formPopupInput = formPopupElement.querySelector('.popup__input');
const formPopupError = formPopupElement.querySelector(`.${formPopupInput.id}-error`);
console.log(formPopupError)

function enableValidation() {
  formPopupElement.addEventListener('submit', handlerFormSubmit)
  formPopupElement.addEventListener('input', handlerFormInput)
}

function handlerFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const isValid =  form.checkValidity();
  if (isValid) {
    alert("Форма валидна")
  }else{alert('Форма не валидна') }
}
function handlerFormInput(event) {
  const form = event.currentTarget;
  const input = event.target;
  setCustomError(input)
  setFieldError(input);

}

function  setCustomError(input) {
  const validity = input.validity;

  if(validity.tooShort || validity.tooLong) {
    const currentLength = input.value.length;
    const min = input.getAttribute('minlength');
    const max = input.getAttribute('maxlength');
    input.setCustomValidity(`Строка длинна ${currentLength} ${min} до ${max}`)
  }
  if(input.typeMismatch) {
    input.setCustomValidity("Это не ссылка")
  }
}

function setFieldError(input){
  const span1 = document.querySelector(`.${input.id}-error`);
  span1.textContent = input.validationMessage;
}
enableValidation();
