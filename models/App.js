'use strict';

///////////////////////////////////////
// APPLICATION
class App {
  //Private fields on Instances
  #userArr;
  #KEY_USER = 'USER_ARRAY';

  constructor() {
    //Get data from local storage
    this._getLocalStorage(this.#KEY_USER, []);
  }

  _newUser(e) {
    e.preventDefault();

    //get data inputs from form & store them into object data:
    const dataInput = {
      firstName: inputFirstName.value.trim(),
      lastName: inputLastName.value.trim(),
      userName: inputUsername.value.trim(),
      pwd: inputPWD.value.trim(),
      pwdConfirm: inputPWDConfirm.value.trim(),
    };

    /**
     *
     * @param {Object} userData - user's data inputs from form
     *
     * @returns {Boolean}
     */
    const isFilled = function (userData) {
      let check = true;

      for (const field of Object.keys(userData)) {
        if (!userData[field]) {
          alert(`${field} is empty!`);
          check = false;
          break;
        }
      }
      return check;
    };

    /**
     *
     * @param {String} userName - Username input from form
     *
     * @returns {Boolean}
     */
    const validateUsername = function (userName) {
      let isValid = true;

      if (checkSpecialCharacter(userName)) {
        alert(`Username should NOT contain special characters!`);
        isValid = false;
      }

      if (this.#userArr.find(user => user.userName === userName)) {
        alert(`This User with {${userName}} Username already exists!`);
        isValid = false;
      }
      return isValid;
    };

    /**
     *
     * @param {String} pwd - Password input from form
     *
     * @returns {Boolean}
     */
    const validatePassword = function (pwd, pwdConfirm) {
      const isValid = true;

      if (pwd.length < 8) {
        alert('Password must be at least 8 characters long!');
        isValid = false;
      }

      if (pwd !== pwdConfirm) {
        alert('Passwords do NOT match!');
        isValid = false;
      }
      return isValid;
    };

    /**
     *
     * @param {Object} userData - user's data inputs from form
     *
     * @returns {Boolean}
     */
    const validateUserData = userData =>
      isFilled(userData) &&
      validateUsername.call(this, userData.userName) &&
      validatePassword(userData.pwd, userData.pwdConfirm);

    //use guard clause
    // if (!validateUserData()) return alert('Invalid User Info! 🙅');

    if (validateUserData(dataInput)) {
      //hashing password
      hashPassword(dataInput.pwd)
        .then(hashedPWD => {
          dataInput.pwd = hashedPWD;

          this.#userArr.push(
            new User(
              dataInput.firstName,
              dataInput.lastName,
              dataInput.userName,
              dataInput.pwd
            )
          );

          this._setLocalStorage(this.#KEY_USER); //set local storage to the newly created User
          alert(
            'Registered successfully! 🎉. Please go to Login page to proceed.'
          );

          setTimeout(function () {
            window.location.href = '../pages/login.html';
          }, 1500);
        })
        .catch(err => console.error(err));
    }
  }

  _isSupported() {
    return typeof Storage !== 'undefined';
  }

  _setLocalStorage(key) {
    //check browser support for localStorage/sessionStorage
    if (this._isSupported())
      localStorage.setItem(key, JSON.stringify(this.#userArr));
    else console.log('Sorry! No Web Storage support..');
  }

  _getLocalStorage(key, defaultVal = 'N/A') {
    const parseUser = userData =>
      new User(
        userData.firstName,
        userData.lastName,
        userData.userName,
        userData.password
      );

    //check browser support for localStorage/sessionStorage
    if (this._isSupported()) {
      //parse the stored value back into its original *Class Instance form (instead of regular JS Object)
      const data =
        JSON.parse(localStorage.getItem(key))?.map(parseUser) ?? defaultVal;
      this.#userArr = data;
    } else console.log('Sorry! No Web Storage support..');
  }

  // Public Methods/Interfaces
  reset() {
    localStorage.removeItem(this.#KEY_USER);
    location.reload();
  }
}
