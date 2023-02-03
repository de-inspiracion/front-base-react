import React,{useEffect, useState} from "react"
import services from './services/http'
import './RutasDeAprendizaje.css'
import CardSlice from "../../components/cardSlice/cardSlice"
import { Card, Row } from "antd";;

const RutasDeAprendizaje = () => {
    const [rutas, setRutas] = useState([])

    useEffect(()=> {
        const getData = async () => {
            const res = await services.getLearningRoutes()
            setRutas(res.data.payload)
        }
        getData()
    },[])
    return (
        <>
            <Row className="" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ overflow: 'hidden'}}>
            { 
                rutas.length > 0 && 
                rutas.map((ruta:any) => {
                    return <CardSlice title={ruta.name} id={ruta.id} courses={ruta.courses} source='Ruta'/>
                })
            }
            </Row>
        </>
    )
}

export default RutasDeAprendizaje