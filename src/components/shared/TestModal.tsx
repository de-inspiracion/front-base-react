import React,{ useState, useEffect } from 'react'
import { Modal, Button, Card, Radio, Alert } from 'antd'
import type { RadioChangeEvent } from 'antd';
import Loading from '../Loading/Loading'
import services from '../../services/http'
import { CloseOutlined } from '@ant-design/icons'
import './testModal.css'
import { useSelector } from 'react-redux';
import RadioTest from './RadioTest';
export default function TestModal({Data, Abrir, Cerrar}:any) {
  // console.log('DATA MODAL: ',Data)
  const userInfo = useSelector( (state:any) => state.userInfo )
  // console.log('Inprogress: ',userInfo.inprogress)
  const [open, setOpen] = useState(Abrir)
  const [loading, setLoading] = useState(false)
  const [loadginMessage,setLoadingMessage] = useState('')
  const [noPreguntas, setNoPreguntas] = useState(false)
  const [questionsData, setQuestionsData] = useState({
    createdAt: '',
    questions: [],
    updatedAt: '',
    video: ''
  })
  const [onlyQuestions, setOnlyQuestions] = useState(Array<any>)

  const handleAnswer = (index: Number , ans_id: String,ans_number: Number ) => {
    let oldData: any[] = onlyQuestions
    oldData[Number(index)]["option_id"] = ans_id
    oldData[Number(index)]["option_number"] = ans_number
    // console.log(oldData[Number(index)])
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

      console.log(res.data.payload)
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
        console.log('no hay preguntas')
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
            message="Debe Contestar Todas las preguntas antes de revisar"
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
                  textAlign:'center',
                  marginTop:'5%',
                  width:'70%',
                  border: question.correctness === -1 ? 'none': question.correctness === true ? '1px solid green': '1px solid red'
                }}
                title={`Pregunta ${question.number}`}>
                  <p>{question.question}</p>
                  <fieldset 
                  id={question.id}
                   onChange={(e:any)=>{
                      let indice = getIndex(question._id)
                      let answer = e.target.value
                      let number = question.options.filter( (option:any) => option._id === answer )[0].number
                      console.log('Indice: ',indice,' Answer: ',answer, ' Question : ',number)                      
                      handleAnswer(indice,answer, number)
                    }} 
                    style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                      {question.options.map( (option:any,radIndex:Number) => {
                        console.log(radIndex,option._id === onlyQuestions[index].option_id )
                        return <RadioTest id={option._id} index={radIndex} value={option._id} mark={option._id === onlyQuestions[index].option_id && onlyQuestions[index].correctness === true} lock={ onlyQuestions[index].correctness && onlyQuestions[index].correctness  }   text={option.option}/>
                        
                      } )}
                  </fieldset>
                </Card>
              } )
            }
          </div>
          <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-evenly',marginTop:'5%'}}>
          { !noPreguntas && <Button onClick={async ()=> {
                setLoadingMessage('Revisando Respuestas')
                setLoading(true)
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
                  console.log(onlyQuestions)
                  let incorrectas = onlyQuestions.filter((item:any)=> item.correctness === false )
                  console.log('incorrectas: ' , incorrectas.length)
                  console.log('Data: ',Data)
                }
                else{
                  console.log('Debe contestar todas las preguntas para continuar')
                  window.alert("debe contestar todas las preguntas")
                  setAlert(true)
                }
                setLoading(false)
                setLoadingMessage('')


              }}>
                Revisar Respuestas
              </Button>}
              <Button onClick={()=> {
                handleClose()
              }}>Salir</Button>
          </div>
        </div>
      }
    </Modal>
  )
}