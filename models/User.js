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

  getNews(isLoggedIn) {
    //if User logged in successfully
    if (isLoggedIn) {
      let curPage = 0;
      return async function () {
        try {
          const updateUI = function (cp) {
            pageNum.textContent = curPage;
            cp === 1
              ? (btnPrev.style.display = 'none')
              : (btnPrev.style.display = 'block');
          };

          const countryCode = 'us',
            catgegory = 'general',
            pageSize = 5,
            API_KEY = '12ca65da61ec431a8591cc40a8afb640';
          curPage++;
          // if (isPrev) curPage--;
          // else curPage++;

          const endpointUrlNews = `https://newsapi.org/v2/top-headlines?country=${countryCode}&category=${catgegory}&pageSize=${pageSize}&page=${curPage}&apiKey=${API_KEY}`;

          const dataNews = await this._getReqData.call(this, endpointUrlNews);

          updateUI(curPage);
          this._renderNews(dataNews);
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
