/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *28/02/17 :: 14:20-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

module.exports = (app)=>{

    //Get controllers for the api
    let controller = app.controllers.api;

    //Set route to retrieve departures for the selected hotel
    app.route('/api/departures/(:_name)')
        .get(controller.listDepartures);
};