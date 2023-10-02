import {
  Button,
  Container,
  Grid,
  NumberInput,
  Select,
  Switch,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { useEffect, useState } from "react"
import { availableItems } from "../api/db"
import { itemFormSchema } from "../api/schema"
import { generateId } from "../api/utils"
import { Item } from "../types"

interface ItemFormProps {
  initialItemState: Item
  type?: "Create" | "Edit"
  onSubmit: (item: Item) => void
}

const ItemForm: React.FC<ItemFormProps> = ({
  initialItemState,
  onSubmit,
  type = "Create",
}) => {
  const [categories, setCategories] = useState<string[]>([])
  const [filteredMakes, setFitleredMakes] = useState<string[]>([])

  const form = useForm<Item>({
    initialValues: initialItemState,
    validate: yupResolver(itemFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  useEffect(() => {
    const itemCategories = Object.keys(availableItems)
    setCategories(itemCategories)
  }, [])

  useEffect(() => {
    form.setFieldValue("make", "")
    const makeData = availableItems[form.values.category] ?? []
    setFitleredMakes(makeData)
  }, [form.values.category])

  return (
    <Container>
      <Title order={2} color="blue" my={20}>
        {type} Item
      </Title>
      <form
        onSubmit={form.onSubmit((item) => {
          onSubmit(item)
          form.setValues({
            ...initialItemState,
            itemId: generateId("I", 7),
          })
        })}
      >
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Item Id"
              disabled
              {...form.getInputProps("itemId")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Item Category"
              data={categories.map((d) => ({
                label: d,
                value: d,
              }))}
              withAsterisk
              {...form.getInputProps("category")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Item Make"
              data={filteredMakes.map((d) => ({
                label: d,
                value: d,
              }))}
              disabled={!form.values.category}
              withAsterisk
              {...form.getInputProps("make")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              {...form.getInputProps("name")}
              label="Item Name"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label="Item Value (in Rs.)"
              {...form.getInputProps("value")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Switch
              checked={form.values.issueStatus}
              labelPosition="left"
              label="Issue Item?"
              {...form.getInputProps("issueStatus")}
            />
          </Grid.Col>
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

export default ItemForm
