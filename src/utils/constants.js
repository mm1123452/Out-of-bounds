const carouselList = document.querySelectorAll('.carousel');
const donateBtn = document.querySelector('.donations__submit-button');
const formElement = document.querySelector('.donations__form');
const settingsForValidation = {
  inputSelector: '.donations__input',
  submitButtonSelector: '.donations__submit-button',
  inactiveButtonClass: 'donations__submit-button_type_inactive',
  inputErrorClass: 'donations__input_type_error',
  errorClass: 'donations__input-error_active',
};

export { carouselList, donateBtn, formElement, settingsForValidation };
