import { Role } from "../types"

const authenticate = (role: Role, authToken: string) => {
  localStorage.setItem(role + "AuthToken", authToken)
}

const checkTokenExpiry = (token: string): boolean => {
  return false
}

const isAuthenticated = (role: Role) => {
  const token = localStorage.getItem(role + "AuthToken")!
  const isTokenExpired = checkTokenExpiry(token)
}
