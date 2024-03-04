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

const saltRounds = 10;

/*******************************************************************************
 * Functions
 ******************************************************************************/
/**
 * @brief hashing user's password input
 * use bcrypt for password hashing
 *
 * @param {String} pwd
 *
 * @returns {String}
 */
const hashPassword = async function (pwd) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(pwd, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};

/**
 * @brief compare original password input with hashed password
 *
 * @param {String} pwd
 * @param {String} hashedPWD
 *
 * @returns {Boolean}
 */
const verifyPassword = async function (pwd, hashedPWD) {
  try {
    const isMatch = await bcrypt.compare(pwd, hashedPWD);
    return isMatch;
  } catch (error) {
    throw new Error('Password verification failed');
  }
};

/*******************************************************************************
 * Handle Events
 ******************************************************************************/
