import { remove } from 'react-cookies'
import { useUser } from '../../Context/Context'
const Logout = () => {
    const [user, setUser] = useUser()
    const onLogout = async () => {
        remove('token')
        setUser({ id: '', name: '' })
    }
    return (
        <button onClick={() => onLogout()}>Cerrar sesión</button>
    )
}

export default Logout