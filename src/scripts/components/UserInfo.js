export class UserInfo {
    constructor({
        nameSelector,
        descriptionSelector,
        avatarSelector
    }) {
        this._nameProfile = document.querySelector(nameSelector);
        this._descriptionProfile = document.querySelector(descriptionSelector);
        this._avatarProfile = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const userInfo = {};
        userInfo.name = this._nameProfile.textContent;
        userInfo.description = this._descriptionProfile.textContent;
        userInfo.avatar=this._avatarProfile.src;
        userInfo.id = this._id;
        return userInfo;
    }

    setUserInfo(userInfo) {
        this._nameProfile.textContent = userInfo.name;
        this._descriptionProfile.textContent = userInfo.description;
        this._avatarProfile.src=userInfo.avatar;
        this._id = userInfo.id;
    }
}