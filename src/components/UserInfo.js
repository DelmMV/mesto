export default class UserInfo{
  constructor(userNameSelector, userSubtitleSelector) {
    this._userNameSelector = userNameSelector;
    this._userSubtitleSelector = userSubtitleSelector;
  }

  getUserInfo() {
    const _userInfo = {
      name: this._userNameSelector,
      subtitle: this._userSubtitleSelector
    }
    return _userInfo
  }

  setUserInfo(inputTitle, inputSubtitle) {
    this._userNameSelector.textContent = inputTitle.value;
    this._userSubtitleSelector.textContent = inputSubtitle.value;
  }

}
