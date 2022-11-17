"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var indRoute_1 = __importDefault(require("./routes/indRoute"));
var app = (0, express_1.default)();
var port = 8080;
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', indRoute_1.default);
app.get('/', function (_req, res) {
    res.redirect('/api');
});
app.listen(port, function () {
    // eslint-disable-next-line no-undef
    console.log("server started at localhost: ".concat(port));
});
exports.default = app;
