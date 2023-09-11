import { MantineProvider } from "@mantine/core"
import { Outlet } from "react-router-dom"
import UserProvider from "./context/UserProvider"
import PrivateRoute from "./components/PrivateRoute"

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </MantineProvider>
  )
}

export default App
