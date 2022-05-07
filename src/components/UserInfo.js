export default class UserInfo{
  constructor(userName, userSubtitle) {
    this._userName = userName;
    this._userSubtitle = userSubtitle;
  }

  getUserInfo() {
    const _userInfo = {
      name: this._userName,
      subtitle: this._userSubtitle
    }
    return _userInfo
  }

  setUserInfo = (profileTitle, profileSubtitle) => {
    this._userName.textContent = profileTitle;
    this._userSubtitle.textContent = profileSubtitle;
  }

}
