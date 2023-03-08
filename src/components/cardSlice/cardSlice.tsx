import { useState, useEffect } from "react";
import "./cardSlice.css";
import CardV from "../cards/card";
import { useSwipeable } from "react-swipeable";
import { Card, Space, Typography } from "antd";
const { Meta } = Card;
import services from "./services/http";
import { useSelector } from "react-redux";
import CourseInProgressModal from "./components/CourseInProgressModal";
import { Row, Col } from "antd";
import { Input } from "antd";
import { FieldTimeOutlined } from "@ant-design/icons";
const { Search } = Input;

function CardSlide({
  title,
  id,
  description,
  courses,
  source,
  setChildItems,
}: any) {
  const [abrirModal, setAbrirModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const handleCloseModal = () => {
    setAbrirModal(false);
  };
  const userInfo = useSelector((estado: any) => estado.userInfo);
  const excludeCourses = userInfo.directive?.excludeCourses;
  const [items, setIems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [displayItemsIP, setDisplayItemsIP] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res: any = await services.getCoursesById(id, excludeCourses);
      setIems(res.data);
      setDisplayItems(res.data);
      setChildItems((prev: any) => {
        const newItem = [res.data, setDisplayItems, source];
        return prev.concat([newItem]);
      });
    };
    if (source === "Ruta") {
      setIems(courses);
      setDisplayItems(courses);
      setChildItems((prev: any) => {
        const newItem = [courses, setDisplayItems, source];
        return prev.concat([newItem]);
      });
    } else if (source === "En Progreso") {
      setDisplayItemsIP(userInfo.inprogress);
      setChildItems((prev: any) => {
        const newItem = [userInfo.inprogress, setDisplayItemsIP, source];
        return prev.concat([newItem]);
      });
    } else {
      getData();
    }
  }, []);

  useEffect(() => {
    setDisplayItemsIP(userInfo.inprogress);
  }, [userInfo.inprogress]);

  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = displayItems?.length * 200;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 70;
    }
    setScrollX(x);
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Right") {
        handleLeftArrow();
      } else {
        handleRightArrow();
      }
    },
  });

  return (
    <>
      {source == "En Progreso" ? (
        <div>
          <div className="movieRow" {...handlers}>
            <div
              className="movieRow--title"
              style={{
                color: "white",
                fontSize: "1.6em",
                fontWeight: "bold",
                marginLeft: "2em",
                marginBottom: "0.2em",
              }}
            >
              {title}
            </div>
            <div className="movieRow--left" onClick={handleRightArrow}>
              <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-left.png" />
            </div>
            <div className="movieRow--right" onClick={handleLeftArrow}>
              <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-right.png" />
            </div>

            <div className="movieRow--listarea">
              <div
                className="movieRow--list"
                style={{
                  marginLeft: scrollX,
                }}
              >
                {displayItemsIP.length > 0 &&
                  displayItemsIP.map((curso: any, index: any) => {
                    const courseExt = JSON.parse(JSON.stringify(curso.course));
                    return (
                      <CardV
                        key={curso._id}
                        itemData={courseExt}
                        Image={curso.course.cover}
                        index={index}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="movieRow" {...handlers}>
          <div
            className="movieRow--title"
            style={{
              color: "white",
              fontSize: "1.6em",
              fontWeight: "bold",
              marginLeft: "2em",
            }}
          >
            {title}
          </div>
          <div className="movieRow--left" onClick={handleLeftArrow}>
            <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-left.png" />
          </div>
          <div className="movieRow--right" onClick={handleRightArrow}>
            <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-right.png" />
          </div>

          <div className="movieRow--listarea">
            <div
              className="movieRow--list"
              style={{
                marginLeft: scrollX,
              }}
            >
              {displayItems.length > 0 &&
                displayItems.map((item: any, key) => {
                  return (
                    <CardV
                      key={key}
                      itemData={item}
                      Image={item.cover}
                      index={key}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
      <div style={{ margin: "5px" }}>
        {abrirModal && (
          <CourseInProgressModal
            Data={dataModal}
            Open={abrirModal}
            Cerrar={handleCloseModal}
          />
        )}
      </div>
    </>
  );
}

export default CardSlide;
