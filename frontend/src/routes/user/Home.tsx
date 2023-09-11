import { Button, Center, Container, Group, Text } from "@mantine/core"
import { FC } from "react"
import { Link } from "react-router-dom"

const Home: FC = () => {
  return (
    <Center>
      <Container size={700}>
        <Text
          component="h1"
          variant="gradient"
          gradient={{ from: "blue", to: "purple" }}
          fz={50}
          fw={700}
        >
          Loan Management System
        </Text>
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
    </Center>
  )
}

export default Home
