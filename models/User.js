'use strict';

let count = 0;

class User {
  //Private fields on Instances
  #uId = `U${(Date.now() + '').slice(-10)}`;

  constructor(firstName, lastName, userName, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
  }
}
