import { NextFunction, Request, Response } from "express";
import { User } from "../models/models";

import { decodeToken } from "./jwt";

export const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = decodeToken(req.cookies.token)
        const exists = await User.findByPk(token.id)
        if (exists == null) {
            throw new Error()
        }
        res.append("tokenID", token.id)
        next()
    } catch (error) {
        return res.status(401).json({ "error": "you're unauthorized!" })
    }
}
