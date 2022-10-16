import { Request, Response, Router } from "express"
import { createToken, decodeToken } from "../auth/jwt"
import { User } from '../models/models'
import { compareSync } from 'bcrypt'
const signIn = async (req: Request, res: Response) => {
    try {
        const findUser = await User.findOne({ where: { userName: req.body.userName } })
        if (findUser != null) return res.status(409).json({ "error": "Username already exists" })
        const user = await User.create(req.body)
        const token = createToken(user.id, user.userName)
        res.cookie('token', token, {
            maxAge: 86400000
        })
        return res.status(201).json({ id: user.id, name: user.userName })
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const signUp = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ where: { userName: req.body.userName } })
        if (user == null) return res.status(404).json({ "error": "incorrect password or username" })
        if (compareSync(req.body.password, user.password)) {
            const token = createToken(user.id, user.userName)
            res.cookie('token', token, {
                maxAge: 86400000
            })
            return res.status(201).json({ id: user.id, name: user.userName })
        }
        return res.status(400).json({ "error": "incorrect password or username" })
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

export const signControllers = () => {
    const group = Router()
    group.post("/in", signIn).post("/up", signUp)
    return group
}