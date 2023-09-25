import {
  Button,
  Center,
  Container,
  PasswordInput,
  Stack,
  TextInput,
  Title,
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
      password: "",
    },
    validate: yupResolver(loginSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  return (
    <Center>
      <Container miw={450} mt={40}>
        <Title order={1} color="blue" align="center" my={20}>
          Login
        </Title>
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
          <Center>
            <Button size="md" type="submit" radius={"sm"} my="lg">
              Login
            </Button>
          </Center>
        </form>
      </Container>
    </Center>
  )
}

export default Login
