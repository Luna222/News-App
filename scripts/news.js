'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
let app, user, reqNews;

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
  reqNews = user.getNews(app.isLoggedIn());
  reqNews?.call(user);

  //clear results on Search page
  user.resetSearchPage();
};
initNews();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/*
to navigate back n forth through the pages while rendering the corresponding data, I will use Closure behavior in JS:
*/
/**
 * @brief handle going forwards event
 */
btnNext.addEventListener('click', reqNews?.bind(user));

/**
 * @brief handle going backwards event
 */
btnPrev.addEventListener('click', reqNews?.bind(user));
