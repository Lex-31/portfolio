export const createElement = (tag, attr) => {
  const element = document.createElement(tag); //создаем html элемент с тегом из аругментов
  return Object.assign(element, attr); //из attr копируем свойтва в element
}