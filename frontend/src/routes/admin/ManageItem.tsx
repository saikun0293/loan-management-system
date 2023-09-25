import {
  Button,
  Container,
  Flex,
  Modal,
  Table,
  Tabs,
  Title,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useEffect, useState } from "react"
import api from "../../api/axios"
import { generateId } from "../../api/utils"
import ItemForm from "../../components/ItemForm"
import { Item } from "../../types"

const initialItemState: Item = {
  itemId: generateId("I", 7),
  name: "",
  category: "",
  make: "",
  issueStatus: false,
  value: 1,
}

const ManageItem: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [itemMakes, setItemMakes] = useState<string[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [editItem, setEditItem] = useState(initialItemState)

  const fetchAllItems = async () => {
    try {
      const res = await api.get<Item[]>("/showAllItems")
      setItems(res.data)
    } catch (e) {
      console.log("Error while fetching items", e)
    }
  }

  useEffect(() => {
    const fetchInputData = async () => {
      try {
        // const resDes = await api.get("/getDesignations")
        // const resDepts = await api.get("/getDepartments")
        await fetchAllItems()

        // TODO: Change later
        setCategories([
          "Furniture",
          "Crockery",
          "Stationary",
          "Housing",
          "Agro",
        ])
        setItemMakes(["Wooden", "Glass", "Metal"])
      } catch (e) {
        console.log("Error while fetching data for managing items", e)
      }
    }
    fetchInputData()
  }, [])

  const createItem = async (item: Item) => {
    try {
      const res = await api.post("/createItem", item)
      notifications.show({
        title: `${res.statusText}`,
        message: res.data,
      })
      fetchAllItems()
    } catch (e) {
      console.log("Error while creating item", e)
    }
  }

  const updateItem = async (item: Item) => {
    try {
      const res = await api.post("/updateItem", item)
      notifications.show({
        title: `${res.statusText}`,
        message: res.data,
      })
      setModalOpen(false)
      fetchAllItems()
    } catch (e) {
      console.log("Error while updating item with id ", item.itemId, e)
    }
  }

  const deleteItem = async (itemId: string) => {
    try {
      const res = await api.delete(`/deleteItem/${itemId}`)
      notifications.show({
        title: `${res.statusText}`,
        message: res.data,
      })
      fetchAllItems()
    } catch (e) {
      console.log("Error while updating item with id ", itemId, e)
    }
  }

  const rows = items.map((item) => (
    <tr key={item.itemId}>
      <td>{item.itemId}</td>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>{item.make}</td>
      <td>{item.issueStatus ? "Y" : "N"}</td>
      <td>{item.value}</td>
      <td>
        <Button.Group>
          <Button
            onClick={() => {
              setEditItem(item)
              setModalOpen(true)
            }}
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            onClick={() => deleteItem(item.itemId)}
          >
            Delete
          </Button>
        </Button.Group>
      </td>
    </tr>
  ))

  return (
    <Tabs defaultValue={"createitem"} my={15}>
      <Tabs.List>
        <Tabs.Tab value="createitem">Create item Data</Tabs.Tab>
        <Tabs.Tab value="manageitems">Manage items</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="createitem">
        <ItemForm
          itemCategories={categories}
          itemMakes={itemMakes}
          onSubmit={createItem}
          initialItemState={initialItemState}
        />
      </Tabs.Panel>
      <Tabs.Panel value="manageitems">
        <Container>
          <Flex justify="space-between" align="center">
            <Title order={2} color="blue" my={20}>
              Items Registered
            </Title>
            <Button variant="light" onClick={fetchAllItems}>
              Refresh
            </Button>
          </Flex>
          <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
            <ItemForm
              type="Edit"
              itemCategories={categories}
              itemMakes={itemMakes}
              onSubmit={updateItem}
              initialItemState={editItem}
            />
          </Modal>
          <Table horizontalSpacing={"md"}>
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Item Category</th>
                <th>Item Make</th>
                <th>Issue Status</th>
                <th>Item Valuation</th>
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

export default ManageItem
