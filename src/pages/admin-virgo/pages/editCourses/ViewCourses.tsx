import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Input, Avatar, Table } from "antd";
import services from "../../../../services/http";
import "./viewCourses.css";
import NewCourse from "./NewCourse";
import logoYellow from "../../../../assets/virgoYellow.jpg";

interface courseData {
  name: string;
  description: string;
  tags: Object;
  routes: Object;
  category: Object;
  image: string;
  id: string;
}

export const ViewCourses = () => {
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<courseData[]>([]);
  const [searchedText, setSearchedText] = useState<string>("");
  const { Search } = Input;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      let res = await services.getCourses();
      setCourses(res.data.payload);
    };
    getData();
    setLoading(false);
  }, []);

  const editCourse = async (id: string, item: any) => {
    navigate(id, {
      state: item,
      replace: true,
    });
  };

  console.log(courses);

  const onSearch = (value: string) => {
    setSearchedText(value);
  };
  return (
    <div>
      <Divider>Vista de cursos</Divider>
      <NewCourse />
      <Search
        placeholder="Busca lo que necesites"
        onSearch={onSearch}
        enterButton
      />
      <Table
        columns={[
          {
            title: "Imagen",
            dataIndex: "image",
            key: "image",
            render: () => <Avatar shape="square" size={64} src={logoYellow} />,
          },
          {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
            filteredValue: [searchedText],
            onFilter: (value: any, record: any) => record.name.includes(value),
          },
          {
            title: "Editar",
            key: "editar",
            render: (item: any) => (
              <a onClick={() => editCourse(item.id, item)}>Editar</a>
            ),
          },
        ]}
        dataSource={courses}
      ></Table>
    </div>
  );
};
