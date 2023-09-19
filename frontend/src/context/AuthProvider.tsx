import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react"
import { GlobalAuthState } from "../types"

export const initialAuthState: GlobalAuthState = {
  authToken: "",
  config: {},
  // TODO: Change later
  isLoggedIn: true,
  role: "user",
}

const AuthContext = createContext({
  auth: initialAuthState,
  setAuth: (() => {}) as Dispatch<SetStateAction<GlobalAuthState>>,
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = (props: any) => {
  const [auth, setAuth] = useState<GlobalAuthState>(initialAuthState)

  return <AuthContext.Provider {...props} value={{ auth, setAuth }} />
}

export default AuthProvider
