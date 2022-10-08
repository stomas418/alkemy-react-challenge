import { useUser } from "../../Context/Context"
import { operationForm, showProps } from "../../types"

const CreateOperation = (props: showProps) => {
    const url = import.meta.env.VITE_API_URL
    const [user, setUser] = useUser()
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = document.getElementById('operation-form') as operationForm
        const { conceptInput, ammountInput, operationTypeInput, dateInput } = form.elements
        const [concept, ammount, operationType, date] = [conceptInput.value, ammountInput.value, operationTypeInput.value, dateInput.value]
        const response = await fetch(`${url}/operations/`, {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ concept, ammount, operationType, date, UserId: user.id })
        })
        props.setShow(false)
    }
    return (
        props.show ?
            <div className="modal">
                <div className="modalContent">
                    <form id="operation-form" onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="conceptInput">Concepto</label>
                            <input type="text" name="conceptInput" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="ammountInput">Suma</label>
                            <input type="number" name="ammountInput" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="operationTypeInput">Concepto</label>
                            <select name="operationTypeInput">
                                <option value="ingreso">ingreso</option>
                                <option value="egreso">egreso</option>
                            </select>
                        </div>
                        <div className="form-field">
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

export default CreateOperation