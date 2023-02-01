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
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


interface customProps{
    id:any,
    setVideos:any,
    numberofVideos:any
}

const NewVideo = (props:any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseVideo,setCourseVideo] = useState<any>([])
    const [messageApi, contextHolder] = message.useMessage();

    const createVideo = async () => {
            const formData = new FormData();
            formData.append("video", courseVideo);
            const res = await services.newVideo(props.id, formData);
            window.location.reload()
      }

  return (
    <div>
        <FloatButton 
                tooltip={<div>Agregar Video</div>} 
                icon = {<PlusCircleOutlined style = {{color:'green'}} />} 
                onClick = {()=>{setIsModalOpen(true)}}
                />

        <Modal title="Subir Video" open={isModalOpen} 
                    onOk={createVideo} 
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
                            const newVideo = new File([blob],`${props.numberofVideos + 1}-${e.name}`,{type:e.type})
                            console.log(newVideo);
                            setCourseVideo(newVideo);
                        }}
                    >
                    <VideoCameraAddOutlined style={{ fontSize: 30 }} />
                    
                </Upload>
                <div>{NewVideo.name}</div>
                
            </Modal>
    </div>
  )
}

export default NewVideo