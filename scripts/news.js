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
const initNews = function () {
  app = new App();
  user = new User(
    app.getCurUser().firstName,
    app.getCurUser().lastName,
    app.getCurUser().userName,
    app.getCurUser().password
  );

  //Render data for News page
  if (app.isLoggedIn()) user.renderNews();
};
initNews();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
