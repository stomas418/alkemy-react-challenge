import * as jwt from 'jose'
import Operation from './components/Operation/Operation'
import { signForm, Operations, operationType, Token, operationForm } from './types'
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

export const validSign = (form: signForm) => {
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

export const validOperation = (form: operationForm) => {
    let noErr = true
    const { ammountInput, dateInput, operationTypeInput } = form.elements
    const [ammount, date, operationType] = [ammountInput.value, dateInput.value, operationTypeInput.value]

    let ammountErrors = 0
    if (isNaN(parseFloat(ammount))) {
        alert("La suma debe ser un número")
        ammountErrors += 1
        noErr = false
        form.elements.ammountInput.classList.add("error")
    }
    if (ammountErrors == 0) {
        form.elements.ammountInput.classList.remove("error")
    }

    let dateErrors = 0
    if (date == '') {
        alert("Tienes que proveer una fecha")
        dateErrors += 1
        noErr = false
        form.elements.dateInput.classList.add("error")
    }
    if (dateErrors == 0) {
        form.elements.dateInput.classList.remove("error")
    }

    let operationTypeErrors = 0
    if (operationType != 'ingreso' && operationType != 'egreso') {
        alert("Las operaciones solo pueden ser ingresos o egresos")
        operationTypeErrors += 1
        noErr = false
        form.elements.operationTypeInput.classList.add("error")
    }
    if (operationTypeErrors == 0) {
        form.elements.operationTypeInput.classList.remove("error")
    }

    return noErr
}