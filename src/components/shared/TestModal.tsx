import React,{ useState, useEffect } from 'react'
import { Modal, Button, Card, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd';
import Loading from '../Loading/Loading'
import services from '../../services/http'
import { CloseOutlined } from '@ant-design/icons'
import './testModal.css'
export default function TestModal({Data, Abrir, Cerrar}:any) {
  console.log('DATA MODAL: ',Data)
  const [open, setOpen] = useState(Abrir)
  const [loading, setLoading] = useState(false)
  const [loadginMessage,setLoadingMessage] = useState('')
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
      res.data.payload.questions.forEach((element:any) => {
        element.option_id = ''
        element.option_number = -1
        element.correctness = -1
      });
      setQuestionsData(res.data.payload)
      setOnlyQuestions(res.data.payload.questions)
      setLoading(false)
      setLoadingMessage('')


    }
    getData()
  },[])

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={false}
      style={{border:'1px solid white'}}
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
          <h4>Sección de Preguntas</h4>
          <div style={{display:'flex',flexDirection:'column',width:'90%',alignItems:'center'}}>
            {
              onlyQuestions.map( (question:any,index) => {
                return <Card 
                style={{
                  textAlign:'center',
                  marginTop:'5%',
                  width:'70%',
                  border: question.correctness === -1 ? 'none': question.correctness === true ? '1px solid green': '1px solid red'
                }}
                title={`Pregunta ${question.number}`}>
                  <p>{question.question}</p>
                  <Radio.Group 
                   onChange={(e)=>{
                      let indice = getIndex(question._id)
                      let answer = e.target.value
                      let number = question.options.filter( (option:any) => option._id === answer )[0].number
                      // console.log('Indice: ',indice,' Answer: ',answer, ' Question : ',number)                      
                      handleAnswer(indice,answer, number)
                    }} 
                    style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                      {question.options.map( (option:any) => {
                        return <Radio  value={option._id}>{option.option}</Radio>
                      } )}
                  </Radio.Group>
                </Card>
              } )
            }
          </div>
          <div style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-evenly',marginTop:'5%'}}>
              <Button onClick={async ()=> {
                setLoadingMessage('Revisando Respuestas')
                setLoading(true)
                let flag = onlyQuestions.filter((item:any) => !item.option_id )
                if(flag.length === 0){
                  const res = await services.validateAnswers(Data.id,onlyQuestions)
                  console.log('RES',res)
                  let cont = 0
                  let oldData = onlyQuestions
                  oldData.forEach((element:any)=>{
                    element.correctness = res[cont].correct
                    cont ++
                  })       
                  setOnlyQuestions([...oldData])
                }
                else{
                  console.log('Debe contestar todas las preguntas para continuar')
                }
                setLoading(false)
                setLoadingMessage('')
              }}>
                Revisar Respuestas
              </Button>
              <Button>Botón 2</Button>
          </div>
        </div>
      }
    </Modal>
  )
}