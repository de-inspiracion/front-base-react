import { Button, Descriptions, List } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { Card, Space ,Grid, Row,Col} from 'antd';
import { Divider, Radio, Typography,Popover,Modal } from "antd";
import { PlusCircleOutlined,DeleteOutlined } from '@ant-design/icons';
import services from '../../../../../../services/http'

export const VideoEditor = ({videos}) => {
  
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open,setOpen] = useState(false)  

  const editVideoInfo = async (id:any,body:any) => {
    await services.editVideoInfo(id,body)
  }

  const EditableText = ({func,text})=>{
    return (
      <Typography.Title
                  editable={{
                    onChange: async (value) => {
                      await func(value)
                      // window.location.reload()
                    }
                  }}
                  level={4}
                  style = {{margin:0}}
                >
                  {text}
                </Typography.Title>
    )
  }
  
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
                key={index}
                title={
                  <EditableText text = {value['name']} func = {
                    (text:any)=>{
                      editVideoInfo(value['id'],{'name':text})
                    }
                  }/>
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
                  <EditableText text={value['description']} func = {
                    (text:any)=>{
                      editVideoInfo(value['id'],{'description':text})
                    }
                  }/>
                </span>
              </Card>
            )
          })
        }
      </Space>

      

      <Modal width="80vw" title="Preguntas" open={open} onOk = {()=>{setOpen(false)}} >
          <div style = {{cursor:'pointer'}}>
            + ADD QUESTION
          </div>
          <div style={{display:'flex',gap:50,width:'100%',justifyContent:'center'}}>
            <Row>
              <Col>
                <Card title = {<EditableText text={'QUESTION 1'} />} extra = {<DeleteOutlined style = {{color:'red',fontSize:18,marginLeft:100}} />}>
                    <Radio.Group >
                      <Space direction="vertical">
                        <Radio value={1}>{<EditableText text={'OPTION A'} />}</Radio>
                        <Radio value={2}>{<EditableText text={'OPTION B'} />}</Radio>
                        <Radio value={3}>{<EditableText text={'OPTION C'} />}</Radio>
                        <div onClick={()=>{alert('ADD OPTION')}} style = {{cursor:'pointer'}}> + ADD OPTION</div>
                      </Space>
                    </Radio.Group>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card title = {<EditableText text={'QUESTION 1'} />} extra = {<DeleteOutlined style = {{color:'red',fontSize:18,marginLeft:100}} />}>
                    <Radio.Group >
                      <Space direction="vertical">
                        <Radio value={1}>{<EditableText text={'OPTION A'} />}</Radio>
                        <Radio value={2}>{<EditableText text={'OPTION B'} />}</Radio>
                        <Radio value={3}>{<EditableText text={'OPTION C'} />}</Radio>
                        <div onClick={()=>{alert('ADD OPTION')}} style = {{cursor:'pointer'}}> + ADD OPTION</div>
                      </Space>
                    </Radio.Group>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card title = {<EditableText text={'QUESTION 1'} />} extra = {<DeleteOutlined style = {{color:'red',fontSize:18,marginLeft:100}} />}>
                    <Radio.Group >
                      <Space direction="vertical">
                        <Radio value={1}>{<EditableText text={'OPTION A'} />}</Radio>
                        <Radio value={2}>{<EditableText text={'OPTION B'} />}</Radio>
                        <Radio value={3}>{<EditableText text={'OPTION C'} />}</Radio>
                        <div onClick={()=>{alert('ADD OPTION')}} style = {{cursor:'pointer'}}> + ADD OPTION</div>
                      </Space>
                    </Radio.Group>
                </Card>
              </Col>
            </Row>

          </div>


      </Modal>


      </ConfigProvider>
    </>
  );
};
