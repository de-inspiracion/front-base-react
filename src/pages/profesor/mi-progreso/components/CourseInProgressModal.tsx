import React,{ useState, useEffect, useRef } from 'react'
import { Modal, Layout, Row, Tag, Card } from 'antd';
const { Meta } = Card
import { CloseOutlined } from '@ant-design/icons'
import services from '../../../../services/http'
import { ReactNetflixPlayer } from "react-netflix-player";
import { useSelector, useDispatch } from 'react-redux'
import { updateVideoTimeStamp } from '../../../../store/user/userData';
const { Content } = Layout;

export default function CourseInProgressModal({Open,Data,Cerrar}:any) {
    const [open,setOpen] = useState(Open)
    const handeClose = () => {
        Cerrar()
        setOpen(false)
    }
    const [cargando,setCargando] = useState(true)
    const [courseData,setCourseData] = useState({
        category:[],
        cover:'',
        createdAt:'',
        id:'',
        name:'',
        public:false,
        route:[],
        tags:[],
        updatedAt:'',
        videos:[],
        description: '',
        _v:-1
    })
    const [videoIndex,setVideoIndex] = useState(0)
    const [videoTime,setVideoTime] = useState(0)
    const userInfo = useSelector( (state:any) => state.userInfo )
    const dispatch = useDispatch()
    const [isScored, setIsScored] = useState(false);
    const modalRef: any = useRef(null);
    const course_tags = courseData.tags;
    const course_videos: any = courseData.videos;
    const course_routes = courseData.route;
  
    useEffect(()=>{
        const getData = async () => {
            setCargando(true)
            const res = await services.getCourseVideos(Data.course._id)
            setCourseData(res.payload)
            setCargando(false)
        }
        getData()
    },[])
    // console.log(userInfo)
    // console.log(`indice: ${videoIndex}, marca de tiempo: ${videoTime}`)
    return (
                
        <Modal
            open={open}
            footer={false}
            onCancel={handeClose}
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
            style={{ maxWidth: "800px", overflowY: "auto" }}
        >
            {
                cargando ?
                <div>Loading....</div>
                :
                <Layout ref={modalRef} style={{ background: "#181818", padding: "0 0" }}>
                    <Row style={{ width: '100%', maxWidth: '750px', height: '45vh', maxHeight: '550px' }}>
                        {
                            videoIndex === 0 ?
                            <img src={courseData ? courseData.cover : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'} alt="foto curso" style={{ width: '100%', height: '100%' }} />
                            :
                            <div style={{ width: '100%', height: '100%' }}>
                                <ReactNetflixPlayer  src={course_videos[videoIndex-1].urlEmbed} autoPlay={true} fullPlayer={false}
                                startPosition={videoTime}
                                onTimeUpdate={
                                    async (evt: any)=>{
                                        let time = evt.target.currentTime
                                        if(time - videoTime > 30){
                                            console.log('se mando')
                                            dispatch(updateVideoTimeStamp({
                                                index: videoIndex-1,
                                                timestamp: videoTime
                                            }))
                                            setVideoTime(time)
                                                let body = {
                                                idVideo: course_videos[videoIndex-1].id,
                                                idCourse: courseData.id,
                                                progress: time,
                                                finished: false,
                                                num: videoIndex
                                            }
                                            // console.log(body)
                                            const res = await services.editUserVideoProgress(userInfo.id,body)
                                            
                                        }
                                    }
                                }
                                onEnded={
                                    async () => {
                                        //mandar data del video aca con un finished true
                                        let body = {
                                            idVideo: course_videos[videoIndex-1].id,
                                            idCourse: courseData.id,
                                            progress: videoTime,
                                            finished: true,
                                            num: videoIndex
                                        }
                                        const res = await services.editUserVideoProgress(userInfo.id,body)
                                        dispatch(updateVideoTimeStamp({
                                            index: videoIndex-1,
                                            timestamp: videoTime
                                        }))  
                                        console.log('ended')                
                                    }
                                    
                                }
                                />
                            </div>
                        }
                    </Row>
                    <Content
                        style={{
                            alignItems:'center',
                            display:'flex',
                            flexDirection:'column'
                        }}
                    >
                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            width:'100%',
                            height:'40vh',
                            justifyContent:'space-evenly'
                        }}>
                            <div style={{
                                background: "#101012e3",
                                marginTop: "3%",
                                padding: "0 25px",
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                height: "100%",
                            }}>
                                <div style={{display:'flex',alignItems:'center'}}>
                                    {course_videos[videoIndex - 1]?.score.averageScore || isScored ? (
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
                                {
                                    videoIndex === 0 ? 
                                    (<h2 style={{color:'grey',margin:'0'}}>{courseData.name}</h2>)
                                    :
                                    (<h2 style={{color:'grey',margin:'0'}}>{course_videos[videoIndex-1].name}</h2>)
                                }
                                {
                                    videoIndex === 0 ?
                                    ( 
                                        <p style={{ color: "white", overflowY: "auto", width: "100%" }}>
                                            {courseData.description}
                                        </p> 
                                    )
                                    :
                                    (
                                        <p style={{ color: "white", overflowY: "auto", width: "100%" }}>
                                            {course_videos[videoIndex -1 ].description}
                                        </p> 
                                    )
                                }
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
                                        })
                                    }
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
                                        setVideoIndex(item.position)

                                        try {
                                            setVideoTime(userInfo.inprogress[item.position - 1 ].progress)
                                        } catch (error) {
                                            setVideoTime(0)
                                        }
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
                }
        </Modal>
    )
}
