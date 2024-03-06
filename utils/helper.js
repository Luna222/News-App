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
const btnRegister = document.querySelector('#btn-submit');
const btnLogin = document.querySelector('#btn-submit');
const btnLogout = document.querySelector('#btn-logout');

const homeLabel = document.querySelector('h2');
const loginModal = document.querySelector('#login-modal');
const mainContent = document.querySelector('#main-content');
const welcomeMsg = document.querySelector('#welcome-message');

const newsContainer = document.querySelector('#news-container');

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
 * @param {String} data - Pet data
 * @param {String} query - query input from form
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

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
