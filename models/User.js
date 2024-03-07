'use strict';

let count = 0;

class User {
  //Private fields on Instances
  #uId = `U${(Date.now() + '').slice(-10)}`;
  #curPage = 0;

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

  _renderNews(data) {
    data.articles.forEach(article => {
      const { urlToImage, title, description, url } = article;

      const htmlArticle = `<div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img src="${urlToImage}" class="card-img" alt="${title}">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  ${title}
                </h5>
                <p class="card-text">
                  ${description}
                </p>
                <a href="${url}" class="btn btn-primary">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>`;
      newsContainer.insertAdjacentHTML('beforeend', htmlArticle);
    });
  }

  //[Public Methods/Interfaces]
  renderMainContent(isLoggedIn) {
    //if User logged in successfully
    if (isLoggedIn) {
      mainContent.style.display = 'block';
      welcomeMsg.textContent = this.welcome;
    } else loginModal.style.display = 'block';
  }

  async getNews(isLoggedIn) {
    //if User logged in successfully
    if (isLoggedIn) {
      try {
        const countryCode = 'us',
          catgegory = 'health',
          pageSize = 5,
          API_KEY = 'ea8425be926845e1b88a8f18b3cf65f0';
        this.#curPage++;

        const endpointUrlNews = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${catgegory}&pageSize=${pageSize}&page=${
          this.#curPage
        }&apiKey=${API_KEY}`;

        const resNews = await fetch(endpointUrlNews);

        if (!resNews.ok)
          throw new Error(`Problem getting data ❌ (${resNews.status})`);

        const dataNews = await resNews.json();
        this._renderNews(dataNews);
      } catch (err) {
        console.error('Error occurred while fetching data 💥:', err.message);
        //render error msg for User
        this._renderError(
          `Something went wrong 💥: ${err.message}. Please try again!`
        );
        throw err;
      }
    }
  }
}
