import React,{useState} from 'react';
import { Button } from "antd";
import NavBarComponent from "../../../components/navbar/Navbar";
import http from "../../../services/http";
import * as XLSX from 'xlsx';
import { message } from 'antd';

const AdminMain = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [disableDownloadStatistics,setDisableDownloadStatistics] = useState(false)
  const [disableUploadUsers,setDisableUploadUsers] = useState(false)

  const uploadUsers = async () => {
    setDisableUploadUsers(true)
    messageApi.open({
      type: 'loading',
      content: 'Creando Usuarios / Colegios ...',
      duration: 0,
    });
    await http.uploadUsers().then(()=>{}).catch(()=>{})
    setTimeout(messageApi.destroy, 0);
    setDisableUploadUsers(false)
  }


  const generateStatisticsFile = async ()=>{
    setDisableDownloadStatistics(true)
    messageApi.open({
      type: 'loading',
      content: 'Generando Archivo ...',
      duration: 0,
    });
    const data = await http.getGeneralStatistics([])
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = "generalStatistics"
    const sheet = XLSX.utils.json_to_sheet(data);
    const sheets_names = ['data']
    const wb = { Sheets: {'data':sheet} , SheetNames: sheets_names };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data_ = new Blob([excelBuffer], {type: fileType});
    let csvURL = window.URL.createObjectURL(data_);
    let tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `${fileName}${fileExtension}`);
    tempLink.click();
    setTimeout(messageApi.destroy, 0);
    setDisableDownloadStatistics(false)
  }

  return (
    <div>
      {contextHolder}
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Button 
          disabled = {disableDownloadStatistics}
          onClick={generateStatisticsFile}>
          Descargar Estadistica
        </Button>
        <Button 
          disabled = {disableUploadUsers}
          onClick={uploadUsers}>
          Cargar Usuarios / Colegios
        </Button>
      </div>
    </div>
  );
};

export default AdminMain;
