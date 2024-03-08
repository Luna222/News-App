'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
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

  //User's on page 1: render initial data for News page
  reqNews = user.getNews(app.isLoggedIn());
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
