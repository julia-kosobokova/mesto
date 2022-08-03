export class Api {
    constructor(options) {
        this._options=options;
    }


    //Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(this._options.baseUrl+'/users/me', {
                headers: this._options.headers
            })
            .then(res => {
                if (res.ok) {
                  return res.json();
                }
          
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
              });
    }

    getInitialCards() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-46/cards', {
                headers: {
                    authorization: '2e553a64-7c1d-4473-abd0-835bab4139ba'
                }
            })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
            });
    }

    // другие методы работы с API
}