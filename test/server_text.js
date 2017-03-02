/**
 *.@license-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 *.._______                _ _____
 *.|__   __|              (_)  __ \  Created by
 *....| | ___  _ __  _ __  _| |  | | _____   __
 *....| |/ _ \| '_ \| '_ \| | |  | |/ _ \ \ / /
 *....| | (_) | | | | | | | | |__| |  __/\ V /
 *....|_|\___/|_| |_|_| |_|_|_____/ \___| \_/ v1.0
 *01/03/17 :: 22:39-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 */
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Routes', function() {
    let hotel = 'wynn-las-vegas';
    let departure = 'Brasilia';
    let daily = 5;
    it('should connect to index',(done) => {
        chai.request(server)
            .get('/')
            .end(function(err, res){
                should.not.exist(err);
                res.status.should.equal(200);
                res.type.should.equal('text/html');
                done();
            });
    });
    it('should connect to hotel/HOTEL-NAME', (done)=>{
        chai.request(server)
            .get('/hotel/' + hotel)
            .end(function(err, res){
                should.not.exist(err);
                res.status.should.equal(200);
                res.type.should.equal('text/html');
                done();
            });
    });
    it('should return 403 access forbidden at /api/departure/HOTEL-NAME', (done)=>{
        chai.request(server)
            .get('/api/departures/' + hotel)
            .end(function(err, res){
                res.status.should.equal(403);
                done();
            });
    });
    it('should return list of options from selected hotel at /api/options/HOTEL-NAME', (done)=>{
        chai.request(server)
            .post('/api/options/' + hotel)
            .end(function(err, res){
                res.status.should.equal(200);
                res.type.should.equal('application/json');
                res.body.length.should.be.greaterThan(2);
                res.body.should.be.an('array');
                done();
            });
    });
    it('should return list of options from selected hotel with query at /api/options/HOTEL-NAME', (done)=>{
        chai.request(server)
            .post('/api/options/' + hotel + '?from=' + departure + '&daily=' + daily)
            .end(function(err, res){
                res.status.should.equal(200);
                res.type.should.equal('application/json');
                res.body.length.should.be.greaterThan(0);
                res.body.should.be.an('array');
                res.body[0].should.have.property('from').to.contain('Brasilia');
                done();
            });
    });
    it('should return 403 access forbidden from selected hotel at /api/daily/HOTEL-NAME', (done)=>{
        chai.request(server)
            .get('/api/dailys/' + hotel)
            .end(function(err, res){
                res.status.should.equal(403);
                done();
            });
    });
    it('should return 404 to any other url', (done)=>{
        chai.request(server)
            .get('/lists')
            .end(function(err, res){
                res.status.should.equal(404);
                done();
            });
    });
});