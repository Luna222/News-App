'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
let app, user;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief initialize default state
 */
const initSearch = function () {
  app = new App();
  user = new User(
    app.getCurUser().firstName,
    app.getCurUser().lastName,
    app.getCurUser().userName,
    app.getCurUser().password
  );

  //render results page where User left on
  if (user.getSearchPage() > 0) {
    inputQuery.value = user.getQueryKey();

    user.renderNews(user.getSearchRsl());

    user.updatePagination(
      user.getSearchPage(),
      Math.ceil(user.getSearchRsl().totalResults / user.getPageSize())
    );

    const reqSearchedNews = user.getNewsByKey(
      app.isLoggedIn(),
      user.getSearchPage()
    );

    /*
    to navigate back n forth through the pages while rendering the corresponding data, I will use Closure behavior in JS
    */
    btnNext.addEventListener('click', reqSearchedNews?.bind(user));

    btnPrev.addEventListener('click', reqSearchedNews?.bind(user));
  }

  //Re-set News page to page 0
  user.resetNewsPage();
};
initSearch();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
btnSearch.addEventListener('click', function () {
  const reqSearchedNews = user.getNewsByKey(app.isLoggedIn());
  reqSearchedNews?.call(user);

  /*
  to navigate back n forth through the pages while rendering the corresponding data, I will use Closure behavior in JS
  */
  btnNext.addEventListener('click', reqSearchedNews?.bind(user));

  btnPrev.addEventListener('click', reqSearchedNews?.bind(user));
});
