$(document).ready(() => {
  const images = Array.from($('.slider img'));

  images.forEach((item, i) => {
    const newDots = document.createElement('button');
    newDots.classList.add('img-navigation');
    newDots.innerText = i + 1;
    document.querySelector('.pagination-dots').appendChild(newDots);
  });

  $('.slider').slick({
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

  const indexPaging = 5;
  $('.pagination-dots').slick({
    slidesToShow: indexPaging,
    slidesToScroll: indexPaging,
    dots: false,
    infinite: false,
    focusOnSelect: false,
    variableWidth: true,
    prevArrow: '<button class="lessImg-class"><<</button>',
    nextArrow: '<button class="moreImg-class">>></button>',
  });

  $('.pagination-dots').on('click', '.slick-slide', function (event) {
    event.preventDefault();
    const goToSingleSlide = $(this).data('slick-index');

    $('.slider').slick('slickGoTo', goToSingleSlide);
  });

  $('.slider').on('afterChange', (event, slick, currentSlide) => {
    $('.pagination-dots').slick('slickGoTo', currentSlide);
    const currrentNavSlideElem = `.pagination-dots .slick-slide[data-slick-index="${currentSlide}"]`;

    console.log(currrentNavSlideElem);

    $('.pagination-dots .slick-slide.is-active').removeClass('is-active');
    $(currrentNavSlideElem).addClass('active');
  });
  // $('.img-navigation').slick({ // настройка навигации
  //     // slidesToShow: 3, // указываем что нужно показывать 3 навигационных изображения
  //     asNavFor: '.slider', // указываем что это навигация для блока выше
  //     focusOnSelect: true // указываем что бы слайделось по клику
  // });
  //
  // $(".pagination-img-block").slick({
  //     slidesToShow: 3,
  //     slidesToScroll: 3,
  //     asNavFor: ".slider",
  //     arrows: false,
  //     // nextArrow: ".slider__next",
  //     // prevArrow: ".slider__prev",
  //     // focusOnSelect: true
  // });

  // $('.pagination-dots').slick({
  //     // slidesToShow: 3,x
  //     asNavFor: '.slider-for',
  //     dots: false,
  //     // centerMode: true,
  //     focusOnSelect: true,
  // });
  //
  // function addClass() {
  //   $('li').find('.img-navigation').removeClass('active');
  //   $('.slick-active').find('.img-navigation').addClass('active');
  // }
  // addClass();
  //
  // $('li').on('click', () => {
  //   addClass();
  // });
  //
  // $('.slide-navigation').on('click', () => {
  //   addClass();
  // });
});
