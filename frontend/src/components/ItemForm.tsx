import {
  Button,
  Container,
  Grid,
  NumberInput,
  Select,
  Switch,
  Text,
  TextInput,
} from "@mantine/core"
import { useForm, yupResolver } from "@mantine/form"
import { itemFormSchema } from "../api/schema"
import { generateId } from "../api/utils"
import { Item } from "../types"

interface ItemFormProps {
  itemCategories: string[]
  itemMakes: string[]
  initialItemState: Item
  onSubmit: (item: Item) => void
}

const ItemForm: React.FC<ItemFormProps> = ({
  itemCategories,
  itemMakes,
  initialItemState,
  onSubmit,
}) => {
  const form = useForm<Item>({
    initialValues: initialItemState,
    validate: yupResolver(itemFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  return (
    <Container>
      <Text component="h2">Create Item</Text>
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
              data={itemCategories.map((d) => ({
                label: d,
                value: d,
              }))}
              withAsterisk
              {...form.getInputProps("category")}
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
          <Grid.Col span={6}>
            <Select
              label="Item Make"
              data={itemMakes.map((d) => ({
                label: d,
                value: d,
              }))}
              withAsterisk
              {...form.getInputProps("make")}
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
