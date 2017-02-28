/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *28/02/17-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

require('dotenv').config();

const http = require('http');
const debug = require('debug')('http');
const app = require('./config/express')();

let port = app.get('port');

//Creates function to deal with server error
function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch(error.code){
        case 'EACCESS':
            console.error(bind + ' requires elevated priviledges.');
            process.exit(1);
            break;
        case 'EADDRESSINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

//Creates function to run on server listening
function onListening(){
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;
    debug('Listening on ' + bind);
    console.log(':::Express server listening on port: ' + bind);
}

//Creates server with express config
let server = http.createServer(app);

//Set server listening port from express
server.listen(port);
//On server error
server.on('error', onError);
//On server listening
server.on('listening', onListening);

//Exports server
module.exports = server;