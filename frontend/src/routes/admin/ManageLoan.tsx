import {
  Button,
  Container,
  Flex,
  Modal,
  Table,
  Tabs,
  Text,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useEffect, useState } from "react"
import api from "../../api/axios"
import { generateId } from "../../api/utils"
import LoanForm from "../../components/LoanForm"
import { Loan } from "../../types"

const initialLoanState: Loan = {
  loanId: generateId("L", 7),
  loanType: "",
  duration: 1,
}

const ManageLoan: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [loanTypes, setLoanTypes] = useState<string[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const [editLoan, setEditLoan] = useState(initialLoanState)

  const fetchAllLoans = async () => {
    try {
      const res = await api.get<Loan[]>("/showAllLoans")
      setLoans(res.data)
    } catch (e) {
      console.log("Error while fetching loans", e)
    }
  }

  useEffect(() => {
    const fetchInputData = async () => {
      try {
        // const resDes = await api.get("/getAllLoanTypes")
        await fetchAllLoans()

        // TODO: Change later
        setLoanTypes(["Furniture", "Crockery", "Stationary", "Housing", "Agro"])
      } catch (e) {
        console.log("Error while fetching data for managing loans", e)
      }
    }
    fetchInputData()
  }, [])

  const createLoan = async (loan: Loan) => {
    try {
      const res = await api.post("/addLoan", loan)
      notifications.show({
        title: `${res.statusText}`,
        message: "Loan card has been created successfully",
      })
    } catch (e) {
      console.log("Error while creating loan", e)
    }
  }

  const updateLoan = async (loan: Loan) => {
    try {
      const res = await api.post("/updateLoan", loan)
      notifications.show({
        title: `${res.statusText}`,
        message: "Loan card has been updated successfully",
      })
    } catch (e) {
      console.log("Error while updating user with id ", loan.loanId, e)
    }
  }

  const rows = loans.map((loan) => (
    <tr key={loan.loanId}>
      <td>{loan.loanId}</td>
      <td>{loan.loanType}</td>
      <td>{loan.duration}</td>
      <td>
        <Button.Group>
          <Button
            onClick={() => {
              setEditLoan(loan)
              setModalOpen(true)
            }}
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            onClick={() => console.log(`delete User - ${loan.loanId}`)}
          >
            Delete
          </Button>
        </Button.Group>
      </td>
    </tr>
  ))

  return (
    <Tabs defaultValue={"createLoan"}>
      <Tabs.List>
        <Tabs.Tab value="createLoan">Create Loan Data</Tabs.Tab>
        <Tabs.Tab value="manageLoans">Manage Loans</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="createLoan">
        <LoanForm
          loanTypes={loanTypes}
          onSubmit={createLoan}
          initialLoanState={initialLoanState}
        />
      </Tabs.Panel>
      <Tabs.Panel value="manageLoans">
        <Container>
          <Flex justify="space-between" align="center">
            <Text component="h2">Available Loan Cards</Text>
            <Button variant="light" onClick={fetchAllLoans}>
              Refresh
            </Button>
          </Flex>
          <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
            <LoanForm
              loanTypes={loanTypes}
              onSubmit={updateLoan}
              initialLoanState={editLoan}
            />
          </Modal>
          <Table horizontalSpacing={"md"}>
            <thead>
              <tr>
                <th>Loan Id</th>
                <th>Loan Type</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </Tabs.Panel>
    </Tabs>
  )
}

export default ManageLoan
