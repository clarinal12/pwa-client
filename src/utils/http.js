const host = `https://push-notification-demo-server.herokuapp.com`;

function post(path, body) {
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
      console.log({ data });
      return data;
    });
}

function get(path) {
  return fetch(`${host}${path}`, {
    credentials: 'omit',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'sec-fetch-mode': 'cors',
    },
    method: 'GET',
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
  get,
};

export default http;
