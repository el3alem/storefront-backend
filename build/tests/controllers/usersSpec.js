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
describe('Users controllers: ', function () {
    it('return user', function () {
        var data = {
            username: 'elalemm',
            first_name: 'omar',
            last_name: 'elalem',
            password: 'pass1234',
        };
        request.post('/api/users/create').send(data).expect('Content-Type', 'application/json').expect(201).expect({
            id: 1,
            username: 'elalemm',
            first_name: 'omar',
            last_name: 'elalem',
        });
    });
    it('fail-username not sent', function () {
        var data = {
            first_name: 'omar',
            last_name: 'elalem',
            password: 'pass1234',
        };
        request
            .post('/api/users/create')
            .set('Authorization', "Ahly ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'Missing username or password',
        });
    });
    it('fail- password not sent', function () {
        var data = {
            username: 'elalemm',
            first_name: 'omar',
            last_name: 'elalem',
        };
        request
            .post('/api/users/create')
            .set('Authorization', "Ahly ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect(400)
            .expect({
            error: 'Missing username or password',
        });
    });
    it('all users', function () {
        request
            .get('/api/users')
            .set('Authorization', "Ahly ".concat(token))
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect([
            {
                id: 1,
                username: 'elalemm',
                first_name: 'omar',
                last_name: 'elalem',
            },
        ]);
    });
    it('show user', function () {
        request
            .get('/api/users/1')
            .set('Authorization', "Ahly ".concat(token))
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect({
            id: 1,
            first_name: 'omar',
            last_name: 'elalem',
            password_digest: 'pass1234',
        });
    });
    it('should update user', function () {
        var data = {
            username: 'cristiano',
            first_name: 'cristiano',
            last_name: 'ronaldo',
            password_digest: 'pass1234',
        };
        request
            .put('/api/users/1')
            .set('Authorization', "Ahly ".concat(token))
            .send(data)
            .expect('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({
            id: 1,
            username: 'cristiano',
            first_name: 'cristiano',
            last_name: 'ronaldo',
            password_digest: 'pass1234',
        });
    });
    it('/users/:id should delete a user', function () {
        request.delete('/api/users/1').expect(200).expect({
            status: 'Deleted user 1',
        });
    });
});
