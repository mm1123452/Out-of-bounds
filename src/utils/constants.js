const carouselList = document.querySelectorAll('.carousel');
const donateBtn = document.querySelector('.donations__submit-button');
const formElement = document.querySelector('.donations__form');
const nameInput = formElement.elements.name;
const surnameInput = formElement.elements.surname;
const emailInput = formElement.elements.email;
const donationAmount = formElement.elements['donation-amount'];
const donationsEditableRadioInput = document.querySelector(
  '.donations__radio-button_editable',
);
const donationsEditableCustomRadioInput = document.querySelector(
  '.donations__custom-radio-button_editable',
);
const donationsRadioTextInput = document.querySelector(
  '.donations__input_for_radio',
);
const donationsRadioTextInputError = document.querySelector(
  '#input_other-amount-error',
);
const donationsNonEditableRadioInputs = Array.from(
  document.querySelectorAll('.donations__radio-button'),
).filter(
  (button) => !button.className.includes('donations__radio-button_editable'),
);
const selectCheckRadioValue = (radioArray) => {
  const selected = radioArray.find((item) => item.checked);
  return selected.value;
};
const settingsForValidation = {
  inputSelector: '.donations__input',
  submitButtonSelector: '.donations__submit-button',
  inactiveButtonClass: 'donations__submit-button_type_inactive',
  inputErrorClass: 'donations__input_type_error',
  errorClass: 'donations__input-error_active',
};

const baseUrl = 'https://api.outofbound.tk';

const headers = { 'Content-Type': 'application/json' };

export {
  carouselList,
  donateBtn,
  formElement,
  settingsForValidation,
  baseUrl,
  headers,
  nameInput,
  surnameInput,
  emailInput,
  donationAmount,
  donationsEditableCustomRadioInput,
  donationsNonEditableRadioInputs,
  donationsEditableRadioInput,
  donationsRadioTextInput,
  donationsRadioTextInputError,
  selectCheckRadioValue,
};
