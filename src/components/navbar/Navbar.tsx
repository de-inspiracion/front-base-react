import React from "react";

import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  message,
  Row,
  Space,
  theme,
} from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import { Input } from 'antd';
import './navbar.css'

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const { Header, Content, Footer } = Layout;
const onSearch = (value: string) => console.log('sss');
const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  console.log(e);
};

const items: MenuProps['items'] = [
  {
    label: 'Mis Datos',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: 'Cerrar Session',
    key: '2',
    icon: <UserOutlined />,
  },
];

const NavBarComponent: React.FC = () => {
  const { logout } = useAuth0()
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '2') {
      logout({ returnTo: 'http://localhost:5173' })
    }
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


  const navigate = useNavigate();

  return (
    <Layout>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%", padding: 5, background: '#141414', height: '74px' }}>
        <Row justify={'center'} gutter={[20, 20]} style={{ padding: '0 35px' }}>
          <Col style={{
            color: '#fff',
            fontWeight: '900',
            padding: '10px',
            fontSize: '15px',
            textAlign: 'initial',
          }} xs={2}>

            VIRGO

          </Col>

          <Col xs={16} >
            <Menu
              defaultSelectedKeys={['/home']}
              onClick={({ key }) => {
                navigate(key)
              }}
              theme="dark"
              style={{ background: '#141414', border: 'none' }}
              mode="horizontal"
              items={[
                {
                  label: "Home",
                  key: "/home"
                },

                {
                  label: "Rutas de Aprendizaje",
                  key: "/home/rutas-de-aprendizaje"
                },

                {
                  label: "Mi Progreso",
                  key: "/home/mi-progreso"
                },

              ]}
            />
          </Col>

          <Col span={4} xs={4} md={4} xl={4} className='section-search'>
            {/* <Input placeholder="Busca algun curso" allowClear onChange={onChange} /> */}
            {/* // este estaba */}
            {/* <Input.Search allowClear style={{ width: '100%' }} defaultValue="" /> */}

            {/* <Button style={{ width: 80 }} onClick={() => onSearch('')}>
              Buscar
          </Button> */}
            <Search placeholder="search text" onSearch={onSearch} style={{ width: 100 }} />
          </Col>
          <Col style={{ textAlign: 'end' }} xs={2}>
            <Dropdown menu={menuProps}>
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#87d068", margin: '0 10px' }}
              />

            </Dropdown>
          </Col>

        </Row>
      </Header>
    </Layout>
  );
};

export default NavBarComponent;
