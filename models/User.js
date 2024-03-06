'use strict';

let count = 0;

class User {
  //Private fields on Instances
  #uId = `U${(Date.now() + '').slice(-10)}`;

  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;

    this._setWelcome();
  }

  _setWelcome() {
    this.welcome = `Welcome ${this.firstName}! 🌻`;
  }

  async _getNews() {
    const countryCode = '',
      catgegory = '',
      pageSize = 4,
      page = 2,
      API_KEY = 'ea8425be926845e1b88a8f18b3cf65f0';

    const endpointUrlByCountry = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${API_KEY}`;
  }
}
