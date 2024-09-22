const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
    header.classList.toggle ("sticky", this.window.scrollY > 0);
});

// Proofs swiper effect
const slider = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let currentIndex = 0;
let autoSwipeInterval;
let startX, endX; // Declare variables for touch coordinates

// Clone the slides for seamless looping
function cloneSlides() {
  const firstSlide = slides[0].cloneNode(true);
  const lastSlide = slides[slides.length - 1].cloneNode(true);
  slider.appendChild(firstSlide); // Add clone to end
  slider.insertBefore(lastSlide, slides[0]); // Add clone to start
}

// Show next slide with continuous loop
function showNextSlide() {
  currentIndex = (currentIndex + 1) % (totalSlides + 2); // Account for clones
  if (currentIndex === totalSlides + 1) {
    // Reset to the first slide after the clone
    slider.style.transition = 'none';
    slider.style.transform = `translateX(0%)`;
    currentIndex = 1;
    setTimeout(() => {
      slider.style.transition = 'transform 0.8s ease-in-out';
      updateSlidePosition();
    }, 50);
  } else {
    updateSlidePosition();
  }
}

// Show previous slide with continuous loop
function showPreviousSlide() {
  currentIndex = (currentIndex - 1 + totalSlides + 2) % (totalSlides + 2); // Account for clones
  if (currentIndex === 0) {
    // Reset to the last slide before the first clone
    slider.style.transition = 'none';
    slider.style.transform = `translateX(-${totalSlides * 100}%)`;
    currentIndex = totalSlides;
    setTimeout(() => {
      slider.style.transition = 'transform 0.8s ease-in-out';
      updateSlidePosition();
    }, 50);
  } else {
    updateSlidePosition();
  }
}

// Update the slide position based on currentIndex
function updateSlidePosition() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Start auto swipe
function startAutoSwipe() {
  autoSwipeInterval = setInterval(showNextSlide, 3000);
}

// Stop auto swipe
function stopAutoSwipe() {
  clearInterval(autoSwipeInterval);
}

// Handle touch start
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  stopAutoSwipe();
});

// Handle touch end
slider.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
  startAutoSwipe();
});

// Handle swipe based on the direction
function handleSwipe() {
  if (startX > endX + 50) {
    // Swiped left, go to the next slide
    showNextSlide();
  } else if (startX < endX - 50) {
    // Swiped right, go to the previous slide
    showPreviousSlide();
  }
}

// Pause on hover
slider.addEventListener('mouseover', stopAutoSwipe);
slider.addEventListener('mouseout', startAutoSwipe);

// Initialize slider and auto swipe
cloneSlides();
startAutoSwipe();
