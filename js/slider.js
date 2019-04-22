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
    let indexStartNumButton = 0;
    let indexActiveImg = 0;
    let numberPushButton = 0;
    let activeButton = 0;
    let linkNewImage = 0;
    let flagAction = false;

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
        }
        addClassButton();
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
        imgIndex = 0;
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
        imgIndex = 0;
    }

    function shiftImageLeft() {
        offset = 0;
        let step2 = 0;
        for (let i = 0; i < slides.length; i++) {
            if (step2 + 1 === slides.length) {

                offset = 1;
            } else {
                offset = 0;
                step2++;
            }
            slides[i].style.left = offset * 100 - 100 + '%';
        }
    }

    function showNextImage() {
        if (flagAction){
            return false;
        }else {
            slides = document.querySelectorAll('.slide-single');
            findIndexLastImg(slides[2]);
            slides[0].remove();
            shiftImageLeft();
            flagAction = true;
            setTimeout(function () {
                addNextImage();
                addClassButton();
                flagAction = false;
            }, 2000);
        }
    }

    function shiftImageRight() {
        offset = 0;
        let step3 = slides.length;
        for (let i = slides.length - 1; i >= 0; i--) {
            if (step3 - 1 > 0) {
                offset = 1;
                step3--;
            } else {
                offset = 0;
            }
            slides[i].style.left = offset * 100 + '%';
        }
    }

    function showPrevImage() {
        if (flagAction){
            return false;
        }else{
        slides = document.querySelectorAll('.slide-single');
        offset = 0;
        findIndexLastImg(slides[0]);
        slides[2].remove();
        shiftImageRight();
        flagAction = true;
        setTimeout(function () {
            addPrevImage();
            addClassButton();
            flagAction = false;
            }, 2000);
        }
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
        imgNumber.textContent = +indexStartNumButton + 1;
        paginationImgBlock.appendChild(imgNumber);
    }

    function createNewButtonLess() {
        let imgNumber = document.createElement('button');
        imgNumber.classList.add('img-navigation');
        imgNumber.textContent = +indexStartNumButton - 1;
        paginationImgBlock.insertBefore(imgNumber, paginationImgBlock.children[0]);
    }

    //отрисовка новой пагинации после нажатия >>
    function showNextPagination() {
        findLastNumberButton(indexPagination);
        clearPagination();
        showButtonLess();
        let reserveVariables = +indexStartNumButton;
        indexPagination = +indexStartNumButton + indexPagination;

        if (indexPagination === links.length) {
            for (+indexStartNumButton; +indexStartNumButton < indexPagination; +indexStartNumButton++) {
                createNewButtonMore();
            }
        } else if (indexPagination < links.length) {
            for (+indexStartNumButton; +indexStartNumButton < indexPagination; +indexStartNumButton++) {
                createNewButtonMore();
            }
            showButtonMore();
        } else {
            for (+indexStartNumButton; +indexStartNumButton < links.length; +indexStartNumButton++) {
                createNewButtonMore();
            }
        }
        indexPagination = indexPagination - reserveVariables;
        addClassButton();
    }

    //отрисовка новой пагинации после нажатия <<
    function showPrevPagination() {
        findLastNumberButton(1);
        clearPagination();
        showButtonMore();
        let reserveVariables = +indexStartNumButton;
        indexPagination = +indexStartNumButton - indexPagination;

        if (indexPagination > 1) {

            for (+indexStartNumButton; +indexStartNumButton > indexPagination; +indexStartNumButton--) {
                createNewButtonLess();
            }
            let lessImg = document.createElement('button');
            lessImg.classList.add('lessImg-class');
            lessImg.id = "lessImg";
            lessImg.textContent = "<<";
            paginationImgBlock.insertBefore(lessImg, paginationImgBlock.children[0]);

        } else {
            for (+indexStartNumButton; +indexStartNumButton > 1; +indexStartNumButton--) {
                createNewButtonLess();
            }
        }
        indexPagination = reserveVariables - indexPagination;
        addClassButton();
    }

    function findLastNumberButton(n) {
        let buttonArr = document.querySelectorAll('.img-navigation');
        for (let i = 0; i < buttonArr.length; i++) {
            if (i+1 === n) {
                return indexStartNumButton = buttonArr[i].innerText
            }
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
            showNextPagination();
        } else if (target.id === "lessImg") {
            showPrevPagination();
        } else if (target.id !== "lessImg" && "moreImg") {
            numberPushButton = +target.innerText;
            containsActiveClass(target.innerText);
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

    function containsActiveClass(x) {
        let numButton = +x;
        let buttonArr = document.querySelectorAll('.img-navigation');

        for (let i = 0; i < buttonArr.length; i++) {
            if (numButton === +buttonArr[i].innerText) {
                if (buttonArr[i].classList.contains('active')) {
                    break
                } else {
                    showNotActiveImg();
                    break
                }
            }
        }
    }

    function bruteForcePagination() {
        let buttonArr = document.querySelectorAll('.img-navigation');
        let lessButton = document.getElementById('lessImg');
        let moreButton = document.getElementById('moreImg');

        if (lessButton) {
            if (lessButton.classList.contains('active')) {
                return activeButton = -1
            }
        }
        if (moreButton) {
            if (moreButton.classList.contains('active')) {
                return activeButton = links.length + 1
            }
        }
        for (let i = 0; i < buttonArr.length; i++) {
            if (buttonArr[i].classList.contains('active')) {
                activeButton = +buttonArr[i].innerText;
            }
        }
    }

    function showNotActiveImg() {
        let indexWaitImage = 0;
        let buttonArr = document.querySelectorAll('.img-navigation');
        bruteForcePagination();
        outer: for (; indexWaitImage <= links.length; indexWaitImage++) {
            if (indexWaitImage === numberPushButton) {
                for (let i = 0; i < buttonArr.length; i++) {
                    if (+buttonArr[i].innerText === numberPushButton) {
                        if (indexWaitImage > activeButton) {
                            addNextImageFromPagination();
                            break outer;
                        } else {
                            addPrevImageFromPagination();
                            break outer;
                        }
                    }
                }
            }
        }
    }

    function findIndexNewImage(){
        for (let i = 0; i < links.length; i++) {
            if (i + 1 === numberPushButton) {
                linkNewImage = links[i];
                break
            }
        }
    }

    function addNextImageFromPagination() {
        if (flagAction){
            return false;
        }else {
            let rightImg = document.createElement('img');
            findIndexNewImage();
            slides[0].remove();
            slides[2].remove();

            rightImg.src = linkNewImage;
            rightImg.classList.add('slide-single');
            rightImg.style.left = 100 + '%';
            sliderBlock.appendChild(rightImg);
            slides = document.querySelectorAll('.slide-single');
            flagAction = true;
            setTimeout(function () {
                shiftImageLeft();
            }, 200);

            setTimeout(function () {
                findIndexLastImg(slides[1]);
                addNextImage();
                slides[0].remove();
                findIndexLastImg(slides[1]);
                addPrevImage();
                addClassButton();
                numberPushButton = 0;
                linkNewImage = 0;
                flagAction = false;
            }, 2000);
        }
    }

    function addPrevImageFromPagination() {
        if (flagAction){
            return false;
        }else {
            let leftImg = document.createElement('img');
            findIndexNewImage();
            slides[0].remove();
            slides[2].remove();

            leftImg.src = linkNewImage;
            leftImg.classList.add('slide-single');
            leftImg.style.left = -100 + '%';
            sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);
            slides = document.querySelectorAll('.slide-single');
            flagAction = true;
            setTimeout(function () {
                shiftImageRight();
            }, 200);

            setTimeout(function () {
                findIndexLastImg(slides[0]);
                addPrevImage();
                slides[1].remove();
                findIndexLastImg(slides[0]);
                addNextImage();
                addClassButton();
                numberPushButton = 0;
                linkNewImage = 0;
                flagAction = false;
            }, 2000);
        }
    }
};