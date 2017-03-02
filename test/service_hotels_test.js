/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *01/03/17 :: 22:40-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const serviceHotels = require('../app/services/hotels.js')();

describe('Services hotels', function(){
    it('should return hotels', (done)=>{
        let service = serviceHotels.hotelsList();

        expect(service).to.be.an('array');
        expect(service.length).to.be.greaterThan(3);
        expect(service[0]).to.be.an('object');
        expect(service[0]).to.include.keys('url');
        done();
    });
    it('should return details from hotel', (done)=>{
        let name = 'the-venetian';
        let service = serviceHotels.hotelDetails(name);

        expect(service).to.be.an('object');
        expect(service).to.include.keys('options', 'photos');
        expect(service.options).to.be.an('array');
        expect(service.options.length).to.be.greaterThan(3);
        expect(service.photos).to.be.an('array');
        done();
    });
});