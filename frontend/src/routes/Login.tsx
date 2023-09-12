import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core"
import { useFormik } from "formik"
import { FC } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"
import { loginUser } from "../api/user"
import { User, useUser } from "../context/UserProvider"
import { loginAdmin } from "../api/admin"
import { isAxiosError } from "axios"

export interface Credentials {
  username: string
  password: string
}

const Login: FC = () => {
  const { role } = useParams()
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  // TODO: Check if auth token is expired or not based on USER or ADMIN
  // If not expired - go to respective pages

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
        const loginType = role ? role.toUpperCase() : "ANONYMOUS"
        let userData = {}

        // TODO: store tokens in localStorage

        if (loginType === "USER") userData = await loginUser(values)
        else if (loginType === "ADMIN") userData = await loginAdmin(values)
        setUser((prev) => ({ ...prev, ...userData }))
      } catch (e) {
        if (isAxiosError(e)) {
          window.alert(
            e.response
              ? e.response.data
              : "Unable to login. Contact administrator"
          )
        }
        navigate("/")
      }
    },
  })

  if (!user.role) return <Navigate to="/" />
  if (user.role === "USER") return <Navigate to="/user" />
  if (user.role === "ADMIN") return <Navigate to="/admin" />

  const title = role ? role.charAt(0).toUpperCase() + role.slice(1) : ""

  return (
    <div>
      <Text component="h1" size={40} color="lime" align="center">
        {title} Login
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={"sm"}>
          <TextInput
            {...formik.getFieldProps("username")}
            label="Username"
            placeholder="E.g. saikun123"
            error={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : false
            }
          />
          <PasswordInput
            {...formik.getFieldProps("password")}
            label="Password"
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : false
            }
          />
        </Stack>
        <Button size="md" type="submit" radius={"sm"} my="lg">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default Login
