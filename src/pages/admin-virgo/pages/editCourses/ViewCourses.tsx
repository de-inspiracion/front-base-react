import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import { Avatar, Button, List, Typography } from "antd";
const { Text, Link } = Typography;
import "./viewCourses.css";

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

export const ViewCourses = () => {
  const count = 3;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<DataType[]>([]);
  const [editableStrWithSuffix, setEditableStrWithSuffix] = useState(
    'This is a loooooooooooooooooooooooooooooooong editable text with suffix.',
  );
  const navigate = useNavigate();
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setList(res.results);
      });
  }, []);

  const editCourse = () => {
    console.log("ss");
    navigate("1223");
  };

  return (
    <div className="view-courses">
      <Divider>Vista de cursos</Divider>

      <div style={{ padding: "10px" }}>

        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit" onClick={editCourse}>
                  edit
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={item.picture.large} shape="square" size={64} />
                }
                title={<a href="https://ant.design">{item.name?.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
