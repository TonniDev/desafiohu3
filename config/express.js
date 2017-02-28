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

const express = require('express');
const session = require('express-session');
const path = require('path');
const load = require('express-load');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const extend = require('handlebars-extend-block');
let handlebars = require('hbs');
handlebars = extend(handlebars);

//Normalize port coming from number or string
function normalizePort(val){
    let port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }
    if(port >= 0){
        return port;
    }
    return false;
}

module.exports = function(){
    let app = express();

    //Set port from environment variables or static number
    let port = normalizePort(process.env.PORT || 3001);
    app.set('port', port);

    //Compiles LESS to CSS
    app.use(require('less-middleware')('./public/assets', {debug: false}));
    app.use(express.static('./public/assets'));

    //Set views
    app.set('views', './public/views');
    app.set('view engine', 'hbs');
    app.set('views cache', true);

    app.use(favicon('./public/assets/favicon.ico'));

    //Set basic express configuration
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({
        secret: 'desafiohu3',
        resave: true,
        saveUninitialized: true
    }));
    app.use(require('method-override')());

    //Load files automaticaly as shortcut
    load('utils', {cwd: 'app'})
        .then('services')
        .then('controllers')
        .then('routes')
        .into(app);

    //Treat errors status and message
    app.use(function(req, res, next){
        let error = new Error('Não encontramos o que procura.');
        error.status = 404;
        next(error);
    });
    app.use(function(err, req, res, next){
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        res.status(err.status || 500);
        let error = {};
        error.status = res.statusCode;
        error.message = (res.statusCode === 404) ? err.message : 'Erro no servidor.';
        error.stack = err.stack;
        res.render('error', {error: error});
    });

    //Return express configuration
    return app;
};