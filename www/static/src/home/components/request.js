export default {
  get(url, opts = {}) {
    return fetch(url, Object.assign({
      credentials: 'include'
    }, opts)).then(resp => resp.json());
  },
  post(url, data, opts = {}) {
    return fetch(url, Object.assign({
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }, opts)).then(resp => resp.json());
  }
};
