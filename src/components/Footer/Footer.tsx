import { Divider, Layout } from "antd";

const { Footer } = Layout;
const FooterPage = () => {
  const año = new Date().getFullYear();

  return (
    <div>
      <Divider style={{ margin: 0 }} />
      <Footer style={{ textAlign: "center" }}>
        Creado por © Virgo Education {año}. Hecho con ⭐
      </Footer>
    </div>
  );
};

export default FooterPage;
