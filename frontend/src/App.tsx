import { Center, Container, MantineProvider, Text } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { Notifications } from "@mantine/notifications"
import AuthProvider from "./context/AuthProvider"

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <Notifications position="top-right" autoClose={2000} />
        <Text
          component="h1"
          variant="gradient"
          gradient={{ from: "blue", to: "purple" }}
          fz={45}
          fw={700}
          align="center"
        >
          Loan Management System
        </Text>
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
