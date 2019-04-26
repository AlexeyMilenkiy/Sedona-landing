if (document.querySelector('.slider-headline')) {
  const paginationImgBlock = document.querySelector('.pagination-img-block');
  let indexPagination = 3; //  number of buttons pagination
  let indexStartNumButton = 0;

  // eslint-disable-next-line global-require
  const modPagination = require('./pagination');
  const { addClassButton } = modPagination;
  console.log(addClassButton);

  // eslint-disable-next-line global-require
  const moduleImages = require('./show-images');
  const { links } = moduleImages;

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

  // function showing new image after pressing a button "next"
  const showButtonMore = () => {
    const moreImg = document.createElement('button');
    moreImg.classList.add('moreImg-class');
    moreImg.id = 'moreImg';
    moreImg.textContent = '>>';
    paginationImgBlock.appendChild(moreImg);
  };

  // creating a new button with a number less than the previous one
  const createNewButtonLess = () => {
    const imgNumber = document.createElement('button');
    imgNumber.classList.add('img-navigation');
    imgNumber.textContent = +indexStartNumButton - 1;
    paginationImgBlock.insertBefore(imgNumber, paginationImgBlock.children[0]);
  };

  // show new pagination button after push button ">>"
  exports.showNextPagination = () => {
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
  exports.showPrevPagination = () => {
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
}
