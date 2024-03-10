'use strict';

///////////////////////////////////////
// TASK
class Task {
  //Private fields on Instances
  #task;
  #owner;
  #isDone;
  #todoArray;

  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }

  //[Public Methods/Interfaces]
  renderTask(isLoggedIn, curUser) {
    if (isLoggedIn) {
    }
  }

  toggleTask() {}

  delTask() {}
}
