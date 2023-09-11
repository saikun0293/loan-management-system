import { Button, Center, PasswordInput, Text, TextInput } from "@mantine/core"
import { useFormik } from "formik"
import { FC } from "react"
import { Navigate, useParams } from "react-router-dom"
import * as Yup from "yup"
import { loginUser } from "../api/user"
import { Role, useUser } from "../context/UserProvider"

export interface Credentials {
  username: string
  password: string
}

const Login: FC = () => {
  const { role } = useParams()
  const { user, setUser } = useUser()

  const formik = useFormik<Credentials>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("*Required"),
      password: Yup.string().required("*Required"),
    }),
    onSubmit: async (values) => {
      try {
        if (role?.toUpperCase() === "USER") {
          setUser(await loginUser(values))
        }
      } catch (e) {
        console.log("Error in login", e)
      }
    },
  })

  if (!user.role) return <Navigate to="/" />
  if (user.role === "USER") return <Navigate to="/user" />
  if (user.role === "ADMIN") return <Navigate to="/admin" />

  return (
    <Center h="80vh">
      <Text component="h1">{role} Login</Text>
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          {...formik.getFieldProps("username")}
          label="Username"
          placeholder="E.g. saikun123"
        />
        <PasswordInput {...formik.getFieldProps("password")} label="Password" />
        <Button size="md" type="submit" radius={"sm"}>
          Submit
        </Button>
      </form>
    </Center>
  )
}

export default Login
