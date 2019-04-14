window.onload = function() {

    let slides = document.querySelectorAll('.slide-single');
    const next = document.querySelector('#next-slide');
    const previous = document.querySelector('#prev-slide');
    const sliderBlock = document.querySelector('.slider');
    const paginationImgBlock = document.querySelector('.pagination-img-block');




    const links = [];
    let imgIndex = 0;
    let offset = 0;
    let indexPagination = 3;
    let indexStartImg = 0;

    showImage();
    showPagination();

    function findLinksImg() {
        for (let i = 0; i < slides.length; i++) {
            links[i] = slides[i].src;
            slides[i].remove();
        }
    }

    function showImage() {
        findLinksImg();
        imgIndex = 1;
        let offset1 = 1;
        let img = document.createElement('img');
        let img1 = document.createElement('img');
        let img2 = document.createElement('img');

        img.src = links[imgIndex - 1];
        img.classList.add('slide-single');
        img.style.left = offset1 - 100 + '%';
        sliderBlock.appendChild(img);

        img1.src = links[imgIndex];
        img1.classList.add('slide-single');
        img1.style.left = offset * 100 + '%';
        sliderBlock.appendChild(img1);

        img2.src = links[imgIndex + 1];
        img2.classList.add('slide-single');
        img2.style.left = offset1 * 100 + '%';
        sliderBlock.appendChild(img2);
    }


    function showPagination() {

        if (links.length > indexPagination) {

            for (let i = 0; i < indexPagination; i++) {
                let imgNumber = document.createElement('button');
                imgNumber.classList.add('img-navigation');
                imgNumber.textContent = i + 1;
                paginationImgBlock.appendChild(imgNumber);
            }
            showButtonMoreImg();

        } else if (links.length <= indexPagination) {

            for (let i = 0; i < links.length; i++) {
                let imgNumber = document.createElement('button');
                imgNumber.classList.add('img-navigation');
                imgNumber.textContent = i + 1;
                paginationImgBlock.appendChild(imgNumber);
            }
        }
    }


    function findIndexLastImg(arg) {
        for (; imgIndex < links.length; imgIndex++) {
            if (links[imgIndex] === arg.src) {
                return imgIndex;
            }
        }
    }

    function addNextImage() {
        let rightImg = document.createElement('img');
        if (imgIndex >= links.length - 1) {
            imgIndex = 0;
        } else {
            imgIndex = imgIndex + 1;
        }
        rightImg.src = links[imgIndex];
        rightImg.classList.add('slide-single');
        rightImg.style.left = 100 + '%';
        sliderBlock.appendChild(rightImg);
    }

    function addPrevImage() {
        let leftImg = document.createElement('img');
        if (imgIndex === -1) {
            imgIndex = links.length - 1;
        } else {
            imgIndex = imgIndex - 1;
        }

        leftImg.src = links[imgIndex];
        leftImg.classList.add('slide-single');
        leftImg.style.left = -100 + '%';
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
    }

    function showNextImage() {
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        let step2 = 0;
        findIndexLastImg(slides[2]);
        slides[0].remove();

        for (let i = 0; i < slides.length; i++) {
            if (step2 + 1 === slides.length) {
                offset = 1;
            } else {
                offset = 0;
                step2++;
            }
            slides[i].style.left = offset * 100 - 100 + '%';
        }
        setTimeout(function() {
            addNextImage();
        }, 3000);
    }

    function showPrevImage() {
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        let step3 = slides.length;
        findIndexLastImg(slides[0]);
        slides[2].remove();

        for (let i = slides.length - 1; i >= 0; i--) {
            if (step3 - 1 > 0) {
                offset = 1;
                step3--;
            } else {
                offset = 0;
            }
            slides[i].style.left = offset * 100 + '%';
        }
        setTimeout(function() {
            addPrevImage();
        }, 3000);
    }

    next.onclick = showNextImage;
    previous.onclick = showPrevImage;

    function showButtonMoreImg() {
        let moreImg = document.createElement('button');
        moreImg.classList.add('moreImg-class');
        moreImg.id = "moreImg";
        moreImg.textContent = ">>";
        paginationImgBlock.appendChild(moreImg);
    }

    function showButtonLessImg() {
        let lessImg = document.createElement('button');
        lessImg.classList.add('lessImg-class');
        lessImg.id = "lessImg";
        lessImg.textContent = "<<";
        paginationImgBlock.appendChild(lessImg);
    }

    function createNewButton() {
        let imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartImg + 1;
        paginationImgBlock.appendChild(imgNumber);
    }

    //отрисовка новой пагинации после нажатия >>
    function showMoreAmountImage() {
        findNumberImage(2);
        clearPagination();
        showButtonLessImg();
        let reserveVariables = +indexStartImg
        indexPagination = +indexStartImg + indexPagination;

        if (indexPagination <= links.length) {

            for (+indexStartImg; + indexStartImg < indexPagination; + indexStartImg++) {
                createNewButton();
            }
            showButtonMoreImg();
        } else {
            for (+indexStartImg; + indexStartImg < links.length; + indexStartImg++) {

                createNewButton();
            }
        }
        indexPagination = indexPagination - reserveVariables;
    }

    // //отрисовка новой пагинации после нажатия <<
    // function showMorelessImage() {
    //     findNumberImage(0);
    //     clearPagination();
    //     showButtonMoreImg();
    //     let reserveVariables = +indexStartImg
    //     indexPagination = +indexStartImg + indexPagination;

    //     if (indexPagination <= links.length) {

    //         for (+indexStartImg; + indexStartImg < indexPagination; + indexStartImg++) {
    //             createNewButton();
    //         }
    //         showButtonMoreImg();
    //     } else {
    //         for (+indexStartImg; + indexStartImg < links.length; + indexStartImg++) {

    //             createNewButton();
    //         }
    //     }
    //     indexPagination = indexPagination - reserveVariables;
    // }
    // }
    //поиск крайней кнопки пагинации
    function findNumberImage(n) {
        let paginationArr = document.querySelectorAll('.img-navigation');

        for (indexStartImg = 0; indexStartImg < paginationArr.length; i++) {
            return indexStartImg = paginationArr[n].innerText
        }
    }

    function clearPagination() {

        while (paginationImgBlock.firstChild) {
            paginationImgBlock.removeChild(paginationImgBlock.firstChild);
        }

    }

    paginationImgBlock.onclick = function(event) {
        let target = event.target; // где был клик?
        if (target.id === "moreImg") {
            showMoreAmountImage();
        }
        // else if(target.id === "lessImg"){
        //     showMorelessImage();
        // }
    }
};