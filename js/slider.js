window.onload = function () {

    const slides = document.querySelectorAll('.slide-single');
    const next = document.querySelector('#next-slide');
    const previous = document.querySelector('#prev-slide');
    const sliderBlock = document.querySelector('.slider')
    let slider = [];

    for (let i = 0; i < slides.length; i++) {
        slider[i] = slides[i].src;   // присвоение атрибута, добавляем путь к нашей картинке
        slides[i].remove();  // удаление картинок со страницы
    }

    // console.log(slider); // остался только массив путей

    let step = 0; // определяет какую картинку показывать в основном блоке
    let offset = 0; // смещение картинки

    // функция отрисовки изображений
    function showImage() {
        let step = 1;
        let offset1 = 1;
        let img = document.createElement('img'); // создание картинки
        let img1 = document.createElement('img');
        let img2 = document.createElement('img'); // создание картинки

        img.src = slider[step - 1]; // присвоение пути каждой новой картинке
        img.classList.add('slide-single'); // добавляем картинке класс
        img.style.left = offset1 - 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(img); // добавляем картинку в наш блок

        img1.src = slider[step]; // присвоение пути каждой новой картинке
        img1.classList.add('slide-single'); // добавляем картинке класс
        img1.style.left = offset * 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(img1);// добавляем картинку в наш блок

        img2.src = slider[step + 1]; // присвоение пути каждой новой картинке
        img2.classList.add('slide-single'); // добавляем картинке класс
        img2.style.left = offset1 * 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(img2);// добавляем картинку в наш блок
    }

    function addNextImage() {
        let rightImg = document.createElement('img');

        console.log("номер картинки после нажатия кнопки" + step);
        if (step === 5) {
            step = 0;
            console.log("первое условие" + step);
        } else {
            step += 1;
            console.log("второе условие" + step);
        }
        rightImg.src = slider[step]; // присвоение пути каждой новой картинке
        rightImg.classList.add('slide-single'); // добавляем картинке класс
        rightImg.style.left = 806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.appendChild(rightImg);// добавляем картинку в наш блок
    }

    function addPrevImage() {
        let leftImg = document.createElement('img');
        if (step === -1) {
            step = slides.length - 1;       // присвоение пути каждой новой картинке
        } else {
            leftImg.src = slider[step - 1]; // присвоение пути каждой новой картинке
        }
        leftImg.src = slider[step];
        leftImg.classList.add('slide-single'); // добавляем картинке класс
        leftImg.style.left = -806 + 'px'; // смещение картинки на ее ширину, первая картинка не смещена она по центру
        sliderBlock.insertBefore(leftImg, sliderBlock.children[0]);// добавляем картинку в наш блок
    }

    function nextImage() {

        let offset2 = 0;
        let step2 = 0;
        let slides2 = document.querySelectorAll('.slide-single');

        slides2[0].remove();

        for (let i = 0; i < slides2.length; i++) {

            if (step2 + 1 === slides2.length) {
                offset2 = 1;


            } else {
                offset2 = 0;
                step2++;
                step++;
            }
            slides2[i].style.left = offset2 * 806 - 806 + 'px';
        }
        setTimeout(function () {
            addNextImage();
        }, 3000);
    }

    function prevImage() {

        let offset3 = 0;
        let step3 = 3;
        let slides3 = document.querySelectorAll('.slide-single');
        slides3[2].remove();

        for (let i = 2; i >= 0; i--) {

            if (step3 - 1 > 0) {
                offset3 = 1;
                step3--;
            } else {
                offset3 = 0;
                step--;
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
