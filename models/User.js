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

  //[Private Methods]
  _setWelcome() {
    this.welcome = `Welcome ${this.firstName}! 🌻`;
  }

  _renderError(errMsg) {
    newsContainer.insertAdjacentText('beforeend', errMsg);
  }

  async _getNews() {
    try {
      const countryCode = 'us',
        catgegory = 'health',
        pageSize = 10,
        page = 7,
        API_KEY = 'ea8425be926845e1b88a8f18b3cf65f0';

      const endpointUrlNews = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${catgegory}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`;

      const resNews = await fetch(endpointUrlNews);

      if (!resNews.ok)
        throw new Error(`Problem getting data ❌ (${resNews.status})`);

      const dataNews = await resNews.json();
      console.log(dataNews);
      // this.renderNews(dataNews);
    } catch (err) {
      console.error('Error occurred while fetching data 💥:', err.message);
      //render error msg for User
      this._renderError(
        `Something went wrong 💥: ${err.message}. Please try again!`
      );
      throw err;
    }
  }

  //[Public Methods/Interfaces]
  renderNews(data) {
    this._getNews();
  }
}
