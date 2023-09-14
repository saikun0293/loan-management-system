import { Button, Container, Grid, Select, Text, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm, yupResolver } from "@mantine/form"
import { userFormSchema } from "../api/schema"
import { generateId } from "../api/utils"
import { User } from "../types"

interface UserFormProps {
  designations: string[]
  departments: string[]
  initialUserState: User
  onSubmit: (user: User) => void
}

const UserForm: React.FC<UserFormProps> = ({
  designations,
  departments,
  initialUserState,
  onSubmit,
}) => {
  const form = useForm<User>({
    initialValues: initialUserState,
    validate: yupResolver(userFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  return (
    <Container>
      <Text component="h2">Create Customer</Text>
      <form
        onSubmit={form.onSubmit((user) => {
          onSubmit(user)
          form.setValues({
            ...initialUserState,
            employeeId: generateId("K", 7),
          })
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
          <Grid.Col span={6}>
            <Select
              label="Designation"
              data={designations.map((d) => ({
                label: d,
                value: d.toLowerCase(),
              }))}
              withAsterisk
              {...form.getInputProps("designation")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              {...form.getInputProps("name")}
              label="Name"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              label="Date of Birth"
              withAsterisk
              maxDate={new Date()}
              {...form.getInputProps("dob")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Department"
              data={departments.map((d) => ({
                label: d,
                value: d.toLowerCase(),
              }))}
              withAsterisk
              {...form.getInputProps("dept")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput
              label="Date of Joining"
              withAsterisk
              maxDate={new Date()}
              {...form.getInputProps("doj")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              label="Gender"
              data={["Male", "Female", "Prefer not to say"].map((d) => ({
                label: d,
                value: d,
              }))}
              withAsterisk
              {...form.getInputProps("gender")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              withAsterisk
              label="Password"
              {...form.getInputProps("password")}
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

export default UserForm
