"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authorizer_1 = __importDefault(require("../middleware/authorizer"));
var orders_1 = require("../controllers/orders");
var orderRoute = express_1.default.Router();
orderRoute.get('/', authorizer_1.default, orders_1.getAllOrders);
orderRoute.get('/:id', authorizer_1.default, orders_1.getOrder);
orderRoute.get('/current-orders/:id', authorizer_1.default, orders_1.getCurrentOrders);
orderRoute.post('/create', authorizer_1.default, orders_1.createOrder);
orderRoute.post('/add-product/:id', authorizer_1.default, orders_1.addProductToOrder);
orderRoute.put('/:id', authorizer_1.default, orders_1.updateOrder);
orderRoute.delete('/:id', authorizer_1.default, orders_1.deleteOrder);
exports.default = orderRoute;
