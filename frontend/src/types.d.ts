import { JWTPayload } from 'jose'


declare type Token = JWTPayload & {
    id: string,
    name: string
}

declare type userContextType = [
    Token,
    (x: Token) => void
]
declare type operationContextType = [
    Operations,
    (x: Operations) => void
]

declare type operationType = 'ingreso' | 'egreso'

declare type Operation = {
    id: number,
    concept: string,
    ammount: number,
    operationType: operationType,
    date: string,
    UserId: number
}
declare type OperationKey = 'id' | 'concept' | 'ammount' | 'operationType' | 'date' | 'UserId'
declare type Operations = Operation[]

declare type OperationProps = {
    operation: Operation
}

declare type showProps = {
    show: boolean,
    setShow: (x: boolean) => void,
}

declare type signFormElements = HTMLFormControlsCollection & {
    usernameInput: HTMLInputElement
    passwordInput: HTMLInputElement
}

declare type signForm = HTMLFormElement & {
    elements: signFormElements
}

declare type operationFormElements = HTMLFormControlsCollection & {
    conceptInput: HTMLInputElement
    ammountInput: HTMLInputElement
    operationTypeInput: HTMLSelectElement
    dateInput: HTMLInputElement
}

declare type operationForm = HTMLFormElement & {
    elements: operationFormElements
} 
