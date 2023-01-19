import { useState, useEffect } from "react";
import "./cardSlice.css";
// import { getListInProgress } from "../../services/home.service";
import CardV from "../cards/card";
// import { newDataUser } from '../../../../store/user/userData'
import { useSwipeable } from 'react-swipeable';

import services  from '../../services/http'


function CardSlide({title}: any) {

  const [items, setIems] = useState([])  
  useEffect(()=>{
    console.log('USEFFECT 1')
    const getData = async() => {
      const res = await services.getCourses()
      setIems(res.data.payload)
    }
    getData()
  },[])


  // useEffect(()=>{
  //   console.log('USEEFFECT 2')
  //   const getData = async () => {
  //     // setIems(await services.getCourseVideos(courseData[0].id).payload)
  //     let res = await services.getCourseVideos(courseData[0]?.id)
  //     console.log('RES:    ',res)
  //     setIems(res.payload)
  //   }
  //   getData()
  // },[courseData]) // esto trigerea el useffec cuando se setea el courseData


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
                    console.log(items),
                    <CardV  key={key} itemData={item} index={key} ></CardV>
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