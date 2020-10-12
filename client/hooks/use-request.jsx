import axios from 'axios'
import { useState } from 'react'
import { Alert } from 'react-bootstrap'

const useRequest = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null)

    const doRequest = async () => {
        try {
            setErrors(null)
            const response = await axios[method](url, body)
            if (onSuccess) {
                onSuccess(response.data)
            }
            return response.data
        } catch (errs) {
            setErrors(
                <Alert variant="danger">
                    <h4>Ooops...</h4>
                    <ul className="my-0">
                        {errs.response.data.errors.map((err) => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </Alert>
            )
        }
    }

    return { doRequest, errors }
}

export default useRequest
