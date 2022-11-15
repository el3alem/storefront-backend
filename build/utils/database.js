"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, DEV_POSTGRES_DB = _a.DEV_POSTGRES_DB, TEST_POSTGRES_DB = _a.TEST_POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, NODE_ENV = _a.NODE_ENV;
var pool;
console.log(NODE_ENV);
if (NODE_ENV === 'test') {
    pool = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: TEST_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (NODE_ENV === 'dev') {
    pool = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: DEV_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = pool;
