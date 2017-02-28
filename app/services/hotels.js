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

const fs = require('fs');

module.exports = function(){
    //Read list of hotels from static database
    let hotels = fs.readFileSync('./offer.txt', 'utf8');

    //Creates object services
    let services = {};

    services.hotelsList = function(){
        try{
            //Creates empty array for inputing final list
            let names = [];

            //Parse hotels into a JSON object
            let hotelList = JSON.parse(hotels);

            let count = 0;
            //Loop through hotels
            for(let i = 0; i < hotelList.length; i++){
                count++;
                //Transform hotel names into a readable machine name
                let lookupkey = hotelList[i].title.toLowerCase().replace(/\u0026/g, 'and').replace(/\$/g, 's').replace(/\s\|\(|\)|\W+/g, '-').replace(/\W{2}/g, '-').replace(/\W$/g, '');
                //Assing each item to a variable
                let data = hotelList[i];
                //Insert keu 'url' to object
                data.url = lookupkey;
                //Push object into final list
                names.push({
                    title: hotelList[i].title,
                    image: 'images/photo' + count + '.jpg',
                    url: data.url,
                    number: i
                });
                if(count === 12){
                    count = 0;
                }
            }
            return names;

        }catch(err){
            console.error(err);
            throw err;
        }
    };

    return services;
};