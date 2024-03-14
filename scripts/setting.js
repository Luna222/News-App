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
const initSetting = function () {
  app = new App();
  user = new User(
    app.getCurUser().firstName,
    app.getCurUser().lastName,
    app.getCurUser().userName,
    app.getCurUser().password
  );

  //Retrieve current Settings of the logged-in User as loading the page, shown in the form
  user.loadSettings(app.isLoggedIn());

  //Re-set News page to page 0
  user.resetNewsPage();

  //clear results on Search page
  user.resetSearchPage();
};
initSetting();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle applying settings event
 */
btnSetting.addEventListener('click', user.applySettings.bind(user));
