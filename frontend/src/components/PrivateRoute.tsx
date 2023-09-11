import { Navigate } from "react-router-dom"
import { Role, useUser } from "../context/UserProvider"

interface PrivateRouteProps {
  component: React.ComponentType
  roles: Array<Role>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  roles,
}) => {
  const {
    user: { role },
  } = useUser()

  const isAuthorized = role && roles.includes(role)

  if (isAuthorized) return <Component />
  else return <Navigate to="/" />
}

export default PrivateRoute
