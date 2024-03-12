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

  //Re-set News page to page 1
  user.resetNewsPage();
};
initSearch();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
btnSearch.addEventListener('click', function () {
  reqSearchedNews = user.getNewsByKey(app.isLoggedIn());
  reqSearchedNews?.call(user);
});

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
