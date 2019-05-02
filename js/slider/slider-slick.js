$(document).ready(function(){
    $('.slider').slick({
        dots: true,

        customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).data();
            return '<button class="img-navigation">' + (i+1) + '</button>';
        },

        arrows: true,

        appendArrows: '.pagination-block',

        prevArrow : '<button class="slide-navigation">Назад</button>',

        appendDots : '.pagination-dots',

        nextArrow : '<button class="slide-navigation">Вперед</button>',

        autoplay: false,

        speed: 2000,

        dotsClass: "pagination-img-block"

    });

    // $('.pagination-img-block').slick({ // настройка навигации
    //     slidesToShow: 3, // указываем что нужно показывать 3 навигационных изображения
    //     asNavFor: '.slider', // указываем что это навигация для блока выше
    //     focusOnSelect: true // указываем что бы слайделось по клику
    // });

});