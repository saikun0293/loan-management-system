import { Button, Container, Text } from "@mantine/core"
import { FC } from "react"
import { Link } from "react-router-dom"

const Home: FC = () => {
  return (
    <Container size={700}>
      <Text component="p" color="dimmed">
        Get super discount loan cards from a wide range of products from
        furniture to crockery! on our Loan Management system platform!
      </Text>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Text size="xs">
        Note: To register yourself, kindly contact administrator
      </Text>
    </Container>
  )
}

export default Home
