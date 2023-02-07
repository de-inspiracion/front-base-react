import {
  Card,
  Col,
  ConfigProvider,
  Divider,
  Layout,
  Row,
  Space,
  Statistic,
  theme,
  Typography,
} from "antd";
import {
  ClockCircleOutlined,
  CompressOutlined,
  DollarCircleOutlined,
  DownloadOutlined,
  FieldTimeOutlined,
  GatewayOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  StarFilled,
  TrophyFilled,
  UserOutlined,
} from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { useSelector } from 'react-redux'
const {Meta} = Card
const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  cursos: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  { title: "Nro", dataIndex: "key", key: "key" },
  { title: "Cursos Completados", dataIndex: "cursos", key: "cursos" },
  {
    title: "Descargar Certificado",
    dataIndex: "",
    key: "x",
    render: () => (
      <a>
        Descargar
        <DownloadOutlined style={{ cursor: "pointer" }} />
      </a>
    ),
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    cursos: "New York No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    cursos: "London No. 1 Lake Park",
    description: "This not expandable.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    cursos: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    cursos: "Sidney No. 1 Lake Park",
    description: "This not expandable.",
  },
];

const MiProgreso = () => {
  const userInfo = useSelector( (estado:any) => estado.userInfo)
  console.log(userInfo)
  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ padding: "30px 30px" }}>
        <Content style={{ flexDirection: "column" }}>
          <Typography.Text style={{ fontSize: "18px" }} strong>
            Bienvenido:
          </Typography.Text>
          <Typography.Text style={{ fontSize: "18px" }} type="secondary">
            TOMÁS DESPOUY ZULUETA
          </Typography.Text>
        </Content>

        <Row justify={"space-between"} align={"middle"} wrap={true}>
          <Space direction="vertical">
            <Typography.Title level={3}>Mi Resumen</Typography.Title>
            <Space wrap={true}>
              <Card
                style={{
                  borderBottom: "8px #c2c2c2 solid",
                  width: "310px",
                  textAlign: "center",
                }}
              >
                <Space direction="horizontal">
                  <TrophyFilled
                    style={{
                      fontSize: "60px",
                      color: "#c2c2c2",
                      border: "1px solid #c2c2c2",
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  />
                  <Statistic
                    style={{ padding: "0 10px" }}
                    valueStyle={{
                      fontWeight: 700,
                      fontSize: 45,
                      color: "#c2c2c2",
                    }}
                    title={"Categoria:"}
                    value={"SILVER"}
                  />
                </Space>
              </Card>
              <Card
                style={{
                  borderBottom: "8px #fada17 solid",
                  width: "310px",
                  textAlign: "center",
                }}
              >
                <Space direction="horizontal">
                  <StarFilled
                    style={{
                      fontSize: "70px",
                      color: "#fada17",
                    }}
                  />
                  <Statistic
                    style={{ padding: "0 10px" }}
                    valueStyle={{
                      fontSize: 45,
                      fontWeight: 900,
                      color: "#fada17",
                    }}
                    title={"Estrellas Virgo:"}
                    value={25}
                  />
                </Space>
              </Card>
            </Space>
          </Space>

          <Space direction="vertical">
            <Typography.Title level={3}>...</Typography.Title>
            <Space wrap={true}>
              <Card
                style={{
                  borderBottom: "8px #59bd27 solid",
                  width: "310px",
                  textAlign: "center",
                }}
              >
                <Space direction="horizontal">
                  <ClockCircleOutlined
                    style={{
                      fontSize: "60px",
                      color: "#59bd27",
                    }}
                  />
                  <Statistic
                    style={{ padding: "0 10px" }}
                    valueStyle={{
                      fontSize: 45,
                      fontWeight: 500,
                    }}
                    title={"Horas de Estudio"}
                    value={152}
                  />
                </Space>
              </Card>
              <Card
                style={{
                  borderBottom: "8px #d10b0e solid",
                  width: "310px",
                  textAlign: "center",
                }}
              >
                <Space direction="horizontal">
                  <CompressOutlined
                    style={{
                      fontSize: "60px",
                      color: "#d10b0e",
                    }}
                  />
                  <Statistic
                    style={{ padding: "0 10px" }}
                    valueStyle={{
                      fontSize: 45,
                      fontWeight: 500,
                    }}
                    title={"Rutas de Aprendizaje"}
                    value={12}
                  />
                </Space>
              </Card>
            </Space>
          </Space>
        </Row>

        <Space direction="vertical">
          <Typography.Title level={3}>Mi Progreso</Typography.Title>
          <Space wrap={true}>
            <DashboardCard
              icon={
                <FieldTimeOutlined
                  style={{
                    fontSize: "60px",
                    color: "#7a00c2",
                  }}
                />
              }
              otherPart={"35"}
              text={"Horas de Estudio del Mes"}
              styles={{
                borderBottom: "solid 8px #7a00c2",
              }}
            />
            <DashboardCard
              icon={
                <GatewayOutlined
                  style={{
                    fontSize: "60px",
                    color: "#7a00c2",
                  }}
                />
              }
              otherPart={"05"}
              text={"Todas tus Rutas de aprendizaje"}
              styles={{ borderBottom: "solid 8px #7a00c2" }}
            />
          </Space>
          <Space wrap={true} direction='vertical'>
            { userInfo.inprogress.length > 0 && <div>
              <Typography.Title level={3}>Cursos en Progreso</Typography.Title>
              <Space direction='horizontal'>
                {userInfo.inprogress.map( (video:any) => {
                  return <div>video</div>
                })}
              </Space>
            </div>}
            {userInfo.finished.length > 0 && <div>
              <Typography.Title level={3}>Crusos Finalizados</Typography.Title>
              <Space direction='horizontal'>
                {userInfo.finished.map( (curso:any) => {
                  return <Card cover={<img alt="example" src={curso.course.cover} />}>
                        <Meta title={curso.course.name} />
                  </Card>
                })}
              </Space>
            </div>}
          </Space>
        </Space>
        <Space direction="vertical">
          <Typography.Title level={3}>Certificados</Typography.Title>
          <Table columns={columns} dataSource={data} />
        </Space>
      </Layout>
    </ConfigProvider>
  );
};

function DashboardCard({ icon, otherPart, text, styles }: any) {
  return (
    <Card style={styles}>
      <Space align={"center"} direction="horizontal">
        {icon}
        <Typography.Text style={{ fontSize: 50, padding: "0 10px" }}>
          {otherPart}
        </Typography.Text>
        <div
          className="dashboard-card-text"
          style={{
            padding: "0 10px",
            fontSize: 16.23,
            fontWeight: "bold",
            textAlign: "center",
            maxWidth: "110px",
            height: 81,
          }}
        >
          {text}
        </div>
      </Space>
    </Card>
  );
}

export default MiProgreso;
