import React, { useEffect, useState } from "react";

import { useNavigate} from "react-router-dom";
import { Divider } from "antd";
import { Avatar, Button, List, Typography } from "antd";
import { ConfigProvider, theme, Card } from "antd";
import services from '../../../../services/http'
const { Text, Link } = Typography;
import "./viewCourses.css";
import axios from "axios";

import NewCourse from "./NewCourse";


interface courseData {
  name: string;
  description: string;
  tags: Object;
  routes: Object;
  category:Object;
  image: string;
  id:string
}


export const ViewCourses = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const count = 3;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);


  const [courses,setCourses] = useState<courseData[]>([])

  const navigate = useNavigate();
 

  useEffect(() => {
    setLoading(true)
    const getData = async ()=>{
      let res = await services.getCourses()
      setCourses(res.data.payload)
    }
    getData()
    setLoading(false)
  }, []);

  const editCourse = async (id:string,item:any) => {
    navigate(id,{
      state:item,
      replace:true
    });
  };

  return (
    <ConfigProvider
        theme={{
          algorithm:darkAlgorithm
        }}
    >
      <div>
        <Divider>Vista de cursos</Divider>

        <div style={{ padding: "10px" }}>

          <List
            itemLayout="horizontal"
            dataSource={courses}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a key="list-loadmore-edit" 
                    onClick={()=>{editCourse(item.id,item)}}
                  >
                    Editar
                  </a>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar src='https://www.w3schools.com/howto/img_avatar.png' shape="square" size={64} />
                  }
                  title={item.name}
                  description={item.description}
                />
              </List.Item>
            )}
          />
          
        </div>
        <NewCourse />
      </div>
      </ConfigProvider>
    
  );
};
