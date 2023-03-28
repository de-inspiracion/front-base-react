import {
  Card,
  ConfigProvider,
  Layout,
  Row,
  Space,
  Statistic,
  theme,
  Typography,
} from "antd";
import {
  DownloadOutlined,
  FieldTimeOutlined,
  GatewayOutlined,
  StarFilled,
  TrophyFilled,
} from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import services from "../../services/http";
import CourseInProgressModal from "./components/CourseInProgressModal";
import { useEffect, useState } from "react";
import { message } from 'antd';
const { Meta } = Card;

const { Content } = Layout;

interface statisticData {
  stars: number;
  studyHours: number;
  completedRoutes: number;
  rank: string;
}

interface DataType {
  key: React.Key;
  name: string;
  id: string;
  date: string;
}

const getFinishedCourses = (courses: any) => {
  const data: DataType[] = [];
  console.log("courses: " , courses)
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i].course;
    data.push({
      key: i + 1,
      name: course.name,
      id: course._id,
      date: courses[i].date,
    });
  }

  return data;
};

const MiProgreso = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const [abrirModal, setAbrirModal] = useState(false);
  const [statistics, setStatistics] = useState<statisticData[] | any>([]);
  const [color, setColor] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleCloseModal = () => {
    setAbrirModal(false);
  };
  const [dataModal, setDataModal] = useState({});

  useEffect(() => {
    const getData = async () => {
      let res = await services.getStatistics(userInfo.id);
      setStatistics(res.data);
    };
    getData();
  }, []);

  useEffect(() => {
    if (statistics?.rank === "Bronze") {
      setColor("#cd7f32");
    } else if (statistics?.rank === "Silver") {
      setColor("#c0c0c0");
    } else {
      setColor("#fada17");
    }
  }, [statistics]);

  const columns: ColumnsType<DataType> = [
    // { title: "Nro", dataIndex: "key", key: "key" },
    { title: "Cursos Completados", dataIndex: "name", key: "name" },
    {
      title: "Descargar Certificado",
      dataIndex: "",
      key: "id",
      render: (row) => (
        <a
          onClick={async () => {
            messageApi.open({
              type: 'loading',
              content: 'Generando Certificado ...',
              duration: 0,
            });
            const body = {
              userName: userInfo.name,
              userId: userInfo.id,
              courseId: row.id,
              courseName: row.name,
              courseDate: row.date,
            };
            console.log("row ", row)
            const res = await services.getCertificate(body);
            setTimeout(messageApi.destroy, 0);
          }}
        >
          Descargar
          <DownloadOutlined style={{ cursor: "pointer" }} />
        </a>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      {contextHolder}
      <Layout style={{ padding: "30px 30px" }}>
        <Content style={{ flexDirection: "column" }}>
          <Typography.Text style={{ fontSize: "18px" }} strong>
            Bienvenido:
          </Typography.Text>
          <Typography.Text
            style={{ fontSize: "18px", margin: 10 }}
            type="secondary"
          >
            {userInfo.name.toUpperCase()}
          </Typography.Text>
        </Content>

        <Row justify={"space-between"} align={"middle"} wrap={true}>
          <Space direction="vertical">
            <Typography.Title level={3}>Mi Resumen</Typography.Title>
            <Space wrap={true}>
              <Card
                style={{
                  borderBottom: `8px ${color} solid`,
                  width: "310px",
                  textAlign: "center",
                }}
              >
                <Space direction="horizontal">
                  <TrophyFilled
                    style={{
                      fontSize: "60px",
                      color: `${color}`,
                      border: `1px solid ${color}`,
                      borderRadius: "50%",
                      padding: "10px",
                    }}
                  />
                  <Statistic
                    style={{ padding: "0 10px" }}
                    valueStyle={{
                      fontWeight: 700,
                      fontSize: 45,
                      color: `${color}`,
                    }}
                    title={"Categoria:"}
                    value={statistics?.rank}
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
                    value={statistics?.stars}
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
                    color: "#4ed2ef",
                  }}
                />
              }
              otherPart={statistics?.studyHours?.toFixed(1)}
              text={"Horas de Estudio"}
              styles={{
                borderBottom: "solid 8px #4ed2ef",
              }}
            />
            <DashboardCard
              icon={
                <GatewayOutlined
                  style={{
                    fontSize: "60px",
                    color: "#4c73d7",
                  }}
                />
              }
              otherPart={statistics?.completedCourses}
              text={"Cursos Completados"}
              styles={{ borderBottom: "solid 8px #4c73d7" }}
            />
          </Space>
        </Space>
        <Space direction="vertical">
          <Typography.Title level={3}>Certificados</Typography.Title>
          <Table
            columns={columns}
            dataSource={getFinishedCourses(userInfo.finished)}
          />
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
        <Typography.Text style={{ fontWeight:'bold' ,fontSize: 30, padding: "0 2vw" }}>
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
            display: "flex",
            alignItems: "center",
          }}
        >
          {text}
        </div>
      </Space>
    </Card>
  );
}

export default MiProgreso;
