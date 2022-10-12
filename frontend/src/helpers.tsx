import * as jwt from 'jose'
import Operation from './components/Operation/Operation'
import { OperationKey, Operations, operationType, Token } from './types'
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
    return operations.map((operation) => <Operation operation={operation} key={operation.id} />)
}

export const equalOperations = (arr1: Operations, arr2: Operations) => {
    if (arr1.length != arr2.length) { return false }
    let i = 0
    while (i < arr1.length) {
        Object.keys(arr1[i]).forEach((key) => {
            let index = key as OperationKey
            if (arr1[i][`${index}`] != arr2[i][`${index}`]) {
                return false
            }
        })
        i += 1
    }
    return true
}

export const validForm = (form: HTMLFormElement) => {
    return true
}