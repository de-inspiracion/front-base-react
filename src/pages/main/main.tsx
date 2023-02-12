import { Outlet } from "react-router-dom";
import NavBarComponent from "../../components/navbar/Navbar";
import "./main.css";

export const Main = () => {
  return (
    <div className="mainPage">
      <NavBarComponent></NavBarComponent>
      <Outlet />
    </div>
  );
};
