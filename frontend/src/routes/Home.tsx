import { Button, Container, Group, Text } from "@mantine/core"
import { FC } from "react"
import { Link } from "react-router-dom"

const Home: FC = () => {
  return (
    <Container size={700}>
      <Text component="p" color="dimmed">
        Get super discount loan cards from a wide range of products from
        furniture to crockery! on our Loan Management system platform!
      </Text>
      <Group>
        <Link to="/login/user">
          <Button>Login as User</Button>
        </Link>
        <Link to="/login/admin">
          <Button>Login as Admin</Button>
        </Link>
      </Group>
    </Container>
  )
}

export default Home
