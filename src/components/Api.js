export default class Api {
  constructor(config) {
    this._headers = config.headers;
    this._link = config.link;
  }

  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`https://mesto.${this._link}cards`, {
      headers: this._headers,
    })
      .then(this._errorHandler)
  }

  setUserInfo(data) {
    return fetch(`https://mesto.${this._link}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._errorHandler);
  }

  getInitialUser() {
    return fetch(`https://mesto.${this._link}users/me`, {
      headers: this._headers,
    }).then(this._errorHandler)
  }

  getInitialAll() {
    return Promise.all([this.getInitialCards(), this.getInitialUser()])
  }

  addCard(name, link) {
    return fetch(`https://mesto.${this._link}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._errorHandler);
  }
  removeCard(id) {
    return fetch(`https://mesto.${this._link}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  addLike(id) {
    return fetch(`https://mesto.${this._link}cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  removeLike(id) {
    return fetch(`https://mesto.${this._link}cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._errorHandler);
  }

  updateAvatar(data) {
    return fetch(`https://mesto.${this._link}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._errorHandler);
  }
}
