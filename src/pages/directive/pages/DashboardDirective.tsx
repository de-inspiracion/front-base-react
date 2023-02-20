import React, { useEffect, useState } from 'react';
import { Button, Space, Table} from 'antd';
import axios from 'axios';
import services from "../../../services/http";

const { Column} = Table;

interface Directive {
  _id: string;
  idCourse: string;
  idUser: string;
  enable: boolean;
}

interface Directive {
  id: string;
  idCourse: string;
  idUser: string;
  enable: boolean;
}


const DashboardDirective: React.FC = () => {
  const [idCourse, setIdCourse] = useState<string>('');
  const [idCourseInclude, setIdCourseInclude] = useState<string>('');
  const [getCourses, setGetCourses] = useState<[]>([]);
  const [getDirective, setGetDirective] = useState<Directive[]>([]);


  useEffect(() => {
    const getCourses = async () => {
      // setIems(await services.getCourseVideos(courseData[0].id).payload)
      let res = await services.getCourses();
      setGetCourses(res.data.payload);
    };
    const getDirective = async () => {
      let res = await services.getDirective();
      setGetDirective(res.data);
    };
    getDirective();
    getCourses();
  }, []);

    console.log(getDirective);
    console.log(getCourses);
  const excludeCourse = (id: string) => {
    const newData = [...getCourses];
    const target: any = newData.find((item: any) => id === item.id);
    if (target) {
      setIdCourse(target.id);
    }
  };

  const postToDB = () => {
    const idDirective = getDirective[0]?._id;

    console.log(idDirective);
    const bodyPost = {
      idCourse: idCourse,
    };
    axios.post(`https://nestjs-virgo-production.up.railway.app/directive/${idDirective}/exclude`, bodyPost, {
      headers: {
        'Content-Type': 'application/json',
        },
        })
      .then(res => {
        console.log('se envio')
        console.log(res.data.payload)
      })
      .catch(err => {
        console.log(err)
        console.log('no se envio')
      })
  }


  const includeCourse = (id: string) => {
    const newData = [...getCourses];
    const target: any = newData.find((item: any) => id === item.id);
    if (target) {
      setIdCourseInclude(target.id);
    }
  };

  const postToDBInclude = () => {
    const idDirective = getDirective[0]?._id;
    const bodyPost = {
      idCourse: idCourseInclude,
    };
    axios.post(`https://nestjs-virgo-production.up.railway.app/directive/${idDirective}/include`, bodyPost, {
      headers: {
        'Content-Type': 'application/json',
        },
        })
      .then(res => {
        console.log('se envio')
        console.log(res.data.payload)
      })
      .catch(err => {
        console.log(err)
        console.log('no se envio')
      })
  }

  useEffect(() => {
    postToDB()
  }, [idCourse])

  useEffect(() => {
    postToDBInclude()
  }, [idCourseInclude])

  return (
    <Table dataSource={getCourses}>
      <Column title="Courses" dataIndex="name" key="firstName" />
      <Column
        title="Excluir"
        key="excluir"
        render={(course: any) => (
          <Space size="middle">
            <Button onClick={() => excludeCourse(course.id)}>Excluir</Button>
          </Space>
        )}
      />
            <Column
        title="Incluir"
        key="incluir"
        render={(course: any) => (
          <Space size="middle">
            <Button onClick={() => includeCourse(course.id)}>Incluir</Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default DashboardDirective;