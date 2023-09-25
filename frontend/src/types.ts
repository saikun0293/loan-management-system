export interface Credentials {
  username: string
  password: string
}

export interface AuthPayload {
  name: string
  empId: string
  role: "ADMIN" | "EMPLOYEE" | "ANONYMOUS"
  dept?: string
  designation?: string
}

export interface GlobalAuthState {
  authToken: string
  isLoggedIn: boolean
  user: AuthPayload
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
