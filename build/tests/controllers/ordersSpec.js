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
describe('Orderscontroller: ', function () {
    it('return new order ', function () {
        var data = {
            user_id: 1,
            status: 'new',
        };
        request
            .post('/api/orders/create')
            .set('Authorization', "Ahly ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            id: 1,
            user_id: 1,
            status: 'new',
        });
    });
    it('add product to order', function () {
        var data = {
            product_id: 1,
            quantity: 10,
        };
        request
            .post('/api/orders/add-product/1')
            .set('Authorization', "Ahly ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(201)
            .expect({
            id: 1,
            order_id: 1,
            product_id: 1,
            quantity: 10,
        });
    });
    it(' fail bec user_id is not included', function () {
        var data = {
            status: 'new',
        };
        request.post('/api/orders/create').set('Authorization', "Ahly ".concat(token)).send(data).expect(400).expect({
            error: 'Missing one or more required parameters',
        });
    });
    it('/orders/create should fail if status is not included in parameters', function () {
        var data = {
            user_id: 1,
        };
        request.post('/api/orders/create').set('Authorization', "Ahly ".concat(token)).send(data).expect(400).expect({
            error: 'Missing one or more required parameters',
        });
    });
    it('/orders should show all orders', function () {
        request.get('/api/orders').expect('Content-Type', 'application/json').expect(200).expect({
            id: 1,
            user_id: 1,
            status: 'new',
        });
    });
    it('/orders/:id show a order', function () {
        request
            .get('/api/orders/1')
            .set('Authorization', "Ahly ".concat(token))
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: 'new',
        });
    });
    it('/orders should update an order', function () {
        var data = {
            id: 1,
            user_id: 1,
            status: 'in progress',
        };
        request
            .put('/api/orders/1')
            .set('Authorization', "Ahly ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: 'in progress',
        });
    });
    it('/orders/:id should delete an order given its id', function () {
        request.delete('/api/orders/1').set('Authorization', "Ahly ".concat(token)).expect(200).expect({
            id: 1,
            user_id: 1,
            status: 'in progress',
        });
    });
    it('show not completed orders', function () {
        request
            .get('/api/orders/current-order/1')
            .set('Authorization', "Ahly ".concat(token))
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            user_id: 1,
            status: 'in progress',
        });
    });
});
