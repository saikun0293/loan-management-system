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
