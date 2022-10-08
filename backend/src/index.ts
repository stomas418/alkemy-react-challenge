require('dotenv').config({ path: __dirname + '/.env' })
import express, { Request, Response } from 'express'
import cors from 'cors'
import { initializeModels } from './models/models'
import { operationControllers } from './controllers/operations'
import { userControllers } from './controllers/users'
import cookieParser from 'cookie-parser'
import { signControllers } from './controllers/sign'

initializeModels()
const app = express()
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}
))
app.use(cookieParser())
app.use(express.json())
app.use('/operations', operationControllers())
app.use('/users', userControllers())
app.use('/sign', signControllers())
app.get('/', (req: Request, res: Response) => {
    return res.send('hello world')
})
app.listen(8080)
