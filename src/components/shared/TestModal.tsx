import React,{ useState, useEffect } from 'react'
import { Modal, Button, Card, Radio, Alert } from 'antd'
import type { RadioChangeEvent } from 'antd';
import Loading from '../Loading/Loading'
import services from '../../services/http'
import { CloseOutlined } from '@ant-design/icons'
import './testModal.css'
import { useSelector } from 'react-redux';
import RadioTest from './RadioTest';
import CertificadoModal from './CertificadoModal';
export default function TestModal({Data, Abrir, Cerrar, Cerrar2,DataModalPadre}:any) {
  // console.log('Data Padre',DataModalPadre)
  // console.log('Data Test',Data)
  const userInfo = useSelector( (state:any) => state.userInfo )
  const [open, setOpen] = useState(Abrir)
  const [loading, setLoading] = useState(false)
  const [loadginMessage,setLoadingMessage] = useState('')
  const [noPreguntas, setNoPreguntas] = useState(false)
  const [incorrectas,setIncorrectas] = useState(true)
  const [verifyQuestion,setVerifyQuestion] = useState(false)
  const [questionsData, setQuestionsData] = useState({
    createdAt: '',
    questions: [],
    updatedAt: '',
    video: ''
  })
  const [onlyQuestions, setOnlyQuestions] = useState(Array<any>)
  const [mostrarResult, setMostrarResult] = useState(false)
  const handleAnswer = (index: Number , ans_id: String,ans_number: Number ) => {
    let oldData: any[] = onlyQuestions
    oldData[Number(index)]["option_id"] = ans_id
    oldData[Number(index)]["option_number"] = ans_number
    setOnlyQuestions([...oldData])
  }
  const getIndex = (value:String) => {
    let indice = 0
    indice = onlyQuestions.findIndex( (item:any) => item._id === value)
    return indice
  }
  const handleClose = () => {
    Cerrar()
    setOpen(false)
  }
  useEffect(()=>{
    const getData = async () => {
      setLoadingMessage('Obteniendo Preguntas')

      setLoading(true)
      const res:any = await services.getQuestions(Data.id)

      if(res.data.payload){
  
        res.data.payload.questions.forEach((element:any) => {
          element.option_id = ''
          element.option_number = -1
          element.correctness = -1
        });
      setQuestionsData(res.data.payload)
      setOnlyQuestions(res.data.payload.questions)
      }
      else{
        setNoPreguntas(true)
      }
      setLoading(false)
      setLoadingMessage('')


    }
    getData()
  },[])
  const [alert,setAlert] = useState(false)
  const onCloseAlert =  ( ) => {
    setAlert(false)
  }
  const handleCloseResult = ()=> {
    setMostrarResult(false)
  }
  const handleClose2 = (value:any) => {
    Cerrar2(value)
  }
  // console.log('Incorrectas: ',incorrectas,' resultado: ', mostrarResult)
  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={false}
      closeIcon={
          <CloseOutlined
          style={{
              color: "white",
              background: "#101012e3",
              padding: "8px",
              borderRadius: "50%",
          }}
          />
      }
      className="modalCourseInProgress"
      width="100%"
    >
      {
        loading 
        ? 
        <Loading  text={loadginMessage} open={loading} indicator='' /> 
        :
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
          {
            noPreguntas && <h4>No hay preguntas para el video</h4>
          }
          {alert && <Alert
            message="Debe contestar todas las preguntas antes de revisar"
            type="warning"
            closable
            onClose={onCloseAlert}
          />}
          { !noPreguntas && <h4>Sección de Preguntas</h4>}
          <div style={{display:'flex',flexDirection:'column',width:'90%',alignItems:'center'}}>
            {
              onlyQuestions.map( (question:any,index) => {
                return <Card 
                id={question.id}
                style={{
                  marginTop:'5%',
                  width:'100%',
                  border: question.correctness === -1 ? 'none': question.correctness === true ? '1px solid green': '1px solid red'
                }}
                title={`Pregunta ${question.number}`}>
                  
                  <p style={{textAlign:'center'}}>{question.question}</p>
                  <form>
                  <fieldset 
                  id={question.id}
                   onChange={(e:any)=>{
                      let indice = getIndex(question._id)
                      let answer = e.target.value
                      let number = question.options.filter( (option:any) => option._id === answer )[0].number
                      handleAnswer(indice,answer, number)
                    }} 
                    style={{display:'flex',flexDirection:'column',alignItems:'flex-start',border:'none'}}>
                      {question.options.map( (option:any,radIndex:Number) => {
                        return <RadioTest 
                        name={question.question} 
                        id={option._id} 
                        index={radIndex} 
                        value={option._id} 
                        mark={
                          option._id === onlyQuestions[index].option_id
                          //  && onlyQuestions[index].correctness === true
                          } 
                        lock= { 
                          verifyQuestion
                        }   
                          text={option.option}
                          />
                        
                      } )}
                  </fieldset>
                  </form>
                  {question.correctness === -1 ? <></>: question.correctness === true ? 
                    <h3 style={{color:'green'}}>Correcto</h3>
                    :
                    <h3 style={{color:'red'}}>Incorrecto</h3>
                   }
                </Card>
              } )
            }
          </div>
          <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-evenly',marginTop:'5%'}}>
          { !noPreguntas && <Button onClick={async ()=> {
                setLoadingMessage('Revisando Respuestas')
                setLoading(true)
                setVerifyQuestion(true)
                let flag = onlyQuestions.filter((item:any) => !item.option_id )
                if(flag.length === 0){
                  const res = await services.validateAnswers(Data.id,onlyQuestions)
                  let cont = 0
                  let oldData = onlyQuestions
                  oldData.forEach((element:any)=>{
                    element.correctness = res[cont].correct
                    cont ++
                  })       
                  setOnlyQuestions([...oldData])
                  let incorrectas = onlyQuestions.filter((item:any)=> item.correctness === false )
                  if(incorrectas.length === 0){
                    setIncorrectas(false)
                  }
                }
                else{
                  setAlert(true)
                }
                setLoading(false)
                setLoadingMessage('')


              }}>
                Enviar y Revisar
              </Button>}
              <Button onClick={()=> {
                let videos_padre = DataModalPadre.videos
                let id_video_actual = Data.id
                // console.log(videos_padre,id_video_actual)
                let indice_video = videos_padre.findIndex((item:any) => item.id === id_video_actual)
                if( indice_video === videos_padre.length -1 && incorrectas === false ){
                  // console.log('mostrar alerta de felicitaciones y descargar certificado si se responden las preguntas correctamente')
                  setMostrarResult(true)
                }else{
                  if(indice_video === videos_padre.length -1){
                    console.log('No quedan mas videos')
                  }else{
                    // console.log('pasar al siguiente video',indice_video)
                    handleClose2(indice_video)
                  }
                }
                // handleClose()
              }}>Salir</Button>
          </div>
        </div>
      }
    { mostrarResult && <CertificadoModal Abrir={mostrarResult} Cerrar={handleCloseResult}/> }

    </Modal>
  )
}