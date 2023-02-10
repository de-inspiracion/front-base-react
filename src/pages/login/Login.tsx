import { ConfigProvider, theme } from "antd";
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
