"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var sequelize_1 = require("sequelize");
var DB = process.env.DB;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_HOST = process.env.DB_HOST;
exports.db = new sequelize_1.Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: 3306,
});
exports.default = exports.db;
//# sourceMappingURL=db.js.map