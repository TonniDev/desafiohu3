/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *28/02/17 :: 13:23-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

module.exports = (app)=>{

    //Get services methods
    let service = app.services.hotels;

    //Get util methods
    let util = app.utils.util;

    //Creates controllers object
    let controllers = {};

    //Creates listDetails method inside controllers object
    controllers.listDetails = function(req, res){
        //Get service that retrieves the hotel details
        let items = service.hotelDetails(req.params._name);

        //Write request and response logs
        util.writeLog(req, res, 'hotel');

        //If ajax request, return json
        if(req.xhr){
            res.json(items);
        }else{
            //Render hotel view with hotel details
            res.render('hotel', {hotel: [items]});
        }
    };

    return controllers;
};