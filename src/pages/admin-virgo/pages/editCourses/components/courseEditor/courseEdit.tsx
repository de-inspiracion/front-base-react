import { Button, Col, Input, Row, Select, SelectProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Divider, Radio, Typography } from "antd";
import { useState } from "react";
import UploadImage from "../upload/uploadImage";

const { Paragraph } = Typography;

export const CourseEditor = () => {
  const [titleCourse, setTitleCourse] = useState("Nombre del curso");

  const [descriptionCourse, setDescriptionCourse] = useState(
    "descripcion del curso"
  );
  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChangeTags = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeRoute = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Row justify="center" align="middle">
        <Col span={4}>
          <UploadImage></UploadImage>
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
              onChange: setTitleCourse,
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
          <h3>Descripcion</h3>
        </Col>
        <Col span={6}>
          <Typography.Title
            editable={{
              onChange: setDescriptionCourse,
            }}
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
            onChange={handleChangeTags}
            options={options}
          />
        </Col>

        <Col>
          <Button shape="round">Actualizar</Button>
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
            defaultValue="lucy"
            style={{ width: "100%" }}
            onChange={handleChangeRoute}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "disabled",
                disabled: true,
                label: "Disabled",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
            ]}
          />
        </Col>

        <Col>
          <Button shape="round">Actualizar</Button>
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
            defaultValue="lucy"
            style={{ width: "100%" }}
            onChange={handleChangeRoute}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "disabled",
                disabled: true,
                label: "Disabled",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
            ]}
          />
        </Col>

        <Col>
          <Button shape="round">Actualizar</Button>
        </Col>
      </Row>
    </>
  );
};
