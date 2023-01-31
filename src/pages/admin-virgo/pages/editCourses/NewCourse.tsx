import React,{useState} from 'react'
import { FloatButton } from 'antd';
import {
  PlusCircleOutlined
} from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { message } from 'antd';
import { Input } from 'antd';
import services from '../../../../services/http'
import { useNavigate} from "react-router-dom";

const NewCourse = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [courseName,setCourseName] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const info = () => {
      messageApi.info('Hello, Ant Design!');
    };

    const createCourse = async () => {
      const res:any = await services.newCourse(courseName)
      // messageApi.success('Curso Creado, redireccionando...')
      navigate(res['payload']['id'],{
        replace:true
      })
    } 

  return (
    <div>
        <FloatButton 
            tooltip={<div>Agregar Curso</div>} 
            icon = {<PlusCircleOutlined style = {{color:'green'}} />} 
            onClick = {()=>{setIsModalOpen(true)}}
        />
        <Modal title="Crear Curso" open={isModalOpen} 
            onOk={createCourse} 
            onCancel={()=>{setIsModalOpen(false)}}>
            <Input 
                style = {{marginTop:20,marginBottom:20}} 
                placeholder="Nombre del curso" 
                onChange={(e)=>setCourseName(e.target.value)}
                />
      </Modal>
    </div>
  )
}

export default NewCourse