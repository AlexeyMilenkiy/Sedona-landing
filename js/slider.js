window.onload = function () {

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
    let indexActiveImg = 0;

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
        imgIndex = 0;
        let offset1 = 1;
        let img = document.createElement('img');
        let img1 = document.createElement('img');
        let img2 = document.createElement('img');

        img.src = links[links.length - 1];
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
            showButtonMore();

        } else if (links.length <= indexPagination) {

            for (let i = 0; i < links.length; i++) {
                let imgNumber = document.createElement('button');
                imgNumber.classList.add('img-navigation');
                imgNumber.textContent = i + 1;
                paginationImgBlock.appendChild(imgNumber);
            }
        }    addClassButton();
    }

    function findIndexLastImg(arg) {
        imgIndex = 0;
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
        if (imgIndex <= 0) {
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
        setTimeout(function () {
            addNextImage();
            addClassButton();
        }, 2000);
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
        setTimeout(function () {
            addPrevImage();
            addClassButton();
        }, 2000);
    }

    next.onclick = showNextImage;
    previous.onclick = showPrevImage;

    function showButtonMore() {
        let moreImg = document.createElement('button');
        moreImg.classList.add('moreImg-class');
        moreImg.id = "moreImg";
        moreImg.textContent = ">>";
        paginationImgBlock.appendChild(moreImg);
    }

    function showButtonLess() {
        let lessImg = document.createElement('button');
        lessImg.classList.add('lessImg-class');
        lessImg.id = "lessImg";
        lessImg.textContent = "<<";
        paginationImgBlock.appendChild(lessImg);
    }

    function createNewButtonMore() {
        let imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartImg + 1;
        paginationImgBlock.appendChild(imgNumber);
    }

    function createNewButtonLess() {
        let imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartImg - 1;
        paginationImgBlock.insertBefore(imgNumber, paginationImgBlock.children[0]);
    }

    //отрисовка новой пагинации после нажатия >>
    function showMoreAmountImage() {
        findNumberImage(2);
        clearPagination();
        showButtonLess();
        let reserveVariables = +indexStartImg;
        indexPagination = +indexStartImg + indexPagination;

        if (indexPagination <= links.length) {

            for (+indexStartImg; +indexStartImg < indexPagination; +indexStartImg++) {
                createNewButtonMore();
            }
            showButtonMore();
        } else {
            for (+indexStartImg; +indexStartImg < links.length; +indexStartImg++) {

                createNewButtonMore();
            }
        }
        indexPagination = indexPagination - reserveVariables;
        addClassButton();
    }

    //отрисовка новой пагинации после нажатия <<
    function showLessAmountImage() {
        findNumberImage(0);
        clearPagination();
        showButtonMore();
        let reserveVariables = +indexStartImg;
        indexPagination = +indexStartImg - indexPagination;

        if (indexPagination > 1) {

            for (+indexStartImg; +indexStartImg > indexPagination; +indexStartImg--) {
                createNewButtonLess();
            }
            // вынести в отдельную функцию
            //
            let lessImg = document.createElement('button');
            lessImg.classList.add('lessImg-class');
            lessImg.id = "lessImg";
            lessImg.textContent = "<<";
            paginationImgBlock.insertBefore(lessImg, paginationImgBlock.children[0]);
            //
            //
        } else {
            for (+indexStartImg; +indexStartImg > 1; +indexStartImg--) {
                createNewButtonLess();
            }
        }
        indexPagination = reserveVariables - indexPagination;
        addClassButton();
    }

    //функция поиска номера крайней картинки
    function findNumberImage(n) {
        let buttonArr = document.querySelectorAll('.img-navigation');
        indexStartImg = 0;
        for (; indexStartImg < buttonArr.length; indexStartImg++) {
            return indexStartImg = buttonArr[n].innerText
        }
    }

    function clearPagination() {

        while (paginationImgBlock.firstChild) {
            paginationImgBlock.removeChild(paginationImgBlock.firstChild);
        }

    }

    paginationImgBlock.onclick = function (event) {
        let target = event.target;
        if (target.id === "moreImg") {
            showMoreAmountImage();
        } else if (target.id === "lessImg") {
            showLessAmountImage();
        } else if (target.id !== "lessImg"&&"moreImg" ){
            showNotActiveImg(target.innerText);
        }
    };

    function findActiveImg() {

        slides = document.querySelectorAll('.slide-single');

        for (; indexActiveImg < links.length; indexActiveImg++) {
            if (links[indexActiveImg] === slides[1].src) {
                return indexActiveImg;
            }
        }
    }

    function addClassButton() {
        let indexActiveButton = 0;
        findActiveImg();
        indexActiveImg++;
        let buttonArr = document.querySelectorAll('.img-navigation');
        let buttonMore = document.getElementById('moreImg');
        let buttonLess = document.getElementById('lessImg');

        for (; indexActiveButton < buttonArr.length; indexActiveButton++) {

            buttonArr[indexActiveButton].classList.remove('active');
            if (!!buttonMore) {
                buttonMore.classList.remove('active');
            }
            if (!!buttonLess) {
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
    }

    function showNotActiveImg(x){
        let numButton = +x;
        let buttonArr = document.querySelectorAll('.img-navigation');

        for (let i = 0; i < buttonArr.length; i++) {
            if (numButton === +buttonArr[i].innerText){

                 if(buttonArr[i].classList.contains('active')){
                     break
                 }else{

                     //вставить фукнцию отрисовки изображения которое не активно
                     console.log('add active class')
                     // buttonArr[i].classList.add('active');
                 }

            }
        }


    }

};