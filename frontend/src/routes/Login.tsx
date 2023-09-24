import {
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { FC } from "react"
import { loginSchema } from "../api/schema"
import { useAuth } from "../context/AuthProvider"
import { Credentials } from "../types"

const Login: FC = () => {
  const { onLogin } = useAuth()

  const form = useForm<Credentials>({
    initialValues: {
      username: "",
      password: ""
    },
    validate: yupResolver(loginSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true
  })

  return (
    <Container miw={250}>
      <Text component="h1" size={40} color="lime" align="center">
        Login
      </Text>
      <form onSubmit={form.onSubmit(onLogin)}>
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
