import { Flex, Paper, Stack, Table, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import api from "../../api/axios"
import { useAuth } from "../../context/AuthProvider"
import { Item } from "../../types"

interface PurchaseItem extends Item {
  transactionId: string
}

const ItemsPurchased = () => {
  const [itemsPurchased, setItemsPurchased] = useState<PurchaseItem[]>([])
  const {
    auth: { user },
  } = useAuth()

  useEffect(() => {
    const fetchAllCardsAvailed = async () => {
      try {
        const res = await api.get<PurchaseItem[]>(
          `/employee/getAllAppliedItems?empId=${user.empId}`
        )
        setItemsPurchased(res.data)
      } catch (e) {
        console.log("Error while fetching items purchased", e)
      }
    }
    fetchAllCardsAvailed()
  }, [])

  const rows = itemsPurchased.map((item) => (
    <tr key={item.transactionId}>
      <td>{item.transactionId}</td>
      <td>{item.itemId}</td>
      <td>{item.name}</td>
      <td>{item.make}</td>
      <td>{item.category}</td>
      <td>{item.value}</td>
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
        Items Purchased
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
      <Table horizontalSpacing={"md"}>
        <thead>
          <tr>
            <th>Issue Id</th>
            <th>Item Id</th>
            <th>Item Name</th>
            <th>Item Make</th>
            <th>Item Category</th>
            <th>Item Valuation</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Stack>
  )
}

export default ItemsPurchased
