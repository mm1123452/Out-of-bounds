class Carousel {
  constructor(carouselElement) {
    this._carouselElement = carouselElement;
    this._counter = 0;
  }

  _changeIndicator(direction) {
    const carouselIndecators = this._carouselElement.querySelectorAll('.carousel__indicator');
    if (direction > 0) {
      carouselIndecators[this._counter - 1].classList.remove('carousel__indicator_active');
      carouselIndecators[this._counter].classList.add('carousel__indicator_active');
    }
    if (direction < 0) {
      carouselIndecators[this._counter + 1].classList.remove('carousel__indicator_active');
      carouselIndecators[this._counter].classList.add('carousel__indicator_active');
    }
    if (direction === 0) {
      carouselIndecators[this._counter].classList.remove('carousel__indicator_active');
      carouselIndecators[0].classList.add('carousel__indicator_active');
    }
  }

  _rotate(direction, carouselTrack, size, numberOfSlides) {
    carouselTrack.style.transition = "transform 0.6s ease-in-out";
    this._counter += direction;
    carouselTrack.style.transform = 'translateX(' + ( -size * numberOfSlides * this._counter ) + 'px)';
    this._changeIndicator(direction);
  }

  _restart(carouselTrack) {
    carouselTrack.style.transition = "transform 0.6s ease-in-out";
    carouselTrack.style.transform = 'translateX(' + 0 + 'px)';
    this._changeIndicator(0);
    this._counter = 0;
  }

  _setEventListeners(carouselTrack, size, numberOfSlides, numberOfTransitions) {
    const prevButton = this._carouselElement.querySelector('.carousel__slide-button_type_prev');
    const nextButton = this._carouselElement.querySelector('.carousel__slide-button_type_next');
    //Button Listeners
    nextButton.addEventListener('click', () => {
      carouselTrack.style.animationPlayState = "paused";
      if(this._counter >= numberOfTransitions) { return;}
      this._rotate(1, carouselTrack, size, numberOfSlides);
    });

    prevButton.addEventListener('click', () => {
      carouselTrack.style.animationPlayState = "paused";
      if(this._counter <= 0) { return; }
      this._rotate(-1, carouselTrack, size, numberOfSlides);
    });

    //Hover Listeners
    carouselTrack.addEventListener("mouseover", () => {
      carouselTrack.style.animationPlayState = "paused";
    });

    carouselTrack.addEventListener("mouseout", () => {
      carouselTrack.style.animationPlayState = "running";
    });
  }

  _interval(carouselTrack, size, numberOfSlides, numberOfTransitions) {
    setInterval(() => {
      if(carouselTrack.style.animationPlayState !== "paused"){
        if(this._counter >= numberOfTransitions) {
          this._restart(carouselTrack);
        }
        else {
          this._rotate(1, carouselTrack, size, numberOfSlides);
        }
      }
    }, 8000);
  }


  generateCarousel() {
    const carouselTrack = this._carouselElement.querySelector('.carousel__track');
    const carouselSlides = this._carouselElement.querySelectorAll('.carousel__slide');
    const carouselIndecators = this._carouselElement.querySelectorAll('.carousel__indicator');
    //Constants
    const style = getComputedStyle(carouselSlides[0]);
    const size = carouselSlides[0].clientWidth + parseInt(style.getPropertyValue('margin-right'), 10);
    const numberOfSlides = Math.floor(screen.width / size);
    const numberOfTransitions = (carouselSlides.length % numberOfSlides) ? Math.floor(carouselSlides.length / numberOfSlides) : (carouselSlides.length / numberOfSlides - 1);
    //Init
    carouselIndecators[0].classList.add('carousel__indicator_active');
    carouselTrack.style.transform = 'translateX(' + ( -size * numberOfSlides * this._counter ) + 'px)';
    this._setEventListeners(carouselTrack, size, numberOfSlides, numberOfTransitions);
    this._interval(carouselTrack, size, numberOfSlides, numberOfTransitions);
  }
}

export { Carousel };
