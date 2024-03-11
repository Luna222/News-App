'use strict';

///////////////////////////////////////
// TASK
class Task {
  //Public fields on Instances
  taskId = `T${(Date.now() + '').slice(-10)}`;

  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
