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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeModels = exports.Operation = exports.User = void 0;
var bcrypt_1 = require("bcrypt");
var sequelize_1 = require("sequelize");
var db_1 = __importDefault(require("../db/db"));
exports.User = db_1.default.define('User', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        onDelete: 'CASCADE'
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: function (user, options) { return __awaiter(void 0, void 0, void 0, function () {
            var hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, bcrypt_1.hash)(user.password, 10)];
                    case 1:
                        hashedPassword = _a.sent();
                        user.password = hashedPassword;
                        return [2];
                }
            });
        }); }
    },
    tableName: "users",
    freezeTableName: true
});
exports.Operation = db_1.default.define('Operation', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    concept: {
        type: sequelize_1.DataTypes.STRING,
    },
    ammount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    operationType: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [['ingreso', 'egreso']]
        },
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "operations",
    freezeTableName: true
});
exports.User.hasMany(exports.Operation, {
    foreignKey: "UserId"
});
exports.Operation.belongsTo(exports.User);
var initializeModels = function () { return __awaiter(void 0, void 0, void 0, function () {
    var operations, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, exports.Operation.sync({ alter: true })];
            case 1:
                operations = _a.sent();
                return [4, exports.User.sync({ alter: true })];
            case 2:
                users = _a.sent();
                return [2, { users: users, operations: operations }];
        }
    });
}); };
exports.initializeModels = initializeModels;
//# sourceMappingURL=models.js.map