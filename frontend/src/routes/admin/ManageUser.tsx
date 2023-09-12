import {
  Button,
  Container,
  Grid,
  Modal,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core"
import { useFormik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import { User } from "../../context/UserProvider"

interface UserData extends User {
  password: string
}

const generateUserId = (length: number) => {
  let uid = "K"
  for (let i = 1; i < length; i++)
    uid += Math.floor(Math.random() * 10).toString()
  return uid
}

const ManageUser: React.FC = () => {
  // TODO: Fetch departments and designations from backend
  const [modalOpen, setModalOpen] = useState(false)

  const [currUser, setCurrUser] = useState<UserData>({
    user_id: generateUserId(5),
    name: "",
    designation: "",
    dob: "",
    doj: "",
    gender: "Male",
    dept: "",
    password: "",
  })

  const formik = useFormik<User>({
    enableReinitialize: true,
    initialValues: {},
    validationSchema: Yup.object({
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
        .required("Please enter your password"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Created user", values)
      resetForm()
    },
  })

  return (
    <Tabs defaultValue={"createUser"}>
      <Tabs.List>
        <Tabs.Tab value="createUser">Create User Data</Tabs.Tab>
        <Tabs.Tab value="manageUsers">Manage Users</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="createUser">
        <Container>
          <Text component="h2">Create Customer</Text>
          <Modal
            opened={modalOpen}
            onClose={() => setModalOpen(false)}
            centered
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid>
                <Grid.Col span={6}>
                  <TextInput
                    {...formik.getFieldProps("user_id")}
                    label="Employee Id"
                    disabled
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    {...formik.getFieldProps("name")}
                    label="Name"
                    placeholder="E.g. sai teja"
                    error={
                      formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : false
                    }
                  />
                </Grid.Col>
              </Grid>
            </form>
          </Modal>
        </Container>
      </Tabs.Panel>
      <Tabs.Panel value="manageUsers">
        <Container>
          <Text component="h2">Manage users table here</Text>
          <Button
            onClick={() => {
              // Clear previous entries before
              formik.resetForm()
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
