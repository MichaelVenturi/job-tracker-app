import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";

interface IPrivateRouteProps {
  redirectPath: string;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ redirectPath }) => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <h1>loading</h1>;
  }
  return loggedIn ? <Outlet /> : <Navigate to={redirectPath} />;
};
export default PrivateRoute;
