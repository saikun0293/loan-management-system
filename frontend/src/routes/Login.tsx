import {
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { FC, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"
import { loginSchema } from "../api/schema"
import { decodeToken, isCurrentRole, isTokenExpired } from "../api/utils"
import { initialAuthState, useAuth } from "../context/AuthProvider"
import { AuthResponseData, Credentials, Role } from "../types"

const Login: FC = () => {
  const { role } = useParams<{ role: Role }>()
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  // If not expired - go to respective pages
  useEffect(() => {
    // if role is undefined go back to home page
    if (!role) {
      notifications.show({
        title: "Invalid role",
        message:
          "Role is not defined (user or admin only), perhaps you have entered the wrong link",
      })
      navigate("/")
    }

    const currToken = localStorage.getItem("authToken")

    // if token already exists for role and valid, update global state and skip login
    if (
      currToken &&
      isCurrentRole(currToken, role!) &&
      !isTokenExpired(currToken)
    ) {
      setAuth({
        isLoggedIn: true,
        role: decodeToken(currToken).role,
        authToken: currToken,
        config: {
          headers: {
            Authorization: `Bearer ${currToken}`,
          },
        },
      })

      notifications.show({
        title: "Welcome User!",
        message: "Looks like you are already logged in, yay!",
      })
      navigate(`/${role}`)
    }
  }, [navigate, role, setAuth])

  const loginUser = async (creds: Credentials) => {
    try {
      await api.post<AuthResponseData>(`/${role}Login`, creds)
      // const newToken = res.data.authToken
      const newToken =
        "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJleHAiOiIyMDIzLTA5LTEyVDE3OjQ4OjQ4Ljg0M1oiLCJpYXQiOiIyMDIzLTA5LTEyVDE3OjQ4OjQ4Ljg0M1oiLCJ1c2VybmFtZSI6ImswOTExMSJ9.F3HMhGYule_DWrefCw5RvULbDws1zMtYbCKCsIkTJDY"
      localStorage.setItem("authToken", newToken)

      setAuth({
        isLoggedIn: true,
        role: decodeToken(newToken).role,
        authToken: newToken,
        config: {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        },
      })

      // Redirect to dashboard page on successful login
      notifications.show({
        title: "Welcome User!",
        message: "You have logged in successfully!",
      })
      navigate(`/${role}`)
    } catch (e) {
      // if error set back to initial state and revert back to home page
      setAuth(initialAuthState)
      navigate("/")
    }
  }

  const form = useForm<Credentials>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: yupResolver(loginSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  return (
    <Container miw={250}>
      <Text component="h1" size={40} color="lime" align="center">
        Login as {role}.
      </Text>
      <form onSubmit={form.onSubmit((creds) => loginUser(creds))}>
        <Stack spacing={"sm"}>
          <TextInput
            {...form.getInputProps("username")}
            label="Username"
            placeholder="E.g. saikun123"
            withAsterisk
          />
          <PasswordInput
            {...form.getInputProps("password")}
            label="Password"
            withAsterisk
          />
        </Stack>
        <Button size="md" type="submit" radius={"sm"} my="lg">
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default Login
