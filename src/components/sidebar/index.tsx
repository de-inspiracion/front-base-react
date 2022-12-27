import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { newDataUser } from '../../store/user/userData'

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('Home', '/', <PieChartOutlined />),
  getItem('Mis Datos', '/account', <PieChartOutlined />),
  getItem('Mis Certificados', '2', <DesktopOutlined />),
  getItem('Mis Cursos', '3', <DesktopOutlined />),
  getItem('Cerrar Sesion', '4', <DesktopOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
];

const SideBarComponent: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e.key);
    navigate(e.key);
    // return redirect('/account');
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '80vh', borderRight: '1px solid #eaeaea' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{backgroundColor: 'white', fontSize: '5'}}>
        <Menu  defaultSelectedKeys={['1']} mode="inline" items={items} style={{fontSize: '12px'}} onClick={onClick}/>
      </Sider>
    </Layout>
  );
};

export default SideBarComponent;