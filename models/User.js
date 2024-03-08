'use strict';

///////////////////////////////////////
// USER
class User {
  //Private fields on Instances
  #uId = `U${(Date.now() + '').slice(-10)}`;
  #NEWS_API_KEY = '3cf3580a1bfa4f93b11ceac220da2635';
  #prevCheck = false;
  #nextCheck = false;

  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;

    this._setWelcome();

    //Attach event handlers
    btnPrev?.addEventListener('click', this._isPrev.bind(this));
    btnNext?.addEventListener('click', this._isNext.bind(this));
  }

  //[Private Methods]
  _setWelcome() {
    this.welcome = `Welcome ${this.firstName}! 🌻`;
  }

  _isPrev() {
    this.#prevCheck = true;
    this.#nextCheck = false;
  }

  _isNext() {
    this.#nextCheck = true;
    this.#prevCheck = false;
  }

  _renderError(errMsg) {
    newsContainer.insertAdjacentText('afterbegin', errMsg);
  }

  _renderNews(data) {
    Array.from(newsContainer.children).forEach(article => article.remove());

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

  _updatePagination = function (curPage, lastPage) {
    pageNum.textContent = curPage;
    curPage === 1
      ? (btnPrev.style.display = 'none')
      : (btnPrev.style.display = 'block');

    curPage === lastPage
      ? (btnNext.style.display = 'none')
      : (btnNext.style.display = 'block');
  };

  async _getReqData(endpointUrl) {
    const resData = await fetch(endpointUrl);

    if (!resData.ok)
      throw new Error(`Problem getting data ❌ (${resData.status})`);

    return await resData.json();
  }

  //[Public Methods/Interfaces]
  renderMainContent(isLoggedIn) {
    //if User logged in successfully
    if (isLoggedIn) {
      mainContent.style.display = 'block';
      welcomeMsg.textContent = this.welcome;
    } else loginModal.style.display = 'block';
  }

  getNews(isLoggedIn, countryCode = 'us', category = 'general', pageSize = 5) {
    //if User logged in successfully
    if (isLoggedIn) {
      let page = 0;

      return async function () {
        try {
          if (this.#prevCheck && page > 1) {
            page--;
          } else {
            page++;
          }

          const dataNews = await this._getReqData.call(
            this,
            `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${
              this.#NEWS_API_KEY
            }`
          );
          const lastPage = Math.ceil(dataNews.totalResults / pageSize);

          this._renderNews(dataNews);
          this._updatePagination(page, lastPage);
        } catch (err) {
          console.error('Error occurred while fetching data 💥:', err.message);
          //render error msg for User
          this._renderError(
            `Something went wrong 💥: ${err.message}. Please try again!`
          );
          throw err;
        }
      };
    }
  }
}
