require('./slider-images.js');
  if (!!document.querySelector('.slider-headline')) {
    const paginationImgBlock = document.querySelector('.pagination-img-block');
    let links = [];
    let imgIndex = 0;
    let offset = 0;
    let indexPagination = 3; //  number of buttons pagination
    let indexStartNumButton = 0;
    let indexActiveImg = 0;
    let numberPushButton = 0;
    let activeButton = 0;
    let linkNewImage = 0;
    let isFlagAction = false;

    const showButtonMore = () => {
      const moreImg = document.createElement('button');
      moreImg.classList.add('moreImg-class');
      moreImg.id = 'moreImg';
      moreImg.textContent = '>>';
      paginationImgBlock.appendChild(moreImg);
    };

    const showButtonLess = () => {
      const lessImg = document.createElement('button');
      lessImg.classList.add('lessImg-class');
      lessImg.id = 'lessImg';
      lessImg.textContent = '<<';
      paginationImgBlock.appendChild(lessImg);
    };
    // creating a new button with a number greater than the previous one
    const createNewButtonMore = () => {
      const imgNumber = document.createElement('button');
      imgNumber.classList.add('img-navigation');
      imgNumber.textContent = +indexStartNumButton + 1;
      paginationImgBlock.appendChild(imgNumber);
    };
    // creating a new button with a number less than the previous one
    const createNewButtonLess = () => {
      const imgNumber = document.createElement('button');
      imgNumber.classList.add('img-navigation');
      imgNumber.textContent = +indexStartNumButton - 1;
      paginationImgBlock.insertBefore(imgNumber, paginationImgBlock.children[0]);
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

    // search for the number of the last button pagination
    const searchLastNumberButton = (n) => {
      const buttonArr = document.querySelectorAll('.img-navigation');
      for (let i = 0; i < buttonArr.length; i += 1) {
        if (i + 1 === n) {
          indexStartNumButton = +buttonArr[i].innerText;
        }
      }
    };

    // clear all button pagination
    const clearPagination = () => {
      while (paginationImgBlock.firstChild) {
        paginationImgBlock.removeChild(paginationImgBlock.firstChild);
      }
    };

    // show new pagination button after push button ">>"
    const showNextPagination = () => {
      searchLastNumberButton(indexPagination);
      clearPagination();
      showButtonLess();
      const reserveVariables = indexStartNumButton;
      indexPagination = indexStartNumButton + indexPagination;

      if (indexPagination === links.length) {
        for (indexStartNumButton; indexStartNumButton < indexPagination; indexStartNumButton += 1) {
          createNewButtonMore();
        }
      } else if (indexPagination < links.length) {
        for (indexStartNumButton; indexStartNumButton < indexPagination; indexStartNumButton += 1) {
          createNewButtonMore();
        }
        showButtonMore();
      } else {
        for (indexStartNumButton; indexStartNumButton < links.length; indexStartNumButton += 1) {
          createNewButtonMore();
        }
      }
      indexPagination -= reserveVariables;
      addClassButton();
    };

    // show new pagination button after push button "<<"
    const showPrevPagination = () => {
      searchLastNumberButton(1);
      clearPagination();
      showButtonMore();
      const reserveVariables = indexStartNumButton;
      indexPagination = indexStartNumButton - indexPagination;

      if (indexPagination > 1) {
        for (indexStartNumButton; indexStartNumButton > indexPagination; indexStartNumButton -= 1) {
          createNewButtonLess();
        }
        const lessImg = document.createElement('button');
        lessImg.classList.add('lessImg-class');
        lessImg.id = 'lessImg';
        lessImg.textContent = '<<';
        paginationImgBlock.insertBefore(lessImg, paginationImgBlock.children[0]);
      } else {
        for (indexStartNumButton; indexStartNumButton > 1; indexStartNumButton -= 1) {
          createNewButtonLess();
        }
      }
      indexPagination = reserveVariables - indexPagination;
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
  }else{
      return;
  }

