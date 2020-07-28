import './index.css';
import Carousel from '../components/Carousel';
import FormValidator from '../components/FormValidator';
import Api from '../components/Api';
import {
  sideMenu,
  headerMenuBtn,
  headerExitBtn,
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
  donationsRadioTextInputError
} from '../utils/constants';
import { selectCheckRadioValue } from '../utils/utils';

function toggleSideMenu() {
  sideMenu.classList.toggle('header__side-menu_show');
}

headerMenuBtn.addEventListener('click', toggleSideMenu);
headerExitBtn.addEventListener('click', toggleSideMenu);

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
    'donations__input-error_active'
  );
}

donationsRadioTextInput.addEventListener('click', selectEditableRadioInput);
donationsEditableCustomRadioInput.addEventListener(
  'click',
  focusOnRadioTextInput
);
donationsRadioTextInput.addEventListener(
  'input',
  setEditableRadioValueToRadioTextValue
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

const api = new Api({ baseUrl, headers });
donateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.textContent = 'Thank You!';

  const data = {
    Name: nameInput.value,
    Surname: surnameInput.value,
    Email: emailInput.value,
    Pledge: selectCheckRadioValue(Array.from(donationAmount))
  };

  api.postPledge(data);

  e.target.parentNode.reset();
});
