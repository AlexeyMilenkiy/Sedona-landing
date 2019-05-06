$(document).ready(() => {
  const slider = $('.slider');
  const paging = $('.pagination-dots');

  const images = Array.from($('.slider img'));
  images.forEach((item, i) => {
    const newDots = document.createElement('button');
    newDots.classList.add('img-navigation');
    newDots.innerText = i + 1;
    document.querySelector('.pagination-dots').appendChild(newDots);
  });

  slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    appendArrows: '.pagination-block',
    prevArrow: '<button class="slide-navigation">Назад</button>',
    nextArrow: '<button class="slide-navigation">Вперед</button>',
    autoplay: false,
    speed: 2000,
  });

  const indexPaging = 3;
  paging.slick({
    slidesToShow: indexPaging,
    slidesToScroll: indexPaging,
    dots: false,
    infinite: false,
    focusOnSelect: false,
    prevArrow: '<button class="lessImg-class"><<</button>',
    nextArrow: '<button class="moreImg-class">>></button>',
  });

  paging.on('click', '.slick-slide', function (event) {
    event.preventDefault();
    const goToSingleSlide = $(this).data('slick-index');

    $('.slider').slick('slickGoTo', goToSingleSlide);
  });

  slider.on('afterChange', (event, slick, currentSlide) => {
    paging.slick('slickCurrentSlide', currentSlide);
    const currrentNavSlideElem = `.pagination-dots .slick-slide[data-slick-index="${currentSlide}"]`;

    // $('.pagination-dots .slick-slide.is-active').removeClass('active');
    $(currrentNavSlideElem).find('.img-navigation').removeClass('active');
    $(currrentNavSlideElem).find('.img-navigation').addClass('active');
  });

  paging.find('.slick-slide').addClass('slider-nav');
  paging.find('.slick-list').addClass('slick-list-nav');

  // $('.img-navigation').slick({ // настройка навигации
  //     // slidesToShow: 3, // указываем что нужно показывать 3 навигационных изображения
  //     asNavFor: '.slider', // указываем что это навигация для блока выше
  //     focusOnSelect: true // указываем что бы слайделось по клику
  // });
  //


  function addClass() {
    $('.slick-slide').find('.img-navigation').removeClass('active');
    $('.pagination-dots').find('.slick-current').find('.img-navigation').addClass('active');
  }
  addClass();

  $('.pagination-dots').on('click', () => {
    addClass();
  });

  $('.slide-navigation').on('click', () => {
    addClass();
  });
});
