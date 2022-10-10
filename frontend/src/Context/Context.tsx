import { useContext, createContext, useState, PropsWithChildren } from 'react'
import { userContextType, Token, operationContextType, Operations } from '../types'


const userContext = createContext<userContextType>([{ id: "", name: "" }, (x: Token) => { }])

const operationsContext = createContext<operationContextType>([[] as Operations, (x: Operations) => { }])

export const useUser = () => {
    return useContext(userContext)
}
export const useOperations = () => {
    return useContext(operationsContext)
}

export const UserProvider = (children: PropsWithChildren) => {
    const [user, setUser] = useState({ id: "", name: "" })
    return <userContext.Provider value={[user, setUser]}>
        {children.children}
    </userContext.Provider>
}

export const OperationsProvider = (children: PropsWithChildren) => {
    const [operations, setOperations] = useState([] as Operations)
    return <operationsContext.Provider value={[operations, setOperations]}>
        {children.children}
    </operationsContext.Provider>
}

export const AppContext = (children: PropsWithChildren) => {
    return (
        <UserProvider>
            <OperationsProvider>
                {children.children}
            </OperationsProvider>
        </UserProvider>
    )
}