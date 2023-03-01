import { Button, ConfigProvider, Result, theme } from "antd";

export const Unauthorized = ({ error }: any) => {
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
          <Button type="primary" key="console" onClick={() => window.location.assign('/')}>
            Intentalo de nuevo
          </Button>
        }
      />
    </ConfigProvider>
  );
};
