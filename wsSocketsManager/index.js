module.exports = class wsSocketsManager {

  constructor () {
    this.__sockets = {};
  }

  add (socket) {
    this.__sockets[socket.id] = socket;
  }

  remove (id) {
    delete this.__sockets[id];
  }

  count () {
    return Object.keys(this.__sockets).length;
  }

  broadcast (eventName, data) {
    const socket = this.__sockets[Object.keys(this.__sockets)[0]]; // get any socket
    if (socket) {
      socket.broadcast.emit(eventName, data);
      socket.emit(eventName, data);
    }
  }

};