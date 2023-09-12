import { Navigate } from "react-router-dom"
import { Role } from "../types"

interface PrivateRouteProps {
  component: React.ComponentType
  roles: Array<Role>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  roles,
}) => {
  const isAuthorized = role && roles.includes(role)

  if (isAuthorized) return <Component />
  else return <Navigate to="/" />
}

export default PrivateRoute
