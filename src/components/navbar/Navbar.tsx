import React from "react";
import {
  Avatar,
  Col,
  Dropdown,
  Layout,
  Menu,
  MenuProps,
  message,
  Row,
  theme,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./navbar.css";
import "./navbar.css";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Search } = Input;

const { Header, Content, Footer } = Layout;
const onSearch = (value: string) => console.log("sss");
const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log(e);
};

const items: MenuProps["items"] = [
  // {
  //   label: "Mis Datos",
  //   key: "1",
  //   icon: <UserOutlined />,
  // },
  {
    label: "Cerrar Session",
    key: "2",
    icon: <UserOutlined />,
  },
];

const NavBarComponent: React.FC = () => {
  const userInfo = useSelector((estado: any) => estado.userInfo);
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "2") {
      logout({ returnTo: window.location.origin });
    }
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const menuVirgo = [
    {
      label: "Home",
      key: "/admin",
    },
    {
      label: "Cursos",
      key: "/admin/course",
    },
  ];
  const menuProfesor = [
    {
      label: "Home",
      key: "/home",
    },

    {
      label: "Rutas de Aprendizaje",
      key: "/home/rutas-de-aprendizaje",
    },

    {
      label: "Mi Progreso",
      key: "/home/mi-progreso",
    },
  ];
  const menuDirectiva = [
    {
      label: "Profesores",
      key: "/directive",
    },
    {
      label: "Cursos",
      key: "/directive/courses",
    },
    {
      label: "Estadisticas",
      key: "/directive/statistics",
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          padding: 5,
          background: "#141414",
          height: "74px",
        }}
      >
        <Row justify={"space-between"} style={{ padding: "0" }}>
          <Col
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              padding: "0 10px",
            }}
            xs={4}
          >
            <svg
              width="43"
              height="48"
              viewBox="0 0 260 240"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M125.844 0.493693C122.64 1.64515 119.582 4.59774 117.706 8.35208L116.905 9.95556L113.481 10.674C99.1128 13.6877 85.6169 21.0738 74.9453 31.7638C63.1703 43.5584 55.8681 57.8456 53.0834 74.537C52.2498 79.535 52.2498 93.2967 53.0834 98.2947C54.4916 106.734 56.8839 114.143 60.5506 121.419C66.7605 133.741 75.4541 143.564 86.9669 151.267C91.1716 154.08 96.9694 157.055 98.2464 157.055C101.421 157.055 103.902 153.183 102.486 150.439C101.9 149.304 100.806 148.496 96.0675 145.702C90.5559 142.452 86.3012 139.153 81.7234 134.582C66.9566 119.838 60.0181 100.041 62.1615 78.7678C63.3917 66.5595 68.9172 53.4539 77.0694 43.4088C81.3541 38.1293 87.9555 32.3672 94.1081 28.5366C97.0244 26.7208 102.663 23.9339 105.471 22.9203C108.801 21.7184 116.184 19.5777 116.999 19.5777C117.472 19.5777 118.092 20.1628 119.031 21.4964C120.613 23.7439 123.405 25.9118 125.955 26.8723C127.502 27.4551 128.272 27.5375 131.244 27.4383C134.493 27.3303 134.859 27.2505 136.779 26.2299C142.128 23.3859 145.086 18.0221 144.552 12.1337C144.163 7.84145 141.087 3.36203 137.047 1.20547C135.185 0.210819 134.866 0.146515 131.263 0.0350129C128.159 -0.0609679 127.151 0.0242428 125.844 0.493693ZM132.349 9.63563C134.852 10.6388 135.768 13.1289 134.556 15.6362C133.99 16.8082 133.542 17.252 132.43 17.7449C127.321 20.0088 123.839 12.6839 128.633 9.75632C129.884 8.99227 130.679 8.9663 132.349 9.63563ZM161.158 18.0458C159.456 19.2141 158.811 20.2987 158.836 21.9503C158.867 23.9745 159.504 24.7658 162.755 26.8178C172.917 33.2304 179.311 39.0377 185.071 47.0846C199.273 66.926 201.619 93.2577 191.164 115.473C183.168 132.464 168.389 145.491 150.496 151.318C143.328 153.652 143.793 153.656 141.879 151.247C139.994 148.874 137.684 147.188 135.039 146.256C133.481 145.707 132.599 145.609 130.102 145.708C127.357 145.817 126.832 145.943 124.676 147.01C121.89 148.39 119.727 150.561 118.279 153.432C117.37 155.234 117.33 155.485 117.33 159.431C117.33 163.28 117.387 163.665 118.198 165.319C121.103 171.244 127.795 174.364 134.079 172.725C138.237 171.64 140.809 169.514 143.089 165.277L144.53 162.599L147.244 161.932C163.755 157.878 178.584 148.533 189.31 135.424C198.758 123.875 204.429 110.469 206.354 95.127C206.882 90.9216 206.796 81.4993 206.185 76.7186C204.418 62.872 198.587 49.2431 189.62 37.9994C183.396 30.1948 174.415 22.607 166.835 18.7497C163.887 17.2492 162.558 17.0844 161.158 18.0458ZM100.418 45.7909C99.8127 46.0953 98.9807 46.8436 98.5692 47.4533C97.9402 48.3859 97.8479 48.8294 97.9889 50.2447C98.1489 51.8548 98.2903 52.0728 101.26 55.2902C106.531 61.0003 129.008 83.5656 129.424 83.5652C130.182 83.5646 136.663 77.2891 148.69 64.9117C161.782 51.438 161.839 51.3642 161.159 48.8338C160.703 47.1363 159.6 45.9933 158.001 45.5622C155.346 44.846 155.3 44.8818 143.419 56.8123C137.419 62.8378 131.825 68.3486 130.99 69.0588L129.469 70.3497L116.908 57.7927L104.347 45.236L102.933 45.2366C102.155 45.2366 101.023 45.4862 100.418 45.7909ZM100.434 70.4808C98.9674 71.2544 98.1588 72.4464 97.9766 74.105C97.8479 75.2757 97.9684 75.6812 98.7631 76.7544C99.2795 77.4513 105.319 83.8345 112.184 90.939L124.666 103.856L124.87 107.411C124.983 109.366 125.076 112.818 125.077 115.083C125.078 117.348 125.173 121.874 125.287 125.141L125.494 131.081L126.596 131.924C128.788 133.598 132.329 133.179 133.313 131.13C133.858 129.994 134.191 122.354 134.222 110.25L134.249 100.348L121.932 87.7593C106.413 71.8977 104.608 70.2233 102.841 70.0437C101.958 69.954 101.158 70.0994 100.434 70.4808ZM154.962 70.3826C153.381 71.1296 135.663 89.346 134.697 91.2181C133.599 93.3445 134.802 96.1071 137.231 97.0361C139.714 97.9861 140.166 97.6779 148.341 89.466C152.352 85.4364 156.87 80.7362 158.381 79.0209C160.846 76.2235 161.129 75.7731 161.129 74.6495C161.129 71.3386 157.806 69.0392 154.962 70.3826ZM133.178 155.442C133.727 155.777 134.48 156.7 134.88 157.527C135.505 158.821 135.551 159.165 135.239 160.208C134.479 162.75 132.55 164.2 130.272 163.943C125.814 163.44 124.524 157.786 128.336 155.457C129.648 154.657 131.88 154.649 133.178 155.442ZM1.26117 185.866C-0.169477 186.447 -0.315261 187.03 0.48323 188.985C2.75537 194.55 15.764 223.051 20.6349 233.137C23.1313 238.306 23.796 239.433 24.5262 239.736C26.1007 240.39 26.5978 239.786 29.5815 233.594C35.4388 221.438 48.955 191.706 50.1374 188.376C50.6329 186.98 50.409 186.288 49.3275 185.876C48.2374 185.461 41.4001 185.475 40.6187 185.894C39.8553 186.304 37.6312 190.723 32.5959 201.835C27.2319 213.672 25.5966 217.122 25.2482 217.337C25.0837 217.439 22.6212 212.363 19.7754 206.057C12.4141 189.746 10.6533 186.202 9.73497 185.852C8.80177 185.497 2.14378 185.507 1.26117 185.866ZM64.4631 185.763C62.8945 186.118 62.9445 185.345 62.8379 210.875C62.7832 224.046 62.8285 235.699 62.9391 236.771C63.2592 239.879 63.2778 239.89 68.2727 239.89C71.3617 239.89 72.6659 239.776 72.9625 239.478C73.5238 238.916 73.5735 186.747 73.0134 186.186C72.6418 185.813 65.7463 185.473 64.4631 185.763ZM94.6432 185.798C93.1657 185.891 92.7565 186.042 92.4463 186.61C92.1611 187.131 92.0314 193.774 91.9312 213.016L91.7968 238.726L92.7249 239.206C93.986 239.86 97.0896 240.173 99.6128 239.903C102.784 239.563 102.679 239.921 102.908 228.711L103.1 219.3L106.647 219.211L110.194 219.121L110.937 220.32C111.347 220.978 113.397 224.867 115.495 228.962C121.137 239.976 120.826 239.519 122.886 239.834C125.096 240.172 130.112 239.937 131.014 239.454C132.462 238.678 132.258 237.948 128.694 231.147C126.832 227.593 124.556 223.293 123.635 221.592L121.961 218.498L122.966 217.722C123.519 217.295 124.871 216.279 125.971 215.465C128.147 213.854 129.903 211.725 131.299 209.005C132.167 207.314 132.193 207.12 132.193 202.353C132.193 197.564 132.171 197.4 131.286 195.701C129.392 192.063 126.611 189.291 123 187.444C120.707 186.271 120.113 186.111 117.15 185.866C114.001 185.604 98.463 185.558 94.6432 185.798ZM169.193 185.912C154.4 187.874 144.258 201.087 145.941 216.205C146.622 222.317 149.297 227.6 153.955 232.033C158.282 236.15 162.067 238.219 167.202 239.272C173.847 240.635 184.917 238.735 190.316 235.305C191.462 234.577 191.812 234.146 191.979 233.257C192.094 232.638 192.137 227.984 192.073 222.914L191.957 213.697L191.193 213.078C190.475 212.495 189.979 212.464 182.905 212.553C173.901 212.667 174.315 212.489 174.141 216.308C173.909 221.432 174.159 221.79 178.113 221.993L181.209 222.151V224.823V227.494L179.501 228.086C178.559 228.412 176.432 228.758 174.758 228.856C169.266 229.18 166.031 228.083 162.434 224.674C158.43 220.881 157.167 217.623 157.394 211.679C157.518 208.425 157.615 207.981 158.691 205.711C160.873 201.108 165.185 197.617 169.9 196.635C172.331 196.129 176.345 196.417 178.521 197.254C179.478 197.621 181.321 198.563 182.618 199.346C183.914 200.129 185.16 200.769 185.385 200.769C186.035 200.769 190.725 195.897 191.093 194.838C191.543 193.545 191.086 192.701 189.111 191.181C183.984 187.235 175.715 185.047 169.193 185.912ZM226.356 186.499C223.013 187.403 218.505 189.698 216.19 191.674C208.597 198.156 205.367 206.133 206.362 215.939C207.02 222.419 209.226 227.091 213.782 231.654C218.351 236.231 222.804 238.518 229.283 239.615C231.887 240.055 232.843 240.081 235.318 239.776C239.909 239.211 245.159 237.321 248.553 235.012C250.375 233.771 254.181 229.72 255.716 227.386C264.386 214.199 259.398 195.708 245.247 188.574C241.256 186.562 239.284 186.122 233.704 185.995C229.429 185.898 228.29 185.975 226.356 186.499ZM117.488 196.523C122.897 199.016 122.988 206.233 117.646 209.111C116.476 209.742 115.922 209.793 110.215 209.795C106.823 209.796 103.799 209.695 103.495 209.569C102.994 209.363 102.941 208.743 102.941 203.022C102.941 199.547 103.033 196.465 103.144 196.174C103.326 195.7 103.996 195.657 109.706 195.757C115.324 195.855 116.231 195.944 117.488 196.523ZM238.358 197.436C244.784 199.638 249.35 206.023 249.35 212.806C249.35 220.171 243.766 227.043 236.36 228.791C232.665 229.664 229.621 229.246 225.64 227.32C223.118 226.099 219.839 222.865 218.621 220.396C215.352 213.773 216.543 206.339 221.7 201.173C223.957 198.912 227.402 197.065 230.145 196.644C232.55 196.276 235.917 196.601 238.358 197.436Z"
                fill="white"
              />
            </svg>
          </Col>

          <Col xs={10} md={10} xl={10}>
            <Menu
              onClick={({ key }) => {
                navigate(key);
              }}
              theme="dark"
              style={{
                background: "#141414",
                border: "none",
                fontSize: "1rem",
              }}
              mode="horizontal"
              //poner tres tipos de menu dentro de items
              items={
                userInfo.profile === "directiva" || userInfo.profile === "sostenedor" 
                  ? menuDirectiva
                  : userInfo.profile === "virgo"
                  ? menuVirgo
                  : menuProfesor
              }
            />
          </Col>

          {/* <Col span={4} xs={4} md={6} xl={10} className="section-search">
            <Search
              placeholder="search text"
              onSearch={onSearch}
              style={{ width: "100%" }}
            />
          </Col> */}
          <Col style={{ textAlign: "end" }} xs={2}>
            <Dropdown menu={menuProps}>
              <Avatar
                size="small"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#87d068" }}
              />
            </Dropdown>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default NavBarComponent;
