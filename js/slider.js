window.onload = function () {

    const slides = document.querySelectorAll('.slide-single');
    const next = document.querySelector('#next-slide');
    const previous = document.querySelector('#prev-slide');
    const sliderBlock = document.querySelector('.slider');
    let links = [];

    for (let i = 0; i < slides.length; i++) {
        links[i] = slides[i].src;   // присвоение атрибута, добавляем путь к нашей картинке
        slides[i].remove();
        // удаление картинок со страницы
    }

    console.log(links); // остался только массив путей

    let imgIndex = 0; // определяет какую картинку показывать в основном блоке
    let offset = 0; // смещение картинки



    // функция отрисовки изображений
    function showImage() {
        let step = 1;
        let offset1 = 1;
        let img = document.createElement('img'); // создание картинки
        let img1 = document.createElement('img');
        let img2 = document.createElement('img'); // создание картинки

        img.src = links[step - 1]; // присвоение пути каждой новой картинке
        img.classList.add('slide-single'); // добавляем картинке класс
        img.style.left = offset1 - 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(img); // добавляем картинку в наш блок

        img1.src = links[step]; // присвоение пути каждой новой картинке
        img1.classList.add('slide-single'); // добавляем картинке класс
        img1.style.left = offset * 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(img1);// добавляем картинку в наш блок

        img2.src = links[step + 1]; // присвоение пути каждой новой картинке
        img2.classList.add('slide-single'); // добавляем картинке класс
        img2.style.left = offset1 * 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(img2);// добавляем картинку в наш блок
    }
    function findIndex(arg) {

        for (; imgIndex < links.length; imgIndex++) {
            if (links[imgIndex] === arg.src) {
                return imgIndex;
            }
        }
    }

    function addNextImage() {
        let rightImg = document.createElement('img');

        if (imgIndex >= links.length -1) {
            imgIndex = 0;
        }else{
        imgIndex= imgIndex + 1;
        }
        console.log(imgIndex);
        rightImg.src = links[imgIndex]; // присвоение пути каждой новой картинке
        rightImg.classList.add('slide-single'); // добавляем картинке класс
        rightImg.style.left = 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(rightImg);// добавляем картинку в наш блок
    }

    function addPrevImage() {
        let leftImg = document.createElement('img');

        if (imgIndex === -1) {
            imgIndex = links.length - 1;
        }else{
        imgIndex= imgIndex - 1;
        }      // присвоение пути каждой новой картинке
        console.log(imgIndex);
        leftImg.src = links[imgIndex];
        leftImg.classList.add('slide-single'); // добавляем картинке класс
        leftImg.style.left = -806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);// добавляем картинку в наш блок
    }


    function nextImage() {
        let offset2 = 0;
        let step2 = 0;
        let slides2 = document.querySelectorAll('.slide-single');
        findIndex(slides2[2]);
        console.log(slides2[2].src);
        slides2[0].remove();

        for (let i = 0; i < slides2.length; i++) {

            if (step2 + 1 === slides2.length) {
                offset2 = 1;

            } else {
                offset2 = 0;
                step2++;
            }

            slides2[i].style.left = offset2 * 806 - 806 + 'px';
        }
        setTimeout(function () {
            addNextImage();
        }, 3000);
    }

    function prevImage() {
        let slides3 = document.querySelectorAll('.slide-single');
        let offset3 = 0;
        let step3 = slides3.length;
        findIndex(slides3[0]);
        slides3[2].remove();

        for (let i = slides3.length - 1; i >= 0; i--) {

            if (step3 - 1 > 0) {
                offset3 = 1;
                step3--;
            } else {
                offset3 = 0;
            }
            slides3[i].style.left = offset3 * 806 + 'px';
        }

        setTimeout(function () {
            addPrevImage();
        }, 3000);
    }

    next.onclick = nextImage;
    previous.onclick = prevImage;

    showImage();

};
