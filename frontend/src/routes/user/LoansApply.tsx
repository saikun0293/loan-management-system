import {
  Button,
  Container,
  Flex,
  Grid,
  Select,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { FC, useEffect, useState } from "react"
import api from "../../api/axios"
import { availableItems } from "../../api/db"
import { loanApplicationSchema } from "../../api/schema"
import { useAuth } from "../../context/AuthProvider"
import { Item } from "../../types"

interface LoanApplication {
  employeeId: string
  itemId: string
}

const initialItemState: Item = {
  itemId: "",
  name: "",
  category: "",
  make: "",
  issueStatus: false,
  value: 0,
}

const initialLoanApplication: LoanApplication = {
  employeeId: "",
  itemId: "",
}

const LoansApply: FC = () => {
  const [items, setItems] = useState<Item[]>([])
  const [showItems, setShowItems] = useState<Item[]>([])

  // filter field options
  const [categories, setCategories] = useState<string[]>([])
  const [makes, setMakes] = useState<string[]>([])

  // selected filter fields
  const [category, setCategory] = useState("")
  const [make, setMake] = useState("")
  const [selectedItem, setSelectedItem] = useState<Item>(initialItemState)

  const {
    auth: {
      user: { empId },
    },
  } = useAuth()

  const form = useForm<LoanApplication>({
    initialValues: initialLoanApplication,
    validate: yupResolver(loanApplicationSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  // set empId from global context
  useEffect(() => {
    form.setFieldValue("employeeId", empId)
  }, [empId])

  // if category or make changes in both cases
  useEffect(() => {
    form.setFieldValue("itemId", "")
    setSelectedItem(initialItemState)
  }, [category, make])

  // if category changes
  useEffect(() => {
    setMake("")
    const makeData = availableItems[category] ?? []
    setMakes(makeData)
  }, [category])

  // change items to display if category or make changes
  useEffect(() => {
    const filteredItems = items
      .filter((item) => !item.category || item.category === category)
      .filter((item) => !item.make || item.make === make)
    setShowItems(filteredItems)
  }, [items, category, make])

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await api.get<Item[]>("/employee/getAllAvailableItems")
        setItems(res.data ?? [])
      } catch (e) {
        console.log("Error while fetching items", e)
      }
    }

    const itemCategories = Object.keys(availableItems)
    setCategories(itemCategories)
    fetchAllItems()
  }, [])

  const applyForLoan = async (loanApp: LoanApplication) => {
    try {
      await api.post(
        `/employee/applyForLoan?empId=${loanApp.employeeId}&itemId=${loanApp.itemId}`,
        {}
      )
      notifications.show({
        title: `Transaction successful`,
        message: "Loan has been applied for item successfully",
      })
    } catch (e) {
      console.log("Error while applying for loan", e)
    }
  }

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <Title order={2} color="blue" my={20}>
          Apply for Loan
        </Title>
        <Button
          variant="light"
          onClick={() => {
            setCategory("")
            setMake("")
            setSelectedItem(initialItemState)
          }}
        >
          Refresh
        </Button>
      </Flex>
      <form
        onSubmit={form.onSubmit((loanApp) => {
          applyForLoan(loanApp)
          setCategory("")
          setMake("")
          form.reset()
        })}
      >
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Employee Id"
              disabled
              {...form.getInputProps("employeeId")}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={6}>
            <Select
              label="Item Category"
              data={categories.map((d) => ({
                label: d,
                value: d,
              }))}
              value={category}
              onChange={(value) => setCategory(value ? value : "")}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Item Make"
              data={makes.map((d) => ({
                label: d,
                value: d,
              }))}
              disabled={!category}
              value={make}
              onChange={(value) => setMake(value ? value : "")}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              {...form.getInputProps("itemId")}
              label="Select Item"
              placeholder={
                showItems.length > 0
                  ? "Select an item from the list"
                  : "No items found with given category"
              }
              maxDropdownHeight={250}
              data={showItems.map((d) => ({
                label: d.name,
                value: d.itemId,
                description: `Price: ${d.value}`,
              }))}
              withAsterisk
              onChange={(value) => {
                form.setFieldValue("itemId", value!)
                const chosenItem = showItems.filter(
                  (item) => item.itemId === value
                )[0]
                setCategory(chosenItem.category)
                setMake(chosenItem.make)
                setSelectedItem(chosenItem)
              }}
            />
          </Grid.Col>
          {selectedItem.value !== 0 && (
            <Grid.Col span={12}>
              <TextInput
                withAsterisk
                label="Item Price"
                disabled
                value={selectedItem.value}
              />
            </Grid.Col>
          )}
        </Grid>
        <Button.Group my={20}>
          <Button type="submit">Apply</Button>
        </Button.Group>
      </form>
    </Container>
  )
}

export default LoansApply
