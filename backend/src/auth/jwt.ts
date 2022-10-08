import jwt from 'jsonwebtoken'

interface Token {
    id: string
    name: string
}

export const createToken = (id: number, username: string) => {
    const token = jwt.sign({ id: id.toString(), name: username }, process.env.SECRET_KEY, {
        expiresIn: '24h'
    })
    return token
}

export const decodeToken = (token: string) => {
    return jwt.verify(token, process.env.SECRET_KEY) as Token
}