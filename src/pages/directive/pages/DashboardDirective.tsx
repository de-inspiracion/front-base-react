import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import services from "../../../services/http";

const { Column} = Table;

interface Courses {
    key: React.Key;
    id: string;
    name: string;
    estado: string;
  }

const data: Courses[] = [
  {key:1, id: '63dd554cb57c09585bc719c', name: "Curso de matemáticas", estado: "activo" },
  {key:2, id: '63dd901eb57c09585bc71cc4', name: "Curso de ciencias", estado: "inactivo" },
  {key:3, id: '63dd90ceb57c09585bc71cfd', name: "Curso de historia", estado: "activo" },
];

const DashboardDirective: React.FC = () => {
  const [excludeIdCourse, setExcludeIdCourse] = useState('');
  const [exclude, setExclude] = useState(false);
  const [getCourses, setGetCourses] = useState([]);


  useEffect(() => {
    const getCourses = async () => {
      // setIems(await services.getCourseVideos(courseData[0].id).payload)
      let res = await services.getCourses();
      setGetCourses(res.data.payload);
    };
    getCourses();
  }, []);

  console.log(getCourses);

  const excludeCourse = (key: React.Key) => {
    const newData = [...data];
    const target = newData.find((item) => key === item.key);
    if (target) {
      target.estado = 'excluido';
      setExclude(!exclude);
      setExcludeIdCourse(target.id);
    }
  };

  return (
    <Table dataSource={data}>
      <Column title="Courses" dataIndex="name" key="firstName" />
      <Column title="Courses" dataIndex="estado" key="firstName" />
      <Column
        title="Action"
        key="action"
        render={(_: any) => (
          <Space size="middle">
            {/* //excluir curso y luego bloquear el boton*/}
            <Button onClick={() => excludeCourse(_.key)}>Excluir</Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default DashboardDirective;