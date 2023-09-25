import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import AuthProvider from "./context/AuthProvider"

const App = () => {
  return (
    <AuthProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Martian Mono",
          headings: { fontFamily: "DM Sans" },
        }}
      >
        <Notifications position="top-right" autoClose={8000} />
        <Navbar />
        <Outlet />
      </MantineProvider>
    </AuthProvider>
  )
}

export default App
