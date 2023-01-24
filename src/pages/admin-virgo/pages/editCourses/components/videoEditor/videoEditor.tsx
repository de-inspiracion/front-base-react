import { Button, Descriptions, List } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { Card, Space } from 'antd';
import { Divider, Radio, Typography,Popover  } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
export const VideoEditor = ({videos}) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  // const [video,setVideos] = useState(videos)
  console.log(videos)
  return (
    <>
    <ConfigProvider
        theme={{
          algorithm:darkAlgorithm
        }}
    >
      <Space>
        {
          videos.map((value:any,index:any)=>{
            return(
              <Card 
                title={
                  <Typography.Title
                  editable={{
                    onChange: (value) => {
                      console.log(value)
                      // setDescriptionCourse(value)
                      // editCourseData(currentState.id,'description',value)
                    }
                  }}
                  onChange = {(data)=>console.log(data)}
                  level={4}
                  style = {{margin:0}}
                >
                  {value['name']}
                </Typography.Title>
                }
                style={{ width: 300,marginLeft:10 }}
                extra = {
                  <Popover  content={<p>Preguntas</p>}>
                    <PlusCircleOutlined style = {{color:'green',cursor:'pointer'}} onClick= {()=>{alert("open modal to add question")}} />
                  </Popover>
                
              }
              >
                <img 
                  src={value['thumbnail']}
                  style = {{width:'100%'}}
                />
              
                <span style = {{fontSize:18}}>
                <Typography.Title
                  editable={{
                    onChange: (value) => {
                      console.log(value)
                      // setDescriptionCourse(value)
                      // editCourseData(currentState.id,'description',value)
                    }
                  }}
                  onChange = {(data)=>console.log(data)}
                  level={4}
                  style = {{margin:0}}
                >
                  {value['description']}
                </Typography.Title>
                </span>
              </Card>
            )
          })
        }
      </Space>

      
      </ConfigProvider>
    </>
  );
};
