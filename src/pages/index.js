import './index.css';
import Carousel from '../components/Carousel.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api'

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
  selectCheckRadioValue
} from '../utils/constants.js';

carouselList.forEach((carouselElement) => {
  const carousel = new Carousel(carouselElement);
  carousel.generateCarousel();
});

const formValidator = new FormValidator(settingsForValidation, formElement);
formValidator.enableValidation();

donateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.textContent = 'Thank You!';

  const api = new Api({baseUrl,headers});

  const data = {
    Name: nameInput.value,
    Surname: surnameInput.value,
    Email: emailInput.value,
    Pledge: selectCheckRadioValue(Array.from(donationAmount))
  }

  api.postPledge(data)

  e.target.parentNode.reset();
});
