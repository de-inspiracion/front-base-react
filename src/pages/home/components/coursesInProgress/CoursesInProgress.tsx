import React, { useEffect, useState } from "react";
import { Row } from "antd";
import "./coursesInProgress.css";
import { useSelector } from "react-redux";
import CardSlice from "../../../../components/cardSlice/cardSlice";
import services from "./services/http";


const CoursesInProgress: React.FC = () => {
  const userInfo = useSelector((state: any) => state.userInfo);

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
