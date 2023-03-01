import { useAuth0 } from "@auth0/auth0-react";
import { Button, ConfigProvider, Result, theme } from "antd";

export const Unauthorized = ({ error, user }: any) => {
  const { logout } = useAuth0();
  console.log(user)
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#ffd45a",
          fontFamily: "'Open Sans', sans-serif",
        },
      }}
    >
      <Result
        title={error.message}
        style={{
          color: "white",
        }}
        extra={
          <Button type="primary" key="console" onClick={() => {
            logout({ returnTo: window.location.origin });
          }}>

            Intentalo de nuevo
          </Button>
        }
      />
    </ConfigProvider>
  );
};
