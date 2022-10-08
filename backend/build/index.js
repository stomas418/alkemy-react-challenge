"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: __dirname + '/.env' });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var models_1 = require("./models/models");
var operations_1 = require("./controllers/operations");
var users_1 = require("./controllers/users");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var sign_1 = require("./controllers/sign");
(0, models_1.initializeModels)();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/operations', (0, operations_1.operationControllers)());
app.use('/users', (0, users_1.userControllers)());
app.use('/sign', (0, sign_1.signControllers)());
app.get('/', function (req, res) {
    return res.send('hello world');
});
app.listen(8080);
//# sourceMappingURL=index.js.map