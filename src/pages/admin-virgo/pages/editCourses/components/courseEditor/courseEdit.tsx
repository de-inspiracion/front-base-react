import { Button, Col, Input, Row, Select, SelectProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Divider, Radio, Typography } from "antd";
import { useState, useEffect } from "react";
import { ConfigProvider, theme, Card } from "antd";
import UploadImage from "../upload/uploadImage";
import services from "../../../../../../services/http";
const { Paragraph } = Typography;
import { useParams } from "react-router-dom";
import { VideoEditor } from "../videoEditor/videoEditor";

import { UploadOutlined, FileImageOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

export const CourseEditor = (state: any) => {
  const [loading, setLoading] = useState(false);
  let idCourse: string | undefined = useParams()["idCourse"];
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [currentState, setCurrentState] = useState<any>({});
  const [titleCourse, setTitleCourse] = useState("");
  const [descriptionCourse, setDescriptionCourse] = useState("");
  const options: SelectProps["options"] = [];
  const [tags, setTags] = useState<any>(currentState.tags);
  const [routes, setRoutes] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [value, setValue] = useState(0); // integer state
  const [c_, setC_] = useState<any>([]);
  const [r_, setR_] = useState<any>([]);
  const [videos, setVideos] = useState([]);
  const [img, setImg] = useState<any>([]);
  useEffect(() => {
    (async () => {
      let res = await services.getInfo(idCourse);
      setC_(res[0]);
      setR_(res[1]);
      setCurrentState(res[2]);
      setTitleCourse(res[2]["name"]);
      setDescriptionCourse(res[2]["description"]);
      setTags(res[2]["tags"]);
      setRoutes(res[2]["route"]);
      setCategory(res[2]["category"]);
      setVideos(res[2]["videos"]);
    })();
  }, []);

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const editCourseData = async (id: string, field: string, data: any) => {
    let res = await services.updateCourse(id, field, data);
  };

  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        <Row justify="center" align="middle">
          <Col span={5}>
            <img src={currentState["cover"]} style={{ width: 150 }} />
          </Col>
          <Col span={4}>
            {/* <input 
            type='file'
            style = {{backgroundColor:'black'}}
            onChange={(e)=>{
              console.log(e.target.files[0])
              setImg(e.target.files[0])
            }}
            >
          
            </input> */}
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              multiple={false}
              accept="image/*"
              // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={(e) => {
                console.log(e.fileList[0]["originFileObj"]);
                setImg(e.fileList[0]["originFileObj"]);
              }}
            >
              <FileImageOutlined style={{ fontSize: 30 }} />
            </Upload>
          </Col>
          <Col>
            <Button
              onClick={async () => {
                const formData = new FormData();
                formData.append("cover", img);
                await services.editCourseCover(currentState.id, formData);
              }}
            >
              Subir Imagen
            </Button>
          </Col>
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="center"
          align="middle"
        >
          <Col span={6}>
            <Typography.Title level={5}>Nombre del curso</Typography.Title>
          </Col>

          <Col span={6}>
            <Typography.Title
              editable={{
                onChange: (value) => {
                  setTitleCourse(value);
                  editCourseData(currentState.id, "name", value);
                },
              }}
              level={5}
            >
              {titleCourse}
            </Typography.Title>
          </Col>
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="center"
          align="middle"
        >
          <Col span={6}>
            <h3>Descripción</h3>
          </Col>
          <Col span={6}>
            <Typography.Title
              editable={{
                onChange: (value) => {
                  console.log(value);
                  setDescriptionCourse(value);
                  editCourseData(currentState.id, "description", value);
                },
              }}
              onChange={(data) => console.log(data)}
              level={5}
              style={{ margin: 0 }}
            >
              {descriptionCourse}
            </Typography.Title>
          </Col>
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="center"
          align="middle"
        >
          <Col>
            <h3>Tags</h3>
          </Col>
          <Col span={8}>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags"
              value={tags}
              onChange={(value: string) => {
                setTags(value);
              }}
              options={options}
            />
          </Col>

          <Col>
            <Button
              shape="round"
              onClick={() => {
                editCourseData(currentState.id, "tags", tags || []);
              }}
            >
              Actualizar
            </Button>
          </Col>
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="center"
          align="middle"
        >
          <Col>
            <h3>Ruta</h3>
          </Col>
          <Col span={8}>
            <Select
              mode="multiple"
              value={routes}
              style={{ width: "100%" }}
              onChange={(value: string) => {
                setRoutes(value);
              }}
              options={r_}
            />
          </Col>

          <Col>
            <Button
              shape="round"
              onClick={() => {
                editCourseData(currentState.id, "routes", routes || []);
              }}
            >
              Actualizar
            </Button>
          </Col>
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="center"
          align="middle"
        >
          <Col>
            <h3>Categoria</h3>
          </Col>
          <Col span={8}>
            <Select
              mode="multiple"
              value={category}
              style={{ width: "100%" }}
              // onChange={handleChangeRoute}
              onChange={(value: string) => {
                setCategory(value);
              }}
              options={c_}
            />
          </Col>

          <Col>
            <Button
              shape="round"
              onClick={() => {
                editCourseData(currentState.id, "category", category || []);
              }}
            >
              Actualizar
            </Button>
          </Col>
        </Row>

        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="center"
          align="middle"
        >
          <VideoEditor videos={videos} />
        </Row>
      </ConfigProvider>
    </div>
  );
};
