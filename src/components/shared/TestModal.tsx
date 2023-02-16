import React,{ useState, useEffect } from 'react'
import { Modal } from 'antd'
import Loading from '../Loading/Loading'
import services from '../../services/http'

export default function TestModal({Data, Abrir, Cerrar}:any) {
  const [open, setOpen] = useState(Abrir)
  const [loading, setLoading] = useState(false)
  const [questionsData, setQuestionsData] = useState({})
  console.log('PREGUNTAS DATA',questionsData)
  const handleClose = () => {
    Cerrar()
    setOpen(false)
  }
  useEffect(()=>{
    const getData = async () => {
      const res:any = await services.getVideoQuestions(Data.id)
      console.log(res)
      setQuestionsData(res.data.payload)
    }
    setLoading(true)
    getData()
    setLoading(false)
  },[])

  return (
    <Modal
      open={open}
      onCancel={handleClose}
    >
      {
        loading ? <Loading  text='Obteniendo Preguntas' open={loading} indicator='' /> :       <h1>PERO QUE WENO ESTE MODAL WN OOO</h1>
      }
    </Modal>
  )
}