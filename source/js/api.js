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
    'http://80.78.245.19',
    // 'https://echo.htmlacademy.ru/courses',
    {
      method: 'POST',
      headers: new Headers({'content-type': 'applcation/json'}),
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
