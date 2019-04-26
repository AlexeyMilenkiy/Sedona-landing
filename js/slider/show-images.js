
  if (!!document.querySelector('.slider-headline')) {
    let slides = document.querySelectorAll('.slide-single');
    const sliderBlock = document.querySelector('.slider');
    window.links = [];
    let imgIndex = 0;
    let offset = 0;

    // create array with links images on slider
    const findLinksImg = () => {
      for (let i = 0; i < slides.length; i += 1) {
        links[i] = slides[i].src;
        slides[i].remove();
      }
    };

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
      showImage();
  } else {
      return;
  }
