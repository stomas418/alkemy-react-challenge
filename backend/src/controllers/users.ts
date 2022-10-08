import { Request, Response, Router } from 'express';
import { isAuthorized } from '../auth/middleware';
import { User } from '../models/models'

const getUser = async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id)
    if (user == null) return res.status(404).json({ "error": "user not found" })
    return res.status(200).json(user)
}

const editUser = async (req: Request, res: Response) => {
    const [rows] = await User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    if (rows <= 0) {
        return res.status(404).json({ "error": "operation not found" })
    }
    return res.status(200).send(`User with id ${req.params.id} edited succesfully!`)
}

const deleteUser = async (req: Request, res: Response) => {
    if (res.getHeader("tokenID") != req.params.id) {
        console.log([req.params.tokenID, req.params.id])
        return res.status(403).json({ "error": "can't delete another user" })
    }
    const deleted = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    if (deleted == 0) {
        return res.status(404).json({ "error": "User does not exist" })
    }
    res.clearCookie("token")
    return res.status(200).send(`User with id ${req.params.id} deleted succesfully!`)
}

export const userControllers = () => {
    const group = Router()
    group.use(isAuthorized)
    group.put("/:id", editUser).delete("/:id", deleteUser).get("/:id", getUser)
    return group
}