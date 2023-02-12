import { Login } from "../pages/login/Login";

export default function PublicRoute({
  isAuthenticated,
  component: Component,
}: any) {
  if (isAuthenticated) {
    return <Login />;
  }
  return Component;
}
