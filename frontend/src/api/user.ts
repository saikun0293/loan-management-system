import { User } from "../context/UserProvider"
import { Credentials } from "../routes/Login"
import { AxiosResponse, InternalAxiosRequestConfig } from "axios"

export const loginUser = async (creds: Credentials): Promise<User> => {
  const user: User = {
    user_id: "u10003",
    role: "USER",
    emp_name: "2121925",
    dob: "2001-08-06",
    gender: "male",
    designation: "Program Associate",
    dept: "",
  }
  return user
}
