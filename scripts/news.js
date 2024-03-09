'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
const countryCode = 'us';
const category = 'entertainment';
const pageSize = 10;
let app, user, reqNews, reqPrevNews;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief initialize default state
 */
const initNews = function () {
  app = new App();
  user = new User(
    app.getCurUser().firstName,
    app.getCurUser().lastName,
    app.getCurUser().userName,
    app.getCurUser().password
  );

  //render initial data for News page
  reqNews = user.getNews(app.isLoggedIn(), countryCode);
  reqNews?.call(user);
};
initNews();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/*
to navigate to the next page while rendering the corresponding data, use Closure behavior in JS
*/
/**
 *
 */
btnNext.addEventListener('click', reqNews?.bind(user));

/**
 *
 */
btnPrev.addEventListener('click', reqNews?.bind(user));
