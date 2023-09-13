import {
  Button,
  Container,
  Grid,
  Modal,
  Select,
  Table,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm, yupResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import api from "../../api/axios"
import { useAuth } from "../../context/AuthProvider"
import { User } from "../../types"

const generateUserId = (length: number) => {
  let uid = "K"
  for (let i = 1; i < length; i++)
    uid += Math.floor(Math.random() * 10).toString()
  return uid
}

const genders = ["Male", "Female", "Prefer not to say"]

const getInitialUserState = (): User => ({
  employeeId: generateUserId(7),
  name: "",
  designation: "",
  dob: new Date(),
  doj: new Date(),
  gender: "",
  dept: "",
  password: "",
})

const ageInYears = (fromDate: Date) => {
  const today = new Date()
  let age = today.getFullYear() - fromDate.getFullYear()
  const monthDiff = today.getMonth() - fromDate.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < fromDate.getDate())
  )
    age--
  return age
}

const userFormSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z ]+$/, "Name can only contain alphabets")
    .required("Please enter your name"),
  designation: Yup.string().required("Designation cannot be empty"),
  dob: Yup.date().test(
    "dob",
    "Should be at least 21 years of age",
    (value) => ageInYears(value!) >= 21
  ),
  doj: Yup.date().required("Date of joining cannot be empty"),
  gender: Yup.string().required("Please select your gender"),
  dept: Yup.string().nonNullable().required("Department cannot be empty"),
  password: Yup.string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Please enter your password"),
})

const ManageUser: React.FC = () => {
  // TODO: Fetch departments and designations from backend
  const [modalOpen, setModalOpen] = useState(false)
  const {
    auth: { authToken },
  } = useAuth()
  const [designations, setDesignations] = useState<string[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchInputData = async () => {
      try {
        // const resDes = await api.get("/getDesignations", {
        //   headers: {
        //     Authorization: `Bearer ${authToken}`
        //   }
        // })
        // const resDepts = await api.get("/getDepartments", {
        //   headers: {
        //     Authorization: `Bearer ${authToken}`
        //   }
        // })
        const resUsers = await api.get<User[]>("/showAllEmployees", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        setUsers(
          resUsers.data.map((d) => ({
            ...d,
            dob: new Date(d.dob),
            doj: new Date(d.doj),
          }))
        )

        // TODO: Change later
        setDesignations(["Manager", "Executive", "Sr.Executive", "Clerk"])
        setDepartments(["Finance", "HR", "Sales"])
      } catch (e) {
        if (isAxiosError(e)) {
          notifications.show({
            title: "Unable to fetch input data",
            message: e.response
              ? e.response.data
              : "There seems to be an unknown issue. Contact administrator",
          })
        }
      }
    }
    fetchInputData()
  }, [authToken])

  const form = useForm<User>({
    initialValues: getInitialUserState(),
    validate: yupResolver(userFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  })

  const createUser = async (user: User) => {
    try {
      api.post("/addEmployee", user, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      notifications.show({
        title: "Employee added successfully",
        message: "",
      })

      form.reset()
    } catch (e) {
      if (isAxiosError(e)) {
        notifications.show({
          title: "Add employee operation failed",
          message: e.response
            ? e.response.data
            : "There seems to be an unknown issue. Contact administrator",
        })
      }
    }
  }

  const updateUser = async (user: User) => {
    try {
      api.post("/updateEmployee", user, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })

      notifications.show({
        title: "Employee updated successfully",
        message: "",
      })

      form.reset()
    } catch (e) {
      if (isAxiosError(e)) {
        notifications.show({
          title: "Update employee operation failed",
          message: e.response
            ? e.response.data
            : "There seems to be an unknown issue. Contact administrator",
        })
      }
    }
  }

  const rows = users.map((user) => (
    <tr key={user.employeeId}>
      <td>{user.employeeId}</td>
      <td>{user.name}</td>
      <td>{user.designation}</td>
      <td>{user.dept}</td>
      <td>{user.gender}</td>
      <td>{user.dob.toLocaleDateString("en-US")}</td>
      <td>{user.doj.toLocaleDateString("en-US")}</td>
      <td>
        <Button.Group>
          <Button
            onClick={() => {
              setModalOpen(true)
              form.setValues(user)
            }}
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            onClick={() => console.log(`delete User - ${user.employeeId}`)}
          >
            Delete
          </Button>
        </Button.Group>
      </td>
    </tr>
  ))

  return (
    <Tabs
      defaultValue={"createUser"}
      onTabChange={() => form.setValues(getInitialUserState())}
    >
      <Tabs.List>
        <Tabs.Tab value="createUser">Create User Data</Tabs.Tab>
        <Tabs.Tab value="manageUsers">Manage Users</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="createUser">
        <Container>
          <Text component="h2">Create Customer</Text>
          <form onSubmit={form.onSubmit((user) => createUser(user))}>
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
                  data={genders.map((d) => ({
                    label: d,
                    value: d.toLowerCase(),
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
      </Tabs.Panel>
      <Tabs.Panel value="manageUsers">
        <Container>
          <Text component="h2">Manage users table here</Text>
          <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
            <form
              onSubmit={form.onSubmit((user) => {
                updateUser(user)
                setModalOpen(false)
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
                    data={genders.map((d) => ({
                      label: d,
                      value: d.toLowerCase(),
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
                <Button type="submit">Update Data</Button>
                <Button variant="light" type="button" onClick={form.reset}>
                  Reset
                </Button>
              </Button.Group>
            </form>
          </Modal>
          <Table horizontalSpacing={"md"}>
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Date of birth</th>
                <th>Date of joining</th>
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

export default ManageUser
