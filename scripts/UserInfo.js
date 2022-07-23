export class UserInfo {
    constructor({nameSelector,descriptionSelector}){
        this._inputProfileName=nameSelector;
        this._inputProfileDescription=descriptionSelector;
    }

    getUserInfo() {
        //function openPopupProfile() {
            this._inputProfileName.value = nameProfile.textContent;
            this._inputProfileDescription.value = descriptionProfile.textContent;
            profileValidation.resetValidation();
            instancePopupProfile.open();
         // }
    }   
    setUserInfo() {
        function handleProfileFormSubmit(evt) {
            evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
          
            nameProfile.textContent = inputProfileName.value;
            descriptionProfile.textContent = inputProfileDescription.value;
        }
    }
}