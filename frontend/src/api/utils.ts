import { Role } from "../types"

// LOGIN UTILS
export const decodeToken = (token: string) =>
  JSON.parse(atob(token.split(".")[1]))

export const isTokenExpired = (token: string) => {
  const exp = decodeToken(token).exp
  // getTime() returns value in ms
  const present = Math.floor(new Date().getTime() / 1000)
  return present >= exp
}

export const isCurrentRole = (token: string, role: Role) => {
  const roleFromToken = decodeToken(token).role
  return role === roleFromToken
}

// FORM UTILS
export const generateUserId = (length: number) => {
  let uid = "K"
  for (let i = 1; i < length; i++)
    uid += Math.floor(Math.random() * 10).toString()
  return uid
}

export const ageInYears = (fromDate: Date) => {
  const today = new Date()
  let age = today.getFullYear() - fromDate.getFullYear()
  const monthDiff = today.getMonth() - fromDate.getMonth()
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < fromDate.getDate())
  )
    age--
  return age
}
