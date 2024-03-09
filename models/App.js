'use strict';

///////////////////////////////////////
// APPLICATION
class App {
  //Private fields on Instances
  #userArr;
  #currentUser;
  #KEY_USER = 'USER_ARRAY';
  #KEY_CURRENT_USER = 'CURRENT_USER';

  constructor() {
    //Get data from local storage
    this.#userArr = getLocalStorage(this.#KEY_USER, []);
    this.#currentUser = getLocalStorage(this.#KEY_CURRENT_USER);

    //Render default state of the current page
    this._renderSidebar();
  }

  //[Private Methods]
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
     * @param {String} firstName - First Name input from form
     *
     * @returns {Boolean}
     */
    const validateFirstName = function (firstName) {
      let isValid = true;

      if (checkSpecialCharacter(firstName) || checkNumCharacter(firstName)) {
        alert(`First Name should NOT contain special characters or numbers!`);
        isValid = false;
      }

      if (firstName.length > CHARACTER_LIMIT) {
        alert(`First Name is too long!`);
        isValid = false;
      }
      return isValid;
    };

    /**
     *
     * @param {String} lastName - Last Name input from form
     *
     * @returns {Boolean}
     */
    const validateLastName = function (lastName) {
      let isValid = true;

      if (checkSpecialCharacter(lastName) || checkNumCharacter(lastName)) {
        alert(`Last Name should NOT contain special characters or numbers!`);
        isValid = false;
      }

      if (lastName.length > CHARACTER_LIMIT) {
        alert(`Last Name is too long!`);
        isValid = false;
      }
      return isValid;
    };

    /**
     *
     * @param {String} userName - Username input from form
     *
     * @returns {Boolean}
     */
    const validateUsername = function (userName) {
      let isValid = true;

      if (this.#userArr.find(user => user.userName === userName)) {
        alert(`This User with {${userName}} Username already exists!`);
        isValid = false;
      }

      if (userName.length > CHARACTER_LIMIT) {
        alert(`User Name is too long!`);
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
      let isValid = true;

      if (pwd !== pwdConfirm) {
        alert('Passwords do NOT match!');
        isValid = false;
      } else if (pwd.length <= 8) {
        alert('Password must be longer than 8 characters!');
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
      this._isFilled(userData) &&
      validateFirstName(userData.firstName) &&
      validateLastName(userData.lastName) &&
      validateUsername.call(this, userData.userName) &&
      validatePassword(userData.pwd, userData.pwdConfirm);

    //hashing password
    hashPassword(dataInput.pwd)
      .then(hashedPWD => {
        if (validateUserData(dataInput)) {
          this.#userArr.push(
            new User(
              dataInput.firstName,
              dataInput.lastName,
              dataInput.userName,
              hashedPWD
            )
          );
          //set local storage to the newly created User
          setLocalStorage(this.#KEY_USER, this.#userArr);
          alert(
            'Registered successfully! 🎉. Please go to Login page to proceed.'
          );

          setTimeout(function () {
            window.location.href = '../pages/login.html';
          }, 1000);
        }
      })
      .catch(err => console.error(err));
  }

  async _login(e) {
    e.preventDefault();

    const dataInput = {
      userName: inputUsername.value.trim(),
      pwd: inputPWD.value.trim(),
    };

    if (this._isFilled(dataInput)) {
      this.#currentUser = this.#userArr.find(
        user => user.userName === dataInput.userName
      );
    } else {
      return;
    }

    if (
      this.#currentUser &&
      (await matchPasswords(dataInput.pwd, this.#currentUser.password))
    ) {
      setLocalStorage(this.#KEY_CURRENT_USER, this.#currentUser);

      setTimeout(function () {
        window.location.href = '../index.html';
      }, 1000);
    } else return alert('Invalid User Info! 🙅');
  }

  _logout(e) {
    e.preventDefault();
    localStorage.removeItem(this.#KEY_CURRENT_USER);
    localStorage.removeItem(this.#currentUser.KEY_LATEST_PAGE);

    setTimeout(function () {
      window.location.href = '../pages/login.html';
    }, 1000);
  }

  /**
   *
   * @param {Object} userData - user's data inputs from form
   *
   * @returns {Boolean}
   */
  _isFilled(userData) {
    let check = true;

    for (const field of Object.keys(userData)) {
      if (!userData[field]) {
        alert(`${field} is empty!`);
        check = false;
        break;
      }
    }
    return check;
  }

  _renderSidebar() {
    if (this.isLoggedIn()) {
      Array.from(document.querySelectorAll('#sidebar li')).forEach(
        li => (li.style.display = 'list-item')
      );
    }
  }

  /**
   * cautious
   */
  _resetAll() {
    localStorage.removeItem(this.#KEY_USER);
    localStorage.removeItem(this.#KEY_CURRENT_USER);
    localStorage.removeItem(this.#currentUser.KEY_LATEST_PAGE);
  }

  //[Public Methods/Interfaces]
  getCurUser() {
    return this.#currentUser;
  }

  isLoggedIn() {
    return Object.keys(localStorage).find(
      key => key === this.#KEY_CURRENT_USER
    );
  }
}
