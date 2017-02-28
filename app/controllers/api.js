/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *28/02/17 :: 14:26-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

module.exports = (app)=>{

    //Get the api services
    let service = app.services.api;

    //Get util methods
    let util = app.utils.util;

    //Creates object for the controllers
    let controllers = {};

    //Creates controller to list departures by hotel
    controllers.listDepartures = function(req, res){
        //Retrive list of departures
        let items = service.getDepartures(req.params._name);

        //Write log for request and response
        util.writeLog(req, res, 'departures-api');

        //Accepts only ajax requests
        if(req.xhr){
            res.json(items);
        }else{
            res.status(403);
            let error = {};
            error.status = 403;
            error.message = 'Acces forbidden';
            res.render('error', {error: error});
        }
    };

    controllers.listDailys = function(req, res){
        //Retrieves list of dailys
        let items = service.getDailys(req.params._name);

        //Write log for the request and response
        util.writeLog(req, res, 'daily-api');

        //Accepts only ajax requests
        if(req.xhr){
            res.json(items);
        }else{
            res.status(403);
            let error = {};
            error.status = 403;
            error.message = 'Acces forbidden';
            res.render('error', {error: error});
        }
    };

    return controllers;
};