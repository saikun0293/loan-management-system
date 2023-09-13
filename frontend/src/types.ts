export type Role = "user" | "admin" | "anonymous"

export interface Credentials {
  username: string
  password: string
}

export interface GlobalAuthState {
  authToken: string
  role: Role
  isLoggedIn: boolean
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

// api responses
export interface AuthResponseData {
  authToken: string
}
