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
import CardSlice from "../../../../components/cardSlice/cardSlice";

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
  <>
  {/* <div className="titleV">
    <p>Cursos que aun no terminas</p>
  </div> */}
  <Row className="" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ overflow: 'hidden'}}>
  <CardSlice title='en progreso'></CardSlice>
  <CardSlice title='Recomendado'></CardSlice>
  <CardSlice title='educacion'></CardSlice>
  <CardSlice title='rura 1'></CardSlice>
{/* <div style="position: relative; padding-top: 56.25%;"><iframe src="https://iframe.mediadelivery.net/embed/80619/2d4d89ed-f1f8-4a7d-8e61-1b04f58a0a33?autoplay=false&preload=false" loading="lazy" style="border: none; position: absolute; top: 0; height: 100%; width: 100%;" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe></div>
    <div style={{ color: 'black' }}>
      {count.name}
    </div> */}
      {/* {inProfressList.map((course) => {
        return (
          <Col className="gutter-row" xs={12} sm={8} md={12} lg={4} xl={4} key={course.key}>
            <CardSlice></CardSlice>
          </Col>
        );
      })} */}
    </Row>
      </>
);
}
export default CoursesInProgress;