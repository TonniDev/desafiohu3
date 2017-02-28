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
const cached = require('./cache');

module.exports = function(){
    //Read list of hotels from static database
    let hotels = fs.readFileSync('./offer.txt', 'utf8');

    //Creates object services
    let services = {};

    services.hotelsList = function(){
        try{
            //Creates empty array for inputing final list
            let names = [];

            //Get cached items
            let cachedItems = cached.hotels.get('hotels');

            //Check if cache exists
            if(cachedItems){
                names = cachedItems;
                return names;
            } else {
                //Parse hotels into a JSON object
                let hotelList = JSON.parse(hotels);

                let count = 0;
                //Loop through hotels
                for (let i = 0; i < hotelList.length; i++) {
                    count++;
                    //Transform hotel names into a readable machine name
                    let lookupkey = hotelList[i].title.toLowerCase().replace(/\u0026/g, 'and').replace(/\$/g, 's').replace(/\s|\(|\)|\W+/g, '-').replace(/\W{2,}/g, '-').replace(/\W$/g, '');
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
                    if (count === 12) {
                        count = 0;
                    }
                }
                //If cache dosn't exist, let's create it
                cached.hotels.set('hotels', names);
            }
            return names;
        }catch(err){
            console.error(err);
            throw err;
        }
    };

    services.hotelDetails = function(name){
        try{
            //Creates empty array for inputing the hotel details
            let details = [];
            //Get cached details
            let cachedDetails = cached.details.get(name);
            //Check if cache exists
            if(cachedDetails){
                details = cachedDetails;
                return details;
            }else{
                //Parse hotels into a JSON object
                let hotelList = JSON.parse(hotels);

                let count = 0;
                //Loop through hotels
                for (let i = 0; i < hotelList.length; i++) {
                    count++;
                    //Transform hotel names into a readable machine name
                    let lookupkey = hotelList[i].title.toLowerCase().replace(/\u0026/g, 'and').replace(/\$/g, 's').replace(/\s|\(|\)|\W+/g, '-').replace(/\W{2,}/g, '-').replace(/\W$/g, '');
                    //When hotel is found, return its details
                    if (lookupkey === name) {
                        details = hotelList[i];
                    }
                }
                //Creates cache for this hotel
                cached.details.set(name, details);
            }
            return details;
        }catch(err){
            console.error(err);
            throw err;
        }
    };

    return services;
};