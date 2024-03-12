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
    user.renderNews(user.getSearchRsl());

    user.updatePagination(
      user.getSearchPage(),
      user.getSearchRsl().totalResults / user.getPageSize()
    );
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
