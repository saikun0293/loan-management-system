import { Button, Container, Group, Text } from "@mantine/core"
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
      <Text
        component="h1"
        size={40}
        variant="gradient"
        align="center"
        gradient={{ from: "blue", to: "purple" }}
      >
        {name}
      </Text>
      <Group spacing={"lg"}>
        {navLinks.map(({ displayName, name, to }, index) => (
          <Link to={to}>
            <Button key={index} id={name}>
              {displayName}
            </Button>
          </Link>
        ))}
      </Group>
    </Container>
  )
}

export default Dashboard
