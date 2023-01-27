import { Button, Col, Divider, Input, Row, Form, UploadProps, Checkbox, Layout } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import "./account.css";

export const AccountPage = () => {

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  }
  return (
    <>
      <Layout style={{ padding: '80px 20px', width: '100%', height: '100vh', background: 'black' }}>
        <Row align={"middle"} justify={"center"} >
          <Col xs={16} lg={8}>
            <Divider style={{ color: '#fff', fontSize: '5vh' }}>Mi cuenta</Divider>
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item

                label="Username"
                name="username"
                rules={[{ required: true, message: 'Necesitas poner un nombre de usuario' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Nombre de usuario" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Necesitas poner una contraseña' }]}
              >
                <Input.Password
                  name="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Recordar</Checkbox>
                </Form.Item>


              </Form.Item>

              <Form.Item>
                <Button style={{
                  width: '100%',
                }} type="primary" htmlType="submit" className="login-form-button">
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Layout>
    </>
  );

};
