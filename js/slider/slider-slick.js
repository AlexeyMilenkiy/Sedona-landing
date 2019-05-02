$(document).ready(function(){
    $('.slider').slick({
        dots: true,

        customPaging : function(slider, i) {
            var thumb = $(slider.$slides[i]).data();
            return '<button class="img-navigation">' + (i+1) + '</button>';
        },

        arrows: false,

        autoplay: false,

        slidesToShow: 1,

        slidesToScroll: 1,

        adaptiveHeight: true,

        speed: 2000,

        dotsClass: "pagination-img-block"

    });

    $('#prev-slide').on('click',function(){ $('.slider').slick('slickPrev'); });
    $('#next-slide').on('click',function(){ $('.slider').slick('slickNext'); });

});