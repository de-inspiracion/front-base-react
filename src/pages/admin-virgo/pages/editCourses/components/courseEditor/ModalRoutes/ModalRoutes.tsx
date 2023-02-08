import { Divider, List, Space, Modal, Table, Button, message } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

interface DraggableBodyRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}

interface DataType {
  key: string;
  name: string;
  position: number;
}

interface Item {
  index: number;
  type: string;
}

const type = "DraggableBodyRow";

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};

const columns: ColumnsType<DataType> = [
  {
    dataIndex: "name",
    key: "name",
  },
];

const ModalRoutes = ({ open, setOpen, routes, state }: any) => {
  const [idRoute, setIdRoute] = useState("");
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Se actualizo la ruta correctamente",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error al actualizar la ruta",
    });
  };

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );

  const actualCourse: any = [
    {
      name: state.state.name,
      position: state.state.position,
      id: state.state.id,
    },
  ];

  const showCourses = (item: any) => {
    setIdRoute(item.id);
    for (let i = 0; i < item.courses.length; i++) {
      if (state.state.id === item.courses[i].id) {
        return setData(item.courses);
      }
    }
    return setData([...item.courses, ...actualCourse]);
  };

  const handleSave = () => {
    const actualRoute = idRoute;
    console.log("actualRoute", actualRoute);

    const headers = {
      "Content-Type": "application/json",
    };

    let updatePositon: any = data.map((item: any, index: number) => {
      return {
        position: index + 1,
        course: item.id,
      };
    });

    console.log("updatePositon", updatePositon);

    axios
      .post(
        `https://nestjs-virgo-production.up.railway.app/route/${actualRoute}`,
        updatePositon,
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
        console.log("se hizo el post");
        success();
      })
      .catch((err) => {
        console.log(err);
        console.log("No se hizo el post");
        error();
      });
  };

  return (
    <Modal
      title="Actualizar Rutas"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={900}
      footer={null}
    >
      <Space
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {contextHolder}
        <Space
          direction="vertical"
          style={{ width: 400, border: "1px #2c2c2c solid" }}
        >
          <div
            style={{
              top: 0,
              fontSize: "18px",
              fontWeight: 600,
              background: "#2c2c2c",
              padding: "0 10px",
            }}
          >
            Rutas
          </div>

          <List
            itemLayout="horizontal"
            dataSource={routes}
            renderItem={(route: any) => (
              <List.Item
                actions={[
                  <a
                    key={route.id}
                    onClick={() => {
                      showCourses(route);
                    }}
                  >
                    Ver Cursos
                  </a>,
                ]}
              >
                <List.Item.Meta title={route.name} />
              </List.Item>
            )}
          />
        </Space>

        <Divider
          type="vertical"
          style={{
            minHeight: "600px",
          }}
        />

        <Space
          direction="vertical"
          style={{
            width: 400,
            border: "1px solid #2c2c2c",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              top: 0,
              fontSize: "18px",
              fontWeight: 600,
              background: "#2c2c2c",
              padding: "0 10px",
            }}
          >
            Cursos
          </div>
          <div style={{ padding: "0 10px" }}>
            <DndProvider backend={HTML5Backend}>
              <Table
                columns={columns}
                dataSource={data}
                components={components}
                onRow={(_, index) => {
                  const attr = {
                    index,
                    moveRow,
                  };
                  return attr as React.HTMLAttributes<any>;
                }}
              />
            </DndProvider>
          </div>
          <Button type="primary" onClick={handleSave}>
            Actualizar
          </Button>
        </Space>
      </Space>
    </Modal>
  );
};

export default ModalRoutes;
