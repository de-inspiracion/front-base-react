import { useState, useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Rate, Modal, Button } from 'antd';
import services  from '../../services/http'


const CardV: any  = ({itemData, key,index}: any) => {
  const [open, setOpen] = useState(false)
  const [courseData,setCourseData] = useState([])
  const showModal = () => {
    setOpen(true)
  }
  console.log('data curso: ',courseData)
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(()=>{
    const getData = async () => {
      // setIems(await services.getCourseVideos(courseData[0].id).payload)
      let res = await services.getCourseVideos(itemData.id)
      setCourseData(res.payload)
    }
    getData()
  },[])

  // console.log(`INDEX: ${index} `,courseData)

  return (
    <div key={key} className="movieRow--item">
        { open && <ModalCard index={index}  data={courseData} score={itemData.score} Abierto={open} Cerrar = {handleClose}/>}
        <img src={'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'} onClick={()=>{
          showModal()
        }}/>
    </div>
  )
}


const ModalCard = ( {data, score, Abierto, Cerrar}:any  ) => {
  const [open,setOpen] = useState(Abierto)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [videoIndex,setVideoIndex] = useState(0)

  console.log('en modal: ',data)
  // const data_videos = data.map((item:any) => {
  //   let data_object = {
  //     "name":item.name,
  //     "duration":item.duration,

  //   }
  //   return data_object 
  // })
  const cuourse_tags = ['tag1','tag2','tag3','tag4','tag5','tag6','tag7']
  const course_videos = [
    {
      'name':'Nombre Video 1',
      'decription':'Descripción del video 1',
      'url':'https://www.youtube.com/embed/-AgrqLgXUGo',
      'duration':'10 min'
    },
    {
      'name':'Nombre Video 2',
      'decription':'Descripción del video 2',
      'url':'https://www.youtube.com/embed/-AgrqLgXUGo',
      'duration':'10 min'
    },
    {
      'name':'Nombre Video 3',
      'decription':'Descripción del video 3',
      'url':'https://www.youtube.com/embed/-AgrqLgXUGo',
      'duration':'10 min'
    },
    {
      'name':'Nombre Video 3',
      'decription':'Descripción del video 3',
      'url':'https://www.youtube.com/embed/-AgrqLgXUGo',
      'duration':'10 min'
    },
    {
      'name':'Nombre Video 4',
      'decription':'Descripción del video 4',
      'url':'https://www.youtube.com/embed/-AgrqLgXUGo',
      'duration':'10 min'
    },
    {
      'name':'Nombre Video 5',
      'decription':'Descripción del video 5',
      'url':'https://www.youtube.com/embed/-AgrqLgXUGo',
      'duration':'10 min'
    },
    
    {
      'name':'Nombre Video 6',
      'decription':'Descripción del video 6',
      'url':'https://www.youtube.com/embed/-AgrqLgXUGo',
      'duration':'10 min'
    }
  ]
  const container_height:any = {
    'none':'100 vh',
    'dual':'255 vh',
    'one':'155 vh'
  }


  const cerrarModal = () => {
    Cerrar(false)
    setOpen(false)
  }
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      cerrarModal()
      setConfirmLoading(false);
    }, 2000);
  };
  return(
    <Modal
      open={open}
      onCancel={cerrarModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      footer={false}
      closeIcon={<CloseOutlined style={{color:'white'}}/>}
      width='50vw'
      height='1300px'
      style={{border:'1px solid white',maxWidth:'500px',overflowY:'auto'}}
    >
      <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',alignItems:'center',overflowY:'auto'}}>
          <div style={{width:'90%',maxWidth:'400px',height:'20vh',maxHeight:'250px',marginTop:'5%',border:'1px solid red'}}>
            {/* <iframe src="https://iframe.mediadelivery.net/embed/759/eb1c4f77-0cda-46be-b47d-1118ad7c2ffe?autoplay=true" 
                loading="lazy"  style={{width:'100%'}}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true}>
            </iframe> */}
            {
              videoIndex === 0 ? 
              <img src="https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg" alt="foto curso" style={{width:'100%',height:'100%'}}/>
              :
              <iframe src={`${data.videos[videoIndex-1].urlEmbed}?autoplay=true`} 
                loading="lazy"  style={{width:'100%'}}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true}>
              </iframe>

            }
          </div>
          <div style={{display:'flex',flexDirection:'row',width:'100%',height:'40vh',marginTop:'5%',justifyContent:'space-evenly'}}>
            <div style={{display:'flex',flexDirection:'column',width:'50%',height:'100%'}}>      
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap'}}>
                <Rate allowHalf defaultValue={score} />
                <div style={{color:'white',marginTop:'2.5%'}}>
                  {score} / 5
                </div>
              </div>
              <p style={{color:'white',overflowY:'auto',width:'90%',marginLeft:'5%'}}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat ipsum sit eveniet tempora suscipit explicabo rem amet accusantium maiores, laborum eius porro labore, excepturi corrupti autem unde quis nihil cum
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat ipsum sit eveniet tempora suscipit explicabo rem amet accusantium maiores, laborum eius porro labore, excepturi corrupti autem unde quis nihil cum

              </p>
            </div>
            <div style={{display:'flex',flexDirection:'column',width:'40%',maxWidth:'200px',height:'100%',justifyContent:'space-evenly'}}>
              <div style={{display:'flex',flexDirection:'row',width:'100%',flexWrap:'wrap', justifyContent:'space-evenly'}}>
                <div style={{color:'grey'}}>Experto</div>
                <div style={{color:'white',textAlign:'center'}}>Nombre Completo Experto</div>
              </div>
              <div style={{display:'flex',flexDirection:'row',width:'100%',flexWrap:'wrap', justifyContent:'center'}}>
                <div style={{color:'grey'}}>Etiquetas</div>
                <div style={{color:'white',display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                  {cuourse_tags.length > 0 && cuourse_tags.map((item,index)=> {
                    if(index === cuourse_tags.length -1){
                      return <div style={{marginRight:'1%'}}>{item}</div>
                    }
                    else{
                      return <div style={{marginRight:'1%'}}>{item}, </div>
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
 
          <div style={{width:'100%',height:'50vh',overflow:'scroll',display:'flex',flexDirection:'column',marginTop:'2.5%'}}>
              {data.videos.map((item:any)=> {
                return <div style={{display:'flex',flexDirection:'row',width:'95%',height:'150px',marginTop:'2%',color:'white',border:'1px solid grey'}}>
                  <div style={{width:'10%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}>{item.position }</div>
                  {/* <iframe width="40%" height="90%" src="https://iframe.mediadelivery.net/embed/759/eb1c4f77-0cda-46be-b47d-1118ad7c2ffe?autoplay=false" style={{borderStyle:'none'}}  loading="lazy" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true}/> */}
                  {/* <iframe src={item.urlEmbed+'?autoplay=false'} 
                    loading="lazy"  style={{width:'60%'}}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowFullScreen={true}>
                  </iframe> */}
                  <img src={item.thumbnail} width='60%' style={{cursor:'pointer'}} onClick={()=>{
                    setVideoIndex(item.position)
                  }}/>
                  <div style={{display:'flex',flexDirection:'column',width:'60%',height:'100%',color:'white',textAlign:'center',borderRight:'1px solid grey'}}>
                    <div>{item.name}</div>
                    <div style={{overflow:'scroll'}}>{item.decription} Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora vero laudantium totam laborum aut, dolorum fuga, porro ducimus, enim consectetur omnis eius aliquam nisi. A maxime quis reprehenderit quo reiciendis!</div>
                  </div>
                  <div style={{width:'25%',display:'flex',flexDirection:'column',height:'100%',justifyContent:'center',textAlign:'center'}}>
                    {item.duration} min.
                  </div>
                </div>
              })}
          </div>
          <div style={{width:'90%',height:'50vh',overflow:'scroll',display:'flex',flexDirection:'column',border:'1px solid blue',marginTop:'10%'}}>
              {course_videos.map((item,index)=> {
                return <div style={{display:'flex',flexDirection:'row',width:'100%',height:'100px',border:'1px solid green',marginTop:'2%',color:'white'}}>
                  Ruta de aprendizaje {index + 1}
                </div>
              })}
          </div>
      </div>
    </Modal>
  )
}
export default CardV;