$(document).ready(function(){
    $('.slider').slick({
        dots: true,

        customPaging: function (slider, i) {

            return '<button class="tab">' + $(slider.$slides[i]).find('.slide-title').text() + '</button>';

        },

        arrows: false,

        autoplay: false,

        slidesToShow: 1,

        slidesToScroll: 1,

        adaptiveHeight: true,

        speed: 2000

    });

    $('#prev-slide').on('click',function(){ $('.slider').slick('slickPrev'); });
    $('#next-slide').on('click',function(){ $('.slider').slick('slickNext'); });

});