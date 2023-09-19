import { Container, Grid, Table, Text } from "@mantine/core"
import { Loan } from "../../types"
import { useState, useEffect } from "react"
import api from "../../api/axios"

interface CardAvailed extends Loan {
  issueDate: Date
}

const LoanCardsAvailed = () => {
  const [cardsAvailed, setCardsAvailed] = useState<CardAvailed[]>([])

  useEffect(() => {
    const fetchAllCardsAvailed = async () => {
      try {
        const res = await api.get<CardAvailed[]>("/employee/getAllLoanCardsAvailed")
        setCardsAvailed(res.data)
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
      <td>{card.issueDate.toLocaleDateString("en-US")}</td>
    </tr>
  ))

  return (
    <Container>
      <Text align="center">Loan Cards Availed</Text>
      <Grid>
        <Grid.Col span={4}>Employee Id: E10001</Grid.Col>
        <Grid.Col span={4}>Designation: Manager</Grid.Col>
        <Grid.Col span={4}>Department: Marketing</Grid.Col>
      </Grid>
      <Table horizontalSpacing={"md"}>
        <thead>
          <tr>
            <th>Loan Id</th>
            <th>Loan Type</th>
            <th>Duration</th>
            <th>Card Issue Date</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  )
}

export default LoanCardsAvailed
