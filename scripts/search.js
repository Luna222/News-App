'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
let app, user, reqSearchedNews;

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

  reqSearchedNews = user.getNewsByKey(app.isLoggedIn());

  //Re-set News page to page 1
  user.resetNewsPage();
};
initSearch();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
btnSearch.addEventListener('click', reqSearchedNews?.bind(user));

/*
to navigate back n forth through the pages while rendering the corresponding data, I will use Closure behavior in JS
*/
/**
 *
 */
btnNext.addEventListener('click', reqSearchedNews?.bind(user));

/**
 *
 */
btnPrev.addEventListener('click', reqSearchedNews?.bind(user));
