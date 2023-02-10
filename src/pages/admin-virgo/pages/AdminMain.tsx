import { Button } from "antd";
import NavBarComponent from "../../../components/navbar/Navbar";

const AdminMain = () => {
  return (
    <div>
      <NavBarComponent />
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Button onClick={() => console.log("Descargar estadistica")}>
          Descargar Estadistica
        </Button>
        <Button onClick={() => console.log("Cargar estadistica")}>
          Cargar Estadistica
        </Button>
      </div>
    </div>
  );
};

export default AdminMain;
