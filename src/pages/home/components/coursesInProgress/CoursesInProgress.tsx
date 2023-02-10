import React, { useEffect, useState } from "react";
import { Card, Row, Space, Typography } from "antd";
const { Meta } = Card
import "./coursesInProgress.css";
import { getListInProgress } from "../../services/home.service";
import { useSelector, useDispatch } from "react-redux";
import { newDataUser } from "../../../../store/user/userData";
import CardSlice from "../../../../components/cardSlice/cardSlice";
import services from "./services/http";
import CourseInProgressModal from "./components/CourseInProgressModal";
const inProfressList = [
  { title: "curso 1", key: 0 },
  { title: "curso 2", key: 1 },
];

const coursesInProgress = getListInProgress().then((data) => {
  // console.log(data.data)
});

const CoursesInProgress: React.FC = () => {
  const userInfo = useSelector((state: any) => state.userInfo);
  const dispatch = useDispatch();
  const changeValue = () => {
    dispatch(newDataUser("alejandro"));
  };

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await services.getCategories();
      setCategories(res.data.payload);
    };
    getData();
  }, []);
  return (
    <>
      <Row
        className=""
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ overflow: "hidden" }}
      >
        {userInfo.inprogress.length > 0 && 
          <CardSlice title="Cursos en Progreso" id="progreso" source="En Progreso" description="Cursos en Progreso"/>
        }
        {categories.length > 0 &&
          categories.map((categoria: any) => {
            return (
              <CardSlice
                title={categoria.name}
                id={categoria.id}
                description={categoria.description}
              />
            );
          })}
      </Row>
    </>
  );
};
export default CoursesInProgress;
