"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var products_1 = require("../controllers/products");
var authorizer_1 = __importDefault(require("../middleware/authorizer"));
var prodRoute = express_1.default.Router();
prodRoute.get('/', products_1.getAllProducts);
prodRoute.get('/:id', products_1.getProduct);
prodRoute.post('/create', products_1.createProduct);
prodRoute.put('/:id', products_1.updateProduct);
prodRoute.delete('/:id', authorizer_1.default, products_1.deleteProduct);
exports.default = prodRoute;
