"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWTToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var tokenSecret = process.env.TOKEN_SECRET;
var createJWTToken = function (id, username) {
    return jsonwebtoken_1.default.sign({ id: id, username: username }, tokenSecret);
};
exports.createJWTToken = createJWTToken;
