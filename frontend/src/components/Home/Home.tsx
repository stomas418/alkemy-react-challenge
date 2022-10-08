import { useEffect, useState } from "react"
import { useUser } from "../../Context/Context"
import { mapOperations } from "../../helpers"
import { Operations, operationType } from "../../types"
import CreateOperation from "../Operation/CreateOperation"
import Operation from "../Operation/Operation"

const Home = () => {
    const [operations, setOperations] = useState([] as Operations)
    const [user, setUser] = useUser()
    const [balance, setBalance] = useState(0)
    const [create, setCreate] = useState(false)
    const [activeOperations, setActiveOperations] = useState<operationType>('ingreso')
    const [limit, setLimit] = useState(10)
    useEffect(() => {
        const getOperations = async () => {

            const url = import.meta.env.VITE_API_URL
            const response = await fetch(`${url}/operations`, {
                credentials: 'include'
            })

            if (response.status == 404) {
                return
            }
            const data = await response.json() as Operations
            let tempBalance = 0
            data.forEach(({ operationType, ammount }) => {
                operationType == 'ingreso' ?
                    tempBalance += ammount : tempBalance -= ammount
            })
            setBalance(tempBalance)
            setOperations(data)
        }
        getOperations()
    }, [create])
    const active = mapOperations(operations, activeOperations, limit)
    return (
        <>
            <h2>Bienvenido {user.name}, tu balance es ${balance}</h2>
            <div className="showOptions">
                <span onClick={() => setActiveOperations('ingreso')}>Ingresos</span>
                <span onClick={() => setActiveOperations('egreso')}>Egresos</span>
            </div>
            <h3>Ultimas 10 operaciones: </h3>
            <div className="operation-list">
                {active.length > 0 ?
                    active
                    : <p>No tienes ninguna operación</p>}
                <div className="operation-create">
                    <button onClick={(e) => { setCreate(true) }}>Añadir más operaciones</button>
                </div>
                <button onClick={((e) => setLimit(0))}>Mostrar todas las operaciones de {activeOperations}</button>
            </div>
            <CreateOperation show={create} setShow={setCreate} />
        </>
    )
}

export default Home