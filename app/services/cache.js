/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *28/02/17 :: 12:57-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';
const nodeCache = require('node-cache');

const hotelsCache = new nodeCache({useClones:true, stdTTL: 60, checkperiod: 600});
const detailsCache = new nodeCache({useClones:true, stdTTL: 60, checkperiod: 600});
const departuresCache = new nodeCache({useClones:true, stdTTL: 60, checkperiod: 600});
const dailysCache = new nodeCache({useClones:true, stdTTL: 60, checkperiod: 600});
const optionsCached = new nodeCache({useClones:true, stdTTL: 60, checkperiod: 600});

exports.hotels = hotelsCache;
exports.details = detailsCache;
exports.departures = departuresCache;
exports.dailys = dailysCache;
exports.options = optionsCached;