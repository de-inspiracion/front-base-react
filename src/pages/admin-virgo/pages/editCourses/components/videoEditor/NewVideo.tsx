import React,{useState} from 'react'
import { FloatButton } from 'antd';
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import { Input } from 'antd';
import services from '../../../../../../services/http'
import { useNavigate} from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import Loading from '../../../../../../components/Loading/Loading';


interface customProps{
    id:any,
    setVideos:any,
    numberofVideos:any
}

const NewVideo = (props:any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseVideo,setCourseVideo] = useState<any>([])
    const [messageApi, contextHolder] = message.useMessage();
    const [loading,setLoading] = useState(false)
    const createVideo = async () => {
            setLoading(true)
            const formData = new FormData();
            formData.append("video", courseVideo);
            const res = await services.newVideo(props.id, formData);
            setLoading(false)
            window.location.reload()
      }

  return (

    
    <div>
        <Loading text = 'Subiendo Video' open = {loading} />
        <FloatButton 
                tooltip={<div>Agregar Video</div>} 
                icon = {<PlusCircleOutlined style = {{color:'green'}} />} 
                onClick = {()=>{setIsModalOpen(true)}}
                />

           
        
            <Modal title="Subir Video" open={isModalOpen} 
                        onOk={createVideo} 
                        onCancel={()=>setIsModalOpen(false)}
                        >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        multiple={false}
                        accept="video/*"
                        beforeUpload = {(e) => {
                                const blob = new Blob([e])
                                const newVideo = new File([blob],`${e.name}`,{type:e.type})
                                console.log(newVideo);
                                setCourseVideo(newVideo);
                            }}
                        >
                        <VideoCameraAddOutlined style={{ fontSize: 30 }} />
                        
                    </Upload>
                    <div>{courseVideo.name}</div>
                </Modal>
            
    </div>

  )
}

export default NewVideo