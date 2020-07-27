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
  donationsEditableCustomRadioInput,
  donationsNonEditableRadioInputs,
  donationsEditableRadioInput,
  donationsRadioTextInput,
  donationsRadioTextInputError,
  selectCheckRadioValue,
} from '../utils/constants.js';

function selectEditableRadioInput() {
  donationsEditableRadioInput.checked = true;
  donationsRadioTextInput.required = true;
}

function focusOnRadioTextInput() {
  setTimeout(() => {
    donationsRadioTextInput.focus();
  }, 0);
  donationsRadioTextInput.blur();
  donationsRadioTextInput.required = true;
}

function setEditableRadioValueToRadioTextValue(e) {
  donationsEditableRadioInput.value = e.target.value.replace('$', '');
}

function removeEditableRadioError() {
  donationsRadioTextInput.required = false;
  donationsRadioTextInputError.classList.remove(
    'donations__input-error_active',
  );
}

donationsRadioTextInput.addEventListener('click', selectEditableRadioInput);
donationsEditableCustomRadioInput.addEventListener(
  'click',
  focusOnRadioTextInput,
);
donationsRadioTextInput.addEventListener(
  'input',
  setEditableRadioValueToRadioTextValue,
);
donationsNonEditableRadioInputs.forEach((input) => {
  input.addEventListener('change', removeEditableRadioError);
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
