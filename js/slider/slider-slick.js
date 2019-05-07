if (document.querySelector('.slider-slick-headline')) {
  require('../../slick/slick.js');
  jQuery(() => {
    const $ = jQuery;
    const slider = $('.slider');
    const paging = $('.pagination-dots');
    const images = Array.from($('.slider img'));
    images.forEach((item, i) => {
      const newDots = document.createElement('button');
      newDots.classList.add('slide-dots');
      newDots.innerText = i + 1;
      document.querySelector('.pagination-dots').appendChild(newDots);
    });

    slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      dots: false,
      arrows: true,
      appendArrows: '.pagination-block',
      prevArrow: '<button class="slide-navigation">Назад</button>',
      nextArrow: '<button class="slide-navigation">Вперед</button>',
      autoplay: false,
      speed: 2000,
    });

    paging.slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      dots: false,
      infinite: false,
      focusOnSelect: false,
      prevArrow: '<button class="lessImg"><<</button>',
      nextArrow: '<button class="moreImg">>></button>',
    });
    const lessButton = $('.lessImg');
    const moreButton = $('.moreImg');
    let indexImg = 0;

    paging.on('click', '.slick-slide', function (event) {
      event.preventDefault();
      const goToSingleSlide = $(this).data('slick-index');
      slider.slick('slickGoTo', goToSingleSlide);
      addHidden();
    });

    lessButton.on('click', () => {
      addClass(indexImg);
      addHidden();
    });

    moreButton.on('click', () => {
      addClass(indexImg);
      addHidden();
    });

    slider.on('afterChange', (event, slick, currentSlide) => {
      paging.slick('slickCurrentSlide', currentSlide);
      indexImg = currentSlide;
      const currrentNavSlideElem = `.pagination-dots .slick-slide[data-slick-index="${currentSlide}"]`;
      addClass(currentSlide);
      $('.slick-slide').find('.slide-dots').removeClass('active');
      $(currrentNavSlideElem).find('.slide-dots').addClass('active');
      addHidden();
    });

    paging.find('.slick-slide').addClass('slider-nav');
    paging.find('.slick-list').addClass('slick-list-nav');
    paging.find('.slick-current').find('.slide-dots').addClass('active');

    function addClass(index) {
      const currentNavPaging = Array.from(paging.find('.slick-active'));
      lessButton.removeClass('active');
      moreButton.removeClass('active');
      if (currentNavPaging[0].getAttribute('data-slick-index') > index) {
        lessButton.addClass('active');
      } if (currentNavPaging[2].getAttribute('data-slick-index') < index) {
        moreButton.addClass('active');
      }
    }

    function addHidden() {
      lessButton.removeClass('hidden');
      moreButton.removeClass('hidden');
      if (lessButton.attr('aria-disabled') === 'true') {
        lessButton.addClass('hidden');
      } if (moreButton.attr('aria-disabled') === 'true') {
        moreButton.addClass('hidden');
      }
    }
    addHidden();

    slider.on('setPosition', () => {
      slider.find('.slick-slide').height('auto');
      const slickTrack = $('.body-block').find('.slider');
      const slickTrackHeight = $(slickTrack).height();
      slider.find('img').css('height', `${slickTrackHeight}px`);
    });

    paging.on('setPosition', () => {
      paging.find('.slick-slide').css({"min-width": "30px"});
    });
  });
}
