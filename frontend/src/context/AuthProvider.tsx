import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { extractClaims, isTokenExpired } from "../api/utils"
import { Credentials, GlobalAuthState } from "../types"
import { notifications } from "@mantine/notifications"

export const initialAuthState: GlobalAuthState = {
  authToken: "",
  isLoggedIn: false,
  user: {
    name: "",
    empId: "",
    role: "ANONYMOUS"
  }
}

const AuthContext = createContext({
  auth: initialAuthState,
  onLogin: async (creds: Credentials) => {},
  onLogout: () => {}
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = (props: any) => {
  const [auth, setAuth] = useState<GlobalAuthState>(initialAuthState)
  const navigate = useNavigate()

  const logoutUser = () => {
    console.log("LOGGIN OUT USER")
    localStorage.removeItem("authToken")
    setAuth(initialAuthState)
    navigate("/")
  }

  const loginUser = async (creds: Credentials) => {
    try {
      console.log("LOGGIN IN USER")
      const res = await api.post<string>("/login", creds)
      console.log("token received from the backend", res.data)
      const newToken = res.data
      setAuth((prev) => ({
        ...prev,
        authToken: newToken,
        isLoggedIn: true,
        user: extractClaims(newToken)
      }))
    } catch (e) {
      console.log("Error while logging in user", e)
    }
  }

  useEffect(() => {
    const currToken = localStorage.getItem("authToken")

    // Ignore if no token
    if (!currToken) return
    // Remind user if session has expired and remove expired token
    else if (isTokenExpired(currToken)) {
      localStorage.removeItem("authToken")
      notifications.show({
        title: "Session Expired",
        message: "Hey! your session has expired. You have to login again"
      })
    }
    // If valid token redirect to dashboard
    else {
      notifications.show({
        title: "Welcome User!",
        message: "Looks like you are already logged in, yay!"
      })
      const claims = extractClaims(currToken)
      setAuth((prev) => ({
        ...prev,
        authToken: currToken,
        isLoggedIn: true,
        user: claims
      }))
      const goTo = claims.role.toLowerCase()
      navigate(`/${goTo}`)
    }
  }, [])

  return (
    <AuthContext.Provider
      {...props}
      value={{ auth, onLogin: loginUser, onLogout: logoutUser }}
    />
  )
}

export default AuthProvider
