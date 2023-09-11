import { Center, Container, MantineProvider, Text } from "@mantine/core"
import { Outlet } from "react-router-dom"
import UserProvider from "./context/UserProvider"

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserProvider>
        <Text
          component="h1"
          variant="gradient"
          gradient={{ from: "blue", to: "purple" }}
          fz={50}
          fw={700}
          h="10vh"
          align="center"
        >
          Loan Management System
        </Text>
        <Center>
          <Container>
            <Outlet />
          </Container>
        </Center>
      </UserProvider>
    </MantineProvider>
  )
}

export default App
