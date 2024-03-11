'use strict';

///////////////////////////////////////
// TASK
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;

    this.taskId = `T${(Date.now() + '').slice(-10)}`;
  }
}
