// 'use strict';
// /*******************************************************************************
//  * Variables
//  ******************************************************************************/

// /*******************************************************************************
//  * Functions
//  ******************************************************************************/
// /**
//  * @brief check browser support for localStorage/sessionStorage
//  *
//  * @returns {Boolean}
//  */
// const isSupported = () => typeof Storage !== 'undefined';

// /**
//  * @brief store data in localStorage/store data on the Client
//  *
//  * @param {String} key
//  * @param {Array} value
//  */
// const saveToStorage = function (key, value) {
//   /*
//   convert the value to a string before storing it in localStorage
//   (LocalStorage in JS can only store string, number or boolean values for key/value pairs)
//   */
//   if (isSupported()) localStorage.setItem(key, JSON.stringify(value));
//   else console.log('Sorry! No Web Storage support..');
// };

// /**
//  * @brief retrieve data from localStorage
//  *
//  * @param {String} key
//  * @param {Function} defaultVal - a default value: if the value for the specified key is not found in localStorage
//  *
//  * @returns {Array}
//  */
// const getFromStorage = function (key, defaultVal = 'N/A') {
//   //parse the stored value back into its original form
//   if (isSupported()) return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
//   else console.log('Sorry! No Web Storage support..');
// };

// /*******************************************************************************
//  * Handle Events
//  ******************************************************************************/
