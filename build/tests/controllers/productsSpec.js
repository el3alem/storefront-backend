"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var authentication_1 = require("../../utils/authentication");
var request = (0, supertest_1.default)(server_1.default);
var token = (0, authentication_1.createJWTToken)(1, 'Ahly');
describe('Productcontroller: ', function () {
    it('new user', function () {
        var data = {
            name: 'Test',
            price: 40.0,
            category: 'category a',
        };
        request
            .post('/api/products/create')
            .set('Authorization', "Ahly ".concat(token))
            .send(data)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({
            id: 1,
            name: 'Test',
            price: '$40.00',
            category: 'category a',
        });
    });
    it('fail-name not included', function () {
        var data = {
            name: 'Test',
            price: 40.0,
            category: 'category b',
        };
        request.post('/api/products/create').set('Authorization', "Ahly ".concat(token)).send(data).expect(400).expect({
            error: 'Error: Product name is required',
        });
    });
    it('show all products', function () {
        request.get('/api/products').expect('Content-Type', /json/).expect(200).expect({
            id: 1,
            name: 'Test',
            price: 40.0,
            category: 'category a',
        });
    });
    it('show product', function () {
        request.get('/api/products/1').expect('Content-Type', /json/).expect(200).expect({
            id: 1,
            name: 'Test',
            price: 40.0,
            category: 'category a',
        });
    });
    it('update product', function () {
        var data = {
            name: 'Test edited',
            price: 50.0,
        };
        request
            .put('/api/products/1')
            .set('Authorization', "Ahly ".concat(token))
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            name: 'Test edited',
            price: 50.0,
            category: 'category a',
        });
    });
    it('delete product', function () {
        request
            .delete('/api/products/1')
            .set('Authorization', "Ahly ".concat(token))
            .expect(200)
            .then(function () {
            request.get('/api/products').expect({});
        });
    });
});
