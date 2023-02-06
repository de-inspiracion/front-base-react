import { useState, useEffect, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Rate,
  Modal,
  Button,
  Layout,
  Divider,
  Card,
  Row,
  Space,
  Tag,
} from "antd";
import services from "../../services/http";
import { ReactNetflixPlayer } from "react-netflix-player";
import "./card.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useSelector } from 'react-redux'
//estilos del modal

const { Content } = Layout;

const CardV: any = ({ itemData, Image, key, index }: any) => {
  const [open, setOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  if (Object.keys(itemData).includes("_id")) {
    itemData["id"] = itemData["_id"];
    delete itemData["_id"];
  }
  const showModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      // setIems(await services.getCourseVideos(courseData[0].id).payload)
      let res = await services.getCourseVideos(itemData.id);
      setCourseData(res.payload);
    };
    getData();
  }, []);
  console.log(courseData)
  return (
    <div
      key={key}
      className="movieRow--item"
      style={{ overflow: "auto", height: "300px" }}
    >
      {open && (
        <ModalCard
          index={index}
          data={courseData}
          Abierto={open}
          Cerrar={handleClose}
        />
      )}
      <img
        style={{ height: "100%" }}
        src={
          Image
            ? Image
            : "https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg"
        }
        onClick={() => {
          showModal();
        }}
      />
    </div>
  );
};

