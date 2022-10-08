import { Request, Response, Router } from 'express';
import { Operation } from '../models/models';
import { isAuthorized } from '../auth/middleware';
import db from '../db/db';
import { Sequelize } from 'sequelize';

const getOperationByID = async (req: Request, res: Response) => {
    const operation = await Operation.findByPk(req.params.id)
    if (operation == null) return res.status(404).json({ "error": "operation not found" })
    return res.status(200).json(operation)
}

const getOperations = async (req: Request, res: Response) => {
    const id = res.getHeader('tokenID') as string
    const operations = await Operation.findAll({
        where: {
            UserId: parseInt(id)
        }
    })
    if (operations.length == 0) return res.status(404).json({ "error": "no operations" })
    return res.status(200).json(operations)
}

const deleteOperation = async (req: Request, res: Response) => {
    await Operation.destroy({
        where: {
            id: req.params.id
        }
    })
    return res.status(200).send(`Operation with id ${req.params.id} deleted succesfully!`)
}

const editOperation = async (req: Request, res: Response) => {

    const [rows] = await Operation.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    if (rows < 0) {
        return res.status(404).json({ "error": "operation doesn't exist" })
    }
    return res.status(200).send(`Operation with id ${req.params.id} edited succesfully!`)
}

const createOperation = async (req: Request, res: Response) => {
    try {
        const operation = await Operation.create(req.body)
        return res.status(201).json(operation)
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

export const operationControllers = () => {
    const group = Router()
    group.use(isAuthorized)
    group.get('/:id', getOperationByID).delete('/:id', deleteOperation)
        .put('/:id', editOperation)
    group.get('/', getOperations).post('/', createOperation)
    return group
}