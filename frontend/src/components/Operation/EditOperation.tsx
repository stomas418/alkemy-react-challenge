import { useOperations, useUser } from "../../Context/Context"
import { showProps, Operation, operationForm, OperationProps, operationType } from "../../types"

const EditOperation = (props: showProps & OperationProps) => {
    const url = import.meta.env.VITE_API_URL
    const [operations, setOperations] = useOperations()
    const { operation } = props
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = document.getElementById('operation-form') as operationForm
        const { conceptInput, ammountInput, operationTypeInput, dateInput } = form.elements;
        [operation.concept, operation.ammount, operation.operationType, operation.date] = [conceptInput.value, parseFloat(ammountInput.value), operationTypeInput.value as operationType, dateInput.value];
        await fetch(`${url}/operations/${props.operation.id}`, {
            method: "put",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(operation)
        })

        setOperations(operations.map((oldOperation) => (
            oldOperation.id == operation.id ? operation : oldOperation
        )))
        props.setShow(false)
    }
    return (
        props.show ?
            <div className="modal">
                <div className="modalContent">
                    <form id="operation-form" onSubmit={handleSubmit}>
                        <div className="modal-form-field">
                            <label htmlFor="conceptInput">Concepto</label>
                            <input type="text" name="conceptInput" />
                        </div>
                        <div className="modal-form-field">
                            <label htmlFor="ammountInput">Suma</label>
                            <input type="number" name="ammountInput" />
                        </div>
                        <div className="modal-form-field">
                            <label htmlFor="operationTypeInput">Concepto</label>
                            <select name="operationTypeInput">
                                <option value="ingreso">ingreso</option>
                                <option value="egreso">egreso</option>
                            </select>
                        </div>
                        <div className="modal-form-field">
                            <label htmlFor="dateInput">Fecha</label>
                            <input type="date" name="dateInput" />
                        </div>
                        <div className="close-submit">
                            <button type="submit">Submit</button>
                            <button onClick={() => props.setShow(false)}>Close</button>
                        </div>
                    </form>
                </div>
            </div>
            : <></>
    )
}

export default EditOperation