import { Login } from "../pages/public/login/Login";

const PublicRoute = ({
  isAuthenticated,
  component: Component,
  setUserRole,
}: any) => {
  console.log("role", setUserRole);
  if (isAuthenticated) {
    return <Login setUserRole={setUserRole} />;
  }
  return Component;
};

export default PublicRoute;
