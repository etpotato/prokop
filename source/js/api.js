const getData = (onSuccess, onError) => {
  return fetch('https://echo.htmlacademy.ru/courses')
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      throw new Error(`${responce.status} ${responce.statusText}`);
    })
    .then(onSuccess)
    .catch(onError);
};

const sendData = (data, onSuccess, onError) => {
  return fetch(
    'https://echo.htmlacademy.ru/courses',
    {
      method: 'POST',
      body: data,
    })
    .then((responce) => {
      if (responce.ok) {
        return onSuccess(responce);
      }
      throw new Error(`${responce.status} ${responce.statusText}`);
    })
    .catch(onError);
};

export { getData, sendData };
