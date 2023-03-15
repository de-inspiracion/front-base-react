import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  isAuthenticated,
  component: Component,
  role,
  userRole,
}: any) {
  console.log("role", role);
  console.log("userRole", userRole);
  // si esta autenticado y el rol es el correcto se va al componente y se queda solo en las rutas que le pertenecen, si no se va a la landinPage(login)
  return isAuthenticated && role === userRole ? Component : <Navigate to="/" />;
}

// if (isAuthenticated && role === "virgo") {
//   return <Component />;
// }
// if (isAuthenticated && role === "directiva") {
//   return <Component />;
// }
// if (isAuthenticated && role === "sostenedor") {
//   return <Component />;
// }
// if (isAuthenticated && role === "profesor") {
//   return <Component />;
// }
// return <Navigate to="/" />;
