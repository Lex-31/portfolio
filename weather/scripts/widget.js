import { cityServiceSearch } from './modules/cityServiceSearch.js';
import { startWidget } from './modules/widgetService.js';

const initWidget = async (app) => { //основная функция

  const widget = await startWidget(); //взываем функцию startWidget, результат ее работы передаем в переменную widget
  app.append(widget); //вставляем widget в html элемент app

  cityServiceSearch(widget); //создаем форму ввода города и вставляем ее в основной html элемент
};

const app = document.querySelector('#app'); //берем div с id = app
initWidget(app); //запуск основной функции в div элементе
