import { Button, Col, Divider, Input, Row, Upload, UploadProps } from "antd";
import "./account.css";

export const AccountPage = () => {
  return (
    <>
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="accountPage">
      <Divider style={{ color: '#fff'}}>Mi cuenta</Divider>
      <Col span={12} offset={6}>
        <p>datos del usuario</p>
        <div>
          <p>Nombre</p>
          <Input placeholder="Alejandro" disabled/>
        </div>

        <div>
          <p>Email</p>
          <Input placeholder="a@ac." disabled/>
        </div>
      </Col>
    </Row>
    </>
  );
};
