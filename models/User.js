'use strict';

///////////////////////////////////////
// USER
class User {
  //Public fields on Instances
  uId = `U${(Date.now() + '').slice(-10)}`;

  //Private fields on Instances
  #NEWS_API_KEY = '7d972bf8adae4d349dc4e1f2a8b1b4a5';
  #KEY_LATEST_PAGE = 'LATEST_PAGE';
  #KEY_USER_OPTIONS = 'USER_OPTIONS';
  #KEY_TODO = 'USER_TODO';

  #prevCheck = false;
  #nextCheck = false;
  #userOptions;
  #todoArr;

  #curPage = 0;
  #countryCode = 'us';
  #newsCategory;
  #newsPerPage;

  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this._setWelcome();

    //Get data from local storage
    this._getFromStorage();

    //Attach event handlers
    btnPrev?.addEventListener('click', this._isPrev.bind(this));
    btnNext?.addEventListener('click', this._isNext.bind(this));
  }

  //[Private Methods]
  _setWelcome() {
    this.welcome = `Welcome ${this.firstName}! 🌻`;
  }

  _getFromStorage() {
    this.#curPage = getLocalStorage(this.#KEY_LATEST_PAGE)
      ? getLocalStorage(this.#KEY_LATEST_PAGE) - 1
      : 0; //(*this step can be omitted if wanted to load the page from start)

    this.#userOptions = getLocalStorage(this.#KEY_USER_OPTIONS, []);

    const curUserOption = this.#userOptions.find(
      opt => opt.userName === this.userName
    );

    this.#newsPerPage = curUserOption?.newsPerPage
      ? curUserOption?.newsPerPage
      : 5;

    this.#newsCategory = curUserOption?.newsCategory
      ? curUserOption?.newsCategory
      : 'general';

    this.#todoArr = getLocalStorage(this.#KEY_TODO, []);
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

    curPage >= lastPage
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

  getNews(isLoggedIn) {
    //if User logged in successfully
    if (isLoggedIn) {
      const countryCode = this.#countryCode,
        category = this.#newsCategory,
        pageSize = this.#newsPerPage;

      let page = this.#curPage;

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
          //[OPTIONAL]: store the latest page User was left on for other purposes in the future
          setLocalStorage(this.#KEY_LATEST_PAGE, page);
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

  loadSettings(isLoggedIn) {
    if (isLoggedIn) {
      inputPageSize.value = this.#newsPerPage;

      Array.from(inputCategory.children).forEach(opt => {
        if (opt.textContent.toLowerCase() === this.#newsCategory?.toLowerCase())
          opt.selected = true;
      });
    }
  }

  applySettings() {
    this.#newsPerPage = +inputPageSize.value;
    this.#newsCategory = inputCategory.value;

    //re-set news page
    setLocalStorage(this.#KEY_LATEST_PAGE, 0);

    this.#userOptions = this.#userOptions.filter(
      opt => opt.userName !== this.userName
    );
    //save new Settings to localStorage
    this.#userOptions.push({
      userName: this.userName,
      newsPerPage: this.#newsPerPage,
      newsCategory: this.#newsCategory,
    });
    setLocalStorage(this.#KEY_USER_OPTIONS, this.#userOptions);
    alert('Settings saved!');
  }

  getKeyPage() {
    return this.#KEY_LATEST_PAGE;
  }

  renderTask() {
    Array.from(todoList.children).forEach(tsk => tsk.remove());

    this.#todoArr.forEach(tsk => {
      const htmlTask = `<li class="${tsk.isDone ? 'checked' : ''} task">${
        tsk.task
      }<span class="close">×</span></li>`;

      if (tsk.owner === this.userName) {
        !tsk.isDone
          ? todoList.insertAdjacentHTML('afterbegin', htmlTask)
          : todoList.insertAdjacentHTML('beforeend', htmlTask);
      }
    });
  }

  addTask(e) {
    e.preventDefault();

    if (inputTask.value) {
      this.#todoArr = this.#todoArr.filter(
        tsk => tsk.task !== inputTask.value.trim()
      );
      this.#todoArr.push(
        new Task(inputTask.value.trim(), this.userName, false)
      );
      //save tasks to localStorage
      setLocalStorage(this.#KEY_TODO, this.#todoArr);
      this.renderTask();
      alert(`Task added! Don't forget to complete it ;)`);

      //clear input & focuses
      inputTask.value = '';
      inputTask.blur();
    }
  }

  toggleTask(e) {
    if (e.target.matches('.task')) {
      // e.target.classList.toggle('checked');
      const curTask = this.#todoArr.find(
        tsk => tsk.task === e.target.textContent.trim().slice(0, -1)
      );
      curTask.isDone = !curTask.isDone;
      this.renderTask();
      setLocalStorage(this.#KEY_TODO, this.#todoArr);
    }
  }

  delTask(e) {
    const delTaskById = function (taskId) {
      const taskIndex = this.#todoArr.findIndex(tsk => tsk.taskId === taskId);

      if (taskIndex > -1) {
        if (confirm('❗️Are you sure to delete this Task?')) {
          this.#todoArr.splice(taskIndex, 1);
          this.renderTask();
          setLocalStorage(this.#KEY_TODO, this.#todoArr);
          alert('Task deleted!');
        }
      } else {
        alert('Task NOT found');
      }
      return;
    };

    if (e.target.matches('#todo-list .close')) {
      const curTask = this.#todoArr.find(
        tsk =>
          tsk.task === e.target.parentElement.textContent.trim().slice(0, -1)
      );
      delTaskById.call(this, curTask.taskId);
    }
  }
}
