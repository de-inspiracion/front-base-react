import { FC, useState } from "react";
import React from "react";
import { Avatar, Card, Col, Divider, Row } from "antd";
import { Typography } from "antd";
import "./cardSlice.css";
// import { getListInProgress } from "../../services/home.service";
import { useSelector, useDispatch } from 'react-redux'
import CardV from "../cards/card";
// import { newDataUser } from '../../../../store/user/userData'
import { useSwipeable } from 'react-swipeable';
const { Title } = Typography;
const { Meta } = Card;

const inProfressList = [
  { title: "curso 1", key: 0 },
  { title: "curso 2" ,  key: 1},
];

// const coursesInProgress = getListInProgress().then(data => {
// console.log(data.data)
// })



// const CoursesInProgress: React.FC =  () => {

// //   const count = useSelector((state: any) => state.userInfo)
// //   console.log(count)
// //   const dispatch = useDispatch()
// //   const changeValue = () => {
// //     dispatch(newDataUser('alejandro'))
// //   }
// // return (
// //   <>
// //   <div className="titleV">
// //     <p>Cursos que aun no terminas</p>
// //   </div>


// //       </>
// // );
// }
// export default CoursesInProgress;

function CardSlide({title}: any) {

  const items = [
    {
      poster_path : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'
    },
    {
      poster_path : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'
    },
    {
      poster_path : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'
    },
    {
      poster_path : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'
    },
    {
      poster_path : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'
    },
    {
      poster_path : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'
    },
    {
      poster_path : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'
    },
    {
      poster_path : 'https://image.tmdb.org/t/p/w300/20mOwAAPwZ1vLQkw0fvuQHiG7bO.jpg'
    },

  ]

  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
      let x = scrollX + Math.round(window.innerWidth / 2);
      if(x > 0) {
          x = 0;
      }
      setScrollX(x);
  };

  const handleRightArrow = () => {
      let x = scrollX - Math.round(window.innerWidth / 2);
      let listW = items?.length * 200;
      if((window.innerWidth - listW) > x) {
          x = (window.innerWidth - listW) - 70
      }
      setScrollX(x);
  };

  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      console.log("User Swiped!", eventData)
      if(eventData.dir === 'Right') {
        handleLeftArrow()
      } else {
        handleRightArrow()
      }
    },
  });

  return (
     <>


      <div className="movieRow" {...handlers}>
          <h2 style={{color: '#fff'}}> {title} </h2>
          <div className="movieRow--left" onClick={handleLeftArrow}>
              <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-left.png"/>
          </div>
          <div className="movieRow--right" onClick={handleRightArrow}>
              <img src="https://img.icons8.com/ios-glyphs/50/FFFFFF/chevron-right.png"/>
          </div>

          <div className="movieRow--listarea">
              <div className="movieRow--list" style={{
             marginLeft: scrollX,
         }}>
                  {items?.length > 0 && items.map((item, key)=>(
                    <CardV  key={key} itemData={item} ></CardV>
                      // <div key={key} className="movieRow--item">
                      //     <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}/>
                      // </div>
                  )) }
              </div>
          </div>
      </div>
    </>

  );
};

export default CardSlide;