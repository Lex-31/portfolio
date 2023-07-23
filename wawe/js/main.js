$(function () {

  $(".menu a, .go-top, .logo").on("click", function (e) { //.menu a, .go-top, .logo - ссылки якорные с такими классами будут плавно скроллить
    e.preventDefault(); //отменяем стандартную обработку нажатия по ссылке
    var id = $(this).attr('href'), //забираем идентификатор бока с атрибута href

      top = $(id).offset().top; //узнаем высоту от начала страницы до блока на который ссылается якорь

    $('body,html').animate({ scrollTop: top }, 1500); //анимируем переход на расстояние - top за 1500 мс
  });

  $('.slider-blog__inner').slick({ //реализуем слайдер
    dots: true, //вкл пагинцию
    arrows: false, //выключаем управляющие стрелки

  });

  //------header menu------- открывать/закрывать меню на мобильнй версии
  $('.menu__btn, .menu a').on('click', function () {
    $('.menu__list').toggleClass('menu__list--active'); //при нажатии кнопки .menu__btn будет меняться класс менюшки, при нажатии кнопки ".menu a" будет скрываться менюшка
  });

  var mixer = mixitup('.gallery__content'); //подкл сортировку MixItUp

});