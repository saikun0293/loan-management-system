import { isAxiosError } from "axios"
import { Credentials } from "../routes/Login"
import api from "./axios"
import { User } from "../context/UserProvider"

export const loginAdmin = async (creds: Credentials): Promise<User> => {
  // TODO: send user dtails from backend
  const userDetails: User = {
    user_id: "",
    role: "ANONYMOUS",
    emp_name: "",
    dob: "",
    gender: "",
    designation: "",
    dept: "",
  }
  await api.post("/adminLogin", {
    adminId: creds.username,
    password: creds.password,
  })
  userDetails.role = "ADMIN"

  return userDetails
}

export const getDesignations = async (): Promise<string[]> => {
  const designations = ["Manager", "Executive", "Sr.Executive", "Clerk"]
  // const res = api.get("/designations")
  return designations
}

export const getDepartments = async (): Promise<string[]> => {
  const departments = ["Finance", "HR", "Sales"]
  // const res = api.get("/designations")
  return departments
}
