import { Center, Container, MantineProvider, Text } from "@mantine/core"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
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
    </MantineProvider>
  )
}

export default App
