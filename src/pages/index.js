import './index.css';
import Carousel from '../components/Carousel.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api';

import {
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
  selectCheckRadioValue,
} from '../utils/constants.js';

// constants that should eventually be moved to constants.js
const editableRadioInput = document.querySelector(
  '.donations__radio-button_editable',
);
const editableCustomRadioInput = document.querySelector(
  '.donations__custom-radio-button_editable',
);
const radioTextInput = document.querySelector('.donations__input_for_radio');
const radioTextInputError = document.querySelector('#input_other-amount-error');
const nonEditableRadioInputs = Array.from(
  document.querySelectorAll('.donations__radio-button'),
).filter(
  (button) => !button.className.includes('donations__radio-button_editable'),
);

// checked radio input if text input is clicked
radioTextInput.addEventListener('click', () => {
  editableRadioInput.checked = true;
  // makes text input required now that editable button is checked
  radioTextInput.required = true;
});

// focuses on text input if radio input is clicked
editableCustomRadioInput.addEventListener('click', () => {
  radioTextInput.blur();
  setTimeout(() => {
    radioTextInput.focus();
  }, 0);
  // makes text input required now that editable button is checked
  radioTextInput.required = true;
});

// sets radio value to radio text value
radioTextInput.addEventListener('input', (e) => {
  editableRadioInput.value = e.target.value.replace('#', '');
});

// removes radio button text input required error and attribute when other radio buttons are checked
nonEditableRadioInputs.forEach((input) => {
  input.addEventListener('change', () => {
    radioTextInput.required = false;
    radioTextInputError.classList.remove('donations__input-error_active');
  });
});

carouselList.forEach((carouselElement) => {
  const carousel = new Carousel(carouselElement);
  carousel.generateCarousel();
});

const formValidator = new FormValidator(settingsForValidation, formElement);
formValidator.enableValidation();

donateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.textContent = 'Thank You!';

  const api = new Api({ baseUrl, headers });

  const data = {
    Name: nameInput.value,
    Surname: surnameInput.value,
    Email: emailInput.value,
    Pledge: selectCheckRadioValue(Array.from(donationAmount)),
  };

  api.postPledge(data);

  e.target.parentNode.reset();
});
