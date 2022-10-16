import { useEffect, useState } from "react"
import { useOperations, useUser } from "../../Context/Context"
import { mapOperations } from "../../helpers"
import { Operations, operationType } from "../../types"
import CreateOperation from "../Operation/CreateOperation"

const Home = () => {
    const [operations, setOperations] = useOperations()
    const [user, setUser] = useUser()
    const [balance, setBalance] = useState<number>(0)
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
            setOperations(data)
        }
        getOperations()
    }, [])
    useEffect(() => {
        setBalance(operations
            .map((({ ammount, operationType }) =>
                (operationType == "ingreso" ? ammount : -ammount)))
            .reduce((ammount, current) => current + ammount, 0))
    }, [operations])
    const active = mapOperations(operations, activeOperations, limit)
    return (
        <>
            <h2>Bienvenido, tu balance es ${balance}</h2>
            <div id="options">
                <span onClick={() => setActiveOperations('ingreso')} className={`${activeOperations == 'ingreso' ? 'focused' : ''}`}>Ingresos</span>
                <span onClick={() => setActiveOperations('egreso')} className={`${activeOperations == 'egreso' ? 'focused' : ''}`}>Egresos</span>
            </div>
            {limit == 10 ?
                <>
                    <button onClick={((e) => setLimit(0))}>Mostrar todas las operaciones de {activeOperations}</button>
                    <h3>Últimas 10 operaciones: </h3>
                </>
                :
                <>
                    <button onClick={(e) => setLimit(10)}>Mostrar las 10 últimas operaciones</button>
                    <h3>Todas las operaciones</h3>
                </>
            }

            <div className="operation-list">
                {active.length > 0 ?
                    active
                    : <p>No tienes ninguna operación</p>}
                <div className="operation-create">
                    <button onClick={(e) => { setCreate(true) }}>Añadir más operaciones</button>
                </div>

            </div>
            <CreateOperation show={create} setShow={setCreate} />
        </>
    )
}

export default Home