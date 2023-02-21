import React, { useEffect, useState } from "react";
import { Row,Col} from "antd";
import "./coursesInProgress.css";
import { useSelector } from "react-redux";
import CardSlice from "../../../../components/cardSlice/cardSlice";
import services from "./services/http";
import { Input } from "antd";
const { Search } = Input;

const CoursesInProgress: React.FC = () => {
  const userInfo = useSelector((state: any) => state.userInfo);

  const [categories, setCategories] = useState([]);
  const [search,setSearch] = useState('')
  const [childItems,setChildItems] = useState<any[]>([])

  useEffect(() => {
    const getData = async () => {
      const res = await services.getCategories();
      console.log(res.data)
      setCategories(res.data.payload);
    };
    getData();
  }, []);
  return (
    <>
      <Row
        className=""
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ overflow: "hidden" }}
      >

        <Col style={{margin:'2%', width:'40%'}}>
          <Search
          size="large"
          enterButton
            placeholder="Buscar Curso"
            onChange={(event)=>{
              const e = event.target.value

              for (let i = 0; i < childItems.length; i++) {
                const childItem = childItems[i];
                const items = childItem[0]
                console.log(childItem[2])
                let displayItems:any = []
                if(e.length === 0){
                  displayItems = items
                  childItem[1](displayItems)
                  continue
                }

                if(childItem[2] === 'En Progreso'){
                  for (let j = 0; j < items.length; j++) {
                    const item = items[j];
                    const name = (new String(item.course.name)).toUpperCase()
                    if(name.includes(e.toUpperCase())){
                      displayItems.push(item)
                    }
                  }
                  childItem[1](displayItems)
                }else{
                  
                  for (let j = 0; j < items.length; j++) {
                    const item = items[j];
                    const name = (new String(item.name)).toUpperCase()
                    if(name.includes(e.toUpperCase())){
                      displayItems.push(item)
                    }
                  }
                  childItem[1](displayItems)
                }



              }
            }}
            onSearch={(e)=>{

              // for (let i = 0; i < childItems.length; i++) {
              //   const childItem = childItems[i];
              //   const items = childItem[0]
              //   console.log(childItem[2])
              //   let displayItems:any = []
              //   if(e.length === 0){
              //     displayItems = items
              //     childItem[1](displayItems)
              //     continue
              //   }

              //   if(childItem[2] === 'En Progreso'){
              //     for (let j = 0; j < items.length; j++) {
              //       const item = items[j];
              //       const name = (new String(item.course.name)).toUpperCase()
              //       if(name.includes(e.toUpperCase())){
              //         displayItems.push(item)
              //       }
              //     }
              //     childItem[1](displayItems)
              //   }else{
                  
              //     for (let j = 0; j < items.length; j++) {
              //       const item = items[j];
              //       const name = (new String(item.name)).toUpperCase()
              //       if(name.includes(e.toUpperCase())){
              //         displayItems.push(item)
              //       }
              //     }
              //     childItem[1](displayItems)
              //   }



              // }
            }}
          />
        </Col>

        {userInfo.inprogress.length > 0 && 
          <CardSlice title="Cursos en Progreso" id="progreso" source="En Progreso" description="Cursos en Progreso" setChildItems = {setChildItems}/>
        }
        {categories.length > 0 &&
          categories.map((categoria: any) => {
            return (
              <CardSlice
                title={categoria.name}
                id={categoria.id}
                description={categoria.description}
                setChildItems = {setChildItems}
              />
            );
          })}
      </Row>
    </>
  );
};
export default CoursesInProgress;
