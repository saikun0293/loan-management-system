import { Container, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { isRouteErrorResponse, useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError()
  const [errorTxt, setErrorTxt] = useState("")

  useEffect(() => {
    if (isRouteErrorResponse(error)) {
      setErrorTxt(error.statusText || error.error?.message || error.data)
    }
  }, [error])

  return (
    <Container ff="DM Sans">
      <h1>An unexpected error has occured :(</h1>
      <Text color="red" ff="DM Sans" size="xl">
        {errorTxt}
      </Text>
    </Container>
  )
}

export default ErrorPage
