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
      lastname: inputLastName.value.trim(),
      userName: inputUsername.value.trim(),
      pwd: inputPWD.value.trim(),
      pwdConfirm: inputPWDConfirm.value.trim(),
    };

    const validateUser = () => {};

    //use guard clause
    // if (!validateUser()) return alert('Invalid User Info! 🙅');

    //hashing password
    hashPassword(dataInput.pwd)
      .then(hashedPWD => {
        dataInput.pwd = hashedPWD;

        this.#userArr.push(
          new User(
            dataInput.firstName,
            dataInput.lastname,
            dataInput.userName,
            dataInput.pwd
          )
        );

        console.log(this.#userArr);
        this._setLocalStorage(this.#KEY_USER); //set local storage to the newly created User
        alert(
          'Registered successfully! 🎉. Please go to Login page to proceed.'
        );
      })
      .catch(err => console.error(err));

    // setTimeout(function () {
    //   window.location.href = '../pages/login.html';
    // }, 3000);
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
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.password
      );

    //check browser support for localStorage/sessionStorage
    if (this._isSupported()) {
      //parse the stored value back into its original *Class Instance form (instead of regular JS Object)
      const data =
        JSON.parse(localStorage.getItem(key))?.map(user => {
          console.log(user.firstName);
          console.log(user.lastName);
          parseUser(user);
        }) ?? defaultVal;
      this.#userArr = data;
    } else console.log('Sorry! No Web Storage support..');
  }

  // Public Methods/Interfaces
  reset() {
    localStorage.removeItem(this.#KEY_USER);
    location.reload();
  }
}
