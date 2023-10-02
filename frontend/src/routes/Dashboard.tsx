import { Button, Container, Flex, Title } from "@mantine/core"
import { FC } from "react"
import { Link } from "react-router-dom"

export interface NavLink {
  displayName: string
  name: string
  to: string
}

interface DashboardProps {
  name: string
  navLinks: NavLink[]
}

const Dashboard: FC<DashboardProps> = ({ name, navLinks }) => {
  return (
    <Container>
      <Title order={1} color="blue" align="center" my={40}>
        {name}
      </Title>
      <Flex justify={"space-around"}>
        {navLinks.map(({ displayName, name, to }, index) => (
          <Link key={index} to={to}>
            <Button id={name} fw={400}>
              {displayName}
            </Button>
          </Link>
        ))}
      </Flex>
    </Container>
  )
}

export default Dashboard
