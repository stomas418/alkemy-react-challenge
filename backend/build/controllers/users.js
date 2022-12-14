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
exports.userControllers = void 0;
var express_1 = require("express");
var middleware_1 = require("../auth/middleware");
var models_1 = require("../models/models");
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, models_1.User.findByPk(req.params.id)];
            case 1:
                user = _a.sent();
                if (user == null)
                    return [2, res.status(404).json({ "error": "user not found" })];
                return [2, res.status(200).json(user)];
        }
    });
}); };
var editUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, models_1.User.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                })];
            case 1:
                rows = (_a.sent())[0];
                if (rows <= 0) {
                    return [2, res.status(404).json({ "error": "operation not found" })];
                }
                return [2, res.status(200).send("User with id ".concat(req.params.id, " edited succesfully!"))];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (res.getHeader("tokenID") != req.params.id) {
                    console.log([req.params.tokenID, req.params.id]);
                    return [2, res.status(403).json({ "error": "can't delete another user" })];
                }
                return [4, models_1.User.destroy({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 1:
                deleted = _a.sent();
                if (deleted == 0) {
                    return [2, res.status(404).json({ "error": "User does not exist" })];
                }
                res.clearCookie("token");
                return [2, res.status(200).send("User with id ".concat(req.params.id, " deleted succesfully!"))];
        }
    });
}); };
var userControllers = function () {
    var group = (0, express_1.Router)();
    group.use(middleware_1.isAuthorized);
    group.put("/:id", editUser).delete("/:id", deleteUser).get("/:id", getUser);
    return group;
};
exports.userControllers = userControllers;
//# sourceMappingURL=users.js.map