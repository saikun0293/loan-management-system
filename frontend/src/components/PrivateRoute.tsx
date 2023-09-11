import { FC } from "react"
import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserProvider"

interface PrivateRouteProps {
  component: FC
  props?: any
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  props
}) => {
  const {
    user: { role }
  } = useUser()

  if (role === "ANONYMOUS") return <Navigate to={"/user/login"} />
  else return <Component {...props} />
}

export default PrivateRoute
