import { Button, Descriptions, List } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { Card, Space, Grid, Row, Col } from 'antd';
import { Divider, Radio, Typography, Popover, Modal } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import services from '../../../../../../services/http'
import NewVideo from "./NewVideo";
import { message } from "antd";
interface customProps{
  videos:any,
  id:any
}

export const VideoEditor = (props:customProps) => {

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open, setOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [currentVideoSelected, setcurrentVideoSelected] = useState('');
  const questionsDefault = [
    {
        "question": "una pregunta?",
        "number": 1,
        "options": [
            {
                "option": "opcion 1",
                "number": 1,
                "correct": false
            },
            {
                "option": "opcion 2",
                "number": 2,
                "correct": true
            },
            {
                "option": "opcion 3",
                "number": 3,
                "correct": false
            }
        ]
    },
    {
      "question": "una pregunta2 ?",
      "number": 2,
      "options": [
          {
              "option": "opcion 10",
              "number": 1,
              "correct": false
          },
          {
              "option": "opcion 2",
              "number": 2,
              "correct": true
          },
          {
              "option": "opcion 3",
              "number": 3,
              "correct": false
          }
      ]
  },
  {
    "question": "una pregunta3 ?",
    "number": 3,
    "options": [
        {
            "option": "opcion 1",
            "number": 1,
            "correct": false
        },
        {
            "option": "opcion 2",
            "number": 2,
            "correct": true
        },
        {
            "option": "opcion 3",
            "number": 3,
            "correct": false
        }
    ]
}
]

  let questionForVideo: any[] = [];
  props.videos.forEach((questionVideo: any) => {
    return questionForVideo.push(questionsDefault)
  })

  // console.log("keys : ", questionForVideo)
  const [questions, setQuestion] = useState(questionsDefault)
  const editVideoInfo = async (id: any, body: any) => {
    await services.editVideoInfo(id, body)
  }

  const editQuestionTitle = async (text: string, indexQuestion: number) => {
    questions[indexQuestion].question = text;;
    setQuestion([...questions])
    console.log("currentVideoSelected", currentVideoSelected)
    await services.addQuestions(currentVideoSelected, questions)
    console.log("esto enviare : ", questions[indexQuestion])
  }

  const getQuestionFromVideo = async (idVideo: string, index: number) => {
    let res = await services.getQuestions(idVideo);
    console.log("getQuestionFromVideo  : ", res)
    if(!res.data.payload) {
      const questionVideo = questionForVideo[index]
      console.log("questionVideo", questionVideo)
      setQuestion([...questionVideo])
      console.log("getQuestionFromVideo", res)
      return;
    }

    const data = res.data.payload.questions;
    setQuestion([...data])
    
  }

  const openModal = (idVideo: any, index: any) => {
    setcurrentVideoSelected(idVideo)
    getQuestionFromVideo(idVideo, index);
    setOpen(true);
  }
  const EditableText = ({ func, text, index }: any) => {
    return (
      <Typography.Title
        editable={{
          onChange: async (value) => {
            await func(value)
            messageApi.open({
              type: 'success',
              content: 'Se realizó la acción de forma correcta.',
            });
          }
        }}
        level={4}
        style={{ margin: 0 }}
        key={index}
      >
        {text}
      </Typography.Title>
    )
  }

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm
        }}
      >
        {contextHolder}
        <Space style={{ display: 'flex', flexWrap: "wrap", maxWidth: '1000px', gap: '20px', marginTop: '30px' }}>
          {
            props.videos.map((value: any, index: any) => {
              return (
                <Card
                  key={index}
                  title={
                    <EditableText text={value['name']} func={
                      (text: any) => {
                        editVideoInfo(value['id'], { 'name': text })
                      }
                    } />
                  }
                  style={{ width: 300 }}
                  extra={
                    <Popover content={<p>Preguntas</p>}>
                      <PlusCircleOutlined style={{ color: 'green', cursor: 'pointer' }} onClick={() => {  openModal(value['id'], index) }} />
                    </Popover>

                  }
                >
                  <img
                    src={value['thumbnail']}
                    style={{ width: '100%' }}
                  />

                  <span style={{ fontSize: 18 }}>
                    <EditableText text={value['description']} func={
                      (text: any) => {
                        editVideoInfo(value['id'], { 'description': text })
                      }
                    } />
                  </span>
                </Card>
              )
            })
          }
        </Space>

          <NewVideo id = {props.id} numberofVideos = {props.videos.length || 0} />

        <Modal width="80vw" title="Preguntas" open={open} onOk={() => { setOpen(false) }} >
          <div style={{ display: 'flex', gap: 50, width: '100%', justifyContent: 'center' }}>
          {questions.length > 0 &&
                    questions.map((item, index: any) => {
                      return (

                        <Row>
                        <Col>
                          <Card key={index} title={<EditableText text={item.question}
                          func={
                            (text: any) => {
                              editQuestionTitle(text, index)
                            }
                          }
                          ind = {index}
                          />} extra={<DeleteOutlined style={{ color: 'red', fontSize: 18, marginLeft: 100 }} />}>
                            <Radio.Group >
                              <Space direction="vertical">
                                {
                                  item.options.map((option, index: any) => {
                                    return (
                                      <Radio key={index} value={1}>{<EditableText text={option.option} />}</Radio>
                                    )
                                  })
                                }
                              </Space>
                            </Radio.Group>
                          </Card>
                        </Col>
                      </Row>

                      )
                    })}
          
            {/* <Row>
              <Col>
                <Card title={<EditableText text={'QUESTION 1'} />} extra={<DeleteOutlined style={{ color: 'red', fontSize: 18, marginLeft: 100 }} />}>
                  <Radio.Group >
                    <Space direction="vertical">
                      <Radio value={1}>{<EditableText text={'OPTION A'} />}</Radio>
                      <Radio value={2}>{<EditableText text={'OPTION B'} />}</Radio>
                      <Radio value={3}>{<EditableText text={'OPTION C'} />}</Radio>
                      <div onClick={() => { alert('ADD OPTION') }} style={{ cursor: 'pointer' }}> + ADD OPTION</div>
                    </Space>
                  </Radio.Group>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card title={<EditableText text={'QUESTION 1'} />} extra={<DeleteOutlined style={{ color: 'red', fontSize: 18, marginLeft: 100 }} />}>
                  <Radio.Group >
                    <Space direction="vertical">
                      <Radio value={1}>{<EditableText text={'OPTION A'} />}</Radio>
                      <Radio value={2}>{<EditableText text={'OPTION B'} />}</Radio>
                      <Radio value={3}>{<EditableText text={'OPTION C'} />}</Radio>
                      <div onClick={() => { alert('ADD OPTION') }} style={{ cursor: 'pointer' }}> + ADD OPTION</div>
                    </Space>
                  </Radio.Group>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card title={<EditableText text={'QUESTION 1'} />} extra={<DeleteOutlined style={{ color: 'red', fontSize: 18, marginLeft: 100 }} />}>
                  <Radio.Group >
                    <Space direction="vertical">
                      <Radio value={1}>{<EditableText text={'OPTION A'} />}</Radio>
                      <Radio value={2}>{<EditableText text={'OPTION B'} />}</Radio>
                      <Radio value={3}>{<EditableText text={'OPTION C'} />}</Radio>
                      <div onClick={() => { alert('ADD OPTION') }} style={{ cursor: 'pointer' }}> + ADD OPTION</div>
                    </Space>
                  </Radio.Group>
                </Card>
              </Col>
            </Row> */}

          </div>


        </Modal>


      </ConfigProvider>
    </>
  );
};
