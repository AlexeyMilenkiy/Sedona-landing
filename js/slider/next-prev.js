if (document.querySelector('.slider-headline')) {
  const next = document.querySelector('#next-slide');
  const sliderBlock = document.querySelector('.slider');
  const previous = document.querySelector('#prev-slide');
  let slides = document.querySelectorAll('.slide-single');
  let imgIndex = 0;
  let offset = 0;
  let isFlagAction = false;

  // eslint-disable-next-line global-require
  const moduleImages = require('./show-images');
  const { links } = moduleImages;

  // eslint-disable-next-line global-require
  const modulePagination = require('./pagination');
  const { addClassButton } = modulePagination;

  // find link active image after shift
  // eslint-disable-next-line consistent-return
  const findIndexLastImg = (arg) => {
    for (; imgIndex < links.length; imgIndex += 1) {
      if (links[imgIndex] === arg.src) {
        return imgIndex;
      }
    }
  };

  // image shift function to the left
  const shiftImageLeft = () => {
    offset = 0;
    let step2 = 0;
    for (let i = 0; i < slides.length; i += 1) {
      if (step2 + 1 === slides.length) {
        offset = 1;
      } else {
        offset = 0;
        step2 += 1;
      }
      slides[i].style.left = `${offset * 100 - 100}%`;
    }
  };

  // image shift function to the rights
  const shiftImageRight = () => {
    offset = 0;
    let step3 = slides.length;
    for (let i = slides.length - 1; i >= 0; i -= 1) {
      if (step3 - 1 > 0) {
        offset = 1;
        step3 -= 1;
      } else {
        offset = 0;
      }
      slides[i].style.left = `${offset * 100}%`;
    }
  };

  const addNextImage = () => {
    const rightImg = document.createElement('img');
    if (imgIndex >= links.length - 1) {
      imgIndex = 0;
    } else {
      imgIndex += 1;
    }
    rightImg.src = links[imgIndex];
    rightImg.classList.add('slide-single');
    rightImg.style.left = `${100}%`;
    sliderBlock.appendChild(rightImg);
    imgIndex = 0;
  };

  // add new image on the left after shift
  const addPrevImage = () => {
    const leftImg = document.createElement('img');
    if (imgIndex <= 0) {
      imgIndex = links.length - 1;
    } else {
      imgIndex -= 1;
    }
    leftImg.src = links[imgIndex];
    leftImg.classList.add('slide-single');
    leftImg.style.left = `${-100}%`;
    sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
    imgIndex = 0;
  };

  next.onclick = () => {
    if (!isFlagAction) {
      slides = document.querySelectorAll('.slide-single');
      findIndexLastImg(slides[2]);
      slides[0].remove();
      shiftImageLeft();
      isFlagAction = true;
      setTimeout(() => {
        addNextImage();
        addClassButton();
        isFlagAction = false;
      }, 2000);
    } return false;
  };

  // function showing new image after pressing a button "previous"
  previous.onclick = () => {
    if (!isFlagAction) {
      slides = document.querySelectorAll('.slide-single');
      findIndexLastImg(slides[0]);
      slides[2].remove();
      shiftImageRight();
      isFlagAction = true;
      setTimeout(() => {
        addPrevImage();
        addClassButton();
        isFlagAction = false;
      }, 2000);
    }
    return false;
  };
}
