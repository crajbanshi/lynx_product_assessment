var assert = require('assert');
const request = require("supertest")("http://localhost:3000");
const expect = require("chai").expect;

var app = require('../index');


describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

describe('App test', function () {

    describe('/product/6', function () {
        it('should return list', async function () {
            const response = await request.get("/product/6");

            expect(response.status).to.eql(200);
            expect(response.body.price).to.eql(21.75);
        });
    });

    describe('/product/6?cur=CAD', function () {
        it('should return list', async function () {
            const response = await request.get("/product/6?cur=CAD");

            expect(response.status).to.eql(200);
            expect(response.body.price).to.not.eql(21.75);
        });
    });

    describe('/mostviewed', function () {
        it('should return list', async function () {
            const response = await request.get("/mostviewed");

            expect(response.status).to.eql(200);
            expect(response.body.length).to.eql(7);
        });
    });
});