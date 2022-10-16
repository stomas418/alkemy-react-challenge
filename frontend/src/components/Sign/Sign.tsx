import { useState } from "react"
import Login from "../Login/Login"
import Register from "../Register/Register"

const Sign = () => {
    const [hasAccount, setHasAccount] = useState(false)
    const onClick = () => {
        setHasAccount(!hasAccount)
    }
    return (
        hasAccount ?
            <>
                <Login />
                <p className="clickable" onClick={onClick}>No tengo una cuenta</p>
            </>
            :
            <>
                <Register />
                <p className="clickable" onClick={onClick}>Ya tengo una cuenta</p>
            </>
    )
}

export default Sign