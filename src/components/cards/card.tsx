import { useState, useEffect, useRef } from "react";
import { CheckCircleOutlined, CloseOutlined, DownloadOutlined } from "@ant-design/icons";
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
  Skeleton,
} from "antd";
import services from "../../services/http";
import ReactPlayer from "react-player";
import "./card.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { newDataUser } from "../../store/user/userData";
import { updateVideoTimeStamp } from "../../store/user/userData";
import TestModal from "../shared/TestModal";
const base_url = import.meta.env.VITE_BASE_URL;
const { Content } = Layout;
const CardV: any = ({ itemData, Image, key, index }: any) => {
  const [open, setOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [openSkeleton, setOpenSkeleton] = useState(false);
  const userInfo = useSelector((estado: any) => estado.userInfo);
  if (Object.keys(itemData).includes("_id")) {
    itemData["id"] = itemData["_id"];
    delete itemData["_id"];
  }

  const showModal = async (showId:string) => {
    setOpenSkeleton(true)
    let res = await services.getCourseVideos(showId);
    let r_ = await services.assingRoutes(showId)
    let resGetCourseVideosFinished = await services.getCourseVideosFinished(
      showId,
      userInfo.id
    );
    const finishedVideos = resGetCourseVideosFinished.payload;

    res.payload.videos.forEach((video: any) => {
      finishedVideos.forEach((finishedVideo: any) => {
        if (finishedVideo.video === video.id) {
          video["finished"] = true;
        }
      });
    });
    res.payload.route = r_
    setOpenSkeleton(false)
    setCourseData(res.payload);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      key={key}
      className="movieRow--item"
      style={{ overflow: "hidden", width: "195px", height: "300px" }}
    >
      { openSkeleton && 
      <ModalSkeleton></ModalSkeleton>
      }
      {open && (
        <ModalCard
          index={index}
          data={courseData}
          Abierto={open}
          Cerrar={handleClose}
          showModal = {showModal}
        />
      )}
      <img
        style={{ height: "100%" }}
        src={Image ? Image : ""}
        onClick={() => {
          showModal(itemData.id);
        }}
      />
    </div>
  );
};

const ModalSkeleton = () => {
  

  return (
      <Modal 
      footer={[]}
      title="cargando capsulas" open={true}>
        <Skeleton active></Skeleton>
      </Modal>
  );
}

const ModalCard = ({ data, Abierto, Cerrar, showModal }: any) => {
  // console.log('CardV Modal: ',data)
  let playerRef = useRef<any>(null);
  const { user } = useAuth0();
  const [open, setOpen] = useState(Abierto);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [rate, setRate] = useState(0);
  const [isScored, setIsScored] = useState(false);
  const userInfo = useSelector((estado: any) => estado.userInfo);
  const dispatch = useDispatch();
  const [videoTime, setVideoTime] = useState(0);
  const modalRef: any = useRef(null);
  const { Meta } = Card;
  const [openTestModal, setOpenTestModal] = useState(false);
  const [dataTest, setDataTest] = useState({});
  const [finishedCourse, setFinishedCourse] = useState<boolean>(false);
  const handleCloseTestModal = (value: any) => {
    setOpenTestModal(false);
  };
  const handleCloseTestModal2 = (value: any) => {
    setVideoIndex(value + 2);
    setOpenTestModal(false);
  };
  const [autoPlay, setAutoPlay] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const course_tags = data?.tags;
  const course_videos = data?.videos;
  const course_routes = data?.route;

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

  const changeSetRate = (value: any, change: any = null) => {
    if (!change) {
      setRate(value);
    }
  };
  const GetRateComponent = () => {
    let scoredVideo = false;
    let scoredNow = 0;
    const user: any = userInfo;
    const currentVideo: any = data?.videos[videoIndex - 1];
    if (!user?.scored || !currentVideo) {
      return;
    }
    user.scored.forEach((score: any) => {
      if (score?.video == currentVideo?.id) {
        scoredVideo = true;
        scoredNow = score.scored;
      }
      // else {
      //   console.log("el score es false");
      // }
    });
    return (
      <Rate
        allowHalf
        disabled={scoredVideo}
        defaultValue={0}
        value={scoredNow}
        onChange={(value) => changeSetRate(value)}
        style={{ fontSize: "18px" }}
      />
    );
  };

  useEffect(() => {
    const idVideo = data?.videos[videoIndex - 1]?.id;
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
        .post(`${base_url}/videos/${idVideo}/score`, userScore, {
          headers: headers,
        })
        .then((res) => {
          // changeSetRate(rate);
          const us = JSON.parse(JSON.stringify(user));
          us.scored.push({ video: idVideo, scored: rate });
          // data.videos[videoIndex - 1].score.averageScore = rate;
          dispatch(
            newDataUser({
              id: us.id,
              name: us.nombre,
              email: us.email,
              directive: us.directive,
              profile: us.perfil,
              authenticated: true,
              inprogress: us.inprogress,
              finished: us.finished,
              scored: us.scored,
            })
          );
          GetRateComponent();
        })
        .catch((error) => {});
    } else {
    }
  }, [rate]);

  const downloadVideo = () => {
    const videoUrl = course_videos[videoIndex - 1]?.urlEmbed;
    const element = document.createElement("a");
    element.href = videoUrl;
    element.download = course_videos[videoIndex - 1]?.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadFile = (fileUrl: any) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [timeInProgress, setTimeInProgress] = useState(0);

  useEffect(() => {
    const inProgress = userInfo.inprogress;
    const currentVideos = data.videos;
    let currentInProgress: any = null;
    inProgress.forEach((inprogress: any) => {
      currentVideos.forEach((video: any) => {
        if (
          inprogress.video === video.id ||
          inprogress?.video?._id === video.id
        ) {
          currentInProgress = inprogress;
        }
      });
    });
    if (currentInProgress) {
      setVideoIndex(currentInProgress.num);
      setVideoSelected(true);
      setTimeInProgress(currentInProgress.progress);
      setTimeout(() => {
        playerRef.current.seekTo(currentInProgress.progress);
        const playerMobile = document.getElementsByTagName("video")[0];
        playerMobile.currentTime = currentInProgress.progress;
        playerMobile.play();
      }, 100);
    }

    modalRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const currentIndexCourses = () => {
    let currentIndexCourse = -1;
    const inProgress = userInfo.inprogress; // _id
    const course = data; // id
    inProgress.forEach((ip: any, index: number) => {
      if (ip.course._id === course.id) {
        currentIndexCourse = index;
      }
    });
    return currentIndexCourse;
  };

  const padTo2Digits = (num: any) => {
    return num.toString().padStart(2, "0");
  };
  const secToMin = (totalSeconds: any) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const result = `${padTo2Digits(minutes)}:${padTo2Digits(
      Math.trunc(seconds)
    )}`;
    // console.log(result); // 👉️ "09:25"
    return result;
  };

  return (
    <Modal
      className="modalCard"
      maskClosable={false}
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
      {openTestModal && (
        <TestModal
          Data={dataTest}
          DataModalPadre={data}
          Abrir={openTestModal}
          Cerrar={handleCloseTestModal}
          Cerrar2={handleCloseTestModal2}
          finished={finishedCourse}
        />
      )}
      <Layout
        ref={modalRef}
        style={{
          backgroundImage: "linear-gradient(120deg, #151b35 0%, #000 100%)",
          padding: "0 0",
        }}
      >
        <Row
          style={{
            width: "100%",
            maxWidth: "750px",
            height: videoSelected ? null : ("45vh" as any),
            // maxHeight: "550px",
          }}
        >
          {videoIndex === 0 ? (
            <div
              // src={
              //   data
              //     ? data.cover
              //     : "https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg"
              // }
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url("${data?.cover}")`,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
              }}
            >
              {" "}
            </div>
          ) : (
            <div style={{ width: "100%", height: "auto" }}>
              <ReactPlayer
                // config={{
                //   file: {
                //     tracks: [
                //       {
                //         kind: "subtitles",
                //         src:
                //           "http://localhost:3000/public/sub.vtt",
                //         srcLang: "es",
                //         default: false,
                //         label: ''
                //       },
                //     ]
                //   }
                // }}
                ref={playerRef}
                width={"100%"}
                height={"auto"}
                url={course_videos[videoIndex - 1]?.urlEmbed}
                playing={true}
                controls={true}
                onProgress={async (evt: any) => {
                  let time = evt.playedSeconds;
                  if (time - videoTime > 30) {
                    setVideoTime(time);
                    let body = {
                      idVideo: course_videos[videoIndex - 1].id,
                      idCourse: data.id,
                      progress: time,
                      finished: false,
                      num: videoIndex,
                    };
                    const res: any = await services.editUserVideoProgress(
                      userInfo.id,
                      body
                    );
                    const currentIndex = currentIndexCourses();
                    dispatch(updateVideoTimeStamp(res.data.payload.inProgress));
                  }
                }}
                // onSeek={(seek) => console.log("seek: ", seek)}
                onEnded={async () => {
                  //mandar data del video aca con un finished true
                  setDataTest(course_videos[videoIndex - 1]);
                  let body = {
                    idVideo: course_videos[videoIndex - 1].id,
                    idCourse: data.id,
                    progress: videoTime,
                    finished: true,
                    num: videoIndex,
                  };
                  const res: any = await services.editUserVideoProgress(
                    userInfo.id,
                    body
                  );
                  // console.log(
                  //   "res.payload? ",
                  //   res.data.payload?.finishedNow?.finished
                  // );
            
                  const finisheCourseNow =
                    res.data.payload?.finishedNow?.finished;
                  
                  const courseVideoFinished = data;
                  const idCurrentVideo = course_videos[videoIndex - 1].id
                  // console.log("courseVideoFinished", courseVideoFinished)
                  // console.log("idCurrentVideo", idCurrentVideo)
                  courseVideoFinished.videos.forEach((videoFinished: any) => {

                    if(videoFinished.id === idCurrentVideo) {
                      videoFinished['finished'] = true;
                    }
                  });
                  
                  setFinishedCourse(finisheCourseNow);
                  setOpenTestModal(true);

                }}
              />
            </div>
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
            }}
          >
            <div
              style={{
                background: "#121c35",
                padding: "0 25px",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "auto",
                borderRadius: "0 0 10px 10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {videoIndex === 0 ? (
                  <span>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 16L10 12.95L14 16L12.5 11.05L16.5 8.2H11.6L10 3L8.4 8.2H3.5L7.5 11.05L6 16ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                        fill="yellow"
                      />
                    </svg>
                  </span>
                ) : (
                  ""
                )}
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
                <div
                  style={{
                    color: "#fff",
                    margin: "0",
                    fontSize: "1.5rem",
                    fontWeight: 900,
                  }}
                >
                  {data.name}
                </div>
              ) : (
                <div
                  style={{
                    color: "#fff",
                    margin: "0",
                    fontSize: "1.5rem",
                    fontWeight: 900,
                  }}
                >
                  {data.videos[videoIndex - 1]?.name}
                </div>
              )}
              {videoIndex === 0 ? (
                <p style={{ color: "white", overflowY: "auto", width: "100%" }}>
                  {data.description}
                </p>
              ) : (
                <p style={{ color: "white", overflowY: "auto", width: "100%" }}>
                  {data.videos[videoIndex - 1]?.description}
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                maxWidth: "750px",
                height: "auto",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "3%",
                background: "#121c35",
                borderRadius: "15px",
                padding: "0 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  background: "#121c35",
                  padding: "10px 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: 0,
                  }}
                >
                  <h2
                    style={{
                      display: "flex",
                      padding: "0",
                      fontSize: "1.2rem",
                      borderRadius: "15px",
                      color: "#ffffff",
                      margin: "0",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 5px 0 0",
                      }}
                    >
                      <svg
                        width="20"
                        height="16"
                        viewBox="0 0 26 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 0V2H22V18H8V20H26V18H24V0H0ZM4.002 3C2.94208 3.00369 1.9266 3.42623 1.17694 4.17553C0.427272 4.92482 0.00421639 5.94009 0 7C0 9.199 1.804 11 4.002 11C5.06138 10.9958 6.07615 10.5729 6.82506 9.82365C7.57398 9.07436 7.99631 8.05939 8 7C8 4.803 6.198 3 4.002 3ZM10 4V6H15V4H10ZM17 4V6H20V4H17ZM4.002 5C5.116 5 6 5.883 6 7C6 8.12 5.117 9 4.002 9C2.882 9 2 8.12 2 7C2 5.883 2.883 5 4.002 5ZM10 8V10H20V8H10ZM0 12V20H2V14H5V20H7V14.658L9.064 15.75C9.649 16.06 10.352 16.059 10.936 15.75V15.752L14.466 13.885L13.533 12.115L10.002 13.982L6.906 12.348C6.47391 12.1197 5.99268 12.0003 5.504 12H0Z"
                          fill="#ffffff"
                        />
                      </svg>
                    </span>
                    Experto
                  </h2>
                </div>
                <Tag style={{ color: "white", fontSize: "0.6rem" }}>
                  {data?.expert}
                </Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#121c35",
                  padding: "10px 0",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontSize: "1.2rem",
                    display: "flex",
                    padding: "0",
                    borderRadius: "15px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#ffffff",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 5px 0 0",
                      }}
                    >
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.72806 6.54582C7.0699 6.20475 7.53212 6.01174 8.01499 6.00842L17.0872 6.01549C17.3191 6.01482 17.5441 6.09481 17.7236 6.24176L24.9573 12.231C25.0704 12.325 25.1613 12.4428 25.2237 12.5761C25.286 12.7093 25.3182 12.8546 25.3179 13.0017C25.3182 13.1488 25.286 13.2941 25.2237 13.4273C25.1613 13.5606 25.0704 13.6784 24.9573 13.7724L17.7236 19.7616C17.5441 19.9086 17.3191 19.9886 17.0872 19.9879L8.01499 19.995C7.53325 19.9943 7.07144 19.8026 6.73079 19.4619C6.39015 19.1213 6.19845 18.6595 6.19773 18.1777V7.82568C6.19887 7.34583 6.38947 6.88584 6.72806 6.54582ZM16.7053 8.03781L8.22006 8.03781L8.22006 18.008H16.7053L22.744 13.0017L16.7053 8.03781Z"
                          fill="#ffffff"
                        />
                        <path
                          d="M15.475 11.941C14.8892 12.5268 14.8892 13.4766 15.475 14.0624C16.0608 14.6481 17.0105 14.6481 17.5963 14.0624C18.1821 13.4766 18.1821 12.5268 17.5963 11.941C17.0105 11.3553 16.0608 11.3553 15.475 11.941Z"
                          fill="#ffffff"
                        />
                      </svg>
                    </span>
                    Tags
                  </div>
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
                      return (
                        <Tag
                          key={index}
                          style={{ color: "white", fontSize: "0.6rem" }}
                        >
                          {item.name}
                        </Tag>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "750px",
              height: "auto",
              flexDirection: "column",
              marginTop: "3%",
              background: "#121c35",
              borderRadius: "15px",
              padding: "0 20px",
            }}
          >
            <h3>Descargar</h3>
            <div
              style={{
                display: "flex",
                margin: "2%",
                justifyContent: "space-evenly",
              }}
            >
              <Space direction="vertical" style={{ textAlign: "center" }}>
                Descargar Video
                {!videoIndex ? (
                  <button
                    disabled
                    style={{
                      borderRadius: "15px",
                      padding: "8px",
                      background: "#fff",
                      cursor: "not-allowed",
                    }}
                  >
                    <DownloadOutlined
                      style={{
                        fontSize: "25px",
                        color: "#474747",
                      }}
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      downloadVideo();
                    }}
                    style={{
                      borderRadius: "15px",
                      padding: "8px",
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    <DownloadOutlined
                      style={{
                        fontSize: "25px",
                        color: "#474747",
                      }}
                    />
                  </button>
                )}
              </Space>
              <Space direction="vertical" style={{ textAlign: "center" }}>
                Descargar Archivos
                {course_videos[videoIndex - 1]?.files.map((file: any) => {
                  return (
                    <button
                      key={file.url}
                      onClick={() => {
                        downloadFile(file.url);
                      }}
                      style={{
                        fontSize: "15px",
                      }}
                    >
                      {file.name}
                    </button>
                  );
                })}
              </Space>
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
                padding: "5px 25px",
                background: "#fff",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <p
                style={{
                  color: "#474747",
                  fontWeight: "bold",
                  display: "flex",
                  justifyContent: "flex-start",
                  margin: "0",
                }}
              >
                <span
                  style={{
                    padding: "0 5px",
                    display: "flex",
                    alignItems: "end",
                  }}
                >
                  <svg
                    width="25"
                    height="20"
                    viewBox="0 0 24 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4V12L15 8L8 4ZM20 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H7V18H15V16H20C21.1 16 22 15.1 22 14V2C22 0.9 21.1 0 20 0ZM20 14H2V2H20V14Z"
                      fill="#474747"
                    />
                  </svg>
                </span>
                Cápsulas de video
              </p>
            </div>
            {course_videos.map((item: any, index: any) => {
              return (
                <div style={{ width: "100%" }}>
                  <div
                    key={index}
                    className="videoInfo"
                    onClick={() => {
                      setVideoIndex(item.position);
                      setVideoSelected(true);
                      setVideoTime(0);
                    }}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "80px",
                      color: "white",
                      maxHeight: "80px",
                      background:
                        index === videoIndex - 1 ? "#a8a8a8" : "#121c35",
                      padding: "10px 25px",
                      margin: "5px 0",
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

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                        height: "100%",
                        color: "white",
                        textAlign: "left",
                      }}
                    >
                      <div>{item.name}</div>
                      <div style={{ overflow: "scroll" }}>
                        {item.description === "sin descripcion"
                          ? "..."
                          : item.description}
                      </div>
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
                      {secToMin(item.duration)} min.
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                     {item.finished && <CheckCircleOutlined style={{ color: "#52c41a"}} />}
                    </div>
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
                padding: "5px 25px",
                background: "#fff",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  color: "#474747",
                  fontWeight: "bold",
                  display: "flex",
                  margin: "0",
                }}
              >
                <span
                  style={{
                    padding: "0 5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="24"
                    height="19"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.7295 13.02C19.1495 12.44 18.5695 11.85 17.9795 11.27C17.8995 11.19 17.8195 11.1 17.7295 11.02C17.6837 10.9737 17.6292 10.9369 17.5691 10.9118C17.5091 10.8867 17.4446 10.8738 17.3795 10.8738C17.3144 10.8738 17.2499 10.8867 17.1898 10.9118C17.1298 10.9369 17.0753 10.9737 17.0295 11.02C16.9826 11.0665 16.9454 11.1218 16.92 11.1827C16.8947 11.2436 16.8816 11.309 16.8816 11.375C16.8816 11.441 16.8947 11.5064 16.92 11.5673C16.9454 11.6282 16.9826 11.6835 17.0295 11.73L18.1695 12.87H7.21949C6.63071 12.87 6.06604 12.6361 5.64971 12.2198C5.23338 11.8035 4.99949 11.2388 4.99949 10.65C4.99949 10.0612 5.23338 9.49656 5.64971 9.08023C6.06604 8.6639 6.63071 8.43001 7.21949 8.43001H10.2195C10.6417 8.43001 11.0598 8.34685 11.4498 8.18528C11.8399 8.02371 12.1943 7.78689 12.4928 7.48835C12.7914 7.18981 13.0282 6.83539 13.1898 6.44533C13.3513 6.05527 13.4345 5.63721 13.4345 5.21501C13.4345 4.79281 13.3513 4.37474 13.1898 3.98468C13.0282 3.59462 12.7914 3.2402 12.4928 2.94166C12.1943 2.64312 11.8399 2.4063 11.4498 2.24473C11.0598 2.08316 10.6417 2.00001 10.2195 2.00001H4.94949C4.82558 1.39298 4.4807 0.853594 3.98169 0.486407C3.48269 0.11922 2.86513 -0.0496039 2.24873 0.0126652C1.63233 0.0749344 1.061 0.363861 0.645521 0.823429C0.23004 1.283 0 1.88047 0 2.50001C0 3.11954 0.23004 3.71701 0.645521 4.17658C1.061 4.63615 1.63233 4.92508 2.24873 4.98735C2.86513 5.04961 3.48269 4.88079 3.98169 4.5136C4.4807 4.14642 4.82558 3.60703 4.94949 3.00001H10.2195C10.8069 3.00001 11.3703 3.23337 11.7857 3.64876C12.2011 4.06416 12.4345 4.62755 12.4345 5.21501C12.4345 5.80246 12.2011 6.36585 11.7857 6.78125C11.3703 7.19664 10.8069 7.43001 10.2195 7.43001H7.21949C6.79663 7.43001 6.37792 7.51329 5.98725 7.67511C5.59658 7.83693 5.24161 8.07412 4.94261 8.37312C4.6436 8.67213 4.40642 9.0271 4.2446 9.41776C4.08278 9.80843 3.99949 10.2271 3.99949 10.65C3.99949 11.0729 4.08278 11.4916 4.2446 11.8822C4.40642 12.2729 4.6436 12.6279 4.94261 12.9269C5.24161 13.2259 5.59658 13.4631 5.98725 13.6249C6.37792 13.7867 6.79663 13.87 7.21949 13.87H18.1795L17.2795 14.77C17.1895 14.85 17.1095 14.94 17.0295 15.02C16.9826 15.0665 16.9454 15.1218 16.92 15.1827C16.8947 15.2436 16.8816 15.309 16.8816 15.375C16.8816 15.441 16.8947 15.5064 16.92 15.5673C16.9454 15.6282 16.9826 15.6835 17.0295 15.73C17.1243 15.8191 17.2494 15.8687 17.3795 15.8687C17.5096 15.8687 17.6347 15.8191 17.7295 15.73L19.4795 13.98L19.7295 13.73C19.7764 13.6835 19.8136 13.6282 19.8389 13.5673C19.8643 13.5064 19.8774 13.441 19.8774 13.375C19.8774 13.309 19.8643 13.2436 19.8389 13.1827C19.8136 13.1218 19.7764 13.0665 19.7295 13.02ZM2.49949 4.00001C2.20282 4.00001 1.91281 3.91203 1.66613 3.74721C1.41946 3.58239 1.2272 3.34812 1.11367 3.07403C1.00014 2.79994 0.970434 2.49834 1.02831 2.20737C1.08619 1.9164 1.22905 1.64912 1.43883 1.43935C1.64861 1.22957 1.91588 1.08671 2.20685 1.02883C2.49783 0.97095 2.79943 1.00065 3.07351 1.11419C3.3476 1.22772 3.58187 1.41998 3.74669 1.66665C3.91152 1.91332 3.99949 2.20333 3.99949 2.50001C3.99949 2.89783 3.84145 3.27936 3.56015 3.56067C3.27885 3.84197 2.89731 4.00001 2.49949 4.00001Z"
                      fill="#474747"
                    />
                  </svg>
                </span>
                Cursos Asociados
              </p>
            </div>
            {course_routes.map((item: any, index: any) => {
              
              return (
                <div style={{ width: "100%" }} 
                  onClick = {()=>{
                    Cerrar()
                    showModal(item.id)
                  }}
                  >
                <div
                  key={index}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    color: "white",
                    maxHeight: "80px",
                    background: "#121c35",
                    padding: "10px 25px",
                    margin: "5px 0",
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
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "60%",
                      height: "100%",
                      color: "white",
                      textAlign: "left",
                    }}
                  >
                    <div>{item.name}</div>
                    <div style={{ overflow: "scroll" }}>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </Content>
      </Layout>
    </Modal>
  );
};
export default CardV;
