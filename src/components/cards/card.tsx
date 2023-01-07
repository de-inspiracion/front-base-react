import { useState } from 'react'
import { ConfigProvider,Button, Modal } from 'antd'
import reactSvg from '../../assets/react.svg'
import { CloseOutlined } from '@ant-design/icons'


const CardV: any  = ({itemData, key,index}: any) => {
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div key={key} className="movieRow--item">
        { open && <ModalCard index={index}  Abierto={open} Cerrar = {handleClose}/>}
        <img src={`https://image.tmdb.org/t/p/w300${itemData.poster_path}`} onClick={()=>{
          showModal()
        }}/>
    </div>
  )
}


const ModalCard = ( {index, Abierto, Cerrar}:any  ) => {
  const [open,setOpen] = useState(Abierto)
  const [confirmLoading, setConfirmLoading] = useState(false);

  const cerrarModal = () => {
    Cerrar(false)
    setOpen(false)
  }
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      cerrarModal()
      setConfirmLoading(false);
    }, 2000);
  };
  return(
    <Modal
      open={open}
      onCancel={cerrarModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      footer={false}
      closeIcon={<CloseOutlined style={{color:'white'}}/>}
    >
      <div style={{width:'95%',display:'flex',flexDirection:'column',height:'50vh',border:'1px solid white', borderRadius:'10px',alignItems:'center'}}>
          <h2  style={{color:'white'}}>{index}</h2>
          <iframe width="40%" height="40%"
              src="https://www.youtube.com/embed/-AgrqLgXUGo">
          </iframe>
      </div>
    </Modal>
  )
}
export default CardV;