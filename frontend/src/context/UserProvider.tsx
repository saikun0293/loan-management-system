import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react"

export interface User {
  user_id: string
  role: "ANONYMOUS" | "USER" | "ADMIN"
  emp_name: string
  dob: string
  gender: string
  designation: string
  dept: string
}

const initialUser: User = {
  user_id: "",
  role: "ANONYMOUS",
  emp_name: "",
  dob: "",
  gender: "",
  designation: "",
  dept: ""
}

const UserContext = createContext({
  user: initialUser,
  setUser: (() => {}) as Dispatch<SetStateAction<User>>
})

export const useUser = () => useContext(UserContext)

const UserProvider = (props: any) => {
  const [user, setUser] = useState<User>(initialUser)

  return <UserContext.Provider {...props} value={{ user, setUser }} />
}

export default UserProvider
