import { Button, Descriptions, List, Upload } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { Card, Space, Grid, Row, Col } from "antd";
import { Divider, Radio, Typography, Popover, Modal } from "antd";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  CompassOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  QuestionOutlined,
  FilePdfOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import services from "../../../../../../services/http";
import NewVideo from "./NewVideo";
import { message } from "antd";
import type { UploadProps } from "antd";

const base_url = import.meta.env.VITE_BASE_URL;
interface customProps {
  videos: any;
  id: any;
}

export const VideoEditor = (props: customProps) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open, setOpen] = useState(false);
  const [openModalFiles, setOpenModalFiles] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [currentVideoSelected, setcurrentVideoSelected] = useState("");
  const [listFiles, setListFiles] = useState([] as any);
  const questionsDefault = [
    {
      question: "una pregunta?",
      number: 1,
      options: [
        {
          option: "opcion 1",
          number: 1,
          correct: false,
        },
        {
          option: "opcion 2",
          number: 2,
          correct: true,
        },
        {
          option: "opcion 3",
          number: 3,
          correct: false,
        },
      ],
    },
    {
      question: "una pregunta2 ?",
      number: 2,
      options: [
        {
          option: "opcion 10",
          number: 1,
          correct: false,
        },
        {
          option: "opcion 2",
          number: 2,
          correct: true,
        },
        {
          option: "opcion 3",
          number: 3,
          correct: false,
        },
      ],
    },
    {
      question: "una pregunta3 ?",
      number: 3,
      options: [
        {
          option: "opcion 1",
          number: 1,
          correct: false,
        },
        {
          option: "opcion 2",
          number: 2,
          correct: true,
        },
        {
          option: "opcion 3",
          number: 3,
          correct: false,
        },
      ],
    },
  ];

  let questionForVideo: any[] = [];
  props.videos.forEach((questionVideo: any) => {
    return questionForVideo.push(questionsDefault);
  });

  const [questions, setQuestion] = useState(questionsDefault);
  const editVideoInfo = async (id: any, body: any) => {
    await services.editVideoInfo(id, body);
  };

  const editQuestionTitle = async (text: string, indexQuestion: number) => {
    questions[indexQuestion].question = text;
    setQuestion([...questions]);
  };

  const editOptionQuestion = async (
    text: string,
    indexQuestion: number,
    indexOption: number
  ) => {
    questions[indexQuestion].options[indexOption].option = text;
    setQuestion([...questions]);
  };

  const editCorrectOptionQuestion = async (
    indexQuestion: number,
    indexOption: any
  ) => {
    indexOption = Number(indexOption);
    questions[indexQuestion].options.forEach((opt) => {
      opt.correct = false;
    });
    questions[indexQuestion].options[indexOption].correct = true;
    setQuestion([...questions]);
  };

  const valueOptionSelected = (options: any[]) => {
    let indexOptionSeleceted = 0;
    options.forEach((option: any, idx) => {
      if (option.correct === true) {
        indexOptionSeleceted = idx;
      }
    });
    return indexOptionSeleceted;
  };

  const updateQuestions = async () => {
    try {
      await services.addQuestions(currentVideoSelected, questions);
      messageApi.open({
        type: "success",
        content: "Se realizó la acción de forma correcta.",
      });
      setOpen(false);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "error en la actualización.",
      });
    }
  };
  const getQuestionFromVideo = async (idVideo: string, index: number) => {
    let res = await services.getQuestions(idVideo);
    if (!res.data.payload) {
      const questionVideo = questionForVideo[index];
      setQuestion([...questionVideo]);
      return;
    }

    const data = res.data.payload.questions;
    setQuestion([...data]);
  };

  const openModal = (idVideo: any, index: any) => {
    setcurrentVideoSelected(idVideo);
    getQuestionFromVideo(idVideo, index);
    setOpen(true);
  };

  const handleOpenModalFiles = (idVideo: any, index: any) => {
    setcurrentVideoSelected(idVideo);
    getFilesVideo(idVideo)
    setOpenModalFiles(true);
  };

  const getFilesVideo = async (video:string) => {
    const result = await services.getFiles(video);
    if(result?.data?.payload) {
      setListFiles(result.data.payload)
    }
  };

  const deleteFile = async (file: string, index: number) => {
    console.log("index:" , index)
    console.log("file:" , file)
    const result = await services.deleteFile(currentVideoSelected, file);

    if(result?.data?.payload) {
      setListFiles(result.data.payload)
      messageApi.open({
        type: "success",
        content: "Se realizó la acción de forma correcta.",
      });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCancelModalFiles = () => {
    setOpenModalFiles(false);
  };

  const propsFiles: UploadProps = {
    name: "file",
    action: `${base_url}/videos/${currentVideoSelected}/uploadFile`,
    headers: {},
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log("info file: ", info)
        const responseFile = info.file.response.payload;
        setListFiles([...responseFile]);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const EditableText = ({ func, text, index }: any) => {
    return (
      <Typography.Title
        editable={{
          onChange: async (value) => {
            await func(value);
          },
        }}
        level={4}
        style={{ margin: 0 }}
        key={index}
      >
        {text}
      </Typography.Title>
    );
  };

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        {contextHolder}
        <Space
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "1000px",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          {props.videos.map((value: any, index: any) => {
            return (
              <Card
                key={index}
                title={
                  <EditableText
                    text={value["name"]}
                    func={(text: any) => {
                      editVideoInfo(value["id"], { name: text });
                    }}
                  />
                }
                style={{ width: 300 }}
                // extra={
                //   <Popover content={<p>Preguntas</p>}>
                //     <Button type="primary"  onClick={() => {  openModal(value['id'], index) }}>
                //       Preguntas
                //     </Button>
                //     <PlusCircleOutlined style={{ color: 'green', cursor: 'pointer' }} onClick={() => {  openModal(value['id'], index) }} />
                //   </Popover>

                // }

                actions={[
                  <QuestionOutlined
                    key="questions"
                    onClick={() => {
                      openModal(value["id"], index);
                    }}
                  />,
                  <FilePdfOutlined
                    key="files"
                    onClick={() => {
                      handleOpenModalFiles(value["id"], index);
                    }}
                  />,
                ]}
              >
                <img src={value["thumbnail"]} style={{ width: "100%" }} />

                <span style={{ fontSize: 18 }}>
                  <EditableText
                    text={value["description"]}
                    func={(text: any) => {
                      editVideoInfo(value["id"], { description: text });
                    }}
                  />
                </span>
              </Card>
            );
          })}
        </Space>

        <NewVideo id={props.id} numberofVideos={props.videos.length || 0} />

        <Modal
          width="80vw"
          title="Preguntas"
          open={open}
          onCancel={handleCancel}
          onOk={() => {
            updateQuestions();
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 50,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {questions.length > 0 &&
              questions.map((item, index: any) => {
                return (
                  <Row>
                    <Col>
                      <Card
                        key={index}
                        title={
                          <EditableText
                            text={item.question}
                            func={(text: any) => {
                              editQuestionTitle(text, index);
                            }}
                            ind={index}
                          />
                        }
                        extra={
                          <DeleteOutlined
                            style={{
                              color: "red",
                              fontSize: 18,
                              marginLeft: 100,
                            }}
                          />
                        }
                      >
                        <Radio.Group
                          value={valueOptionSelected(item.options)}
                          onChange={(e) =>
                            editCorrectOptionQuestion(index, e.target.value)
                          }
                        >
                          <Space direction="vertical">
                            {item.options.map((option, indexOption: any) => {
                              return (
                                <Radio key={indexOption} value={indexOption}>
                                  {
                                    <EditableText
                                      text={option.option}
                                      func={(text: any) => {
                                        editOptionQuestion(
                                          text,
                                          index,
                                          indexOption
                                        );
                                      }}
                                    />
                                  }
                                </Radio>
                              );
                            })}
                          </Space>
                        </Radio.Group>
                      </Card>
                    </Col>
                  </Row>
                );
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

        <Modal
          width="80vw"
          title="Archivos"
          open={openModalFiles}
          onCancel={handleCancelModalFiles}
          onOk={() => {
            updateQuestions();
          }}
        >
    
            <Row>
              <Col  xs={12}>
                <Upload {...propsFiles}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Col>
            </Row>

            <Row>
              <Col  xxl={24}>
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={listFiles}
                  renderItem={(item:any, index) => (
                    <List.Item
                      actions={[
                        <Button onClick={() => deleteFile(item.id, index)} icon={<DeleteOutlined />}>Eliminar</Button>
                      ]}
                    >

                    <List.Item.Meta
                      title={item?.name}
                    />

                    </List.Item>
                    
                  )}
                />
              </Col>
            </Row>
        </Modal>
      </ConfigProvider>
    </>
  );
};
