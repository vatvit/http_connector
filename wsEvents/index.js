module.exports = function wsEvents (socket) {

    socket.on('disconnect', function() {
      console.log('WS disconnected');
    });

};