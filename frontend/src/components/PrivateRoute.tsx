import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { Role } from "../types"

interface PrivateRouteProps {
  component: React.ComponentType
  roles: Array<Role>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  roles
}) => {
  const {
    auth: { isLoggedIn, role }
  } = useAuth()

  if (isLoggedIn && roles.includes(role)) return <Component />
  else return <Navigate to="/" />
}

export default PrivateRoute
