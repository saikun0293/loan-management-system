import { GlobalAuthState } from "../types"
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from "react"

const initialState: GlobalAuthState = {
  authToken: "",
  // TODO: Change later
  isLoggedIn: true,
  role: "admin"
}

const AuthContext = createContext({
  auth: initialState,
  setAuth: (() => {}) as Dispatch<SetStateAction<GlobalAuthState>>
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = (props: any) => {
  const [auth, setAuth] = useState<GlobalAuthState>(initialState)

  return <AuthContext.Provider {...props} value={{ auth, setAuth }} />
}

export default AuthProvider
