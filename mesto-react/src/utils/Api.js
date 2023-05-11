import {apiConfig} from './constants';


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
  
  patchUserAvatar({userAvatar}) {
    return this._setRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        'avatar': userAvatar
      })
    }).then(res => this._returnRes(res));
  }
  
  patchUserInfo({userName, userJob}) {
    return this._setRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        'name': userName,
        'about': userJob
      })
    }).then(res => this._returnRes(res));
  }
  
  
  // handle cards
  
  getInitialCards() {
    return this._setRequest(`${this._url}/cards`, {
      headers: this._headers
    }).then(res => this._returnRes(res));
  }
  
  postCard({placeName, placeLink}) {
    return this._setRequest(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        'name': placeName,
        'link': placeLink
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
  
  putLike(cardID) {
    return this._setRequest(`${this._url}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(res => this._returnRes(res));
  }
  
  deleteLike(cardID) {
    return this._setRequest(`${this._url}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(res => this._returnRes(res));
  }
}
const api = new Api(apiConfig);

export default api;