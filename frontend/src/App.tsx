import {
  Button,
  Center,
  Container,
  Flex,
  MantineProvider,
  Navbar,
  Text
} from "@mantine/core"
import { Link, Outlet } from "react-router-dom"
import { Notifications } from "@mantine/notifications"
import AuthProvider, { useAuth } from "./context/AuthProvider"

const App = () => {
  const {
    auth: { isLoggedIn, user },
    onLogout
  } = useAuth()

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <Notifications position="top-right" autoClose={8000} />
        <Flex>
          <Text
            component="h2"
            variant="gradient"
            gradient={{ from: "blue", to: "purple" }}
            fz={45}
            fw={700}
            align="center"
          >
            Loan Management System
          </Text>
          <Center>
            {isLoggedIn ? (
              <>
                <Text size="sm">Logged in as {user.name}</Text>
                <Button onClick={onLogout}>Logout</Button>
              </>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}
          </Center>
          :
        </Flex>
        <Center>
          <Container>
            <Outlet />
          </Container>
        </Center>
      </AuthProvider>
    </MantineProvider>
  )
}

export default App
