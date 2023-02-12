import React from "react";
import { Button, Result } from "antd";

const App: React.FC = () => {
  const handleBackHome = () => {
    window.location.href = "/";
  };

  return (
    <Result
      title="No Account"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button onClick={handleBackHome} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default App;
