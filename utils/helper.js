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

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief Function to hash password using SHA-256
 *
 * @param {String} pwd
 *
 * @returns {Promise}
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
 * @returns {Boolean}
 */
const matchPasswords = async function (enteredPwd, hashedPwd) {
  const encoder = new TextEncoder();
  const enteredData = encoder.encode(enteredPwd);
  const enteredHash = await crypto.subtle.digest('SHA-256', enteredData);

  const hashedData = Array.from(
    new Uint8Array(hashedPwd.match(/.{2}/g).map(byte => parseInt(byte, 16)))
  );

  // Compare the entered hash and the hashed password
  return enteredHash.every((byte, idx) => byte === hashedData[idx]);
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

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
