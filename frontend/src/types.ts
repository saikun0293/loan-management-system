import { AxiosRequestConfig } from "axios"

export type Role = "user" | "admin" | "anonymous"

export interface Credentials {
  username: string
  password: string
}

export interface GlobalAuthState {
  authToken: string
  role: Role
  isLoggedIn: boolean
  config: AxiosRequestConfig
}

export interface User {
  employeeId: string
  name: string
  dob: Date
  doj: Date
  gender: string
  designation: string
  dept: string
  password: string
}

export interface Loan {
  loanId: string
  loanType: string
  duration: number
}

export interface Item {
  itemId: string
  category: string
  name: string
  value: number
  issueStatus: boolean
  make: string
}

// api responses
export interface AuthResponseData {
  authToken: string
}
