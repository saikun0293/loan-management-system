import { Button, Container, Text } from "@mantine/core"
import { FC } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

const Home: FC = () => {
  const {
    auth: {
      isLoggedIn,
      user: { role },
    },
  } = useAuth()

  return (
    <Container size={700}>
      <Text component="h2" color="blue" fw={700} size={30}>
        Heya!
      </Text>
      <Text component="p">
        Get super discount loan cards from a wide range of products from
        furniture to crockery! on our Loan Management system platform!
      </Text>
      {isLoggedIn ? (
        <Link to={`/${role.toLowerCase()}`}>
          <Button>Go to dashboard</Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      )}
      <Text size="xs" color="dimmed" mt={10}>
        Note: To register yourself, kindly contact administrator
      </Text>
    </Container>
  )
}

export default Home
