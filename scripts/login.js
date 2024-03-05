'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
let app;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief initialize default state
 */
const initLogin = function () {
  app = new App();
};
initLogin();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
btnLogin.addEventListener('click', app._login.bind(app));
