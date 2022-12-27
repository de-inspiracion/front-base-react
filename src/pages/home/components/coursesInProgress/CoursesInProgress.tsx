import { FC } from "react";
import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Row } from "antd";
import { Typography } from "antd";
import "./coursesInProgress.css";
import { getListInProgress } from "../../services/home.service";
import { useSelector, useDispatch } from 'react-redux'
import { newDataUser } from '../../../../store/user/userData'

const { Title } = Typography;
const { Meta } = Card;

const inProfressList = [
  { title: "curso 1", key: 0 },
  { title: "curso 2" ,  key: 1},
];

const coursesInProgress = getListInProgress().then(data => {
console.log(data.data)
})



const CoursesInProgress: React.FC =  () => {

  const count = useSelector((state: any) => state.userInfo)
  console.log(count)
  const dispatch = useDispatch()
  const changeValue = () => {
    dispatch(newDataUser('alejandro'))
  }
return (
  
  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

{/* <div style="position: relative; padding-top: 56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/80619/2d4d89ed-f1f8-4a7d-8e61-1b04f58a0a33?autoplay=false&preload=false" loading="lazy" style="border: none; position: absolute; top: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>
    <div style={{ color: 'black' }}>
      {count.name}
    </div> */}

    {/* <div>
      <button onClick={() => changeValue()}>Cambiar nombre</button>
    </div> */}
      <Divider>Cursos que aun no terminas</Divider>
      {inProfressList.map((course) => {
        return (
          <Col className="gutter-row" xs={12} sm={8} md={12} lg={4} xl={4} key={course.key}>
            <Card
              bodyStyle={{ fontSize: 10 }}
              style={{  fontSize: "10px" }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                // <SettingOutlined key="PlayCircleOutlined" />,
                <PlayCircleOutlined key="PlayCircleOutlined" />,
                // <EditOutlined key="edit" />,
                // <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                className="infoCardCoursesInProgress"
                // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={course.title}
              />
            </Card>
          </Col>
        );
      })}
    </Row>

);
}
export default CoursesInProgress;
