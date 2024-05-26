import { createElement } from '../helper/createElement.js'; //создание html элементов со свойствами

export const createHeader = (parent) => {
  const container = createElement('div', {   //создаем html элемент контейнер
    className: 'container header__container',
  });

  parent.append(container);  //вставляем контейнер в html элемент переданый в качестве атрибута

  const headerLogoLink = createElement('a', { //создаем html ссылку
    href: '#',
    className: 'header__logo-link',
  });

  const logo = createElement('img', {  //создаем объект Логотипа
    src: 'img/logo.svg',
    className: 'header__logo',
    alt: 'Логотип сервиса Brain Cards',
  });

  headerLogoLink.append(logo); //вставляем логотип в ссылку

  const headerTitle = createElement('h2', {  //создаем заголовок
    className: 'header__subtitle',
    textContent: 'Категории',
  });

  const headerBtn = createElement('button', {  //создаем кнопку
    className: 'header__btn',
    textContent: 'Добавить категорию',
  });

  container.append(headerLogoLink, headerTitle, headerBtn);  //вставляем ссылку, заголовок и кнопку в контейнер

  const updateHeaderTitle = title => {  //функция редактирования надписи заголовка
    headerTitle.textContent = title;
  };

  return { headerLogoLink, headerBtn, updateHeaderTitle };  //возвращаем из функции сслыку логотипа, кнопку,
};