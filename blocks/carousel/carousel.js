import { fetchPlaceholders } from '../../scripts/aem.js';
import carouselSlideButtons from './carouselSlideButtons.js';
import createAllSlides from './carouselSlides.js';

function updateActiveSlide(slide, hasInnerIndicators) {
  const block = slide.closest('.carousel');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;
  const slides = block.querySelectorAll('.carousel-slide');
  slides.forEach((aSlide, idx) => {
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (idx !== slideIndex) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
      }
    });
  });

  const carouselSlideContents = document.querySelectorAll('.carousel-slide-content');
  carouselSlideContents.forEach((content) => {
    const hasContent = content.textContent.trim().length > 0 || content.children.length > 0;
    if (!hasContent) {
      content.classList.add('empty');
      const imageContainer = content.nextElementSibling;
      if (imageContainer.classList.contains('carousel-slide-image')) {
        imageContainer.classList.add('empty'); // Add empty class to the image container
      }
    }
  });

  let indicators;
  if (hasInnerIndicators) {
    indicators = slide.querySelectorAll('.carousel-slide-indicator');
  } else {
    indicators = block.querySelectorAll('.carousel-slide-indicator');
  }
  // in the CURRENT SLIDE
  indicators.forEach((indicator, idx) => {
    if (idx !== slideIndex) {
      indicator.querySelector('button').removeAttribute('disabled');
    } else {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    }
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-slide');
  let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
  if (slideIndex >= slides.length) realSlideIndex = 0;
  const activeSlide = slides[realSlideIndex];
  activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.carousel-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });
}

/* Slide click functionality */
function bindEvents(block, hasInnerIndicators) {
  const slideIndicators = block.querySelector('.carousel-slide-indicators');
  if (!slideIndicators) return;
  slideIndicators.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
      const slideIndicator = e.currentTarget.parentElement;
      showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
    });
  });
  block.querySelector('.slide-prev').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
  });
  block.querySelector('.slide-next').addEventListener('click', () => {
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
  });
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) updateActiveSlide(entry.target, hasInnerIndicators);
    });
  }, { threshold: 0.5 });
  block.querySelectorAll('.carousel-slide').forEach((slide) => {
    slideObserver.observe(slide);
  });
}

let carouselId = 0;
export default async function decorate(block) {
  carouselId += 1;
  block.setAttribute('id', `carousel-${carouselId}`);
  const rows = block.querySelectorAll(':scope > div');
  const isSingleSlide = rows.length < 2;
  const hasInnerIndicators = document.querySelector(`#carousel-${carouselId}.carousel-inner-indicators`);

  const placeholders = await fetchPlaceholders();
  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

  const container = document.createElement('div');
  container.classList.add('carousel-slides-container');

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-slides'); // create ul but not yet slide content
  block.prepend(slidesWrapper);

  // Carousel buttons
  if (!isSingleSlide) {
    const slideNavButtons = carouselSlideButtons(placeholders);
    container.append(slideNavButtons);
  }

  // Add all slides to slidesWrapper ul as list elements + indicators
  createAllSlides(carouselId, block, rows, slidesWrapper, isSingleSlide, placeholders);

  container.append(slidesWrapper);
  block.prepend(container);
  if (!isSingleSlide) {
    bindEvents(block, hasInnerIndicators);
  }

  // Add classes for styling
  const slideContents = document.querySelectorAll('.carousel-slide-content');
  slideContents.forEach((slide) => {
    slide.firstElementChild.classList.add('overline');
  });
}
