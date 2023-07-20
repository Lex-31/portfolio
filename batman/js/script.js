//бургер меню
const burger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation');
const navigationClose = document.querySelector('.navigation__close');

burger.addEventListener('click', () => { //при клике на иконку меню добавлять класс
  navigation.classList.add('navigation_active');
});
navigationClose.addEventListener('click', () => { //при клике на иконку меню удалять класс
  navigation.classList.remove('navigation_active');
});

//музыка
try {
  const mute = document.querySelector('.mute__checkbox');
  const audio = new Audio('audio/waterTower.mp3');

  const checkMute = () => {
    if (mute.checked) {
      audio.play().catch(() => {
        mute.checked = false;
      });
    } else {
      audio.pause();
    }
  };

  if (mute) {
    setTimeout(checkMute, 2000);
  }

  mute.addEventListener('change', checkMute);
} catch {
  console.log('На этой странице нет музыки');
}

try {
  const sliderThumbs = new Swiper('.slider-thumbs', { //реализация слайдера пагинации
    loop: true,
    spaceBetween: 20,
    slidesPerView: 3,
    centeredSlides: true,
  });

  sliderThumbs.on('click', (swiper) => {
    swiper.slideTo(swiper.clickedIndex)
  });

  const sliderMain = new Swiper('.slider-main', { //реализация слайдера основного
    loop: true,
    spaceBetween: 10,
    loopedSlides: 4,
  });

  sliderThumbs.controller.control = sliderMain; //связываем нижний слайдер с верхним, 
  // sliderMain.controller.control = sliderThumbs;

  const videos = document.querySelectorAll('video');

  sliderMain.on('slideChange', () => {
    for (let i = 0; i < videos.length; i++) {
      videos[i].pause();

    }
  });

  const pagination = document.querySelector('.pagination');
  const paginationButton = document.querySelector('.pagination__arrow');

  paginationButton.addEventListener('click', () => { //скрывать-открывать нижний слайдер пагинации
    pagination.classList.toggle('pagination_active');
  })

} catch {
  console.log('На этой странице нет слайдера');
}