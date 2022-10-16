import { hash } from 'bcrypt'
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import db from '../db/db'

interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<number>
    userName: string
    password: string
}

export interface Operation extends Model<InferAttributes<Operation>, InferCreationAttributes<Operation>> {
    id: CreationOptional<number>,
    concept: string,
    ammount: number,
    operationType: string,
    date: Date
}

export const User = db.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        onDelete: 'CASCADE'
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user: User, options) => {
            const hashedPassword = await hash(user.password, 10);
            user.password = hashedPassword;
        }
    },
    tableName: "users",
    freezeTableName: true
});

export const Operation = db.define('Operation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    concept: {
        type: DataTypes.STRING,
    },
    ammount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    operationType: {
        type: DataTypes.STRING,
        validate: {
            isIn: [['ingreso', 'egreso']]
        },
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: "operations",
    freezeTableName: true
});

User.hasMany(Operation, {
    foreignKey: "UserId"
})
Operation.belongsTo(User)

export const initializeModels = async () => {
    const operations = await Operation.sync({ alter: true })
    const users = await User.sync({ alter: true })
    return { users, operations }
}

