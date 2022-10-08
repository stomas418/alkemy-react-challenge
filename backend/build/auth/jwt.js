"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createToken = function (id, username) {
    var token = jsonwebtoken_1.default.sign({ id: id.toString(), name: username }, process.env.SECRET_KEY, {
        expiresIn: '24h'
    });
    return token;
};
exports.createToken = createToken;
var decodeToken = function (token) {
    return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map