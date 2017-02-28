/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *28/02/17 :: 14:31-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

const fs = require('fs');
const cached = require('./cache');
const unique = require('array-unique');

module.exports = function(){
    //Read list of hotels from static database
    let hotels = fs.readFileSync('./offer.txt', 'utf8');

    //Creates object services
    let services = {};

    //Return the list of departures on selected hotel
    services.getDepartures = (name)=>{
        try{
            //Creates empty array to insert departures
            let departures = [];

            //Assign parameter name to variable
            let hotel = name;

            //Retrieves cached departures
            let cachedDepartures = cached.departures.get(hotel);

            if(cachedDepartures){
                departures - cachedDepartures;
                return departures;
            } else {
                //Parse hotels into a JSON object
                let departuresList = JSON.parse(hotels);

                //Loop through hotels to find selected hotel
                for(let i = 0; i < departuresList.length; i++){
                    let lookupkey = departuresList[i].title.toLowerCase().replace(/\u0026/g, 'and').replace(/\s|\(|\)|\W+/g, '-').replace(/\W{2,}/g, '-').replace(/\W$/g, '');
                    //When hotel is found...
                    if(lookupkey === hotel){
                        //...loop through options to get its departures
                        for(let j = 0; j < departuresList[i].options.length; j++){
                            //Push departures into array
                            departures.push(departuresList[i].options[j].from);
                        }
                    }
                }
                //Reduce to a single array instead of an array of arrays
                departures = departures.reduce(function(prev, curr){
                    return prev.concat(curr);
                }, []);
                //Remove duplicates
                departures = unique(departures);
                //Order alphabetically
                departures = departures.sort();
                //Creates cache of departures
                cached.departures.set(hotel, departures);
            }
            return departures;

        } catch(err){
            console.error(err);
            throw err;
        }
    };

    //Return the list of dailys on selected hotel
    services.getDailys = (name)=>{
        try{

            //Creates empty array to receive data
            let dailys = [];

            //Assign parameter name to variable
            let hotel = name;

            //Retrieves cached dailys
            let cachedDailys = cached.dailys.get(hotel);

            if(cachedDailys){
                dailys = cachedDailys;
                return dailys;
            }else{
                //Parse hotels into a JSON object
                let dailysList = JSON.parse(hotels);

                //Loop through hotels to find selected hotel
                for(let i = 0; i < dailysList.length; i++){

                    let lookupkey = dailysList[i].title.toLowerCase().replace(/\u0026/g, 'and').replace(/\s|\(|\)|\W+/g, '-').replace(/\W{2,}/g, '-').replace(/\W$/g, '');

                    //When hotel is found...
                    if(lookupkey === hotel){
                        //...loop through options to get its dailys
                        for(let j = 0; j < dailysList[i].options.length; j++){
                            dailys.push(dailysList[i].options[j].daily);
                        }
                    }
                }
                //Reduce to a single array instead of an array of arrays
                dailys = dailys.reduce(function(prev, curr){
                    return prev.concat(curr);
                }, []);
                //Remove duplicates
                dailys = unique(dailys);
                //Sort ascending
                dailys = dailys.sort(function(first, last){return first-last});
                //Creates cache
                cached.dailys.set(hotel, dailys);
            }
            return dailys;
        } catch(err){
            console.error(err);
            throw err;
        }
    };

    return services;
};