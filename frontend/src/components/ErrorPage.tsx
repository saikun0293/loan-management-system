import { useEffect, useState } from "react";
import {isRouteErrorResponse, useRouteError} from "react-router-dom"

const ErrorPage = () => {
    const error = useRouteError();
    const [errorTxt, setErrorTxt] = useState("")

    useEffect(() => {
        if(isRouteErrorResponse(error)){
            setErrorTxt(error.statusText || error.error?.message || error.data)
        }
    }, [error])

    return (
        <div>
            <h1>An unexpected error has occured</h1>
            <p>{errorTxt}</p>
        </div>
    )
}

export default ErrorPage