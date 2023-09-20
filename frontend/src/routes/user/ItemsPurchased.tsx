import { Container, Grid, Table, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import api from "../../api/axios"
import { Item } from "../../types"

interface PurchaseItem extends Item {
  transactionId: string
}

const ItemsPurchased = () => {
  const [itemsPurchased, setItemsPurchased] = useState<PurchaseItem[]>([])
  const empId = "k310764"

  useEffect(() => {
    const fetchAllCardsAvailed = async () => {
      try {
        const res = await api.get<PurchaseItem[]>(
          `/employee/getAllAppliedItems?empId=${empId}`
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

  return (
    <Container>
      <Text align="center">Items Purchased</Text>
      <Grid>
        <Grid.Col span={4}>Employee Id: E10001</Grid.Col>
        <Grid.Col span={4}>Designation: Manager</Grid.Col>
        <Grid.Col span={4}>Department: Marketing</Grid.Col>
      </Grid>
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
    </Container>
  )
}

export default ItemsPurchased
