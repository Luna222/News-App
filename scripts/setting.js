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

  //Retrieve current Settings of the logged-in User, shown in the form
  user.loadSettings();
};
initSetting();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
btnSetting.addEventListener('click', user.applySettings.bind(user));
