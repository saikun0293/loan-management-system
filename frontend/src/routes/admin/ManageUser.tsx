import {
  Button,
  Container,
  Grid,
  Modal,
  Select,
  Tabs,
  Text,
  TextInput
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { isAxiosError } from "axios"
import { useForm, yupResolver } from "@mantine/form"
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

const initialUserState: User = {
  userId: generateUserId(5),
  name: "",
  designation: "",
  dob: "",
  doj: "",
  gender: "Male",
  dept: "Finance",
  password: ""
}

const userFormSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Name can only contain alphabets")
    .required("Please enter your name"),
  designation: Yup.string().required("Designation cannot be empty"),
  dob: Yup.date().required("Please select your date of birth"),
  doj: Yup.date().required("Please select your date of joining"),
  gender: Yup.string().required("Please select your gender"),
  dept: Yup.string().required("Department cannot be empty"),
  password: Yup.string()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    )
    .required("Please enter your password")
})

const ManageUser: React.FC = () => {
  // TODO: Fetch departments and designations from backend
  const [modalOpen, setModalOpen] = useState(false)
  const [currUser, setCurrUser] = useState<User>(initialUserState)
  const {
    auth: { authToken }
  } = useAuth()
  const [designations, setDesignations] = useState<string[]>([])
  const [departments, setDepartments] = useState<string[]>([])

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

        // TODO: Change later
        setDesignations(["Manager", "Executive", "Sr.Executive", "Clerk"])
        setDepartments(["Finance", "HR", "Sales"])
      } catch (e) {
        if (isAxiosError(e)) {
          notifications.show({
            title: "Unable to fetch input data",
            message: e.response
              ? e.response.data
              : "There seems to be an unknown issue. Contact administrator"
          })
        }
      }
    }
    fetchInputData()
  }, [authToken])

  const form = useForm<User>({
    initialValues: initialUserState,
    validate: yupResolver(userFormSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true
  })

  return (
    <Tabs defaultValue={"createUser"}>
      <Tabs.List>
        <Tabs.Tab
          value="createUser"
          onClick={() =>
            setCurrUser((prev) => ({ ...prev, userId: generateUserId(5) }))
          }
        >
          Create User Data
        </Tabs.Tab>
        <Tabs.Tab value="manageUsers">Manage Users</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="createUser">
        <Container>
          <Text component="h2">Create Customer</Text>

          <form onSubmit={form.onSubmit((user) => console.log(user))}>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  {...form.getInputProps("userId")}
                  label="Employee Id"
                  disabled
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput {...form.getInputProps("name")} label="Name" />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="Department"
                  data={departments.map((d) => ({
                    label: d,
                    value: d.toLowerCase()
                  }))}
                  {...form.getInputProps("dept")}
                />
              </Grid.Col>
            </Grid>
          </form>
        </Container>
      </Tabs.Panel>
      <Tabs.Panel value="manageUsers">
        <Container>
          <Text component="h2">Manage users table here</Text>
          <Button
            onClick={() => {
              // Clear previous entries before
              setModalOpen(true)
            }}
          >
            Open Modal
          </Button>
        </Container>
      </Tabs.Panel>
    </Tabs>
  )
}

export default ManageUser
