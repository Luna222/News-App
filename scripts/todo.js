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
const initTodo = function () {
  app = new App();
  user = new User(
    app.getCurUser().firstName,
    app.getCurUser().lastName,
    app.getCurUser().userName,
    app.getCurUser().password
  );

  //render Todo List as loading the page
  if (app.isLoggedIn()) user.renderTask();

  //Re-set News page to page 1
  user.resetNewsPage();

  //clear results on Search page
  user.resetSearchPage();
};
initTodo();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
/**
 * @brief handle adding a new task event
 */
btnAdd.addEventListener('click', user.addTask.bind(user));

/**
 * @brief handle toggling task event using Event Delegation
 */
todoList.addEventListener('click', user.toggleTask.bind(user));

/**
 * @brief handle deleting task event using Event Delegation
 */
todoList.addEventListener('click', user.delTask.bind(user));
