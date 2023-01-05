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
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };



  return (
    <Layout>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%", padding: 5, background:'#141414' }}>
        <Row>
          <Col xs={6} sm={6} md={6} lg={6} xl={4}>
            <div
              style={{
                color: '#fff',
                fontWeight: '900',
                paddingLeft: '15px',
                fontSize: '15px',
              }}
            > 
              VIRGO
            </div>
          </Col>
          <Col xs={12} sm={8} md={12} lg={12} xl={14} className='section-search'>
          {/* <Input placeholder="Busca algun curso" allowClear onChange={onChange} /> */}
          <Input.Search allowClear style={{ width: '100%' }} defaultValue="" />
          {/* <Button style={{ width: 80 }} onClick={() => onSearch('')}>
              Buscar
          </Button> */}
          </Col>
          <Col xs={4} sm={4} md={4} lg={6} xl={4} className='section-user'>
          <Dropdown menu={menuProps}>
            <Avatar
              size="small"
              icon={<UserOutlined />}
              style={{ backgroundColor: "#87d068", marginRight:'10px' }}
            />

          </Dropdown>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default NavBarComponent;
