import {apiConfig} from './props';


class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }
  
  _setRequest(url, config) {
    return fetch(url, config);
  }
  
  _returnRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  
  // handle user info
  
  getUserInfo() {
    return this._setRequest(`${this._url}/users/me`, {
      headers: this._headers
    }).then(res => this._returnRes(res));
  }
  
  patchUserAvatar({avatar}) {
    return this._setRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        'avatar': avatar
      })
    }).then(res => this._returnRes(res));
  }
  
  patchUserInfo({name, about}) {
    return this._setRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'about': about
      })
    }).then(res => this._returnRes(res));
  }
  
  
  // handle cards
  
  getInitialCards() {
    return this._setRequest(`${this._url}/cards`, {
      headers: this._headers
    }).then(res => this._returnRes(res));
  }
  
  postCard({name, link}) {
    return this._setRequest(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'name': name,
        'link': link
      })
    }).then(res => this._returnRes(res));
  }
  
  deleteCard(cardID) {
    return this._setRequest(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._returnRes(res));
  }
  
  
  // handle likes
  
  changeLikeCardStatus(cardID, isLiked) {
    if (!isLiked) {
      return this._setRequest(`${this._url}/cards/${cardID}/likes`, {
        method: 'PUT',
        headers: this._headers
      }).then(res => this._returnRes(res));
    } else {
      return this._setRequest(`${this._url}/cards/${cardID}/likes`, {
        method: 'DELETE',
        headers: this._headers
      }).then(res => this._returnRes(res));
    }
  }
}

const api = new Api(apiConfig);

export default api;