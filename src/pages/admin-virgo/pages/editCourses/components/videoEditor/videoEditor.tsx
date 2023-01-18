import { Button, Descriptions, List, Space } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";
export const VideoEditor = () => {
  const data = Array.from({ length: 10 }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  const [dataVideo, setDataVideo] = useState<any[]>(
    [
      {
        id: 1,
        href: "https://ant.design",
        title: `ant design part 1`,
        avatar: "https://joeschmoe.io/api/v1/random",
        description:
          "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      },
      {
        id: 2,
        href: "https://ant.design",
        title: `ant design part 1`,
        avatar: "https://joeschmoe.io/api/v1/random",
        description:
          "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      }
    ]
  );
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const updateDesc = (value: any, index: any) => {
    const newData = [...dataVideo]
    newData[index].description = value
    console.log(newData)
    setDataVideo(newData)
    console.log(dataVideo)
  };
  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={dataVideo}
        renderItem={(item, index) => (
          <List.Item
            key={item.title}
            actions={[
              <Button type="primary" shape="round">
                Editar Preguntas
              </Button>,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta title={item.title} />
            <Paragraph
              editable={{
                onChange: (value) => updateDesc(value, index),
              }}
            >
              {item.description}
            </Paragraph>
          </List.Item>
        )}
      />
    </>
  );
};
