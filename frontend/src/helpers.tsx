import * as jwt from 'jose'
import Operation from './components/Operation/Operation'
import { Operations, operationType, Token } from './types'
export const decodeToken = (token: string) => {
    const decoded = jwt.decodeJwt(token) as Token
    return decoded
}

export const getDate = (date: string) => {
    const newDate = new Date(date)
    return `${newDate.toLocaleDateString()}`
}

export const mapOperations = (arr: Operations, active: operationType, limit: number) => {
    const operations = arr.filter((operation) => operation.operationType == active)
    if (limit > 0) {
        while (operations.length > limit) {
            operations.pop()
        }
    }
    return operations.map((operation) => <Operation operation={operation} />)
}