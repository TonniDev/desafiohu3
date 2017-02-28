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

//Expose controllers
module.exports = (app)=>{

    //Get services methods
    let service = app.services.hotels;

    //Get util methods
    let util = app.utils.util;

    //Creates obejct controllers
    let controllers = {};

    //Creates listItems method inside controller object
    controllers.listItems = function(req, res){
        //Get service that retrieves the list of hotels
        let items = service.hotelsList();

        //Write request and response log for easy debugging
        util.writeLog(req, res, 'index');

        //If ajax request, return json
        if(req.xhr){
            res.json(items);
        }else{
            //Render index view with list of hotels
            res.render('index', {items: items});
        }
    };

    //Return controllers object
    return controllers;
};