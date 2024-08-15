function createSlide(row, slideIndex, carouselId, slideIndicatorsNav = undefined) {
  // Creates one slide of the carousel

  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
  slide.classList.add('carousel-slide');
  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(`carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);

    // Add slide indicator nav within the carousel
    if (colIdx === 1 && slideIndicatorsNav !== undefined) {
      column.append(slideIndicatorsNav);
    }

    slide.append(column);
  });

  const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
  if (labeledBy) {
    slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
  }

  return slide;
}

export default function createAllSlides(
  carouselId,
  block,
  rows,
  slidesWrapper,
  isSingleSlide,
  placeholders,
) {
  const hasSlideIndicators = !isSingleSlide;
  let hasInnerIndicators = false;

  let slideIndicatorsNav;
  let slideIndicators;

  if (hasSlideIndicators) {
    // check if carousel of this id has inner indicators
    hasInnerIndicators = document.querySelector(`#carousel-${carouselId}.carousel-inner-indicators`);

    // make slide indicators
    slideIndicatorsNav = document.createElement('nav');
    slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
    slideIndicatorsNav.classList.add('carousel-slide-indicators-container');

    slideIndicators = document.createElement('ol');
    slideIndicators.classList.add('carousel-slide-indicators');

    slideIndicatorsNav.append(slideIndicators);

    // Slide indicators are external from the carousel slides
    if (!hasInnerIndicators) {
      block.append(slideIndicatorsNav);
    }
  }

  // placing indicators for each slide
  if (!hasInnerIndicators) {
    rows.forEach((row, idx) => {
      // add carousel-slide-content
      const slide = createSlide(row, idx, carouselId);

      slidesWrapper.append(slide);

      if (hasSlideIndicators && !hasInnerIndicators) {
        const indicator = document.createElement('li');
        indicator.classList.add('carousel-slide-indicator');
        indicator.dataset.targetSlide = idx;
        indicator.innerHTML = `<button type="button"><span>${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}</span></button>`;
        slideIndicators.append(indicator);

        row.remove();
      }
    });
  }

  if (hasInnerIndicators) {
    // make slide indicators according to the number of slides available

    // make the indicators first
    for (let idx = 0; idx < rows.length; idx += 1) {
      const indicator = document.createElement('li');
      indicator.classList.add('carousel-slide-indicator');
      indicator.dataset.targetSlide = idx;
      indicator.innerHTML = `<button type="button"><span>${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}</span></button>`;
      slideIndicators.append(indicator);
    }

    // add them to each slide
    rows.forEach((row, idx) => {
      // add carousel-slide-content
      const slide = createSlide(row, idx, carouselId, slideIndicatorsNav.cloneNode(true));
      slidesWrapper.append(slide);

      row.remove();
    });
  }
}

/* create a slide
add it to the slideswrapper
OG:
<SlidesWrapper>
  <slide>
<SlidesWrapper>
<Slides Indicator>

SO FAR
<Slides Wrapper>
  <slide>
    <content>
    <slides-indicator-nav>
      <ol slides-indicators>
       1
       2
       3
    <slides-indicator-nav>
  <slide>
<SlidesWrapper>

NOW, WHAT I WANNA DO:
in each pass, i wanna add 3 list elements to slides-indicators
<Slides Wrapper>
  <slide>
    <content>
    <slides-indicator-nav>
      <ol slides-indicators>
        <li>
        <li>
        <li>
    <slides-indicator-nav>
  <slide>
<SlidesWrapper>

<div slides-indicator-nav>
  <ol slides-indicators>
  </ol>
</div>
*/
