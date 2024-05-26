import { createElement } from '../helper/createElement.js';
import { declOfNum } from '../helper/declOfNum.js';

export const createCategory = (app) => { //страница выбора категорий слов

  const category = createElement('section', { //создаем html секцию
    className: 'category section-offset',
  });

  const container = createElement('div', {   //создаем html элемент контейнер
    className: 'container',
  });

  category.append(container); //в секцию вставляем контейнер

  const categoryList = createElement('ul', { //создаем html список
    className: 'category__list',
  });

  container.append(categoryList); //вставляем список в контейнер

  const createCategotyCard = (data) => {  //функция создания карточек (li элементов)
    const item = createElement('li', {  //создаем html элемент li
      className: 'category__item',
    });

    item.dataset.id = data.id;  //добавляем ему дата-атрибут

    const btnCard = createElement('button', {  //создаем кнопку карточки
      className: 'category__card',
    });

    const titleText = createElement('span', {  //название категории карточки
      className: 'category__title',
      textContent: data.title,
    });

    const countPairs = createElement('span', {  //кол-во карточек в колоде
      className: 'category__pairs',
      textContent: declOfNum(data.length, ['пара', 'пары', 'пар']),
    })

    btnCard.append(titleText, countPairs);  //название категории и кол-во карточек в колоде вставляем в кнопку карточки

    const btnEdit = createElement('button', {  //создаем кнопку редактирования карточки
      className: 'category__btn category__edit',
      ariaLabel: 'редактировать',
    });

    const btnDel = createElement('button', {  //создаем кнопку удаления карточки
      className: 'category__btn category__del',
      ariaLabel: 'удалить',
    });

    item.append(btnCard, btnEdit, btnDel); //вставляем кнопки в карточку(li элемент)

    return item; //возвращаем карточку товара
  };

  const mount = (data) => {  //отвечает за как и когда вызывать createCategotyCard создание карточек
    categoryList.textContent = '';  //очищаем карточки которые молги остаться в ul списке
    const cards = data.map(createCategotyCard); //перебираем карточки и на каждую карточку в массиве вызываем функцию создания карточек (li элементов)
    categoryList.append(...cards); //разбиваем массив карточек на элементы, и передаем элементы в кач. аргуметов через запятую
    app.append(category);  //в main вставляем секцию section категорий
  };

  const unmount = () => {  //отвечает за удаление карточек
    category.remove(); //удаляем html секцию карточек
  }

  return { mount, unmount, categoryList };  //возвращаем функцию создания, удаления карточек и html список в файл script.js
};

