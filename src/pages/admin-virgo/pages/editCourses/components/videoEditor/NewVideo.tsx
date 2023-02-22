import React,{useState} from 'react'
import { FloatButton } from 'antd';
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import { Input } from 'antd';
import services from '../../../../../../services/http'
import { redirect, useNavigate} from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import Loading from '../../../../../../components/Loading/Loading';

const base_url = import.meta.env.VITE_BASE_URL;
interface customProps{
    id:any,
    setVideos:any,
    numberofVideos:any
}
redirect("/");
const NewVideo = (props : any) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseVideo,setCourseVideo] = useState<any>([])
    const [messageApi, contextHolder] = message.useMessage();
    const [loading,setLoading] = useState(false)
    const createVideo = async () => {
            setLoading(true)
            const formData = new FormData();
            formData.append("video", courseVideo);
            const res = await services.newVideo(props.id, formData);
            console.log("rsponse vide :", res)
            setLoading(false)
            props.onAction(res.payload)
            setIsModalOpen(false)
      }
const cancel = () => {

  setIsModalOpen(false)
}


const propsFilesVideo: UploadProps = {
  name: "video",
  action: `${base_url}/courses/${props.id}/uploadVideo`,
  headers: {},
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log("info file: ", info);
      const responseFile = info.file.response.payload;
      // setListFiles([...responseFile]);
      message.success(`${info.file.name} file uploaded successfully`);
      console.log('respuesta : ', responseFile)
      props.onAction(responseFile)
      setIsModalOpen(false)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

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
                        onCancel={()=>cancel()}
                        >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        multiple={false}
                        accept="video/*"
                        maxCount={1} 
                        {...propsFilesVideo}
                        // beforeUpload = {(e) => {
                        //         const blob = new Blob([e])
                        //         const newVideo = new File([blob],`${e.name}`,{type:e.type})
                        //         console.log(newVideo);
                        //         setCourseVideo(newVideo);
                        //     }}
                        >
                        <VideoCameraAddOutlined style={{ fontSize: 30 }} />
                        
                    </Upload>
                    <div>{courseVideo.name}</div>
                </Modal>
            
    </div>

  )
}

export default NewVideo