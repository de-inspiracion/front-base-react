import { useState, useEffect, useRef, HtmlHTMLAttributes } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Rate, Modal, Button, Layout, Divider, Card, Row } from "antd";
import services from "../../services/http";
import "./card.css";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

//estilos del modal
const { Content } = Layout;

const CardV: any = ({ itemData, key, index }: any) => {
  const [open, setOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const showModal = () => {
    setOpen(true);
  };
  console.log("data curso: ", courseData);
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

  // console.log(`INDEX: ${index} `,courseData)

  return (
    <div key={key} className="movieRow--item">
      {open && (
        <ModalCard
          index={index}
          data={courseData}
          score={itemData.score}
          Abierto={open}
          Cerrar={handleClose}
        />
      )}
      <img
        src={"https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg"}
        onClick={() => {
          showModal();
        }}
      />
    </div>
  );
};

const ModalCard = ({ data, score, Abierto, Cerrar }: any) => {
  const { user } = useAuth0();
  const [open, setOpen] = useState(Abierto);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [rate, setRate] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  let isScored = false;
  const modalRef = useRef(null);
  const { Meta } = Card;
  // console.log('data videos', data.videos)
  // console.log('datos de id', data.videos[(data.video[1].position)-1].id)
  // const data_videos = data.map((item:any) => {
  //   let data_object = {
  //     "name":item.name,
  //     "duration":item.duration,

  //   }
  //   return data_object
  // })

  const cuourse_tags = ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7"];
  const course_videos = [
    {
      name: "Nombre Video 1",
      decription: "Descripción del video 1",
      url: "https://www.youtube.com/embed/-AgrqLgXUGo",
      duration: "10 min",
    },
    {
      name: "Nombre Video 2",
      decription: "Descripción del video 2",
      url: "https://www.youtube.com/embed/-AgrqLgXUGo",
      duration: "10 min",
    },
    {
      name: "Nombre Video 3",
      decription: "Descripción del video 3",
      url: "https://www.youtube.com/embed/-AgrqLgXUGo",
      duration: "10 min",
    },
    {
      name: "Nombre Video 3",
      decription: "Descripción del video 3",
      url: "https://www.youtube.com/embed/-AgrqLgXUGo",
      duration: "10 min",
    },
    {
      name: "Nombre Video 4",
      decription: "Descripción del video 4",
      url: "https://www.youtube.com/embed/-AgrqLgXUGo",
      duration: "10 min",
    },
    {
      name: "Nombre Video 5",
      decription: "Descripción del video 5",
      url: "https://www.youtube.com/embed/-AgrqLgXUGo",
      duration: "10 min",
    },

    {
      name: "Nombre Video 6",
      decription: "Descripción del video 6",
      url: "https://www.youtube.com/embed/-AgrqLgXUGo",
      duration: "10 min",
    },
  ];
  const container_height: any = {
    none: "100 vh",
    dual: "255 vh",
    one: "155 vh",
  };

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

  console.log(userInfo.id, "id del usuario");
  // Post de Score
  console.log(data.videos, "data videos");

  useEffect(() => {
    (async () => {
      let res = await services.getUserInfo(String(user?.email));
      setUserInfo(res);
    })();
  }, []);

  // const scoredUser = getData.payload.scored

  useEffect(() => {
    const idVideo = data.videos[videoIndex - 1]?.id;
    const user: any = userInfo;
    console.log(idVideo, "id del video");

    console.log(videoIndex, "index del video");

    console.log(data.videos, "data videos");

    console.log(data.videos[videoIndex]?.score.averageScore, "score del video");
    console.log("user info", userInfo);
    //aqui usamos el ID del usuario
    const headers = {
      userId: userInfo.id, //id del usuario
    };

    const userScore = {
      score: rate,
    };

    if (rate > 0) {
      axios
        .post(
          `https://nestjs-virgo-production.up.railway.app/videos/${idVideo}/score`,
          userScore,
          { headers: headers }
        )
        .then((res) => {
          console.log(res, "se envio a la base de datos");
          user.scored.push({video: idVideo})
          isScored = true
        })
        .catch((error) => {
          console.log(error, "error al enviar la calificacion");
        })
        .finally();
    } else {
      console.log("no se envio nada");
    }
  }, [rate]);

  const GetRateComponent = () => {
    const user: any = userInfo;
    const currentVideo = data.videos[videoIndex - 1]
    if(!user?.scored || !currentVideo) {
      return;
    }

    user.scored.forEach((score: any) => {
      if (score.video == currentVideo.id) {
        isScored = true
      }
    });
    return (
      <Rate
        allowHalf
        disabled={isScored}
        defaultValue={0}
        value={data.videos[videoIndex - 1]?.score.averageScore}
        onChange={(value) => setRate(value)}
      />
    );
  };

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
        <Row
          style={{
            width: "100%",
            maxWidth: "750px",
            height: "45vh",
            maxHeight: "550px",
          }}
        >
          {/* <iframe src="https://iframe.mediadelivery.net/embed/759/eb1c4f77-0cda-46be-b47d-1118ad7c2ffe?autoplay=true" 
                loading="lazy"  style={{width:'100%'}}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true}>
            </iframe> */}
          {videoIndex === 0 ? (
            <img
              src="https://i.ytimg.com/vi/Dc6likh5aWk/maxresdefault.jpg"
              alt="foto curso"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <iframe
              src={`${data.videos[videoIndex - 1].urlEmbed}?autoplay=true`}
              loading="lazy"
              style={{ width: "100%", height: "100%" }}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen={true}
            ></iframe>
          )}
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
                {
                  // Si existe el video en el array de videos puntuados por el usuario debo deshabilitar el rate

                  // video actual vs video puntuado  utilizando un forEach de los scores del usuario

                  GetRateComponent()
                }

                {data.videos[videoIndex - 1]?.score.averageScore ? (
                  <p
                    style={{
                      color: "white",
                      fontSize: "18px",
                      paddingLeft: "15px",
                    }}
                  >
                    {data.videos[videoIndex - 1]?.score.averageScore} / 5
                  </p>
                ) : (
                  <p
                    style={{
                      color: "white",
                      fontSize: "18px",
                      paddingLeft: "15px",
                    }}
                  >
                    {rate}/5
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
                height: "100%",
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
                <div style={{ color: "grey" }}>Experto</div>
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
                <div style={{ color: "grey" }}>Etiquetas</div>
                <div
                  style={{
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {cuourse_tags.length > 0 &&
                    cuourse_tags.map((item, index) => {
                      if (index === cuourse_tags.length - 1) {
                        return (
                          <div style={{ marginRight: "1%", marginBottom: "0" }}>
                            {item}
                          </div>
                        );
                      } else {
                        return (
                          <div style={{ marginRight: "1%", marginBottom: "0" }}>
                            {item},{" "}
                          </div>
                        );
                      }
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
            {data.videos.map((item: any) => {
              return (
                <div
                  className="videoInfo"
                  onClick={() => {
                    setVideoIndex(item.position);
                    modalRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    width: "95%",
                    height: "150px",
                    marginTop: "2%",
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
                  {/* <iframe width="40%" height="90%" src="https://iframe.mediadelivery.net/embed/759/eb1c4f77-0cda-46be-b47d-1118ad7c2ffe?autoplay=false" style={{borderStyle:'none'}}  loading="lazy" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true}/> */}
                  {/* <iframe src={item.urlEmbed+'?autoplay=false'} 
                    loading="lazy"  style={{width:'60%'}}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true}>
                  </iframe> */}
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
              width: "90%",
              height: "50vh",
              overflow: "scroll",
              justifyContent: "center",
              display: "flex",
              marginTop: "10%",
            }}
          >
            {course_videos.map((item, index) => {
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
                  <Meta
                    style={{ color: "white" }}
                    title={`Ruta de aprendizaje {index + 1}`}
                  />
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
