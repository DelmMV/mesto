import {profile} from "../utils/constants";

export default class UserInfo{
  constructor(userName, userSubtitle, userAvatar) {
    this._userName = userName;
    this._userSubtitle = userSubtitle;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    const _userInfo = {
      name: this._userName.textContent,
      about: this._userSubtitle.textContent,
      avatar: this._userAvatar.src
    }
    return _userInfo
  }

  setUserInfo = (data) => {
    this._userName.textContent = data.name;
    this._userSubtitle.textContent = data.about;
    this.setUserAvatar(data)
  }

  setUserAvatar = (data) => {
    this._userAvatar.src = data.avatar
    this._userAvatar.alt = data.name
  }

}
