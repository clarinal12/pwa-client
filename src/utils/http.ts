function post(path: string, body: object) {
  return fetch(`${path}`, {
    credentials: 'omit',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'sec-fetch-mode': 'cors',
    },
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

const http = {
  post,
};

export default http;
