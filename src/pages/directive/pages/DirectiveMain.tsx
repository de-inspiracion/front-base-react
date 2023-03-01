import { Button, message, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import Column from "antd/es/table/Column";
import axios from "axios";
import services from "../../../services/http";
import { useSelector } from "react-redux";

interface UsersInfo {
  id: string;
  name: string;
  enable: boolean;
  directive: string;
}

const DirectorMain: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<string>("");
  const [stated, setStated] = useState<boolean>(true);
  const [usersInfo, setUsersInfo] = useState<UsersInfo[]>([]);

  const userInfo = useSelector((estado: any) => estado.userInfo);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "This is a success message",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  useEffect(() => {
    const usersDirective = async (idDirective: string) => {
      const res = await services.usersDirective(idDirective);
      setUsersInfo(res.data);
    };
    usersDirective(userInfo.directive?.id);
  }, []);

  // Desactivar solo uno
  const toggleOnebyOne = (id: string) => {
    const newData = [...usersInfo];
    const target = newData.find((item) => id === item.id);
    if (target) {
      target.enable = !target.enable;
      setIsActive(!isActive);
      setStated(target.enable);
      setIdUser(target.id);
    }
  };

  //   postear a la base de datos
  const postToDB = () => {
    const IDuser = idUser;
    const state = stated;
    if (idUser) {
      axios
        .post(
          `https://nestjs-virgo-production.up.railway.app/user/${IDuser}/enable/${state}`
        )
        .then((res) => {

          success();
        })
        .catch((err) => {

          error();
        });
    }
  };
  useEffect(() => {
    postToDB();
  }, [idUser]);

  return (
    <>
      {contextHolder}
      <Table dataSource={usersInfo}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Action"
          key="action"
          render={(user: any) => (
            <Space size="middle">
              <Button onClick={() => toggleOnebyOne(user.id)}>
                {user.enable ? "Desabilitar" : "Habilitar"}
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default DirectorMain;
