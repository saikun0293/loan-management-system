import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

interface PrivateRouteProps {
  component: React.ComponentType
  roles: Array<"ADMIN" | "EMPLOYEE" | "ANONYMOUS">
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  roles,
}) => {
  const {
    auth: {
      isLoggedIn,
      user: { role },
    },
  } = useAuth()

  if (isLoggedIn && roles.includes(role)) return <Component />
  else return <Navigate to="/" />
}

export default PrivateRoute
