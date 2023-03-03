import React from 'react'
import { Button, Result, Modal} from 'antd'

export default function CertificadoModal({Abrir,Cerrar}:any) {
    const [mostrar,setMostrar] = React.useState(Abrir)
    const handleClose = ()=> {
        Cerrar()
    }
  return (
    <Modal
        open={mostrar}
        onCancel={handleClose}
        footer={false}
    >
        <Result 
            status="success"
            title="Felicitaciones haz completado el curso, puedes descargar tu certificado"
            extra={[
                <Button onClick={handleClose}>Descargar Certificado</Button>,
            ]}
    />
    </Modal>
  )
}
