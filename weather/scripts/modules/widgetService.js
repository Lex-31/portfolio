import { fetchForecast, fetchWeather, getCity } from './APIservice.js';
import { renderWidgetForecast, renderWidgetOther, renderWidgetToday, showError } from './render.js';

export const startWidget = async (city, widget) => {

  if (!city) { //если город не передали
    const dataCity = await getCity(); //запускаем функцию запроса по IP и ждем ее ответа
    if (dataCity.success) { //если ответ успешен
      city = dataCity.city; //берем город из объекта ответа
    } else { //если не успешен
      showError(widget, dataCity.error); //запускаем функцию показа ошибки 
    }
  }

  if (!widget) { //если виджета не существует
    widget = document.createElement('div'); //создаем html элемент div
    widget.classList.add('widget'); //задаем ему класс
  }

  const dataWeather = await fetchWeather(city); //делаем запрос по API с указанием аргумента-города и получаем результат текущей погоды. Ждем пока функция не выдаст ответ.

  if (dataWeather.success) { //если запрос успешно прошел и данные сохранились в dataWeather
    renderWidgetToday(widget, dataWeather.data); //отрисовываем div с классом widget__today. Отправляем данные из API
    renderWidgetOther(widget, dataWeather.data); //отрисовываем div с классом widget__other. Отправляем данные из API
  } else {  //если ошибка запроса по API то...
    showError(widget, dataWeather.error); //запускаем функцию показа ошибок
  }

  const dataForecast = await fetchForecast(city); //делаем запрос по API с указанием аргумента-города и получаем результат прогноза на 5дней. Ждем пока функция не выдаст ответ.

  if (dataForecast.success) { //если запрос успешно прошел и данные сохранились в dataForecast
    renderWidgetForecast(widget, dataForecast.data); //отрисовываем div с классом widget__forecast. Отправляем данные из API
  } else {  //если ошибка запроса по API то...
    showError(widget, dataForecast.error); //запускаем функцию показа ошибок
  }

  return widget; //результат работы html элемент div с классом widget
};