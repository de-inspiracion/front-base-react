import { Button, Descriptions, List } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { Card, Space } from 'antd';
import { Divider, Radio, Typography,Popover,Modal } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
export const VideoEditor = ({videos}) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open,setOpen] = useState(false)  

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
                    <PlusCircleOutlined style = {{color:'green',cursor:'pointer'}} onClick= {()=>{setOpen(true)}} />
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

      

      <Modal width="80%" title="Preguntas" open={open} onOk = {()=>{setOpen(false)}}>
        
          <div style={{display:'flex',gap:50,width:'100%',justifyContent:'center'}}>
            <Card title = "QUESTION 1">
                <Radio.Group >
                  <Space direction="vertical">
                    <Radio value={1}>Option AOption AOption AOption Option AOption AOption AOption Option AOption AOption AOption Option AOption AOption AOption Option AOption AOption AOption Option AOption AOption AOption A</Radio>
                    <Radio value={2}>Option B</Radio>
                    <Radio value={3}>Option C</Radio>
                    <Radio value={4}>
                      More...
                    </Radio>
                  </Space>
                </Radio.Group>
            </Card>

            <Card title = "QUESTION 1">
                <Radio.Group >
                  <Space direction="vertical">
                    <Radio value={1}>OpOption AOption AOption AOption Option AOption AOption AOption Option AOption AOption AOption tion A</Radio>
                    <Radio value={2}>Option B</Radio>
                    <Radio value={3}>OptiOption AOption AOption AOption Option AOption AOption AOption Option AOption AOption AOption on C</Radio>
                    <Radio value={4}>
                      More...
                    </Radio>
                  </Space>
                </Radio.Group>
            </Card>

            <Card title = "QUESTION 1">
                <Radio.Group >
                  <Space direction="vertical">
                    <Radio value={1}>Option A</Radio>
                    <Radio value={2}>Option B</Radio>
                    <Radio value={3}>OpOption AOption AOption AOption Option AOption AOption AOption Option AOption AOption AOption tion C</Radio>
                    <Radio value={4}>
                      More...
                    </Radio>
                  </Space>
                </Radio.Group>
            </Card>
          </div>


      </Modal>


      </ConfigProvider>
    </>
  );
};
