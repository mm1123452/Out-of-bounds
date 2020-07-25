import './index.css';
import Carousel from '../components/Carousel.js';
import FormValidator from '../components/FormValidator.js';
import {
  carouselList,
  donateBtn,
  formElement,
  settingsForValidation,
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
  e.target.parentNode.reset();
});
