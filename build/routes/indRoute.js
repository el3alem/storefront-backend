"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRoute_1 = __importDefault(require("./userRoute"));
var prodRoute_1 = __importDefault(require("./prodRoute"));
var orderRoute_1 = __importDefault(require("./orderRoute"));
var router = express_1.default.Router();
router.use("/users", userRoute_1.default);
router.use("/products", prodRoute_1.default);
router.use("/orders", orderRoute_1.default);
exports.default = router;
