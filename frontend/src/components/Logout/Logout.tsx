import { remove } from 'react-cookies'
import { useUser } from '../../Context/Context'
const Logout = () => {
    const [user, setUser] = useUser()
    const onLogout = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        remove('token')
        setUser({ id: '', name: '' })
    }
    return (
        <button onClick={(e) => onLogout(e)}>Logout</button>
    )
}

export default Logout