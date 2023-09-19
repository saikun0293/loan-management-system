import {
  Button,
  Container,
  Flex,
  Grid,
  Select,
  Text,
  TextInput,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { FC, useEffect, useState } from "react"
import api from "../../api/axios"
import { loanApplicationSchema } from "../../api/schema"
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
  employeeId: "k310764",
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

  const form = useForm<LoanApplication>({
    initialValues: initialLoanApplication,
    validate: yupResolver(loanApplicationSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  useEffect(() => {
    //reset item
    form.setFieldValue("itemId", "")
    const filteredItems = items
      .filter((item) => !item.category || item.category === category)
      .filter((item) => item.make === make)
    setShowItems(filteredItems)
  }, [items, category, make])

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const res = await api.get<Item[]>("/employee/getAllAvailableItems")
        const items = res.data
        setItems(items)
        const uniqueCategories = Array.from(
          new Set(items.map((item) => item.category))
        )
        const uniqueMakes = Array.from(new Set(items.map((item) => item.make)))
        setCategories(uniqueCategories)
        setMakes(uniqueMakes)
      } catch (e) {
        console.log("Error while fetching items", e)
      }
    }
    fetchAllItems()
  }, [])

  const applyForLoan = async (loanApp: LoanApplication) => {
    try {
      const res = await api.post(
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
        <Text component="h2">Apply for Loan</Text>
        <Button
          variant="light"
          onClick={() => {
            setCategory("")
            setMake("")
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
              value={make}
              onChange={(value) => setMake(value ? value : "")}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Select
              {...form.getInputProps("itemId")}
              label="Select Item"
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
                )
                if (chosenItem.length > 0) setSelectedItem(chosenItem[0])
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
          <Button type="submit">Submit</Button>
          <Button variant="light" type="button" onClick={form.reset}>
            Reset
          </Button>
        </Button.Group>
      </form>
    </Container>
  )
}

export default LoansApply
