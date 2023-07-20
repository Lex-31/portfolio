import { calculateDewPoint, getCurrentDateTime, getWeatherForecastData, pressureMm } from './utils.js';

export const renderWidgetToday = (widget, data) => { //data - данные из API из функции dataWeather
  const { weather: [{ icon }], name, main: { temp, feels_like } } = data; //создаем необходимые переменные из data
  const { dayOfMonth, month, year, dayOfWeek, hours, minutes } = getCurrentDateTime(); //запускаем функцию заполнения даты, времени, дня недели

  widget.insertAdjacentHTML( //делаем вставку html в конце элемента widget 
    'beforeend',
    `
    <div class="widget__today">
      <div class="widget__date-block">
        <p class="widget__date">${dayOfMonth} ${month} ${year}</p>
        <p class="widget__time">${hours}:${minutes}</p>
        <p class="widget__day">${dayOfWeek}</p>
      </div>
        <div class="widget__icon">
        <img class="widget__img" src="./icon/${icon}.svg" alt="Погода">
      </div>
      <div class="widget__wheather">
        <div class="widget__city">
          <p>${name}</p>
          <button class="widget__change-city" aria-label="Изменить город"></button>
        </div>
        <p class="widget__temp-big">${temp.toFixed(1)} °C</p>
        <p class="widget__felt">ощущается</p>
        <p class="widget__temp-small">${feels_like.toFixed(1)} °C</p>
      </div>
    </div>
    `
  );
};
export const renderWidgetOther = (widget, data) => {  //data - данные из API из функции dataWeather
  const { wind: { deg, speed }, main: { humidity, pressure, temp } } = data; //создаем необходимые переменные из data
  // const icon = getWindDirection(deg); //передаем градус направления ветра для того чтобы getWindDirection выбирала необходимого направления стрелку

  widget.insertAdjacentHTML( //делаем вставку html в конце элемента widget 
    'beforeend',
    `
    <div class="widget__other">
      <div class="widget__wind">
        <p class="widget__wind-title">Ветер</p>
        <p class="widget__wind-speed">${speed} м/с</p>
        <p class="widget__wind-text" style="transform: rotate(${deg}deg);">&#8595;</p>
      </div>
      <div class="widget__humidity">
        <p class="widget__humidity-title">Влажность</p>
        <p class="widget__humidity-value">${humidity}%</p>
        <p class="widget__humidity-text">Т.Р: ${calculateDewPoint(temp, humidity)} °C</p>
      </div>
      <div class="widget__pressure">
        <p class="widget__pressure-title">Давление</p>
        <p class="widget__pressure-value">${pressureMm(pressure)}</p>
          <p class="widget__pressure-text">мм рт.ст.</p>
      </div>
    </div>
    `
  );

};
export const renderWidgetForecast = (widget, data) => {  //data - данные из API из функции dataForecast
  const widgetForecast = document.createElement('ul'); //создаем ul список
  widgetForecast.className = 'widget__forecast'; //задаем ему класс
  widget.append(widgetForecast); //вставить widgetForecast в конец html элемента widget

  const forecastData = getWeatherForecastData(data); //приходит 40 объектов в массиве, сокращаем его до 5 объектов в массиве

  const items = forecastData.map((item) => { //перебираем массив объектров

    const widgetDayItem = document.createElement('li'); //создаем li элемент
    widgetDayItem.className = 'widget__day-item'; //задаем ему класс

    widgetDayItem.insertAdjacentHTML('beforeend', `
      <p class="widget__day-text">${item.dayOfWeek}</p>
      <img class="widget__day-img" src="./icon/${item.weatherIcon}.svg" alt="Погода">
      <p class="widget__day-temp">${item.minTemp.toFixed(1)}°/${item.maxTemp.toFixed(1)}°</p>
      `)
    return widgetDayItem;
  });

  widgetForecast.append(...items); //разбираем массив items на список через запятую, вставляем всё в конец ul элемента widgetForecast
};

export const showError = (widget, error) => { //функция показа ошибок
  widget.textContent = error.toString(); //записываем на страницу ошибку
  widget.classList.add('widget_error'); //добвляем класс для стилизации
}