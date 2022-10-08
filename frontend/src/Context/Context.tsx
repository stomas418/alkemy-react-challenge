import { useContext, createContext, useState, PropsWithChildren } from 'react'
import { userContextType, Token } from '../types'


const userContext = createContext<userContextType>([{ id: "", name: "" }, (x: Token) => { }])

export const useUser = () => {
    return useContext(userContext)
}
export const AppContext = (children: PropsWithChildren) => {
    const [user, setUser] = useState({ id: "", name: "" })
    return <userContext.Provider value={[user, setUser]}>
        {children.children}
    </userContext.Provider>
}