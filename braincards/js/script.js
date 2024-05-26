import { createCategory } from './components/createCategory.js';
import { createEditCategory } from './components/createEditCategory.js';
import { createHeader } from './components/createHeader.js';
import { createPairs } from './components/createPairs.js';
import { showAlert } from './components/showAlert.js';
import { createElement } from './helper/createElement.js';
import { fetchCards, fetchCategories, fetchCreateCategory, fetchEditCategory, fetchDeleteCategory } from './service/api.service.js';

const initApp = async () => {
  const headerParent = document.querySelector('.header');
  const app = document.querySelector('#app');

  const headerObj = createHeader(headerParent); //создаем header
  const categoryObj = createCategory(app); //создаем категории слов
  const editCategoryObj = createEditCategory(app); //редактирование категории
  const pairsObj = createPairs(app);

  const allSectionUnmount = () => {
    [categoryObj, editCategoryObj, pairsObj].forEach(obj => obj.unmount());  //
  };

  const postHandler = async () => {  //функция отправляет данные на сервер и там формируется новая категория
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchCreateCategory(data); //отправляем данные на сервер
    if (dataCategories.error) {  //если есть ошибка в fetch запросе
      showAlert(dataCategories.error.message);
      return;
    }

    showAlert(`Новая категория ${data.title} была добавлена`);  //показываем сообщение
    allSectionUnmount();
    headerObj.updateHeaderTitle('Категории');  //изменяем текст в заголовке при клике на кнопку
    categoryObj.mount(dataCategories); //запускаем функцию создания карточек
  };
  const patchHandler = async () => {
    const data = editCategoryObj.parseData();
    const dataCategories = await fetchEditCategory(editCategoryObj.btnSave.dataset.id, data);//dataCategory
    if (dataCategories.error) {//dataCategory
      showAlert(dataCategories.error.message);//dataCategory
      return;
    }

    showAlert(`Категория ${data.title} обновлена`);
    allSectionUnmount();
    headerObj.updateHeaderTitle('Категории');  //изменяем текст в заголовке при клике на кнопку
    categoryObj.mount(dataCategories);//dataCategory //запускаем функцию создания карточек
  };

  const renderIndex = async e => {  //создаем функцию события
    e?.preventDefault();  //отменяем стандартное поведение.  e? будет исполняться только в том случае когда запускается событие
    allSectionUnmount();
    const categories = await fetchCategories(); //делаем запрос на сервер и дожидаемся данных
    headerObj.updateHeaderTitle('Категории');  //изменяем текст в заголовке при клике на кнопку
    if (categories.error) {  //если происходит ошибка...
      const errorText = createElement('p', {   //создаем и выводим html элемент для извещения об ошибке
        className: 'server-error',
        textContent: 'Ошибка сервера, попробуйте зайти позже',
      });
      app.append(errorText);
      return; //выходим из функции, следующий код не выполняется
    }

    categoryObj.mount(categories); //запускаем функцию создания карточек
  };

  renderIndex();

  headerObj.headerLogoLink.addEventListener('click', renderIndex); //создаем слушатель события клика по лого

  headerObj.headerBtn.addEventListener('click', () => {  //создаем слушатель события клика по кнопке
    allSectionUnmount();
    headerObj.updateHeaderTitle('Новая категория');  //изменяем текст в заголовке при клике на кнопку
    editCategoryObj.mount();  //монтируем таблицу
    editCategoryObj.btnSave.addEventListener('click', postHandler);
    editCategoryObj.btnSave.removeEventListener('click', patchHandler);
  });

  categoryObj.categoryList.addEventListener('click', async ({ target }) => {
    const categoryItem = target.closest('.category__item');

    if (target.closest('.category__edit')) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle('Редактирование');
      editCategoryObj.mount(dataCards);
      editCategoryObj.btnSave.addEventListener('click', patchHandler);
      editCategoryObj.btnSave.removeEventListener('click', postHandler);
      return;
    }

    if (target.closest('.category__del')) { //если нажимем на кнопку удалить категорию
      if (confirm('Вы уверены что хотите удалить категорию?')) {
        const result = fetchDeleteCategory(categoryItem.dataset.id);
        if (result.error) {  //если какая то ошибка при удалении...
          showAlert(result.error.message); //показываем ее
          return;
        }
        showAlert('Категория удалена!'); //если все ОК, показываем сообщение 'Категория удалена!'
        categoryItem.remove(); //и удаляем это сообщение
      }
      return;
    }

    if (categoryItem) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle(dataCards.title);
      pairsObj.mount(dataCards);
    }
  });

  pairsObj.buttonReturn.addEventListener('click', renderIndex);

};

initApp();