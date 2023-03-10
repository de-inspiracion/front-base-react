import { useState, useEffect } from "react";
import "./cardSlice.css";
import CardV from "../cards/card";
import { useSwipeable } from "react-swipeable";
import services from "./services/http";
import { useSelector } from "react-redux";
import CourseInProgressModal from "./components/CourseInProgressModal";

function CardSlide({
  title,
  id,
  description,
  courses,
  source,
  setChildItems
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
      const excludeCourses = userInfo.directive?.excludeCourses;
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
    let x = scrollX + Math.round(window.innerWidth / 3);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 3);
    let listW = displayItems?.length * 200;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 70;
    }
    setScrollX(x);
  };

  const handleRightArrowInProgress = () => {
    let x = scrollX - Math.round(window.innerWidth / 3);
    let listW = displayItemsIP?.length * 200;
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
        handleRightArrowInProgress();
      }
    },
  });

  const ShowTitle = () => {
    const searchValue = useSelector((state: any) => state.searchValue);
    const existValueToSearch = searchValue?.valueToSearch?.payload?.newValue
    if (!existValueToSearch) {
      return (title);
    }
    return ('');
  }
  return (
    <>
      {source == "En Progreso" ? (
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
            <ShowTitle></ShowTitle>
          </div>
          <div className="movieRow--left" onClick={handleLeftArrow}>
            <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-left.png" />
          </div>
          <div className="movieRow--right" onClick={handleRightArrowInProgress}>
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
            <ShowTitle></ShowTitle>
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
              {displayItems && displayItems.length > 0 &&
                displayItems.map((item: any, key) => {
                  return (
                    <CardV
                      key={item.id}
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
