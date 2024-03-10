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
  user.renderTask(app.isLoggedIn());
};
initTodo();

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
btnAdd.addEventListener('click', user.addTask.bind(user));
