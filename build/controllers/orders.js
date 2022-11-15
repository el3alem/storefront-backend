"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentOrders = exports.addProductToOrder = exports.createOrder = exports.updateOrder = exports.getAllOrders = exports.deleteOrder = exports.getOrder = void 0;
var order_1 = require("../models/order");
var getAllOrders = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, order_1.getAllOrdrs)()];
            case 1:
                orders = _a.sent();
                res.status(200).json(orders);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllOrders = getAllOrders;
var getOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, order_1.getOrdr)(parseInt(req.params.id))];
            case 1:
                order = _a.sent();
                res.status(200).json(order);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getOrder = getOrder;
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userid, status_1, order, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, userid = _a.userid, status_1 = _a.status;
                if (!userid || !status_1) {
                    return [2 /*return*/, res.status(400).json({
                            error: 'Missing one or more required parameters',
                        })];
                }
                return [4 /*yield*/, (0, order_1.createOrdr)({
                        userid: parseInt(userid),
                        status: status_1,
                    })];
            case 1:
                order = _b.sent();
                res.status(201).json(order);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _b.sent();
                res.status(400).json(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createOrder = createOrder;
var updateOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userid, status_2, id, order, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, userid = _a.userid, status_2 = _a.status;
                id = req.params.id;
                if (!id || !userid || !status_2) {
                    return [2 /*return*/, res.status(400).json({
                            error: 'Missing one or more required parameters',
                        })];
                }
                return [4 /*yield*/, (0, order_1.updateOrdr)({
                        id: parseInt(req.params.id),
                        userid: parseInt(userid),
                        status: status_2,
                    })];
            case 1:
                order = _b.sent();
                res.status(201).json(order);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                res.status(500).json(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateOrder = updateOrder;
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, order_1.deleteOrdr)(parseInt(req.params.id))];
            case 1:
                _a.sent();
                res.status(200).json({ status: "Deleted order ".concat(req.params.id) });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(500).json(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteOrder = deleteOrder;
var addProductToOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderid, productid, quantity, Order, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                orderid = parseInt(req.params.id);
                productid = parseInt(req.body.Orderid);
                quantity = parseInt(req.body.quantity);
                if (!orderid || !productid || !quantity) {
                    return [2 /*return*/, res.status(400).json({
                            error: 'Missing one or more required parameters',
                        })];
                }
                return [4 /*yield*/, (0, order_1.addProductToOrdr)({
                        orderid: orderid,
                        productid: productid,
                        quantity: quantity,
                    })];
            case 1:
                Order = _a.sent();
                res.status(200).json(Order);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addProductToOrder = addProductToOrder;
var getCurrentOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentOrders, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, order_1.getCurrentOrdrs)(parseInt(req.params.id))];
            case 1:
                currentOrders = _a.sent();
                res.status(200).json(currentOrders);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(400).json(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCurrentOrders = getCurrentOrders;
