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
const initRegister = function () {
  app = new App();

  window.onload = () => {
    inputPWDConfirm.onpaste = e => e.preventDefault();
  };
};
initRegister();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle register event
 */
btnRegister.addEventListener('click', app.newUser.bind(app));
