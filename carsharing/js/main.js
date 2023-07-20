$(function () {

    $('.top__slider').slick({
        arrows: false,
        dots: true, //показываем точки-навигаторы по слайдам
        autoplay: true,
        fade: true,
        responsive: [
            {
                breakpoint: 1200, //при уменьшении окна до 1200px...
                settings: {
                    dots: false  //удаляем точки-навигаторы по слайдам
                }
            }
        ]
    });

    $('.reviews__slider').slick({
        arrows: false,  //убираем стреки Next Previous
        dots: true,  //добавляем точки-навигаторы по слайдам
        slidesToShow: 4, //отображать 4 слайда сразу
        slidesToScroll: 1,  //скролить по 1 слайдеру
        responsive: [
            {
                breakpoint: 1141, //при уменьшении окна до 1141px...
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 846, //при уменьшении окна до 846px...
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 585, //при уменьшении окна до 585px...
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

    $('.menu__btn').on('click', function () { //по клику мыши
        $('.menu__list').toggleClass('menu__list--active'); //добавляем/удаляем класс
    })

});