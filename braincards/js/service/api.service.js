const API_URL = 'https://amused-tartan-drizzle.glitch.me/'; //сервис поиска слов

export const fetchCategories = async () => { //запрос списка категорий
  try {
    const response = await fetch(`${API_URL}/api/category`); //делаем запрос, дожидаемся ответа
    if (!(response.status === 200 || response.status === 201)) { //если запрос не успешен...
      const error = await response.json();
      throw error; //бросаем исключение и направляем в catch
    }
    const categories = await response.json(); //если успешен...
    return categories; //...возвращаем полученные данные
  } catch (error) {
    return { error }; //возвращаем ошибку
  }
};

export const fetchCards = async (id) => {  //запрос конкретной категории
  try {
    const response = await fetch(`${API_URL}/api/category/${id}`); //делаем запрос с конкретным ip категории, дожидаемся ответа
    if (!(response.status === 200 || response.status === 201)) { //если запрос не успешен...
      const error = await response.json();
      throw error; //бросаем исключение и направляем в catch
    }
    const cards = await response.json(); //если успешен...
    return cards; //...возвращаем полученные данные
  } catch (error) {
    return { error }; //возвращаем ошибку
  }
};

export const fetchCreateCategory = async (data) => {  //запрос конкретной категории
  try {
    const response = await fetch(`${API_URL}/api/category/`, { //делаем запрос с конкретным ip категории, дожидаемся ответа
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (!(response.status === 200 || response.status === 201)) { //если запрос не успешен...
      const error = await response.json();
      throw error; //бросаем исключение и направляем в catch
    }
    const categories = await response.json(); //если успешен...
    return categories; //...возвращаем полученные данные
  } catch (error) {
    return { error }; //возвращаем ошибку
  }
};

export const fetchEditCategory = async (id, data) => {  //запрос конкретной категории
  try {
    const response = await fetch(`${API_URL}/api/category/${id}`, { //делаем запрос с конкретным ip категории, дожидаемся ответа
      method: 'PATCH',
      body: JSON.stringify(data),
    });


    if (!(response.status === 200 || response.status === 201)) { //если запрос не успешен...
      const error = await response.json();
      throw error; //бросаем исключение и направляем в catch
    }

    const categories = await response.json(); //если успешен...
    return categories; //...возвращаем полученные данные

  } catch (error) {
    return { error }; //возвращаем ошибку
  }
};

export const fetchDeleteCategory = async (id) => {  //запрос конкретной категории
  try {
    const response = await fetch(`${API_URL}/api/category/${id}`, { //делаем запрос с конкретным ip категории, дожидаемся ответа
      method: 'DELETE',
    });


    if (!(response.status === 200 || response.status === 201)) { //если запрос не успешен...
      const error = await response.json();
      throw error; //бросаем исключение и направляем в catch
    }

    const result = await response.json(); //если успешен...
    return result; //...возвращаем полученные данные

  } catch (error) {
    return { error }; //возвращаем ошибку
  }
};