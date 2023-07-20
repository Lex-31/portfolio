const addZero = (n) => n < 10 ? `0${n}` : n; //функция добавления ноля чтобы выводить время в формате 00:00

export const getCurrentDateTime = () => { //функция определения текущего времени
  const months = [
    'янв',
    'фев',
    'мар',
    'апр',
    'май',
    'июн',
    'июл',
    'авг',
    'сен',
    'окт',
    'ноя',
    'дек',
  ];
  const weekdays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ];

  const date = new Date(); //определяем текущее время
  const dayOfMonth = date.getDate(); //25 число месяца
  const month = months[date.getMonth()]; //0-11 выбираем необходимый месяц из массива
  const year = date.getFullYear(); //2023 год
  const dayOfWeek = weekdays[date.getDay()]; //0-6 выбираем необходимый день недели из массива

  const hours = addZero(date.getHours()); //получаем часы c дописаным 0 если цифра до 10
  const minutes = addZero(date.getMinutes()); //получаем минуты c дописаным 0 если цифра до 10

  return { dayOfMonth, month, year, dayOfWeek, hours, minutes }; //возвращаем объект значений текущего времени
}

export const calculateDewPoint = (temp, humidity) => { //расчет Т.Р точки росы
  const ft = (17.27 * temp) / (237.7 + temp) + Math.log(humidity / 100); //расчет точки росы
  const dewPoint = (237.7 * ft) / (17.27 - ft); //температура точки росы
  // const calculateDewPoint = dewPoint.toFixed(1); //округляем до 1 знака после запятой
  return dewPoint.toFixed(1);
};

export const pressureMm = (pressure) => {
  return Math.round(pressure * 0.750062); //переводим давление hpa в мм рт ст и округляем
};

export const getWeatherForecastData = (data) => { //функция сокращения объектов в массиве с 40 до 4шт
  const forecast = data.list.filter((item) => { //фильтруем массив объектов, возвращаем только те элементы которые подходят под условие
    return (
      new Date(item.dt_txt).getHours() === 12 && //только на 12часов
      new Date(item.dt_txt).getDate() > new Date().getDate() &&  //исключаем текущий день
      new Date(item.dt_txt).getDate() < new Date().getDate() + 5  //исключаем последний 5 день
    );
  }); //если время объекта 12часов и число месяца объекта больше чем сегодняшнее число. Вернуться должно 4объекта

  const forecastData = forecast.map((item) => { //преобразуем данные 4ти объектов в нужные нам переменные
    const date = new Date(item.dt_txt); //преобразуемм дату в объекте item в объект даты
    const weekdaysShort = [
      'вс',
      'пн',
      'вт',
      'ср',
      'чт',
      'пт',
      'сб',
    ];
    const dayOfWeek = weekdaysShort[date.getDay()]; //именуем дни недели
    const weatherIcon = item.weather[0].icon;  //символ иконки

    let minTemp = Infinity; //ставим на мин температуре максимальное значение
    let maxTemp = -Infinity; //ставим на макс температуре минимальное значение

    for (let i = 0; i < data.list.length; i++) { //перебираем весь массив 40элементов
      const temp = data.list[i].main.temp; //температура каждого дня и каждого отрезка времени
      const tempDate = new Date(data.list[i].dt_txt); //преобразуем дату в объект JS

      if (tempDate.getDate() === date.getDate()) { //если tempDate дата из 40эл. массива и дата date из текущей иттерации (5элементного массива) равны
        if (temp < minTemp) { //если темп из 40эл массива меньше переменной minTemp...
          minTemp = temp; //записываем минимальную температуру
        }
        if (temp > maxTemp) { //если temp > maxTemp
          maxTemp = temp; //записываем максимальную температуру 
        }
      }
    }

    return { //возвращаем по 1 объекту за 1 иттерацию
      dayOfWeek,
      weatherIcon,
      minTemp,
      maxTemp,
    };
  });
  return forecastData; //возвращаем массив объектов со свойствами dayOfWeek, weatherIcon, minTemp, maxTemp
};

