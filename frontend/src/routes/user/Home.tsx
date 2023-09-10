import { Button, Center, Container, Group, Text } from "@mantine/core"
import { FC } from "react"

const Home: FC = () => {
  return (
    <Center>
      <Container size={700}>
        <Text
          component="h1"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan" }}
          inherit
        >
          Loan Management System
        </Text>
        <Text component="p" color="dimmed">
          Get super discount loan cards from a wide range of products from
          furniture to crockery! on our Loan Management system platform!
        </Text>
        <Group>
          <Button>Login as User</Button>
          <Button>Login as Admin</Button>
        </Group>
      </Container>
    </Center>
  )
}

export default Home
