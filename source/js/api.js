const sendData = (data, onSuccess, onError) => {
  return fetch(
    'https://xn--24-1lcpbdde.xn--p1ai',
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

export { sendData };