const ModalCard = ({ data, Abierto, Cerrar }: any) => {

  const { user } = useAuth0();
  const [open, setOpen] = useState(Abierto);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [rate, setRate] = useState(0);
  const [isScored, setIsScored] = useState(false);
  const userInfo = useSelector( estado => estado.userInfo )
  let videoTime = 0


  const modalRef: any = useRef(null);
  const { Meta } = Card;

  const course_tags = data.tags;
  const course_videos = data.videos;
  const course_routes = data.route;


  const cerrarModal = () => {
    Cerrar(false);
    setOpen(false);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      cerrarModal();
      setConfirmLoading(false);
    }, 2000);
  };

  const GetRateComponent = () => {
    const user: any = userInfo;
    const currentVideo: any = data?.videos[videoIndex - 1];
    if (!user?.scored || !currentVideo) {
      return;
    }

    user.scored.forEach((score: any) => {
      if (score.video == currentVideo?.id) {
        console.log("el score es true");
      } else {
        console.log("el score es false");
      }
    });


    return (
      <Rate
        allowHalf
        disabled={isScored}
        defaultValue={0}
        value= {data.videos[videoIndex - 1]?.score.averageScore}
        onChange={(value) => setRate(value)}
      />
    );
  };


  useEffect(() => {
    const idVideo = data.videos[videoIndex - 1]?.id;
    //aqui usamos el ID del usuario
    const user = userInfo;
    
    const headers = {
      userId: userInfo.id, //id del usuario
    };
    const userScore = {
      score: rate,
    };

    if (rate > 0 && videoIndex > 0) {
      axios
        .post(
          `https://nestjs-virgo-production.up.railway.app/videos/${idVideo}/score`,
          userScore,
          { headers: headers }
        )
        .then((res) => {
          console.log(res, "se envio a la base de datos");
          user.scored.push({ video: idVideo });
          setIsScored(true);
        })
        .catch((error) => {
          console.log(error, "error al enviar la calificacion");
        });
    } else{
      console.log("no post")
    }

  }, [rate]);



  console.log("data", data)
  console.log(data.videos[videoIndex - 1]?.score.averageScore, "score")
  console.log(isScored, "isScored")
  return (
    <Modal
      open={open}
      onCancel={cerrarModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      footer={false}
      closeIcon={
        <CloseOutlined
          style={{
            color: "white",
            background: "#101012e3",
            padding: "8px",
            borderRadius: "50%",
          }}
        />
      }
      width="70vw"
      // height='1300px'
      style={{ maxWidth: "800px", overflowY: "auto" }}
    >
      <Layout ref={modalRef} style={{ background: "#181818", padding: "0 0" }}>
      <Row style={{ width: '100%', maxWidth: '750px', height: '45vh', maxHeight: '550px' }}>
          {
            videoIndex === 0 ?
              <img src={data ? data.cover : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'} alt="foto curso" style={{ width: '100%', height: '100%' }} />
              :
              <div style={{ width: '100%', height: '100%' }}>
                <ReactNetflixPlayer  src={data.videos[videoIndex-1].urlEmbed} autoPlay={true} fullPlayer={false}
                onTimeUpdate={
                    async (evt)=>{
                      let time = evt.target.currentTime
                      if(time - videoTime > 5){
                        // setVideoTime(time)
                        videoTime = time
                        // console.log('desde video mandar data')
                        let body = {
                          idVideo: data.videos[videoIndex-1].id,
                          idCourse: data.id,
                          progress: time,
                          finished: false,
                          num: videoIndex
                        }
                        // console.log(body)
                        const res = await services.editUserVideoProgress(userInfo.id,body)
                        // console.log(res)
                      }
                    }
                  }
                onEnded={
                  async () => {
                    //mandar data del video aca con un finished true
                    let body = {
                      idVideo: data.videos[videoIndex-1].id,
                      idCourse: data.id,
                      progress: data.videos[videoIndex-1].duration,
                      finished: true,
                      num: videoIndex
                    }

                    const res = await services.editUserVideoProgress(userInfo.id,body)
                    // console.log('termino')
                    // console.log('res',res)
                    // console.log(body)                    
                  }
                }
              />
              </div>
          }
        </Row>
        <Content
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "40vh",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                background: "#101012e3",
                marginTop: "3%",
                padding: "0 25px",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {GetRateComponent()}
                {data.videos[videoIndex - 1]?.score.averageScore || isScored ? (
                  <p
                    style={{
                      color: "white",
                      fontSize: "15px",
                      paddingLeft: "15px",
                    }}
                  >
                    Puntuación enviada
                  </p>
                ) : (
                  <p
                    style={{
                      color: "white",
                      fontSize: "15px",
                      paddingLeft: "15px",
                    }}
                  >
                    Califícanos
                  </p>
                )}
              </div>
              {videoIndex === 0 ? (
                <h2 style={{ color: "grey", margin: "0" }}>{data.name}</h2>
              ) : (
                <h2 style={{ color: "grey", margin: "0" }}>
                  {data.videos[videoIndex - 1].name}
                </h2>
              )}
              {videoIndex === 0 ? (
                <p style={{ color: "white", overflowY: "auto", width: "100%" }}>
                  {data.description}
                </p>
              ) : (
                <p style={{ color: "white", overflowY: "auto", width: "100%" }}>
                  {data.videos[videoIndex - 1].description}
                </p>
              )}
            </div>
            <div
              style={{
                background: "#101012e3",
                marginTop: "3%",
                padding: "0 25px",
                display: "flex",
                width: "100%",
                maxWidth: "750px",
                height: "200px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div style={{ color: "grey", fontSize: "2.3vh" }}>Experto</div>
                <div style={{ color: "white" }}>Nombre Completo Experto</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div style={{ color: "grey", fontSize: "2.3vh" }}>
                  Etiquetas
                </div>
                <div
                  style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {course_tags.length > 0 &&
                    course_tags.map((item: any, index: any) => {
                      return <Tag style={{ color: "white" }}>{item}</Tag>;
                    })}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "50vh",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "2.5%",
            }}
          >
            <div
              style={{
                padding: "0 25px",
                background: "#101012e3",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "bold",
                  margin: "5px",
                }}
              >
                Cápsulas de video
              </p>
            </div>
            { course_videos.map((item: any) => {
              return (
                <div
                  className="videoInfo"
                  onClick={() => {
                    setVideoIndex(item.position);
                    modalRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "80px",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      width: "10%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    {item.position}
                  </div>
                  <img
                    src={item.thumbnail}
                    width="20%"
                    style={{ cursor: "pointer" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "60%",
                      height: "100%",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <div>{item.name}</div>
                    <div style={{ overflow: "scroll" }}>{item.decription}</div>
                  </div>
                  <div
                    style={{
                      width: "25%",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {item.duration} min.
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              flexWrap: "wrap",
              gap: "15px",
              width: "100%",
              overflow: "scroll",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                padding: "0 25px",
                background: "#101012e3",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "bold",
                  margin: "5px",
                }}
              >
                Rutas de aprendizaje
              </p>
            </div>
            {course_routes.map((item: any) => {
              return (
                <Card
                  //  style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100px', border: '1px solid green', marginTop: '2%', color: 'white' }}
                  hoverable
                  style={{ width: "155px", height: "155px" }}
                  cover={
                    <img
                      style={{ height: "100px" }}
                      alt="example"
                      src="https://ichef.bbci.co.uk/news/640/cpsprodpb/870D/production/_111437543_197389d9-800f-4763-8654-aa30c04220e4.png"
                    />
                  }
                >
                  <Meta style={{ color: "white" }} title={item.name} />
                </Card>
              );
            })}
          </div>
        </Content>
      </Layout>
    </Modal>
  );
};
export default CardV;
