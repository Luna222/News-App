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
const initHome = function () {
  app = new App();

  //render home as loading the page
  // mainContent.style.display = 'none';
  app._renderMainContent();
};
initHome();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
btnLogout.addEventListener('click', app._logout.bind(app));
