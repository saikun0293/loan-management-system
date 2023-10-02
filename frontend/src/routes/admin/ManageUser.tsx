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
import UserForm from "../../components/UserForm"
import { User } from "../../types"

const initialUserState: User = {
  employeeId: generateId("K", 7),
  name: "",
  designation: "",
  dob: new Date(),
  doj: new Date(),
  gender: "",
  dept: "",
  password: "",
}

const ManageUser: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [designations, setDesignations] = useState<string[]>([])
  const [departments, setDepartments] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [editUser, setEditUser] = useState(initialUserState)

  const fetchAllUsers = async () => {
    try {
      const resUsers = await api.get<User[]>("/showAllEmployee")
      setUsers(
        resUsers.data.map((d) => ({
          ...d,
          dob: new Date(d.dob),
          doj: new Date(d.doj),
        }))
      )
    } catch (e) {
      console.log("Error while fetching loans", e)
    }
  }

  useEffect(() => {
    const fetchInputData = async () => {
      try {
        // const resDes = await api.get("/getDesignations")
        // const resDepts = await api.get("/getDepartments")
        await fetchAllUsers()

        // TODO: Change later
        setDesignations(["Manager", "Executive", "Sr.Executive", "Clerk"])
        setDepartments(["Finance", "HR", "Sales"])
      } catch (e) {
        console.log("Error while fetching data for managing users", e)
      }
    }
    fetchInputData()
  }, [])

  const createUser = async (user: User) => {
    try {
      await api.post("/addEmployee", user)
      notifications.show({
        title: `User created`,
        message: "User has been created successfully",
      })
      fetchAllUsers()
    } catch (e) {
      console.log("Error while creating user", e)
    }
  }

  const updateUser = async (user: User) => {
    try {
      const res = await api.post("/updateEmployee", user)
      notifications.show({
        title: `${res.statusText}`,
        message: res.data,
      })
      setModalOpen(false)
      fetchAllUsers()
    } catch (e) {
      console.log("Error while updating user with id ", user.employeeId, e)
    }
  }

  const deleteUser = async (empId: string) => {
    try {
      const res = await api.delete(`/deleteEmployee/${empId}`)
      notifications.show({
        title: `${res.statusText}`,
        message: res.data,
      })
      fetchAllUsers()
    } catch (e) {
      console.log("Error while updating user with id ", empId, e)
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
              setEditUser(user)
              setModalOpen(true)
            }}
          >
            Edit
          </Button>
          <Button
            variant="light"
            color="red"
            onClick={() => deleteUser(user.employeeId)}
          >
            Delete
          </Button>
        </Button.Group>
      </td>
    </tr>
  ))

  return (
    <Tabs defaultValue={"createUser"} my={15}>
      <Tabs.List>
        <Tabs.Tab value="createUser">Create User Data</Tabs.Tab>
        <Tabs.Tab value="manageUsers">Manage Users</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="createUser">
        <UserForm
          designations={designations}
          departments={departments}
          onSubmit={createUser}
          initialUserState={initialUserState}
        />
      </Tabs.Panel>
      <Tabs.Panel value="manageUsers">
        <Container fluid>
          <Flex justify="space-between" align="center">
            <Title order={2} color="blue" my={20}>
              Employees Registered
            </Title>
            <Button variant="light" onClick={fetchAllUsers}>
              Refresh
            </Button>
          </Flex>
          <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
            <UserForm
              type="Edit"
              designations={designations}
              departments={departments}
              onSubmit={updateUser}
              initialUserState={editUser}
            />
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