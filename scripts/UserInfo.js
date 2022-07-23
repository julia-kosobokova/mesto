export class UserInfo {
    constructor({nameSelector,descriptionSelector}){
        this._nameProfile=document.querySelector(nameSelector);
        this._descriptionProfile=document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        const userInfo={};
        userInfo.name=this._nameProfile.textContent;
        userInfo.description = this._descriptionProfile.textContent;
        return userInfo;
    }   

    setUserInfo(userInfo) {
        this._nameProfile.textContent = userInfo.name;
        this._descriptionProfile.textContent = userInfo.description;
    }
}