import { FC } from "react";
import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Divider, Row } from "antd";
import { Typography } from "antd";
import './RecommendedCourses.css'
const { Title } = Typography;
const { Meta } = Card;

const RecommendedCourses: React.FC = () => (
  <Row>
    <Divider>Cursos recomendados para ti.</Divider>
    <Card
      // style={}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        // <SettingOutlined key="PlayCircleOutlined" />,
        <PlayCircleOutlined key="PlayCircleOutlined"/>
        // <EditOutlined key="edit" />,
        // <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        className="infoCardCoursesInProgress"
        // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Curso numero 1"
        description="Descripcion del curso..."
      />
    </Card>
  </Row>
);

export default RecommendedCourses;
