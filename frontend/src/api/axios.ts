import axios, { isAxiosError } from "axios"
import { notifications } from "@mantine/notifications"

const api = axios.create({
  baseURL: "http://localhost:8080",
})

api.interceptors.request.use(
  (config) => {
    const isLoginRequest = config.url?.includes("login")
    if (!isLoginRequest) {
      // logged in with proper token if not login request
      const token = localStorage.getItem("authToken")
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      notifications.show({
        title: `${error.status} ${error.code}`,
        message: error.response
          ? error.response.data.message
          : "There seems to be an unknown issue. Contact administrator",
        color: "red",
      })
    }
    return Promise.reject(error)
  }
)

export default api
