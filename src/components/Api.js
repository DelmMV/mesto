export default class Api {
  constructor(config) {
    this._name = config.name;
    this._link = config.link;
  }

  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitCards() {
    return fetch(`https://mesto.${this._link}cards`, {
      name: this._name
    })
      .then(this._errorHandler)
  }
  addCard(name, link) {
    return fetch(`https://mesto.${this._link}cards`, {
      method: "POST",
      headers: this._name,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._errorHandler);
  }
}
