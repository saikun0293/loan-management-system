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
  userId: string
  name: string
  dob: string
  doj: string
  gender: string
  designation: string
  dept: string
  password: string
}

// api responses
export interface AuthResponseData {
  authToken: string
}
