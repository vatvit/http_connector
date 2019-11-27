module.exports = function wsEvents (socket) {

    socket.on('disconnect', function() {
      console.log('WS disconnected');
    });

    socket.on('message', function wsMessageHandler (data) {
      console.log('WS message');
      console.log(data);
      socket.emit('message', data);
      socket.broadcast.emit('message', data);
    })

};