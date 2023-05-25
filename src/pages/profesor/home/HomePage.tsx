import { Content } from "antd/es/layout/layout";
import { useAuth0 } from "@auth0/auth0-react";
import CoursesInProgress from "./components/coursesInProgress/CoursesInProgress";
import "./home.css";
export const HomePage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Content className="homePage">
      {isAuthenticated && <div></div>}
      <CoursesInProgress></CoursesInProgress>
    </Content>
  );
};
