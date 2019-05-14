if (document.querySelector('.slider-headline')) {
  const paginationImgBlock = document.querySelector('.pagination-img-block');
  const sliderBlock = document.querySelector('.slider');
  let slides = document.querySelectorAll('.slide-single');
  const indexPagination = 3; //  number of buttons pagination
  let numberPushButton = 0;
  let activeButton = 0;
  let imgIndex = 0;
  let offset = 0;
  let indexActiveImg = 0;
  let linkNewImage = 0;
  let isFlagAction = false;

  const moduleImages = require('./show-images');
  const { links } = moduleImages;

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

  exports.addClassButton = addClassButton;

  // function showing new image after pressing a button "next"
  const showButtonMore = () => {
    const moreImg = document.createElement('button');
    moreImg.classList.add('moreImg-class');
    moreImg.id = 'moreImg';
    moreImg.textContent = '>>';
    paginationImgBlock.appendChild(moreImg);
  };

  // start function create pagination button
  const showPagination = () => {
    if (links.length > indexPagination) {
      for (let i = 0; i < indexPagination; i += 1) {
        const imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = i + 1;
        paginationImgBlock.appendChild(imgNumber);
      }
      showButtonMore();
    } else if (links.length <= indexPagination) {
      for (let i = 0; i < links.length; i += 1) {
        const imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = i + 1;
        paginationImgBlock.appendChild(imgNumber);
      }
    }
    addClassButton();
  };

  // brute force pagination array
  const bruteForcePagination = () => {
    const buttonArr = document.querySelectorAll('.img-navigation');
    const lessButton = document.getElementById('lessImg');
    const moreButton = document.getElementById('moreImg');

    if (lessButton) {
      if (lessButton.classList.contains('active')) {
        activeButton = -1;
      }
    }
    if (moreButton) {
      if (moreButton.classList.contains('active')) {
        activeButton = links.length + 1;
      }
    }
    for (let i = 0; i < buttonArr.length; i += 1) {
      if (buttonArr[i].classList.contains('active')) {
        activeButton = +buttonArr[i].innerText;
      }
    }
  };

  // search for a link to a picture of the corresponding pressed button
  const searchIndexNewImage = () => {
    for (let i = 0; i < links.length; i += 1) {
      if (i + 1 === numberPushButton) {
        linkNewImage = links[i];
        break;
      }
    }
  };

  // adding a new image after pressing the button with the number more than the active one
  const addNextImageFromPagination = () => {
    if (isFlagAction) {
      return;
    }
    const rightImg = document.createElement('img');
    searchIndexNewImage();
    slides[0].remove();
    slides[2].remove();

    rightImg.src = linkNewImage;
    rightImg.classList.add('slide-single');
    rightImg.style.left = `${100}%`;
    sliderBlock.appendChild(rightImg);
    slides = document.querySelectorAll('.slide-single');
    isFlagAction = true;
    setTimeout(() => {
      shiftImageLeft();
    }, 200);

    setTimeout(() => {
      findIndexLastImg(slides[1]);
      addNextImage();
      slides[0].remove();
      findIndexLastImg(slides[1]);
      addPrevImage();
      addClassButton();
      numberPushButton = 0;
      linkNewImage = 0;
      isFlagAction = false;
    }, 2000);
  };

  // adding a new image after pressing the button with the number less than the active one
  const addPrevImageFromPagination = () => {
    if (isFlagAction) {
      return;
    }
    const leftImg = document.createElement('img');
    searchIndexNewImage();
    slides[0].remove();
    slides[2].remove();

    leftImg.src = linkNewImage;
    leftImg.classList.add('slide-single');
    leftImg.style.left = `${-100}%`;
    sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
    slides = document.querySelectorAll('.slide-single');
    isFlagAction = true;
    setTimeout(() => {
      shiftImageRight();
    }, 200);

    setTimeout(() => {
      findIndexLastImg(slides[0]);
      addPrevImage();
      slides[1].remove();
      findIndexLastImg(slides[0]);
      addNextImage();
      addClassButton();
      numberPushButton = 0;
      linkNewImage = 0;
      isFlagAction = false;
    }, 2000);
  };

  // showing a new image after pressing a button pagination
  const showNotActiveImg = () => {
    let indexWaitImage = 0;
    const buttonArr = document.querySelectorAll('.img-navigation');
    bruteForcePagination();
    for (; indexWaitImage <= links.length; indexWaitImage += 1) {
      if (indexWaitImage === numberPushButton) {
        for (let i = 0; i < buttonArr.length; i += 1) {
          if (+buttonArr[i].innerText === numberPushButton) {
            if (indexWaitImage > activeButton) {
              addNextImageFromPagination();
              break;
            } else {
              addPrevImageFromPagination();
              break;
            }
          }
        }
      }
    }
  };

  // checking whether the active class has a button
  const containsActiveClass = (x) => {
    const numButton = +x;
    const buttonArr = document.querySelectorAll('.img-navigation');

    for (let i = 0; i < buttonArr.length; i += 1) {
      if (numButton === +buttonArr[i].innerText) {
        if (buttonArr[i].classList.contains('active')) {
          break;
        } else {
          showNotActiveImg();
          break;
        }
      }
    }
  };

  paginationImgBlock.onclick = (event) => {
    const moduleShowMoreLess = require('./more-less-pagination');
    const { showPrevPagination } = moduleShowMoreLess;
    const { showNextPagination } = moduleShowMoreLess;

    const { target } = event;
    if (target.id === 'moreImg') {
      showNextPagination();
    } else if (target.id === 'lessImg') {
      showPrevPagination();
    } else if (target.id !== 'lessImg' && 'moreImg') {
      numberPushButton = +target.innerText;
      containsActiveClass(target.innerText);
    }
  };
  showPagination();
}
