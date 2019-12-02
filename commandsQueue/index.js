module.exports = class CommandsQueue {

  constructor () {
    this.__queue = [];
  }

  get () {
    return this.__queue;
  }

  clear () {
    this.__queue.length = 0;
  }

  push (el) {
    this.__queue.push(el);
  }

};