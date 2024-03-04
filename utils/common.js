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

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
