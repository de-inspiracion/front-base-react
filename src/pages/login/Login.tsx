import { useAuth0 } from "@auth0/auth0-react";
import { Button, ConfigProvider, theme } from "antd";
import { useDispatch } from "react-redux";
import { newDataUser } from "../../store/user/userData";
import Landing from "../landing/Landing";

export const Login = () => {
  return (
    <div>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Landing />
      </ConfigProvider>
    </div>
  );
};

// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0()

//   return (
//     <Button onClick={() => loginWithRedirect()}>
//       Login
//     </Button>
//   )
// }

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button onClick={() => logout({ returnTo: "http://localhost:3000" })}>
      logout
    </Button>
  );
};

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(isAuthenticated);
  if (isLoading) return <div>..Loading</div>;
  var userObject = {
    name: user?.name,
    age: 12,
    authenticated: isAuthenticated,
  };
  dispatch(newDataUser(userObject));

  return isAuthenticated ? (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>Email: {user?.email}</h2>
      <h2>Name: {user?.name}</h2>
    </div>
  ) : (
    <div>No loegado</div>
  );
};
