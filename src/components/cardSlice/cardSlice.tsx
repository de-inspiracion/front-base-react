import { useState, useEffect } from "react";
import "./cardSlice.css";
import CardV from "../cards/card";
import { useSwipeable } from "react-swipeable";

import services from "./services/http";

function CardSlide({ title, id, description, courses, source }: any) {
  const [items, setIems] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res: any = await services.getCoursesById(id);
      setIems(res.data);
    };
    if (source == "Ruta") {
      setIems(courses);
    } else {
      getData();
    }
  }, []);

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
    let listW = items?.length * 200;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 70;
    }
    setScrollX(x);
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      console.log("User Swiped!", eventData);
      if (eventData.dir === "Right") {
        handleLeftArrow();
      } else {
        handleRightArrow();
      }
    },
  });

  return (
    <>
      <div className="movieRow" {...handlers}>
        <h2> {title} </h2>
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
            {items?.length > 0 &&
              items.map(({ item, key }: any) => (
                <CardV
                  key={key}
                  itemData={item}
                  Image={item?.cover}
                  index={key}
                ></CardV>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CardSlide;
