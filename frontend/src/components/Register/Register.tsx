import { useUser } from "../../Context/Context"
import { signForm, Token } from "../../types"

const Register = () => {
    const url = import.meta.env.VITE_API_URL
    const [user, setUser] = useUser()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = document.getElementById('register-form') as signForm
        const { usernameInput, passwordInput } = form.elements
        const [username, password] = [usernameInput.value, passwordInput.value]
        const response = await fetch(`${url}/sign/in`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userName": username,
                "password": password
            })
        })
        if (response.status == 201) {
            const data = await response.json() as Token
            setUser(data)
            return false
        }
        return false
    }

    return (
        <div>
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit} name="form" id="register-form" className="sign-form">
                <div className="form-field">
                    <label htmlFor="usernameInput">Username:</label>
                    <input type="text" name="usernameInput" />
                </div>
                <div className="form-field">
                    <label htmlFor="passwordInput">Password:</label>
                    <input type="password" name="passwordInput" />
                </div>
                <br />
                <input className="submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Register