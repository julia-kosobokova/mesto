export class Api {
    constructor(options) {
        this._options=options;
    }


    //Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(this._options.baseUrl + '/users/me', {
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

    // Загрузка карточек с сервера
    getInitialCards() {
        return fetch(this._options.baseUrl + '/cards', {
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

    // Сохранение профиля
    saveUserInfo(userInfo) {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.description
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    // Добавление новой карточки
    saveNewCard(card) {
        return fetch(this._options.baseUrl + '/cards', {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

}