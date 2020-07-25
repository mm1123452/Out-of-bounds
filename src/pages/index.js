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
  headers
} from '../utils/constants.js';

carouselList.forEach((carouselElement) => {
  const carousel = new Carousel(carouselElement);
  carousel.generateCarousel();
});

const formValidator = new FormValidator(settingsForValidation, formElement);
formValidator.enableValidation();

donateBtn.addEventListener('click', (e) => {
  e.preventDefault();

  console.log(formElement)


  e.target.textContent = 'Thank You!';

  const api = new Api({baseUrl,headers});
   api.postPledge()
   .then(res => {
     console.log(res);
   })


  e.target.parentNode.reset();
});
