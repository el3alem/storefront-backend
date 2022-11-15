"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = require("../controllers/users");
var authorizer_1 = __importDefault(require("../middleware/authorizer"));
var userRoute = express_1.default.Router();
userRoute.get('/', users_1.getAllUsers);
userRoute.get('/:id', users_1.getUser);
userRoute.post('/create', users_1.createUser);
userRoute.put('/:id', authorizer_1.default, users_1.updateUser);
userRoute.delete('/:id', authorizer_1.default, users_1.deleteUser);
exports.default = userRoute;
