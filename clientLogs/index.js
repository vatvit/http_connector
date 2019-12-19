module.exports = class ClientLogs {

  constructor() {
    this.__logs = [];
  }

  all () {
    return [...this.__logs];
  }

  add (message) {
    this.__logs.push(message);
  }

};