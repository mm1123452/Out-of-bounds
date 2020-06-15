const carouselTrack = document.querySelector('.carousel__track');
const carouselSlides = document.querySelectorAll('.carousel__slide');
const carouselIndecators = document.querySelectorAll('.carousel__indicator');

//Buttons
const prevBtn = document.querySelector('.carousel__slide-button_type_prev');
const nextBtn = document.querySelector('.carousel__slide-button_type_next');

//Counter
let counter = 0;

//Constants
const style = getComputedStyle(carouselSlides[0]);
let size = carouselSlides[0].clientWidth + parseInt(style.getPropertyValue('margin-right'), 10);
let numberOfSlides = Math.floor(screen.width / size);
let numberOfTransitions = (carouselSlides.length % numberOfSlides) ? Math.floor(carouselSlides.length / numberOfSlides) : (carouselSlides.length / numberOfSlides - 1);

//Init
carouselIndecators[0].classList.add('carousel__indicator_active');
carouselTrack.style.transform = 'translateX(' + ( -size * numberOfSlides * counter ) + 'px)';

//Functions
function changeIndicator (direction) {
  if (direction > 0) {
    carouselIndecators[counter - 1].classList.remove('carousel__indicator_active');
    carouselIndecators[counter].classList.add('carousel__indicator_active');
  }
  else {
    carouselIndecators[counter + 1].classList.remove('carousel__indicator_active');
    carouselIndecators[counter].classList.add('carousel__indicator_active');
  }
}

function rotate(direction) {
  carouselTrack.style.transition = "transform 0.6s ease-in-out";
  counter += direction;
  carouselTrack.style.transform = 'translateX(' + ( -size * numberOfSlides * counter ) + 'px)';
  changeIndicator(direction);
}

function restart() {
  carouselTrack.style.transition = "transform 0.6s ease-in-out";
  carouselTrack.style.transform = 'translateX(' + 0 + 'px)';
  counter = 0;
  changeIndicator(-1);
}

//Animations

setInterval(
  function() {
    if(carouselTrack.style.animationPlayState !== "paused"){
      if(counter >= numberOfTransitions) {
        restart();
      }
      else {
        rotate(1);
      }
    }
  } , 7000);

//Button Listeners

nextBtn.addEventListener('click', () => {
  carouselTrack.style.animationPlayState = "paused";
  if(counter >= numberOfTransitions) { return;}
  rotate(1);
});

prevBtn.addEventListener('click', () => {
  carouselTrack.style.animationPlayState = "paused";
  if(counter <= 0) { return; }
  rotate(-1);
});

//Hover Listeners

carouselTrack.addEventListener("mouseover", () => {
  carouselTrack.style.animationPlayState = "paused";
});

carouselTrack.addEventListener("mouseout", () => {
  carouselTrack.style.animationPlayState = "running";
});

//Resize screen Listener
window.addEventListener('resize', () => {
  size = carouselSlides[0].clientWidth + parseInt(style.getPropertyValue('margin-right'), 10);
  numberOfSlides = Math.floor(screen.width / size);
  numberOfTransitions = (carouselSlides.length % numberOfSlides) ? Math.floor(carouselSlides.length / numberOfSlides) : (carouselSlides.length / numberOfSlides - 1);
  counter = 0;
  carouselTrack.style.transform = 'translateX(' + ( -size * numberOfSlides * counter ) + 'px)';
});
