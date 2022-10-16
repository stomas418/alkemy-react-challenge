import * as jwt from 'jose'
import Operation from './components/Operation/Operation'
import { signForm, Operations, operationType, Token } from './types'
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

// export const equalOperations = (arr1: Operations, arr2: Operations) => {
//     if (arr1.length != arr2.length) { return false }
//     let i = 0
//     while (i < arr1.length) {
//         Object.keys(arr1[i]).forEach((key) => {
//             let index = key as OperationKey
//             if (arr1[i][`${index}`] != arr2[i][`${index}`]) {
//                 return false
//             }
//         })
//         i += 1
//     }
//     return true
// }

export const validForm = (form: signForm) => {
    const [username, password] = [form.elements.usernameInput.value,
    form.elements.passwordInput.value]
    let noErr = true
    let passwordErrors = 0
    if (password.length < 8) {
        form.elements.passwordInput.classList.add("error")
        alert("La contraseña debe tener al menos 8 caracteres")
        passwordErrors += 1
        noErr = false
    }
    if (password == username) {
        if (passwordErrors == 0) { form.elements.passwordInput.classList.add("error") }
        alert("La contraseña no puede ser igual al nombre de usuario")
        passwordErrors += 1
        noErr = false
    }

    if (passwordErrors == 0) { form.elements.passwordInput.classList.remove("error") }
    if (passwordErrors > 0) {
        form.elements.usernameInput.value = ''
        form.elements.passwordInput.value = ''
    }

    return noErr
}