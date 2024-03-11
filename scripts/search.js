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

  //Re-set News page to page 1
  user.resetNewsPage();
};
initSearch();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
