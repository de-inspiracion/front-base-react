import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import axios from "axios";
import services from "../../../services/http";
import { useSelector } from "react-redux";

const { Column } = Table;

const DashboardDirective: React.FC = () => {
  const [idCourse, setIdCourse] = useState<string>("");
  const [getCourses, setGetCourses] = useState<[]>([]);
  const [enable, setEnable] = useState<boolean>(true);
  const [includeExclude, setIncludeExclude] = useState<string>("include");

  const userInfo = useSelector((estado: any) => estado.userInfo);

  useEffect(() => {
    const getCoursesDirective = async (idDirective: string) => {
      const res = await services.getCoursesDirective(idDirective);
      setGetCourses(res.data.payload);
    };
    getCoursesDirective(userInfo.directive?.id);
  }, []);

  const excludeIncludeCourse = (id: string) => {
    const newData = [...getCourses];
    const target: any = newData.find((item: any) => id === item.id);
    if (target) {
      target.exclude = !target.exclude;
      setIdCourse(target.id);
      setEnable(target.exclude);
    }
  };
  console.log("idCourse", idCourse);
  console.log(enable);

  useEffect(() => {
    if (enable === false) {
      setIncludeExclude("include");
    } else {
      setIncludeExclude("exclude");
    }
  }, [enable]);

  const postToDB = () => {
    const variable = includeExclude;
    console.log(variable);
    const idDirective = userInfo.directive?.id;
    const bodyPost = {
      course: idCourse,
    };
    axios
      .post(
        `https://nestjs-virgo-production.up.railway.app/directive/${idDirective}/${variable}`,
        bodyPost,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("se envio exclude");
        console.log(res.data.payload);
      })
      .catch((err) => {
        console.log(err);
        console.log("no se envio");
      });
  };

  useEffect(() => {
    postToDB();
  }, [idCourse]);

  return (
    <Table dataSource={getCourses}>
      <Column title="Courses" dataIndex="name" key="firstName" />
      <Column
        title="Excluir"
        key="excluir"
        render={(course: any) => (
          <Space size="middle">
            <Button onClick={() => excludeIncludeCourse(course.id)}>
              {course.exclude ? "Excluir" : "Incluir"}
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default DashboardDirective;
