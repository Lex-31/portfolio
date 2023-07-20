import { startWidget } from './widgetService.js';

export const cityServiceSearch = (widget) => { //форма ввода города
  const button = document.querySelector('.widget__change-city'); //берем кнопочку выбора города
  button.addEventListener('click', () => { //слушатель события клика по кнопочке
    const form = document.createElement('form'); //создаем html элемент формы
    form.classList.add('widget__form'); //добавляем класс

    const inputCity = document.createElement('input'); //создаем input формы
    inputCity.classList.add('widget__input'); //добавляем класс
    inputCity.name = 'city'; //задаем атрибут name
    inputCity.type = 'search'; //задаем атрибут type
    inputCity.placeholder = 'Введите город';

    form.append(inputCity); //в форму вставляем input элемент
    widget.append(form); //в основной html элемент вставляем форму

    inputCity.focus(); // чтобы фокус переходил сразу в поле ввода при клике на кнопку

    form.addEventListener('submit', async (e) => {  //по событию отправки формы делаем асинхр функц. 
      e.preventDefault(); //отменяем перезагрузку страницы после клика
      widget.textContent = ''; //очищаем все данные из виджета
      await startWidget(inputCity.value, widget); //в аргументе передаем город введенный в поле ввода, выполняем запросы по API. Ждем пока она выполнится
      cityServiceSearch(widget); //опять отрисовываем кнопочку
    });
  });
};