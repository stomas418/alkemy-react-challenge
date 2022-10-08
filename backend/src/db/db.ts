import { Sequelize } from 'sequelize'

const DB = process.env.DB as string
const DB_USER = process.env.DB_USER as string
const DB_PASSWORD = process.env.DB_PASSWORD as string
const DB_HOST = process.env.DB_HOST as string

export const db = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    port: 3306,
})


export default db