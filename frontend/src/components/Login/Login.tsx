import { useUser } from "../../Context/Context"
import { signForm } from "../../types"

const Login = () => {
    const url = import.meta.env.VITE_API_URL
    const [user, setUser] = useUser()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = document.getElementById('login-form') as signForm
        const { usernameInput, passwordInput } = form.elements
        const [username, password] = [usernameInput.value, passwordInput.value]
        const response = await fetch(`${url}/sign/up`, {
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
            const token = await response.json()
            setUser(token)
            return false
        }
        alert("Incorrect username or password");

        [form.elements.usernameInput.value, form.elements.passwordInput.value] = ["", ""]

        return false
    }

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="sign-form" id="login-form" name="login-form">
                <div className="form-field">
                    <label htmlFor="usernameInput">Email:</label>
                    <input type="email" name="usernameInput" />
                </div>
                <div className="form-field">
                    <label htmlFor="passwordInput">Contraseña:</label>
                    <input type="password" name="passwordInput" />
                </div>
                <br />
                <input className="submit" type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login