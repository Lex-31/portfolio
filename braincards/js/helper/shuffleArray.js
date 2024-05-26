export const shuffleArray = (arr) => {  //функция перемешивания карточек со словами
  const array = [...arr]; //делаем независимую копию массива arr

  for (let i = array.length - 1; i > 0; i--) { //используем цикл в порядке убывания индекса карточки. Для перемешивания карточек
    const j = Math.floor(Math.random() * (i + 1)); //Math.random() возвращает рандомные числа от 0 до 1
    [array[i], array[j]] = [array[j], array[i]]; //индекс карточки меняем местами с рандомным числом
  }
  return array;
};