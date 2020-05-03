const socketIO = require('socket.io');

let socket;

const connection = server => {
    const io = socketIO.listen(server);

    io.on('connection', newSocket => {
        socket = newSocket;
        console.log(newSocket.id)
    }) 
}

const getSocket = () => socket;

module.exports = {connection, getSocket}