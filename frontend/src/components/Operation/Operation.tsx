import { useState } from "react"
import { useOperations } from "../../Context/Context"
import { getDate } from "../../helpers"
import { OperationProps } from "../../types"
import EditOperation from "./EditOperation"

const Operation = (props: OperationProps) => {
    const { concept, ammount, operationType, date } = props.operation
    const [operations, setOperations] = useOperations()
    const [show, setShow] = useState(false)
    const url = import.meta.env.VITE_API_URL
    const deleteOperation = async () => {
        setOperations(operations.filter((operation) => operation.id != props.operation.id))
        await fetch(`${url}/operations/${props.operation.id}`, {
            method: "DELETE",
            credentials: "include"
        })
    }
    return (
        <>
            <div className="operation">
                <h1>{concept}</h1>
                <p>Suma: {ammount}</p>
                <p>Tipo: {operationType}</p>
                <p>Fecha: {getDate(date)}</p>
                <button onClick={() => setShow(true)}>Edit</button>
                <button onClick={deleteOperation}>Delete</button>
            </div>
            <EditOperation show={show} setShow={setShow} operation={props.operation} />
        </>

    )
}

export default Operation