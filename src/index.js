require('dotenv').config();

//console.log(process.env.HELLO);

const app = require('./server');
const http = require('http');

const server = http.createServer(app);

require('./database');
require('./sockets').connection(server);

server.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
}); 