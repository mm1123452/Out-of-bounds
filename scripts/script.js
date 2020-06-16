import { Carousel } from "./Carousel.js";

const carouselList = document.querySelectorAll('.carousel');

carouselList.forEach((carouselElement) => {
  const carousel = new Carousel(carouselElement);
  carousel.generateCarousel();
});
