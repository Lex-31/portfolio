$(function () {

  $('.carousel__inner').slick({  //подкл. куда будет слайдер выводится
    arrows: false, //отключаем стрекли
    dots: true, //подключаем точки индикаторы слайдера
    slidesToShow: 3, //показывать по 3шт слайда
    responsive: [
      {
        breakpoint: 841,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 601,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });


});