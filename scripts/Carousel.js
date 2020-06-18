class Carousel {
  constructor(carouselElement) {
    this._carouselElement = carouselElement;
  }

  _changeIndicator(direction) {
    const carouselIndicators = this._carouselElement.querySelectorAll('.carousel__indicator');
    if (direction > 0) {
      carouselIndicators[this._counter - 1].classList.remove('carousel__indicator_active');
      carouselIndicators[this._counter].classList.add('carousel__indicator_active');
    }
    if (direction < 0) {
      carouselIndicators[this._counter + 1].classList.remove('carousel__indicator_active');
      carouselIndicators[this._counter].classList.add('carousel__indicator_active');
    }
    if (direction === 0) {
      carouselIndicators[this._counter].classList.remove('carousel__indicator_active');
      carouselIndicators[0].classList.add('carousel__indicator_active');
    }
  }

  _rotate(direction) {
    const carouselTrack = this._carouselElement.querySelector('.carousel__track');
    carouselTrack.style.transition = "transform 0.6s ease-in-out";
    this._counter += direction;
    carouselTrack.style.transform = 'translateX(' + ( -this._size * this._numberOfSlides * this._counter ) + 'px)';
    this._changeIndicator(direction);
  }

  _restart() {
    const carouselTrack = this._carouselElement.querySelector('.carousel__track');
    carouselTrack.style.transition = "transform 0.6s ease-in-out";
    carouselTrack.style.transform = 'translateX(' + 0 + 'px)';
    this._changeIndicator(0);
    this._counter = 0;
  }

  _setEventListeners() {
    const carouselTrack = this._carouselElement.querySelector('.carousel__track');
    const prevButton = this._carouselElement.querySelector('.carousel__slide-button_type_prev');
    const nextButton = this._carouselElement.querySelector('.carousel__slide-button_type_next');
    //Button Listeners
    nextButton.addEventListener('click', () => {
      carouselTrack.style.animationPlayState = "paused";
      if(this._counter >= this._numberOfTransitions) { return;}
      this._rotate(1);
    });

    prevButton.addEventListener('click', () => {
      carouselTrack.style.animationPlayState = "paused";
      if(this._counter <= 0) { return; }
      this._rotate(-1);
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
      this._setCarousel();
      carouselTrack.style.transform = 'translateX(' + ( -this._size * this._numberOfSlides * this._counter ) + 'px)';
    });
  }

  _interval() {
    const carouselTrack = this._carouselElement.querySelector('.carousel__track');
    setInterval(() => {
      if(carouselTrack.style.animationPlayState !== "paused"){
        if(this._counter >= this._numberOfTransitions) {
          this._restart();
        }
        else {
          this._rotate(1);
        }
      }
    }, 8000);
  }

  _setIndicators() {
    const carouselTrack = this._carouselElement.querySelector('.carousel__track');

    //Inset indicator buttons to HTML.
    const button = [];
    for(let i=0; i<this._numberOfTransitions + 1; i++){
      button[i] = document.createElement("BUTTON");
      button[i].classList.add('carousel__indicator');
      this._carouselElement.querySelector('.carousel__indicators').appendChild(button[i]);
    }
    const carouselIndicators = this._carouselElement.querySelectorAll('.carousel__indicator');
    carouselIndicators[0].classList.add('carousel__indicator_active');
    carouselTrack.style.transform = 'translateX(' + ( -this._size * this._numberOfSlides * this._counter ) + 'px)';
  }

  _setCarousel() {
    const carouselSlides = this._carouselElement.querySelectorAll('.carousel__slide');
    this._counter = 0;
    const style = getComputedStyle(carouselSlides[0]);
    this._size = carouselSlides[0].clientWidth + parseInt(style.getPropertyValue('margin-right'), 10);
    this._numberOfSlides = Math.floor(screen.width / this._size);
    this._numberOfTransitions = (carouselSlides.length % this._numberOfSlides) ? Math.floor(carouselSlides.length / this._numberOfSlides) : (carouselSlides.length / this._numberOfSlides - 1);
  }

  generateCarousel() {
    this._setCarousel();
    this._setIndicators();
    this._setEventListeners();
    this._interval();
  }1
}

export { Carousel };
