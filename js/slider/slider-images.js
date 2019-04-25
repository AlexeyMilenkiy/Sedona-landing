require('./slider-pagination.js');
  if (!!document.querySelector('.slider-headline')) {
    let slides = document.querySelectorAll('.slide-single');
    const sliderBlock = document.querySelector('.slider');
    let links = [];
    const next = document.querySelector('#next-slide');
    const previous = document.querySelector('#prev-slide');
    // start function create images on pages
    const showImage = () => {
      findLinksImg();
      imgIndex = 0;
      const offset1 = 1;
      const img = document.createElement('img');
      const img1 = document.createElement('img');
      const img2 = document.createElement('img');


      img.src = links[links.length - 1];
      img.classList.add('slide-single');
      img.style.left = `${offset1 - 100}%`;
      sliderBlock.appendChild(img);

      img1.src = links[imgIndex];
      img1.classList.add('slide-single');
      img1.style.left = `${offset * 100}%`;
      sliderBlock.appendChild(img1);

      img2.src = links[imgIndex + 1];
      img2.classList.add('slide-single');
      img2.style.left = `${offset1 * 100}%`;
      sliderBlock.appendChild(img2);
    };

    // find link active image after shift
    const findIndexLastImg = (arg) => {
      for (; imgIndex < links.length; imgIndex += 1) {
        if (links[imgIndex] === arg.src) {
          return imgIndex;
        }
      }
    };
    // add new image on the right after shift
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

    // active image index definition
    const searchActiveImg = () => {
      slides = document.querySelectorAll('.slide-single');
      for (let i = 0; i < links.length; i += 1) {
        if (links[i] === slides[1].src) {
          indexActiveImg = i;
        }
      }
    };


    // adding "active" class to a button
    const addClassButton = () => {
      let indexActiveButton = 0;
      searchActiveImg();
      indexActiveImg += 1;
      const buttonArr = document.querySelectorAll('.img-navigation');
      const buttonMore = document.getElementById('moreImg');
      const buttonLess = document.getElementById('lessImg');

      for (; indexActiveButton < buttonArr.length; indexActiveButton += 1) {
        buttonArr[indexActiveButton].classList.remove('active');
        if (buttonMore) {
          buttonMore.classList.remove('active');
        }
        if (buttonLess) {
          buttonLess.classList.remove('active');
        }
        if (indexActiveImg > +buttonArr[buttonArr.length - 1].innerText) {
          buttonMore.classList.add('active');
        }
        if (indexActiveImg < +buttonArr[0].innerText) {
          buttonLess.classList.add('active');
        } else if (+buttonArr[indexActiveButton].innerText === indexActiveImg) {
          buttonArr[indexActiveButton].classList.add('active');
        }
      }
      indexActiveImg = 0;
    };

    // function showing new image after pressing a button "next"
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
        offset = 0;
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
      showImage();
  } else {
      return;
  }
