import { Carousel } from "./Carousel.js";

const carouselList = document.querySelectorAll(".carousel");
const donateBtn = document.querySelector(".donations__submit-button");

carouselList.forEach((carouselElement) => {
  const carousel = new Carousel(carouselElement);
  carousel.generateCarousel();
});

donateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.target.textContent = "Thank You!";
  e.target.parentNode.reset();
});


