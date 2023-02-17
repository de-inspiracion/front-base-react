import { Button, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Column from 'antd/es/table/Column';
import axios from 'axios';
import services from "../../../services/http";


interface UsersInfo {
    _id: string;
    name: string;
    enable: boolean;
    directive: string;
}

const DirectorMain: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [idUser, setIdUser] = useState<string>('');
    const [stated, setStated] = useState<boolean>(true)
    const [usersInfo, setUsersInfo] = useState<UsersInfo[]>([])

    useEffect(() => {
        const getUsers = async () => {
          // setIems(await services.getCourseVideos(courseData[0].id).payload)
          let res = await services.getUsers();
          setUsersInfo(res);
        };
        getUsers();
      }, []);

    console.log(usersInfo)
    // Desactivar solo uno
    const toggleOnebyOne = (id: string) => {
        const newData = [...usersInfo];
        const target = newData.find((item) => id === item._id);
        if (target) {
            target.enable = !target.enable;
            setIsActive(!isActive);
            setStated(target.enable)
            setIdUser(target._id)
        }
    };
    // postear a la base de datos
    const postToDB = () => {
        const IDuser = idUser
        const state = stated
        axios.post(`https://nestjs-virgo-production.up.railway.app/user/${IDuser}/enable/${state}`)
            .then(res => {
                console.log('se envio')
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                console.log('no se envio')
            })
    }
    useEffect(() => {
        postToDB()
    }, [idUser])

    return (
        <>
    <Table dataSource={usersInfo}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Colegio" dataIndex="directive" key="firstName" />
        <Column
      title="Action"
      key="action"
      render={(user: any) => (
        <Space size="middle">
            <Button onClick={() => toggleOnebyOne(user._id)}>{user.enable ? 'Desabilitar' : 'Habilitar'}</Button>
        </Space>
      )}
    />
    </Table>
    </>
)}

export default DirectorMain
