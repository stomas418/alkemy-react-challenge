import { getDate } from "../../helpers"
import { OperationProps } from "../../types"

const Operation = (props: OperationProps) => {
    const { concept, ammount, operationType, date } = props.operation
    return (
        <div className="operation">
            <h1>{concept}</h1>
            <p>Suma: {ammount}</p>
            <p>Tipo: {operationType}</p>
            <p>Fecha: {getDate(date)}</p>

        </div>
    )
}

export default Operation