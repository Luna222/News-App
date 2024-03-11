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
const initHome = function () {
  app = new App();
  user = new User(
    app.getCurUser().firstName,
    app.getCurUser().lastName,
    app.getCurUser().userName,
    app.getCurUser().password
  );

  //render home as loading the page
  user.renderMainContent(app.isLoggedIn());

  //Re-set News page to page 1
  user.resetNewsPage();
};
initHome();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
btnLogout.addEventListener('click', app.logout.bind(app));
