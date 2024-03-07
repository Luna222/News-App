'use strict';

///////////////////////////////////////
// PAGINATION
class Page {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Pagination {
  constructor() {
    this.start = null;
    this.currentPage = null;
  }

  append(data) {
    const newPage = new Page(data);
    if (!this.start) {
      this.start = newPage;
    } else {
      let current = this.start;
      while (current.next) {
        current = current.next;
      }
      current.next = newPage;
    }
  }

  traverseForward() {
    if (!this.currentPage) {
      this.currentPage = this.start;
    } else if (this.currentPage.next) {
      this.currentPage = this.currentPage.next;
    }
    return this.currentPage ? this.currentPage.data : null;
  }

  traverseBackward() {
    if (!this.currentPage || this.currentPage === this.start) {
      this.currentPage = null;
      return null;
    }

    let previousPage = null;
    let current = this.start;

    while (current && current.next !== this.currentPage) {
      current = current.next;
    }

    if (current) {
      this.currentPage = current;
    } else {
      this.currentPage = null;
    }

    return this.currentPage ? this.currentPage.data : null;
  }
}

// const pagination = new Pagination();
// pagination.append(10);
// pagination.append(20);
// pagination.append(30);
// pagination.append(40);

// console.log(pagination);

// console.log(pagination.traverseForward()); //10
// console.log(pagination.traverseForward()); //20
// console.log(pagination.traverseBackward()); //10
// console.log(pagination.traverseForward()); //20
// console.log(pagination.traverseForward()); //30
