import { notifications } from "@mantine/notifications"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { extractClaims, isTokenExpired } from "../api/utils"
import { Credentials, GlobalAuthState } from "../types"

export const initialAuthState: GlobalAuthState = {
  authToken: "",
  isLoggedIn: false,
  user: {
    name: "",
    empId: "",
    role: "ANONYMOUS",
  },
}

const AuthContext = createContext({
  auth: initialAuthState,
  onLogin: async (creds: Credentials) => {},
  onLogout: () => {},
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = (props: any) => {
  const [auth, setAuth] = useState<GlobalAuthState>(initialAuthState)
  const navigate = useNavigate()

  const logoutUser = () => {
    localStorage.removeItem("authToken")
    setAuth(initialAuthState)
    navigate("/")
  }

  const loginUser = async (creds: Credentials) => {
    try {
      const res = await api.post<string>("/auth/login", creds)
      const newToken = res.data

      localStorage.setItem("authToken", newToken)
      const claims = extractClaims(newToken)
      setAuth((prev) => ({
        ...prev,
        authToken: newToken,
        isLoggedIn: true,
        user: claims,
      }))
      const goTo = claims.role.toLowerCase()
      navigate(`/${goTo}`)
    } catch (e) {
      console.log("Error while logging in user", e)
    }
  }

  useEffect(() => {
    const currToken = localStorage.getItem("authToken")

    // Ignore if no token or already logged in
    if (auth.isLoggedIn || !currToken) return
    // Remind user if session has expired and remove expired token
    else if (isTokenExpired(currToken)) {
      localStorage.removeItem("authToken")
      notifications.show({
        title: "Session Expired",
        message: "Hey! your session has expired. You have to login again",
      })
    }
    // If valid token then update state
    else {
      notifications.show({
        title: "Welcome User!",
        message: "Looks like you are already logged in, yay!",
      })
      const claims = extractClaims(currToken)
      setAuth((prev) => ({
        ...prev,
        authToken: currToken,
        isLoggedIn: true,
        user: claims,
      }))
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
