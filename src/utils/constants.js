const carouselList = document.querySelectorAll('.carousel');
const donateBtn = document.querySelector('.donations__submit-button');
const formElement = document.querySelector('.donations__form');
console.log(formElement.elements)
const settingsForValidation = {
  inputSelector: '.donations__input',
  submitButtonSelector: '.donations__submit-button',
  inactiveButtonClass: 'donations__submit-button_type_inactive',
  inputErrorClass: 'donations__input_type_error',
  errorClass: 'donations__input-error_type_active',
};

const baseUrl = "https://api.outofbound.tk"

const headers = {"Content-Type": "application/json"}

export { carouselList, donateBtn, formElement, settingsForValidation,baseUrl, headers };
