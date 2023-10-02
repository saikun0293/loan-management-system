import {
  Container,
  Flex,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core"
import { useEffect, useState } from "react"
import api from "../../api/axios"
import { useAuth } from "../../context/AuthProvider"
import { Loan } from "../../types"

const LoanCardsAvailed = () => {
  const {
    auth: { user },
  } = useAuth()
  const [cardsAvailed, setCardsAvailed] = useState<Loan[]>([])

  useEffect(() => {
    const fetchAllCardsAvailed = async () => {
      try {
        const res = await api.get<Loan[]>(
          `/employee/getAllAppliedLoans?empId=${user.empId}`
        )
        setCardsAvailed(res.data.filter((d) => d != null))
      } catch (e) {
        console.log("Error while fetching loans", e)
      }
    }
    fetchAllCardsAvailed()
  }, [])

  const rows = cardsAvailed.map((card) => (
    <tr key={card.loanId}>
      <td>{card.loanId}</td>
      <td>{card.loanType}</td>
      <td>{card.duration}</td>
    </tr>
  ))

  const userData: { [key: string]: string } = {
    "Employee Id": user.empId,
    Designation: user.designation ?? "",
    Department: user.dept ?? "",
  }

  return (
    <Stack>
      <Title align="center" order={1} color="blue" my={20}>
        Loan Cards Availed
      </Title>
      <Flex justify="space-around" gap={20}>
        {Object.keys(userData).map((data, index) => (
          <Paper key={index} withBorder py={10} px={30}>
            <Text component="p" color="dimmed" size="xs">
              {data}
            </Text>
            <Title order={3} color="blue">
              {userData[data]}
            </Title>
          </Paper>
        ))}
      </Flex>
      <Container>
        <Table horizontalSpacing={"xl"} mt={30}>
          <thead>
            <tr>
              <th>Loan Id</th>
              <th>Loan Type</th>
              <th>Duration (in Years)</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </Stack>
  )
}

export default LoanCardsAvailed
