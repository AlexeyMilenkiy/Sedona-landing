$(document).ready(function() {
    $('.slider').slick({

        dots: true,

        customPaging: function (slider, i) {
            var thumb = $(slider.$slides[i]).data();
            let indexPaging = 3;

            console.log($('li'));
            return '<button class="img-navigation">' + (i + 1) + '</button>';
        },

        arrows: true,

        appendArrows: '.pagination-block',

        prevArrow: '<button class="slide-navigation">Назад</button>',

        appendDots: '.pagination-dots',

        nextArrow: '<button class="slide-navigation">Вперед</button>',

        autoplay: false,

        speed: 2000,

        dotsClass: 'pagination-dots',

        // asNavFor: '.pagination-dots',

    });

    // $('.img-navigation').slick({ // настройка навигации
    //     // slidesToShow: 3, // указываем что нужно показывать 3 навигационных изображения
    //     asNavFor: '.slider', // указываем что это навигация для блока выше
    //     focusOnSelect: true // указываем что бы слайделось по клику
    // });

    // $(".pagination-dots").slick({
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     asNavFor: ".slider",
    //     // nextArrow: ".slider__next",
    //     // prevArrow: ".slider__prev",
    //     focusOnSelect: true
    // });

    function addClass(){
        $('li').find('.img-navigation').removeClass('active');
        $('.slick-active').find('.img-navigation').addClass('active');
    }
    addClass();

    $('li').on("click", function () {
        addClass();
    });

    $('.slide-navigation').on('click', function(){
        addClass();
    });

});