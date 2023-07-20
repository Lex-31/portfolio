const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = 'c1b3e46d05659ea9dbd8cabd8c33145b';
const API_LANG = 'ru'; //язык
const API_UNITS = 'metric'; //система измерения

export const fetchWeather = async (city) => { //делаем запрос на адрес API. Ждем пока не получим ответ.
  try {
    const response = await fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}&lang=${API_LANG}&units=${API_UNITS}`); //запрос текущей погоды

    if (!response.ok) { //если запрос завершился неуспешно
      throw new Error('Ошибка запроса'); //останавливаем выполнение этого блока и начинам выполнение блока catch
    }
    const data = await response.json(); //указываем формат в котором хотим получить данные. Тоже ждем ответ.
    return { success: true, data };  //если запрос завершился успешно, то возвращаем data в json
  } catch (error) { //если на каком нибудь этапе выше произойдет ошибка, будет выполнен следующий блок кода:
    return { success: false, error }; //возвращаем ошибку
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await fetch(`${API_URL}forecast?q=${city}&appid=${API_KEY}&lang=${API_LANG}&units=${API_UNITS}`); //запрос погоды на 5дней

    if (!response.ok) { //если запрос завершился неуспешно
      throw new Error('Ошибка запроса'); //останавливаем выполнение этого блока и начинам выполнение блока catch
    }
    const data = await response.json(); //указываем формат в котором хотим получить данные. Тоже ждем ответ.
    return { success: true, data };  //если запрос завершился успешно, то возвращаем data в json
  } catch (error) { //если на каком нибудь этапе выше произойдет ошибка, будет выполнен следующий блок кода:
    return { success: false, error }; //возвращаем ошибку
  }

};

export const getCity = async () => { //функция запроса города по IP
  const url = 'https://ipapi.co/city/'; //адрес ресурса который отвечает какой город по нашему IP

  try {
    const response = await fetch(url); //делаем запрос

    if (!response.ok) { //если запрос ответил что он не успешный, не ок
      throw new Error('Ошибка получения города'); //бросаем исключение
    }

    const city = await response.text(); //переводим ответ в text формат
    return { success: true, city }; //возвращаем объект с успешным ответом и данными ответа
  } catch (error) { //в случае ошибки
    return { success: false, error }; //возвращаем объект с неуспешным ответом и информацией по ошибке
  }
};
