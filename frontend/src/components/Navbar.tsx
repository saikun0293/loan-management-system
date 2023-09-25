import { Button, Center, Flex, Stack, Text, Title } from "@mantine/core"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

const Navbar = () => {
  const {
    auth: { isLoggedIn, user },
    onLogout,
  } = useAuth()

  return (
    <Flex p={30} align="center" justify="space-between" bg="blue">
      <Title order={1} color="white">
        Loan Management System
      </Title>
      <Center>
        {isLoggedIn ? (
          <Stack>
            <Text size="xs" color="white">
              Logged in as {user.name}
            </Text>
            <Button variant="light" color="blue" onClick={onLogout}>
              Logout
            </Button>
          </Stack>
        ) : (
          <Link to="/login">
            <Button variant="light" color="blue">
              Login
            </Button>
          </Link>
        )}
      </Center>
    </Flex>
  )
}

export default Navbar
