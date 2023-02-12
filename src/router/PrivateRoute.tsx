import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  isAuthenticated,
  component: Component,
}: any) {
  // si esta autenticado se va al componente, si no se va a la landinPage(login)
  return isAuthenticated ? Component : <Navigate to="/" />;
}
