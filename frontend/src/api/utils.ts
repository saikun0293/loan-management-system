import jwtDecode, { JwtPayload } from "jwt-decode"
import { AuthPayload } from "../types"

// LOGIN UTILS
type Token = AuthPayload & JwtPayload

// decode token to jwt object
const decodeToken = (token: string) => jwtDecode<Token>(token)

export const isTokenExpired = (token: string) => {
  try {
    const decodedToken = decodeToken(token)
    const tokenExpiry = decodedToken.exp
    if (!tokenExpiry)
      throw new Error("The user authenticated token does not have an expiry")

    const currTime = Math.floor(Date.now() / 1000) // to seconds
    return tokenExpiry < currTime
  } catch (e) {
    console.log(e)
  }
}

export const extractClaims = (token: string) => {
  const { empId, name, role, dept, designation } = decodeToken(token)
  const payload: AuthPayload = {
    empId,
    name,
    role
  }
  if (role === "EMPLOYEE") {
    payload.dept = dept
    payload.designation = designation
  }
  return payload
}

// FORM UTILS
export const generateId = (prefix: string, length: number) => {
  let uid = prefix
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
