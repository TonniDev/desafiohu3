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
const path = require('path');

module.exports = function(){

    //Creates object util
    let utils = {};

    //Creates method for writing logs to a file
    utils.writeLog = function(req, res, service){
        //Creates array cache
        let cache = [];
        //Creates response json. Eliminates circular reference.
        let resJson = JSON.stringify(res, function(key, value){
            //Checks if value is object and not null.
            if(typeof value === 'object' && value !== null){
                //Check if it is a circular reference
                if(cache.indexOf(value) != -1){
                    //Circular reference found, discard key
                    return;
                }
                cache.push(value);
            }
            return value;
        });
        //Empty cache array for reuse
        cache = [];
        //Creates request json. Eliminates circular reference.
        let reqJson = JSON.stringify(req, function(key, value){
            //Checks if value is object and not null.
            if(typeof value === 'object' && value !== null){
                //Check if it is a circular reference
                if(cache.indexOf(value) != -1){
                    //Circular reference found, discard key
                    return;
                }
                cache.push(value);
            }
            return value;
        });
        //Nullify cache array
        cache = null;

        //Write logs to files
        fs.writeFile('.log/' + path.basename(__filename).slice(0, -3) + '_' + service + '_response.json', resJson, 'utf8', (err)=>{
            if(err){
                console.error(err);
                throw err;
            }
        });
        fs.writeFile('.log/' + path.basename(__filename).slice(0, -3) + '_' + service + 'request.json', reqJson, 'utf8', (err)=>{
            if(err){
                console.error(err);
                throw err;
            }
        });
    };

    return utils;
};