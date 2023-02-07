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
import services from '../../services/http'
const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  id: string;
  date:string;
}




const getFinishedCourses = (courses:any)=>{
  const data:DataType[] = []

  for(let i = 0;i<courses.length;i++){
    const course = courses[i].course
    data.push(
      {
        key: i + 1 ,
        name: course.name,
        id: course._id,
        date: course.updatedAt
      }
    )
  }

  return data
}

const MiProgreso = () => {
  const userInfo = useSelector(state => state.userInfo)

  const columns: ColumnsType<DataType> = [
      // { title: "Nro", dataIndex: "key", key: "key" },
      { title: "Cursos Completados", dataIndex: "name", key: "name" },
      {
        title: "Descargar Certificado",
        dataIndex: "",
        key: "id",
        render: (row) => (
          <a onClick={async ()=>{
            const body = {
              userName: userInfo.name,
              userId: userInfo.id,
              courseId: row.id,
              courseName: row.name,
              courseDate: row.date
            }
            const res = await services.getCertificate(body)
          }}>
            Descargar
            <DownloadOutlined style={{ cursor: "pointer" }} />
          </a>
        ),
      },
    ];

  

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <Layout style={{ padding: "30px 30px" }}>
        <Content style={{ flexDirection: "column" }}>
          <Typography.Text style={{ fontSize: "18px" }} strong>
            Bienvenido:
          </Typography.Text>
          <Typography.Text style={{ fontSize: "18px", margin:10 }} type="secondary">
            {userInfo.name.toUpperCase()}
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
        </Space>

        <Space direction="vertical">
          <Typography.Title level={3}>Certificados</Typography.Title>
          <Table columns={columns} dataSource={getFinishedCourses(userInfo.finished)} />
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
