'use strict';
/*******************************************************************************
 * Variables
 ******************************************************************************/
//select DOM elements
const inputFirstName = document.querySelector('#input-firstname');
const inputLastName = document.querySelector('#input-lastname');
const inputUsername = document.querySelector('#input-username');
const inputPWD = document.querySelector('#input-password');
const inputPWDConfirm = document.querySelector('#input-password-confirm');
const inputPageSize = document.querySelector('#input-page-size');
const inputCategory = document.querySelector('#input-category');
const inputTask = document.querySelector('#input-task');
const inputQuery = document.querySelector('#input-query');

const btnRegister = document.querySelector('#btn-submit');
const btnLogin = document.querySelector('#btn-submit');
const btnLogout = document.querySelector('#btn-logout');
const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
const btnView = document.querySelector('.card-body .btn');
const btnSetting = document.querySelector('#btn-submit');
const btnAdd = document.querySelector('#btn-add');
const btnSearch = document.querySelector('#btn-submit');

const loginModal = document.querySelector('#login-modal');
const mainContent = document.querySelector('#main-content');
const welcomeMsg = document.querySelector('#welcome-message');

const newsContainer = document.querySelector('#news-container');
const pageNum = document.querySelector('#page-num');
const paginationEl = document.querySelector('.pagination');
const todoContainer = document.querySelector('#todo-container');
const todoList = document.querySelector('#todo-list');

const CHARACTER_LIMIT = 50;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief Function to hash password using SHA-256
 *
 * @param {String} pwd
 *
 * @returns {Promise} - {String} PromiseResult
 */
const hashPassword = async function (pwd) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pwd);
  try {
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hexString = Array.from(new Uint8Array(hash))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
    return hexString;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};

/**
 * @brief Function to compare entered password with hashed password
 *
 * @param {String} enteredPwd
 * @param {String} hashedPwd
 *
 * @returns {Promise} - {Boolean} PromiseResult
 */
const matchPasswords = async function (enteredPwd, hashedPwd) {
  const enteredHash = await hashPassword(enteredPwd);
  return enteredHash === hashedPwd;
};

/**
 * @brief check characters included in the query input
 *
 * @param {String} data
 * @param {String} query
 *
 * @returns {Boolean} - returns `true` if there is a match, and `false` otherwise
 */
const matchChar = (data, query) => {
  //trim both special characters and whitespace from the query string
  const trimmedQuery = query.replace(/[^a-zA-Z0-9]/g, '').replace(/\s/g, '');
  return data.includes(trimmedQuery);
};

/**
 *
 * @param {String} text
 *
 * @returns {Boolean}
 */
function checkSpecialCharacter(text) {
  const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return specialCharacterRegex.test(text);
}

/**
 *
 * @param {String} text
 *
 * @returns {Boolean}
 */
function checkNumCharacter(text) {
  const numberRegex = /\d/;
  return numberRegex.test(text);
}

/**
 *
 * @returns {Boolean}
 */
const isSupported = function () {
  return typeof Storage !== 'undefined';
};

/**
 *
 * @param {String} key
 * @param {*} value
 */
const setLocalStorage = function (key, value) {
  //check browser support for localStorage/sessionStorage
  if (isSupported()) localStorage.setItem(key, JSON.stringify(value));
  else throw new Error('Sorry! No Web Storage support..');
};

/**
 *
 * @param {String} key
 * @param {*} defaultVal
 *
 * @returns
 */
const getUserLocalStorage = function (key, defaultVal = '') {
  /*
  parse the stored value back into its original *Class Instance form (instead of regular JS Object)
    🔺 Overly abuse this func will lead to 'maximum call stack size exceeded' error
  */
  const parseUser = function (dataArr) {
    return dataArr.slice().map(userData => {
      const user = new User(
        userData?.firstName,
        userData?.lastName,
        userData?.userName,
        userData?.password
      );
      user.uId = userData.uId;
      return user;
    });
  };

  //check browser support for localStorage/sessionStorage
  if (isSupported()) {
    const dataFromKey = JSON.parse(localStorage.getItem(key)) ?? defaultVal;

    const dataFinal = Array.isArray(dataFromKey)
      ? parseUser(dataFromKey)
      : new User(
          dataFromKey?.firstName,
          dataFromKey?.lastName,
          dataFromKey?.userName,
          dataFromKey?.password
        );
    return dataFinal;
  } else throw new Error('Sorry! No Web Storage support..');
};

/**
 *
 * @param {String} key
 * @param {*} defaultVal
 *
 * @returns
 */
const getLocalStorage = function (key, defaultVal = '') {
  //parse the stored value back into its original form
  if (isSupported()) return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
  else console.log('Sorry! No Web Storage support..');
};

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
