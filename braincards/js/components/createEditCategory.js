import { createElement } from '../helper/createElement.js';

const TITLE = 'введите название категории';

export const createEditCategory = (app) => {

  const editCategory = createElement('section', { //создаем html секцию
    className: 'edit section-offset',
  });

  const container = createElement('div', {  //создаем контейнер
    className: 'container edit__container',
  });

  const title = createElement('h2', { //заголовок перед таблицей
    className: 'edit__title',
    contentEditable: true,
    title: 'Можно редактировать',
  });

  const table = createElement('table', {  //таблица
    className: 'edit__table table',
  });

  const thead = createElement('thead');  //тело заголовка таблицы
  const trThead = createElement('tr');  //строка заголовка

  const tableHeadCellMain = createElement('th', {  //заголовок первой колонки
    className: 'table__cell',
    textContent: 'main',
  });
  const tableHeadCellSecond = createElement('th', {  //заголовок второй колонки
    className: 'table__cell',
    textContent: 'second',
  });
  const tableHeadCellEmpty = createElement('th', {  //заголовок третьей колонки
    className: 'table__cell',
  });

  const tbody = createElement('tbody'); //тело содержимого таблицы

  const btnWrapper = createElement('div', {  //обертка кнопок управления таблицей
    className: 'edit__btn-wrapper',
  });

  const btnAddRow = createElement('button', {  //кнопка добавления
    className: 'edit__btn edit__add-row',
    textContent: 'Добавить пару',
  });
  const btnSave = createElement('button', {  //кнопка сохранения
    className: 'edit__btn edit__save',
    textContent: 'Сохранить категорию',
  });
  const btnCancel = createElement('button', {  //конпка отмены
    className: 'edit__btn edit__cancel',
    textContent: 'Отмена',
  });

  editCategory.append(container); //в секцию вставляем контейнер
  table.append(thead, tbody); //в таблицу вставляем строку заголовка табл. thead и тело таблицы tbody
  thead.append(trThead);  //в строку заголовка таблицы вставляем <tr>
  trThead.append(tableHeadCellMain, tableHeadCellSecond, tableHeadCellEmpty); //в тег <tr> заголовка таблицы ячейки заголовка
  btnWrapper.append(btnAddRow, btnSave, btnCancel); //вставляем кнопки для управления содержимым таблицы
  container.append(title, table, btnWrapper); //в контейнер вставляем заголовок перед табл., таблицу и кнопки упр. содержимым

  const createTRCell = (dataArr) => {  //создаем содержимое таблицы
    const tr = createElement('tr');  //строка содержимого

    const tableCellMain = createElement('td', { //первая ячейка
      className: 'table__cell table__cell_one',
      textContent: dataArr[0],
      contentEditable: true,

    });
    const tableCellSecond = createElement('td', { //вторая ячейка
      className: 'table__cell table__cell_two',
      textContent: dataArr[1],
      contentEditable: true,

    });
    const tableCellDel = createElement('th', { //третья ячейка
      className: 'table__cell',
    });
    const delRow = createElement('button', {  //создаем кнопку удаления строки таблицы
      className: 'table__del',
      textContent: 'x',
    });

    delRow.addEventListener('click', () => {  //на кнопку вешаем событие удаления строки таблицы
      if (confirm('Вы уверены что ходите удалить строку?')) {
        tr.remove();
      }
    });

    tableCellDel.append(delRow); //вставляем кнопку в ячейку таблицы

    tr.append(tableCellMain, tableCellSecond, tableCellDel); //вставляем ячейки в строку таблицы (слово, перевод, кнопка удаления)

    return tr; //и возвращаем строку таблицы
  };

  const clearTitle = () => {  //функция при клике по заголовку его очищает (как у placeholder)
    if (title.textContent === TITLE) {  //если заголовок === 'введите название категории'
      title.textContent = '';  //очищаем содержимое заголовка
    }
  };

  const checkTitle = () => {  //функция при клике мимо заголовка заполняет строкой TITLE (как у placeholder)
    if (title.textContent === '') {  //если заголовок пустой
      title.textContent = TITLE;  //вставляем надпись  'введите название категории'
    }
  };

  title.addEventListener('focus', clearTitle);  //если фокусируемся на заголовке, то очищаем его или редактируем
  title.addEventListener('blur', checkTitle);  //если фокусируемся мимо заголовка и заголовок при этом пустой, то обратно возвращаем надпись TITLE

  btnAddRow.addEventListener('click', () => {  //вешаем событие на кнопку 'добавить пару'
    const emptyRow = createTRCell(['', '']);  //создаем пустую строчку
    tbody.append(emptyRow);  //и вставляем в тело таблицы

  });

  const parseData = () => {  //парсим данные из таблицы
    const cellsMain = document.querySelectorAll('.table__cell_one');
    const cellsSecond = document.querySelectorAll('.table__cell_two');
    const data = { pairs: [], };
    for (let i = 0; i < cellsMain.length; i++) {  //i++ / i+=1
      const textMain = cellsMain[i].textContent.trim();
      const textSecond = cellsSecond[i].textContent.trim();
      if (textMain && textSecond) {
        data.pairs.push([textMain, textSecond]);
      }
    }
    if (title.textContent.trim() && title.textContent !== TITLE) { //проверяем заголовок, что он есть, и что не пустой
      data.title = title.textContent.trim();
    }
    if (btnSave.dataset.id) {
      data.id = btnSave.dataset.id;
    }
    return data;
  };

  const mount = (data = { title: TITLE, pairs: [] }) => {
    tbody.textContent = ''; //очищаем тело таблицы
    title.textContent = data.title;  //заголовок перед таблицей заполняем данными из аргумента

    if (title.textContent === TITLE) {
      title.classList.add('edit__title_change');
    } else {
      title.classList.remove('edit__title_change');
    }

    const rows = data.pairs.map(createTRCell); //создаем строки тела таблицы и передаем заполняем ими массив rows
    const emptyRow = createTRCell(['', '']);  //создаем пустую строчку
    tbody.append(...rows, emptyRow); //в тело таблицы вставляем строки заполненые и пустую для заполнения

    btnSave.dataset.id = data.id ? data.id : '';

    app.append(editCategory);  //секцию editCategory вставляем в тег main
  };

  const unmount = () => {
    editCategory.remove(); //удаляем секцию editCategory
  };

  return { mount, unmount, parseData, btnSave, btnCancel };
};


/*
<section class="edit section-offset">
      <div class="container edit__container">
        <h2 class="edit__title" contenteditable="true" title="Можно редактировать">Семья</h2>
        <table class="edit__table table">
          <thead>
            <tr>
              <th class="table__cell">main</th>
              <th class="table__cell">second</th>
              <th class="table__cell"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="table__cell table__cell_one" contenteditable="true">брат</td>
              <td class="table__cell table__cell_two" contenteditable="true">brother</td>
              <td class="table__cell"><button class="table__del">x</button></td>
            </tr>
          </tbody>
        </table>
        <div class="edit__btn-wrapper">
          <button class="edit__btn edit__add-row">Добавить пару</button>
          <button class="edit__btn edit__save" data-id="bczp358gktzy">Сохранить категорию</button>
          <button class="edit__btn edit__cancel">Отмена</button>
        </div>
      </div>
    </section>
*/