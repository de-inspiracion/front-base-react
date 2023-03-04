import { Button, Descriptions, List, Upload } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useEffect, useRef, useState } from "react";
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
import ReactPlayer from "react-player";
import services from "../../../../../../services/http";
import NewVideo from "./NewVideo";
import { message } from "antd";
import type { UploadProps } from "antd";

const base_url = import.meta.env.VITE_BASE_URL;
interface customProps {
  videos: any;
  id: any;
  onAction: any;
}
let validateVideos = true;
export const VideoEditor = (props: customProps) => {
  let playerRef = useRef<any>(null);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [open, setOpen] = useState(false);
  const [openModalFiles, setOpenModalFiles] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApiDelete, contextHolderDelete] = message.useMessage();
  const [currentVideoSelected, setcurrentVideoSelected] = useState("");
  const [listFiles, setListFiles] = useState([] as any);
  const [videos, setVideos] = useState([] as any[]);
  const [url, setUrl] = useState('')
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

  setTimeout(() => {
    const v: any[] = props.videos;
    setVideos(v);
  }, 1000);

  let questionForVideo: any[] = [];
  videos.forEach((questionVideo: any) => {
    return questionForVideo.push(questionsDefault);
  });

  const [questions, setQuestion] = useState(questionsDefault);
  const editVideoInfo = async (id: any, body: any) => {
    await services.editVideoInfo(id, body);
    const videosInfo = [...videos];
    const key = Object.keys(body)[0];
    const content = body[key];
    for (let i = 0; i < videosInfo.length; i++) {
      if (videosInfo[i]["id"] == id) {
        videosInfo[i][key] = content;
      }
    }
    setVideos(videosInfo);
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
    getFilesVideo(idVideo);
    setOpenModalFiles(true);
  };

  const getFilesVideo = async (video: string) => {
    const result = await services.getFiles(video);
    if (result?.data?.payload) {
      setListFiles(result.data.payload);
    }
  };

  const deleteVideo = async (video: string) => {
    const result = await services.deleteVideo(video, props.id);
    if (result?.data?.payload) {
      const newVideos = videos.filter((video) => {
        return video.id !== result?.data?.payload._id;
      })
      props.onAction(newVideos)
    }
  };

  const deleteFile = async (file: string, index: number) => {
    const result = await services.deleteFile(currentVideoSelected, file);

    if (result?.data?.payload) {
      setListFiles(result.data.payload);
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
        console.log("info file: ", info);
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
  const handleAction = (newVideo: any) => {
    console.log("newVideo :", newVideo)
    setUrl(newVideo.url)
    props.onAction(videos.concat(newVideo))
  };
  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        {contextHolder}
        <Row justify="center">
          {videos.map((value: any, index: any) => {
            return (
              <Col>
                <Card
                  key={index}
                  style={{ width: "70vw", marginBottom: '10px' }}
                  title={
                    <EditableText
                      text={value["name"]}
                      func={(text: any) => {
                        editVideoInfo(value["id"], { name: text });
                      }}
                    />
                  }
                  // style={{ width: 300 }}
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
                    <DeleteOutlined
                      key="video"
                      onClick={() => {
                        deleteVideo(value["id"]);
                      }}
                    />,
                  ]}
                >

                    <EditableText
                      text={value["description"]}
                      func={(text: any) => {
                        editVideoInfo(value["id"], { description: text });
                      }}
                    />

                </Card>
              </Col>
            );
          })}
        </Row>
        {/* </Space> */}

        <NewVideo
          onAction={(evento: any) => handleAction(evento)}
          id={props.id}
          numberofVideos={props.videos.length || 0}
        />

        <Modal
          width="80vw"
          title="Preguntas"
          open={open}
          onCancel={handleCancel}
          onOk={() => {
            updateQuestions();
          }}
        >
          <Row justify="center">
            {questions.length > 0 &&
              questions.map((item, index: any) => {
                return (
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    xxl={24}
                    style={{ marginBottom: "10px" }}
                  >
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
                );
              })}
          </Row>
        </Modal>

        <Modal
          width="80vw"
          title="Archivos"
          open={openModalFiles}
          onCancel={handleCancelModalFiles}
          onOk={() => {
            setOpenModalFiles(false);
          }}
        >
          <Row>
            <Col xs={12}>
              <Upload maxCount={1} {...propsFiles}>
                <Button icon={<UploadOutlined />}>Cargar</Button>
              </Upload>
            </Col>
          </Row>

          <Row>
            <Col md={24} xl={24} xxl={24}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={listFiles}
                renderItem={(item: any, index) => (
                  <List.Item
                    actions={[
                      <Button
                        onClick={() => deleteFile(item.id, index)}
                        icon={<DeleteOutlined />}
                      >
                        Eliminar
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta title={item?.name} />
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
